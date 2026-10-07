# Estratégia e mapa de testes

**Última verificação:** 2026-10-07

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

## Mapa por capacidade

| Capability | Evidência | Situação |
|---|---|---|
| `core` | gates acima + conferência manual das quatro rotas (desktop e celular) | Implementada parcialmente, sem teste automatizado |

## Lacunas

- Nenhum teste unitário, de componente ou E2E.
- Responsivo não foi testado em aparelho físico (iPhone/Android), só em viewport emulado.
- VLibras depende de serviço externo; só é verificável com internet.
