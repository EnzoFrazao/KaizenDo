# Estado do projeto

## Visão atual
Protótipo visual do GUARÁ (Next.js em `frontend/`), quatro telas com dados ilustrativos e widget
VLibras em todas. Memória técnica em [`specs/`](../specs/README.md).

## Pendências
- [ ] Deploy Netlify: `frontend/netlify.toml` já está na `main`; falta confirmar que `/`,
  `/mapa`, `/dashboard` respondem 200 em `https://guaramonitoramento.netlify.app`. Se o build
  falhar, suspeitar de suporte do adaptador ao Next 16.4 (`cacheComponents`, `partialPrefetching`).
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

- Pontos sem sobreposição por afastamento na tela (`espalharNaTela`), e não por agrupamento: o
  coordenador precisa ver cada pessoa. O restaurante fica fora do cálculo do raio, senão o raio
  iria a ~1,4 km.
- O status "aguardando programação" é o antigo "livre": é quem está disponível para acionar.

## Última sessão (2026-10-07, Claude)
- Status novos, restaurante do Porto Vale com 3 pessoas (2 almoçando, 1 descansando), pessoas do
  pátio espalhadas por toda a área, pontos sem sobreposição, lat/lon no popup (que agora fica
  aberto nas atualizações de 5 s) e layout de celular em todas as telas. Lint, tsc e build passam;
  conferido no navegador em 1280 px e em 375 px. Entregue na `main` por PR.
- Armadilha: com o painel do navegador oculto, a página carrega com largura ~0 e o Leaflet enquadra
  no zoom 10. Para conferir, fixe o tamanho com `resize_window` antes de recarregar.
- Sessão paralela (Netlify): o primeiro deploy deu 404 em tudo porque o Next.js não foi detectado
  ("Runtime: Not set", `.next` servido como estático). `frontend/netlify.toml` declara
  `@netlify/plugin-nextjs` e já está na `main`.
