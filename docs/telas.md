# GUARÁ · Especificação das telas

São 4 telas, uma por membro da equipe. Todas já existem em [`web/`](../web/) com uma **versão inicial funcionando com dados fictícios**, para ninguém começar do zero. Cada pessoa evolui a sua a partir do mockup (quando houver) e desta especificação.

| Tela | Rota | Pasta | Responsável |
|---|---|---|---|
| Dashboard de monitoramento | `/dashboard` | [`web/src/app/dashboard/`](../web/src/app/dashboard/) | _a definir_ |
| Mapa ao vivo | `/mapa` | [`web/src/app/mapa/`](../web/src/app/mapa/) | _a definir_ |
| Histórico | `/historico` | [`web/src/app/historico/`](../web/src/app/historico/) | _a definir_ |
| Cadastro (pessoa ↔ ESP32) | `/cadastro` | [`web/src/app/cadastro/`](../web/src/app/cadastro/) | _a definir_ |

Cada pasta tem um `README.md` com o que a tela precisa ter, as funções de dados a usar e o que falta fazer. Como trabalhar em equipe está em [`web/README.md`](../web/README.md).

## Quem usa

Quem coordena o turno no pátio (ou no CCO), olhando um monitor ou tablet. Precisa responder rápido: **onde está cada um, quem está livre perto de onde preciso, e tem alguém em risco?**

## 1. Dashboard de monitoramento

Visão do turno em uma tela, sem precisar abrir o mapa.

**Pontos importantes (proposta):**

| Bloco | O que mostra | Por que importa |
|---|---|---|
| Cartões de resumo | pessoas com dispositivo ativo, alertas ativos, sem sinal, bateria < 20% | Saber em 2 segundos se está tudo bem |
| Pessoas por status | livre, em atividade, deslocando, pausa, sem sinal | Quantos estão disponíveis para acionar |
| Pessoas por função | maquinistas e manobristas em campo | São equipes diferentes |
| Alertas ativos | lista com tipo, pessoa, trecho e há quanto tempo | Segurança primeiro: área de risco e pessoa isolada no topo |
| Ocupação por trecho | quantas pessoas em cada trecho (X01, X02, Viradores…) | Ver trechos descobertos e trechos lotados |
| Livres mais próximos | (evolução) para um trecho escolhido, quem está livre e mais perto | É o "acionar o mais próximo" do desafio |
| Saúde dos dispositivos | sem sinal, bateria baixa, sem vínculo | Manutenção dos ESP32 |

Atualiza sozinho a cada poucos segundos.

## 2. Mapa ao vivo

Mapa do pátio com cada pessoa como um ponto colorido pelo status.

- **Filtros:** busca por nome, função, status, turno e trecho.
- **Ponto:** cor = status; tamanho ou ícone = função (maquinista maior).
- **Ao clicar:** nome, matrícula, função, status, trecho, velocidade, bateria e horário da última leitura.
- **Trechos:** desenhados no mapa; área de risco (viradores) em vermelho.
- **Legenda** de cores e contador "N pessoas no mapa".
- **Atualização:** a cada 5 s (depois WebSocket).
- Evolução: rastro dos últimos minutos ao clicar numa pessoa; imagem do mapa oficial do TFPM como camada.

## 3. Histórico

Consulta do que aconteceu, para análise e para o pitch (tempos de deslocamento, ociosidade).

- **Filtros:** nome, turno, função, status de trabalho, trecho e dia (e, como evolução, faixa de horário).
- **Tabela:** horário, pessoa, função, turno, trecho, status, velocidade, coordenadas.
- **Paginação** (50 por página) e ordenação por horário.
- Evolução: exportar CSV; ver o percurso de uma pessoa no dia num mini-mapa; resumo do dia (tempo em cada status).

## 4. Cadastro

Vincular cada pessoa ao ESP32 que ela carrega. Sem isso o sistema não sabe de quem é cada ponto.

- **Lista de pessoas** com matrícula, função, turno e o dispositivo vinculado.
- **Vincular / trocar / desvincular** o ESP32 de uma pessoa (um dispositivo só pode estar com uma pessoa).
- **Dispositivos livres** visíveis, com bateria e último sinal.
- **Nova pessoa** (nome, matrícula, função, turno) e **novo dispositivo** (id da etiqueta e MAC).
- Evolução: ler o id do ESP32 por QR code na etiqueta; histórico de trocas.

## Convenções visuais (valem para todas as telas)

| Status | Cor | Classe Tailwind |
|---|---|---|
| Livre | verde | `emerald` |
| Em atividade | azul | `blue` |
| Deslocando | laranja | `amber` |
| Em pausa | cinza | `slate` |
| Sem sinal | vermelho | `red` |

- Cores e rótulos ficam em [`web/src/lib/rotulos.ts`](../web/src/lib/rotulos.ts). **Não repita cores na página**, importe de lá.
- Componentes comuns em `web/src/components/`: `PageHeader`, `Card`, `StatusBadge`, `Sidebar`.
- Textos em português; horários no formato 24 h; ids técnicos (P001, ESP32-0A1B) em fonte monoespaçada.

## Sobre o mockup

O repositório **não tem mockup**. As telas iniciais seguem esta especificação. Se houver um mockup (Figma, imagem, papel), coloque em `docs/mockups/` com o nome da tela (ex.: `docs/mockups/dashboard.png`) e linke aqui.
