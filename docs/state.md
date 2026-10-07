# Estado do projeto

## Visão atual
Protótipo visual do GUARÁ (Next.js em `frontend/`), quatro telas com dados ilustrativos e widget
VLibras em todas. Memória técnica em [`specs/`](../specs/README.md).

## Pendências
- [ ] Evoluções das telas listadas em [`docs/telas.md`](telas.md) (responsáveis por tela).
- [ ] Não há testes automatizados; só `npm run lint` e `npm run build`.

## Decisões importantes
- VLibras entra por `next/script` no layout raiz usando o loader novo (v7), que se inicializa
  sozinho. Não usar o snippet antigo com `<div vw>` + `new VLibras.Widget(...)`: o loader atual cria
  o próprio botão e o markup antigo ficaria sobrando.

## Última sessão (2026-10-07, Claude)
- Widget VLibras adicionado em `frontend/src/app/layout.tsx`; conferido no navegador (botão, avatar
  e tradução em `/mapa`). O avatar demora a carregar em rede lenta — não é erro.
- Criado o núcleo de `specs/`, `AGENTS.md` da raiz e este arquivo.
