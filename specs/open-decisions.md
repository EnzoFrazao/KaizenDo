# Decisões abertas

As perguntas de negócio do desafio estão em [`docs/problema.md`](../docs/problema.md). Última
verificação: 2026-10-07.

## Topologia dos trechos X diverge do diagrama oficial do pátio

Conferido contra o diagrama de circuitos do pátio (VLI/FTL, versão de 22/11/2024) e o satélite do
Google, em 2026-10-07. As coordenadas de `frontend/src/lib/dados-mock.ts` **não foram alteradas**:
o README do mapa exige pontos levantados, não estimativa.

- Batem: `VIRADORES` cai no prédio operacional dos viradores; `OFICINA` (PIAL) cai no "Posto de
  Inspeção e Abastecimento de Locomotivas".
- No diagrama X01/X02 ficam **dentro** do Pátio de Recepção e X06/X07 **dentro** da Formação
  (pátios paralelos e vizinhos). No código `RECEPCAO` e `FORMACAO` são trechos à parte no anel do
  lago, e X06/X07 ficam ao norte do pátio de minério, ~800 m de X01/X02.
- O diagrama tem X04 (junto ao lago e aos viradores); o código não tem.
- O Google tem o ponto colaborativo "Pátio de formação – Espaço X6" em `-2.589024, -44.3204638`,
  ~2,6 km a sudeste do X06 do código. Indício, não prova.

**Para fechar:** coordenadas levantadas de X01–X07, Recepção e Formação, e se Recepção/Formação
continuam como trechos próprios ou viram agrupamento de trechos X.
