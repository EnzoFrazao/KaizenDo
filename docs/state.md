# Estado do projeto

## Visão atual
Protótipo visual do GUARÁ (Next.js em `frontend/`), quatro telas com dados ilustrativos e widget
VLibras em todas. Memória técnica em [`specs/`](../specs/README.md).

## Pendências
- [ ] Deploy Netlify no site novo `https://guaramonitora.netlify.app`: confirmar que `/`, `/mapa`
  e `/dashboard` respondem 200 e mostram as abas embaixo no celular. Se o build falhar, suspeitar
  de suporte do adaptador ao Next 16.4 (`cacheComponents`, `partialPrefetching`).
- [ ] Evoluções das telas listadas em [`docs/telas.md`](telas.md) (responsáveis por tela).
- [ ] Não há testes automatizados; só `npm run lint` e `npm run build`.
- [ ] Coordenadas dos trechos X divergem do diagrama oficial: aguardam pontos levantados
  ([`specs/open-decisions.md`](../specs/open-decisions.md)). Não corrigir por estimativa.
- [ ] Conferir o layout de celular num aparelho real (iPhone com notch e Android) antes da
  apresentação; até agora só viewport emulado.

## Decisões importantes
- Navegação de celular é a da branch `mobile-qrcode`: abas embaixo (`NavMobile.tsx`) abaixo de
  `lg`. O topo com abas roláveis que a branch `mapa-pessoas` criou no `Sidebar.tsx` (breakpoint
  `md`) foi descartado na junção; não reintroduzir as duas navegações.
- Ao mexer numa tabela, lembrar do cartão equivalente (as duas versões ficam no mesmo componente).
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
- Conta do Netlify trocada: o site oficial passou a ser `guaramonitora` e deu 404 em tudo, porque
  o `netlify.toml` estava em `frontend/` e o site novo não tem base directory no painel. Movido
  para a raiz com `base = "frontend"`; detalhe em `specs/system.md` (Deploy).
- O site antigo `guaramonitoramento` nunca publicou o build da junção com o mobile (`c55407e`):
  continuou no build do PR #1. Abandonado junto com a conta antiga.
- Juntadas na `main` as duas linhas paralelas: `mapa-pessoas` (status novos, restaurante do Porto
  Vale, pontos sem sobreposição, popup que fica aberto, já na `main` pelo PR #1) e
  `mobile-qrcode` (versão de celular). Conflitos em 9 arquivos: layout, abas e cartões vieram do
  mobile; dados, status e mapa vieram do `mapa-pessoas`. O checkbox "Cobertura" foi para dentro
  do painel "Filtros" do mapa.
- tsc, lint e build passam. Conferido no navegador: 375 px nas quatro rotas (abas visíveis, barra
  lateral oculta, tabelas em cartões, 0 px de rolagem horizontal, sem erros no console) e 1280 px
  no histórico.
- Armadilha: com o painel do navegador oculto, a página carrega com largura ~0 e o Leaflet enquadra
  no zoom 10. Para conferir, fixe o tamanho com `resize_window` antes de recarregar.
- `.claude/launch.json` ganhou `autoPort: true`: outra sessão ocupava a porta 3000.
