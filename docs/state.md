# Estado do projeto

## Visão atual
Protótipo visual do GUARÁ (Next.js em `frontend/`), quatro telas com dados ilustrativos e widget
VLibras em todas. Memória técnica em [`specs/`](../specs/README.md).

## Pendências
- [ ] Deploy Netlify: commitar/pushar `frontend/netlify.toml` na `main` e confirmar que `/`,
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

## Última sessão (2026-10-07, Claude)
- Primeiro deploy no Netlify deu 404 em tudo: Next.js não detectado ("Runtime: Not set"), `.next`
  servido como estático. Criado `frontend/netlify.toml` declarando `@netlify/plugin-nextjs`.
- Ainda não verificado em produção: depende de commit/push do usuário.
