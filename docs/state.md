# Estado do projeto

## Visão atual
Protótipo visual do GUARÁ (Next.js em `frontend/`), quatro telas com dados ilustrativos e widget
VLibras em todas. Memória técnica em [`specs/`](../specs/README.md).

## Pendências
- [ ] Antes de apresentar: abrir `/cadastro` no aparelho da apresentação e usar "Restaurar dados
  originais" (o cadastro fica no `localStorage` de cada navegador).
- [ ] Evoluções das telas listadas em [`docs/telas.md`](telas.md) (responsáveis por tela).
- [ ] Não há testes automatizados; só `npm run lint` e `npm run build`.
- [ ] Coordenadas dos trechos X divergem do diagrama oficial: aguardam pontos levantados
  ([`specs/open-decisions.md`](../specs/open-decisions.md)). Não corrigir por estimativa.
- [ ] Conferir o layout de celular num aparelho real (iPhone com notch e Android) antes da
  apresentação; até agora só viewport emulado.

## Decisões importantes
- Tema claro entra como variante `claro:` ao lado das classes do escuro, nunca no lugar delas: o
  escuro é o estado base e não pode mudar. Classe de cor nova precisa do par `claro:`. O mapa é
  igual nos dois temas. Ver [ADR 0001](../specs/decisions/0001-tema-claro-por-variante.md).
- O claro é o padrão de quem visita, em qualquer aparelho: `data-tema="claro"` vem do servidor e
  só o `"escuro"` salvo o desliga. Ver [ADR 0002](../specs/decisions/0002-claro-como-padrao.md).
- O Cinza Vale oficial (#747678) não serve para texto: dá 4,54:1 sobre branco puro e reprova em AA
  sobre qualquer fundo tingido. No claro o texto usa Grafite, #45494f e Ardósia.
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

## Última sessão (2026-10-08, Claude)
- Partiu de `61f73f0` (tema claro, feito por loky070), que já era a `main` remota. Tema claro
  virou o padrão para todos (ADR 0002) e o botão do topo do celular passou a ter 44×44 px, sem
  borda (opção A de um mockup com três opções). Lint, build e conferência no navegador ok a 375 e a
  1280 px.
- `/` passou a redirecionar para `/mapa` (antes `/dashboard`): o link publicado abre direto no mapa.
- 60% das bolinhas do mapa oscilam (PRs #8 e #9; detalhe no README do mapa), aceitando sobreposição
  de poucos px em movimento, nunca a ponto de esconder.
- Auditoria do link com Edge headless (painel do app oculto congela animação): movimento confirmado
  ao vivo. Achou e corrigiu: erro de hidratação #418 em todas as páginas publicadas, causado pelo
  comentário que o Netlify injeta no `<head>` (o script do tema foi para o `<body>`; ver
  `specs/system.md`), que fazia o escuro salvo abrir claro; e pulo de ~4 px no zoom. Correções no
  PR da branch `claude/hidratacao-netlify-zoom`; publicar e auditar o link de novo.
- Armadilhas: o painel do navegador do app, oculto, congela `document.timeline` e o zoom do
  Leaflet; para ver animação, use um Edge headless por CDP (`--remote-debugging-port`, perfil
  temporário). Prévia de deploy do Netlify pede login: `curl` nela devolve "Login Redirect", não o
  site. O `next dev` às vezes não percebe edição feita por script no `globals.css`.
- Pendente: ver no celular de verdade se o movimento é suave.

## Histórico
- 2026-10-07 (Claude): auditoria do site publicado (`guaramonitora`). `posicoesAtuais()` passou a
  seguir o vínculo do cadastro, mais ajustes de celular, Open Graph e ícone do iPhone. O
  `netlify.toml` foi movido para a raiz com `base = "frontend"` (detalhe em `specs/system.md`,
  Deploy).
- Armadilha: com o painel do navegador oculto, a página carrega com largura ~0 e o Leaflet enquadra
  no zoom 10. Para conferir, fixe o tamanho com `resize_window` antes de recarregar.
- Armadilha: o Next mantém as telas visitadas montadas e ocultas (`Activity`); filtros digitados
  numa tela continuam aplicados ao voltar, e `querySelector` acha elementos de telas ocultas.
- `.claude/launch.json` tem `autoPort: true`: outra sessão pode ocupar a porta 3000.
