# KaizenDo · Posicionamento Operacional Inteligente

Solução para o desafio **Posicionamento Operacional Inteligente**, do programa **KaizenDO** da Vale, no Terminal Ferroviário de Ponta da Madeira (TFPM), em São Luís/MA.

## O problema em uma frase

Cerca de 50 maquinistas e manobristas por turno trabalham em 13 km de pátio, e ninguém sabe com precisão onde cada um está. Por isso, a escolha de quem acionar e o revezamento dependem da memória de quem coordena, e os vagões ficam parados esperando gente chegar.

## A solução em uma frase

Cada pessoa leva um **ESP32** (GPS + rádio) e um **Raspberry Pi** no pátio recebe a latitude, a longitude e a velocidade de todos. Com isso o sistema mostra onde está cada um, recomenda quem chega mais rápido a cada frente, guarda o histórico e, como extra de segurança, bloqueia o virador quando há alguém na área de basculamento. Nome de trabalho: **GUARÁ**.

## Documentos

| Documento | Conteúdo |
|---|---|
| [docs/problema.md](docs/problema.md) | Contexto completo: terminal, operação, ficha oficial, descobertas da visita de campo, glossário, perguntas abertas e hipóteses |
| [docs/solucao.md](docs/solucao.md) | Solução explicada passo a passo, opções, protótipo, pitch e o módulo de segurança |
| [docs/arquitetura.md](docs/arquitetura.md) | ESP32 → Raspberry → API → telas: pacote de rádio, API, modelo de dados, regras de status e alertas |
| [docs/telas.md](docs/telas.md) | Especificação das 4 telas e divisão por membro da equipe |
| [docs/slides/](docs/slides/) | Fotos dos slides da apresentação e do mapa oficial do terminal |

## Estrutura do repositório

```
docs/                 problema, solução, arquitetura, telas, slides
web/                  telas (Next.js), uma pasta por tela  → veja web/README.md
  src/app/dashboard/    Dashboard de monitoramento
  src/app/mapa/         Mapa ao vivo
  src/app/historico/    Histórico com filtros
  src/app/cadastro/     Cadastro pessoa ↔ ESP32
firmware/esp32/       transmissor (GPS + LoRa)
receptor/raspberry/   receptor, envio para a API e relé de segurança
api/                  backend (FastAPI + PostgreSQL/PostGIS)
```

## Rodar as telas

```bash
cd web
npm install
npm run dev
```

Abra http://localhost:3000. As telas usam dados fictícios até o backend existir.

## Time

Sponsor: Lizandro Terceiro · Especialistas: Fernando Nunes, Andressa Chaves-Tharjes Lima, Rogerio Pereira · Estagiário: Itaio Conceição · SESI: Maria Alice · Universitários: Enzo Frazão, Grazielli Diniz, Luick Vieira
