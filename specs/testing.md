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

## Mapa por capacidade

| Capability | Evidência | Situação |
|---|---|---|
| `core` | gates acima + conferência manual das quatro rotas | Implementada parcialmente, sem teste automatizado |

## Lacunas

- Nenhum teste unitário, de componente ou E2E.
- VLibras depende de serviço externo; só é verificável com internet.
