# Memória técnica do projeto

Este diretório contém o contrato necessário para compreender e modificar o GUARÁ. O contexto do
desafio e o detalhe de cada tela continuam em [`docs/`](../docs/); aqui ficam só o estado de
entrega, a arquitetura implementada, as evidências e as decisões.

## Ordem de leitura

1. Leia este índice.
2. Abra somente a capability relacionada.
3. Consulte `system.md` para confirmar o implementado.
4. Consulte `testing.md` antes de alterar cobertura.
5. Leia as decisões abertas citadas.
6. Consulte `docs/state.md` para o handoff local.

## Autoridade

| Documento | Autoridade |
|---|---|
| [`docs/telas.md`](../docs/telas.md) e READMEs de cada tela | O que cada tela deve mostrar |
| [`capabilities/core.md`](capabilities/core.md) | Contrato transversal e estado de entrega |
| [`system.md`](system.md) | Arquitetura realmente implementada |
| [`testing.md`](testing.md) | Gates e mapa de evidências |
| [`open-decisions.md`](open-decisions.md) | Questões que não podem ser inventadas |
| [`history.md`](history.md) | Marcos; Git preserva o detalhe |

## Roteamento por tarefa

| Tema | Ler |
|---|---|
| Telas, layout, acessibilidade | `capabilities/core.md` e o README da tela |
| Stack, scripts externos, dados | `system.md` |
| Lint, build, verificação | `testing.md` |

## Manutenção

- Mudança funcional atualiza a capability.
- Mudança de evidência atualiza `testing.md`.
- Decisão duradoura cria ou substitui ADR em `decisions/`.
- Marco relevante atualiza `history.md`.
