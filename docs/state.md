# Estado do projeto

## Visão atual
Protótipo visual do GUARÁ (Next.js em `frontend/`), quatro telas com dados ilustrativos e widget
VLibras em todas. Memória técnica em [`specs/`](../specs/README.md).

## Pendências
- [ ] Evoluções das telas listadas em [`docs/telas.md`](telas.md) (responsáveis por tela).
- [ ] Não há testes automatizados; só `npm run lint` e `npm run build`.
- [ ] Coordenadas dos trechos X divergem do diagrama oficial: aguardam pontos levantados
  ([`specs/open-decisions.md`](../specs/open-decisions.md)). Não corrigir por estimativa.

## Decisões importantes
- VLibras entra por `next/script` no layout raiz usando o loader novo (v7), que se inicializa
  sozinho. Não usar o snippet antigo com `<div vw>` + `new VLibras.Widget(...)`: o loader atual cria
  o próprio botão e o markup antigo ficaria sobrando.

- Cobertura do mapa com raio calculado, e não os 3 km pedidos: a pera tem ~2 km, então 3 km
  cobriria tudo e a malha sumiria. Filtro SVG (`#guara-gosma`) em vez de círculos translúcidos,
  para sobreposição não escurecer. Detalhe em `frontend/src/app/mapa/README.md`.

## Última sessão (2026-10-07, Claude)
- Área de cobertura fundida com pulso de radar em `/mapa` (`lib/cobertura.ts`, `MapaLeaflet.tsx`,
  `MapaView.tsx`, `globals.css`); conferida no navegador. Lint, build e tsc passam.
- Coordenadas conferidas contra o diagrama oficial; divergências registradas, não corrigidas.
- Popups ainda fecham no redesenho de 5 s (comportamento anterior, não mexido).
