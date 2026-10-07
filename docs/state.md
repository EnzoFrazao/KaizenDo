# Estado do projeto

## Visão atual
Protótipo visual do GUARÁ (Next.js em `frontend/`), quatro telas com dados ilustrativos e widget
VLibras em todas. Memória técnica em [`specs/`](../specs/README.md).

## Pendências
- [ ] Evoluções das telas listadas em [`docs/telas.md`](telas.md) (responsáveis por tela).
- [ ] Não há testes automatizados; só `npm run lint` e `npm run build`.
- [ ] Conferir o layout de celular num aparelho real (iPhone com notch e Android) antes da
  apresentação; até agora só viewport emulado.

## Decisões importantes
- VLibras entra por `next/script` no layout raiz usando o loader novo (v7), que se inicializa
  sozinho. Não usar o snippet antigo com `<div vw>` + `new VLibras.Widget(...)`: o loader atual cria
  o próprio botão e o markup antigo ficaria sobrando.

## Última sessão (2026-10-07, Claude)
- Versão para celular de quem chega pelo QR code: abas embaixo (`NavMobile.tsx`), tabelas em
  cartões abaixo de 768 px, filtros recolhíveis (`PainelFiltros.tsx`), mapa em 60svh. Desktop igual.
- Conferido no painel do navegador em 360/375/768/desktop: sem rolagem horizontal, lint e tipos ok.
- Ao mexer numa tabela, lembrar do cartão equivalente (as duas versões ficam no mesmo componente).
