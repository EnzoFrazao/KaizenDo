# Estratégia e mapa de testes

**Última verificação:** 2026-10-08

## Gates

Rodar dentro de `frontend/`:

| Comando | Evidência |
|---|---|
| `npm run lint` | ESLint (config Next) sem erros |
| `npm run build` | Compilação, checagem de tipos do Next e pré-renderização das rotas |
| `npx tsc --noEmit` | Tipos; depende dos tipos gerados por `next build`/`next dev` (`LayoutProps`) |

## Responsabilidade por camada

Não há testes automatizados. Comportamento visual é conferido manualmente no navegador
(`npm run dev`, configuração `guara-frontend` em `.claude/launch.json`).

Conferência responsiva (manual, painel do navegador com viewport emulado): nas quatro rotas em
360×740, 375×812, 768×1024 e desktop, checar `document.documentElement.scrollWidth <= innerWidth`,
abas/sidebar no breakpoint certo, cartões abaixo de 768 px, filtros recolhíveis e console sem erros.
O toque na rosca é conferido disparando `PointerEvent` com `pointerType: "touch"`, porque os
cliques do painel chegam como mouse.

Cadastro → mapa (manual, no `localhost`): cadastrar alguém com um ESP32 do estoque e conferir +1
em "no mapa"; desvincular na tabela e conferir −1; depois apagar `guara.cadastro.v1` do
`localStorage`. Não fazer no site publicado: o cadastro fica salvo no navegador de quem testou.

Contraste do tema claro (manual, no navegador): com `data-tema="claro"`, percorrer os nós de
texto visíveis de `main`, `aside`, `header` e `nav`, achar o primeiro ancestral com fundo opaco e
exigir 4,5:1 (3:1 para ≥ 24 px, ou ≥ 18,66 px em negrito). Conferido em 2026-10-08 nas quatro
rotas: zero falhas. Foi assim que se descobriu que o Cinza Vale oficial (#747678) reprova sobre
qualquer fundo que não seja branco puro.

Tema (manual): sem `guara.tema` no `localStorage`, recarregar e conferir `data-tema="claro"`, fundo
`rgb(243, 244, 245)` e `theme-color` `#f3f4f5`; com `guara.tema = "escuro"`, recarregar e conferir
o fundo `rgb(9, 9, 11)`, sem sombra nos cartões, e a primeira `theme-color` em `#09090b`. Alternar
pelo botão, recarregar e conferir que a escolha persiste e que o console não acusa hidratação. No
celular (375×812), o botão do topo mede 44×44 px. Conferido em 2026-10-08 em `/mapa`, a 375 e a
1280 px.

## Mapa por capacidade

| Capability | Evidência | Situação |
|---|---|---|
| `core` | gates acima + conferência manual das quatro rotas (desktop e celular) + auditoria de contraste do tema claro | Implementada parcialmente, sem teste automatizado |

## Lacunas

- Nenhum teste unitário, de componente ou E2E.
- Responsivo não foi testado em aparelho físico (iPhone/Android), só em viewport emulado.
- Nada impede que uma classe de cor nova entre sem o par `claro:`; só a auditoria de contraste
  pega, e só quando o contraste cai.
- VLibras depende de serviço externo; só é verificável com internet.
