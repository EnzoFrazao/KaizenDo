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

## Última sessão (2026-10-07, Claude)
- Auditoria do site publicado (`guaramonitora`), tela a tela em 375, 768 e 1280 px. Git limpo:
  `main` local = remota, nada aberto, todas as branches já juntadas.
- Corrigido: quem era cadastrado com ESP32 não aparecia no mapa (a mensagem dizia que sim) e quem
  era desvinculado continuava nele; agora `posicoesAtuais()` segue o vínculo do cadastro. Também:
  alertas antes da lista no dashboard do celular, chips de 36 px ao toque, filtros em uma coluna
  (selects cortavam o texto), "raio 230 m" com espaço duplo, fim da página atrás do selo do
  Netlify, prévia de link (Open Graph) e ícone de tela inicial do iPhone.
- Conta do Netlify trocada antes: o site novo dava 404 porque o `netlify.toml` estava em
  `frontend/`; movido para a raiz com `base = "frontend"` (detalhe em `specs/system.md`, Deploy).
- Armadilha: com o painel do navegador oculto, a página carrega com largura ~0 e o Leaflet enquadra
  no zoom 10. Para conferir, fixe o tamanho com `resize_window` antes de recarregar.
- Armadilha: o Next mantém as telas visitadas montadas e ocultas (`Activity`); filtros digitados
  numa tela continuam aplicados ao voltar, e `querySelector` acha elementos de telas ocultas.
- `.claude/launch.json` tem `autoPort: true`: outra sessão pode ocupar a porta 3000.
