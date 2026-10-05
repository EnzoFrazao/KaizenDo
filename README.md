# KaizenDo · Posicionamento Operacional Inteligente

Solução para o desafio **Posicionamento Operacional Inteligente**, do programa **KaizenDO** da Vale, no Terminal Ferroviário de Ponta da Madeira (TFPM), em São Luís/MA.

## O problema em uma frase

Cerca de 50 maquinistas e manobristas por turno trabalham em 13 km de pátio, e ninguém sabe com precisão onde cada um está. Por isso, a escolha de quem acionar e o revezamento dependem da memória de quem coordena, e os vagões ficam parados esperando gente chegar.

## A solução em uma frase

Usar a posição GPS que já circula pelo rádio do sistema de alerta de aproximação de trens, captada por um **Raspberry Pi**, para mostrar onde está cada pessoa, recomendar quem chega mais rápido a cada frente, planejar o revezamento e, como extra de segurança, bloquear o virador quando houver alguém na área de basculamento.

## Documentos

| Documento | Conteúdo |
|---|---|
| [docs/problema.md](docs/problema.md) | Contexto completo: terminal, operação, ficha oficial, descobertas da visita de campo, glossário, perguntas abertas e hipóteses |
| [docs/solucao.md](docs/solucao.md) | Solução explicada passo a passo, opções, arquitetura, protótipo, pitch, impacto das respostas pendentes e o módulo de segurança |
| [docs/slides/](docs/slides/) | Fotos dos slides da apresentação e do mapa oficial do terminal |

## Estrutura planejada do protótipo

```
prototipo/
  simulador/   simula 20 trens/dia, 60 lotes, 50 pessoas e 2 carros, gerando posições no formato do sistema de alerta
  receptor/    código do Raspberry Pi: recebe posições, cercas virtuais, relé de bloqueio
  motor/       zonas por trecho entre os "X", tempos de deslocamento, recomendação e revezamento (Python + FastAPI)
  painel/      mapa do pátio para quem coordena (Leaflet ou MapLibre)
```

Stack sugerida: Python, FastAPI, PostgreSQL com PostGIS e um painel web com mapa.

## Time

Sponsor: Lizandro Terceiro · Especialistas: Fernando Nunes, Andressa Chaves-Tharjes Lima, Rogerio Pereira · Estagiário: Itaio Conceição · SESI: Maria Alice · Universitários: Enzo Frazão, Grazielli Diniz, Luick Vieira
