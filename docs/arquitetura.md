# GUARÁ · Arquitetura técnica

Este documento é o **contrato** entre as partes do sistema: o ESP32, o Raspberry Pi, o backend e as telas web. Quem trabalha numa parte pode avançar sozinho, desde que respeite os formatos daqui.

> Nome de trabalho: **GUARÁ**. Trocar o nome é só editar a barra lateral (`web/src/components/Sidebar.tsx`) e os títulos dos documentos.

## 1. Visão geral

```
 [ESP32 + GPS]  ──rádio──►  [Raspberry Pi]  ──HTTP──►  [Backend API + banco]  ──HTTP──►  [Telas web]
  1 por pessoa              receptor no pátio            regras, histórico,              dashboard, mapa,
  lat, lon, velocidade      decodifica e encaminha       alertas, vínculos               histórico, cadastro
                            relé de segurança
```

| Parte | Pasta | O que faz |
|---|---|---|
| Transmissor | [`firmware/esp32/`](../firmware/esp32/) | Lê o GPS e transmite um pacote curto a cada poucos segundos |
| Receptor | [`receptor/raspberry/`](../receptor/raspberry/) | Escuta a frequência, decodifica os pacotes, envia para a API e aciona o relé de segurança |
| Backend | [`api/`](../api/) | Guarda leituras, calcula trecho e status, gera alertas, mantém o vínculo pessoa ↔ ESP32 |
| Telas | [`web/`](../web/) | As 4 telas usadas por quem coordena |

## 2. Hardware

**Transmissor (ESP32), um por pessoa:**
- ESP32 com rádio **LoRa** (sugestão: placas tipo Heltec ou TTGO LoRa32, que já trazem o rádio).
- Módulo GPS (sugestão: u-blox NEO-6M ou NEO-M8N).
- Bateria 18650 e caixa presa ao colete ou ao capacete.
- Frequência sugerida: **915 MHz** (faixa ISM liberada no Brasil). **Confirmar com a Vale** que não interfere nos rádios do pátio (pergunta P6.5 em [problema.md](problema.md)).

**Receptor (Raspberry Pi), um ou mais no pátio:**
- Raspberry Pi com módulo LoRa (SX1276/SX1262) na mesma frequência.
- Antena externa no ponto mais alto possível. Um LoRa cobre de 2 a 5 km em área aberta; para 13 km de pera talvez sejam necessários 2 ou 3 receptores.
- Saída GPIO para o **relé de segurança** do virador ([solucao.md, seção 8](solucao.md#8-extra-bloqueio-de-segurança-na-área-de-basculamento)).
- As **locomotivas** continuam vindo do receptor que já existe no sistema de alerta de aproximação; o mesmo backend pode receber essas posições.

## 3. Pacote de rádio (ESP32 → Raspberry)

Pacote curto em texto, separado por vírgulas, para caber no LoRa:

```
GUA1,<dispositivoId>,<seq>,<lat>,<lon>,<velKmh>,<bateriaPct>,<fixGps>
GUA1,ESP32-0A1B,1532,-2.58512,-44.35631,4.2,87,1
```

| Campo | Exemplo | Observação |
|---|---|---|
| `GUA1` | | Prefixo e versão do formato. O receptor ignora o que não começar com isso |
| `dispositivoId` | `ESP32-0A1B` | Fixo no firmware, impresso na etiqueta da caixa |
| `seq` | `1532` | Contador; serve para detectar pacotes perdidos |
| `lat`, `lon` | `-2.58512`, `-44.35631` | Graus decimais, 5 casas (~1 m) |
| `velKmh` | `4.2` | Velocidade do GPS |
| `bateriaPct` | `87` | 0 a 100 |
| `fixGps` | `1` | 1 = GPS com posição válida; 0 = sem posição (ainda manda para saber que está vivo) |

- **Intervalo:** 5 s se a pessoa está se movendo, 15 s se está parada (economiza bateria).
- **Horário:** quem carimba o horário é o **Raspberry**, na recepção. O ESP32 não precisa de relógio.
- A pessoa **não** vai no pacote: o backend descobre quem é pelo vínculo cadastrado na tela de Cadastro.

## 4. Raspberry → Backend

Para cada pacote válido, o receptor faz:

```
POST /api/leituras
{
  "dispositivoId": "ESP32-0A1B",
  "seq": 1532,
  "recebidoEm": "2026-10-07T14:32:05Z",
  "lat": -2.58512,
  "lon": -44.35631,
  "velocidadeKmh": 4.2,
  "bateriaPct": 87,
  "fixGps": true,
  "receptorId": "RPI-VIRADORES",
  "rssi": -97
}
```

Se a API estiver fora do ar, o receptor guarda numa fila local (SQLite) e reenvia depois.

**Segurança local:** o receptor **não depende da API** para o bloqueio. Ele tem a cerca virtual dos viradores gravada localmente e aciona o relé sozinho se um ESP32 estiver dentro dela.

## 5. Backend

Stack sugerida: **Python + FastAPI + PostgreSQL com PostGIS** (o PostGIS responde "em qual trecho está este ponto" com uma consulta).

Ao receber uma leitura, o backend:
1. Descobre a **pessoa** pelo vínculo do dispositivo.
2. Calcula o **trecho** (qual polígono contém o ponto).
3. Calcula o **status** (regra inicial, a ajustar com a operação):

| Status | Regra inicial |
|---|---|
| `deslocando` | velocidade > 3 km/h |
| `em_atividade` | parado (≤ 3 km/h) num trecho com trem/lote em operação |
| `livre` | parado num trecho sem operação |
| `pausa` | parado em área de apoio (ex.: CTMR, oficina) ou pausa marcada |
| `sem_sinal` | nenhum pacote há mais de 60 s |

4. Gera **alertas**:

| Alerta | Quando |
|---|---|
| `area_de_risco` | pessoa dentro de trecho com `areaDeRisco = true` |
| `pessoa_isolada` | pessoa a mais de 300 m de qualquer colega por mais de 10 min |
| `sem_sinal` | sem pacote há mais de 60 s durante o turno |
| `bateria_baixa` | bateria abaixo de 20% |

## 6. Modelo de dados

Os tipos TypeScript em [`web/src/lib/tipos.ts`](../web/src/lib/tipos.ts) são a referência. Resumo:

| Entidade | Campos |
|---|---|
| **Pessoa** | id, nome, matricula, funcao (maquinista/manobrista), turno (A/B/C), dispositivoId, ativo |
| **Dispositivo** | id (ESP32-XXXX), mac, bateriaPct, ultimoSinal, firmware, pessoaId |
| **Trecho** | id (X01…, VIRADORES…), nome, areaDeRisco, centro (e depois o polígono) |
| **Leitura** | dispositivoId, pessoaId, timestamp, lat, lon, velocidadeKmh, trecho, status |
| **Alerta** | id, tipo, pessoaId, trecho, inicio, fim (null = ativo) |

O vínculo pessoa ↔ ESP32 é **1 para 1**: um dispositivo só pode estar com uma pessoa, e uma pessoa só com um dispositivo.

## 7. API usada pelas telas

Cada rota abaixo já tem uma função equivalente em [`web/src/lib/api.ts`](../web/src/lib/api.ts), que hoje devolve dados fictícios. Quando o backend existir, só esse arquivo muda.

| Método e rota | Função em `api.ts` | Usada em |
|---|---|---|
| `GET /api/trechos` | `listarTrechos()` | Mapa, Histórico, Dashboard |
| `GET /api/pessoas` | `listarPessoas()` | Cadastro, Dashboard |
| `GET /api/dispositivos` | `listarDispositivos()` | Cadastro, Dashboard |
| `GET /api/posicoes/atual` | `posicoesAtuais()` | Mapa, Dashboard |
| `GET /api/historico?nome=&turno=&funcao=&status=&trecho=&dia=` | `historico(filtros)` | Histórico |
| `GET /api/alertas?ativos=true` | `listarAlertas(somenteAtivos)` | Dashboard, Mapa |
| `PUT /api/vinculos` `{pessoaId, dispositivoId}` | `vincularDispositivo()` | Cadastro |
| `POST /api/pessoas` | `cadastrarPessoa()` | Cadastro |
| `POST /api/dispositivos` `{id, mac}` | `cadastrarDispositivo()` | Cadastro |
| `POST /api/leituras` | (só o Raspberry usa) | |

Tempo real: na primeira versão o mapa consulta `posicoes/atual` a cada 5 s. Depois pode virar WebSocket ou SSE (`GET /api/posicoes/stream`).
