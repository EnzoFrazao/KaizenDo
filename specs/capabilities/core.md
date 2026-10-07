---
id: core
contract_status: confirmed
implementation_status: partial
last_verified: 2026-10-07
last_verified_ref: working-tree
---

# Protótipo visual do GUARÁ

## Finalidade e limites

Mostrar, com dados ilustrativos, como quem coordena o turno acompanha maquinistas e manobristas no
TFPM. Fora do escopo: backend, ESP32, Raspberry Pi, login e dados reais.

## Atores, permissões, entradas e resultados

Quem coordena o turno (CCO ou pátio) usa as quatro telas; o operário só existe como dado, pela tag
ESP32. Não há permissões: o admin é fixo (`adminAtual()`). O conteúdo de cada tela é definido em
[`docs/telas.md`](../../docs/telas.md) e nos READMEs das pastas.

## Contrato comportamental e critérios de aceite

- As rotas `/dashboard`, `/mapa`, `/historico` e `/cadastro` existem e `/` leva ao dashboard.
- Tema escuro único; cores e rótulos de status vêm de `lib/rotulos.ts`.
- Toda tela oferece tradução para Libras pelo widget VLibras: botão flutuante à direita que abre o
  avatar e traduz o texto clicado.

## Invariantes e regras de negócio

- As telas obtêm dados só por `@/lib/dados`.
- "Em campo" exclui quem está sem sinal.
- O widget VLibras aparece uma única vez por página, inclusive após navegação no cliente.
- No mapa, a área de cobertura usa o menor raio que conecta todas as pessoas visíveis e forma
  uma área única e translúcida (detalhe em `frontend/src/app/mapa/README.md`).

## Estado atual e lacunas

As quatro telas têm versão inicial; as evoluções marcadas em `docs/telas.md` seguem pendentes. O
VLibras está implementado e foi conferido manualmente em 2026-10-07: botão presente, avatar Ícaro
carregado e tradução iniciada em `/mapa`. A cobertura do mapa foi conferida manualmente em
2026-10-07 (forma única, raio recalculado com filtro, popups clicáveis, sem erros no console). As
coordenadas dos trechos divergem do diagrama oficial e seguem como aproximação.

## Evidências de implementação e teste

- Implementação: [`frontend/src/app/layout.tsx`](../../frontend/src/app/layout.tsx) e
  `frontend/src/app/*/page.tsx`.
- Gates: `npm run lint` e `npm run build` em `frontend/` (ver [`testing.md`](../testing.md)).

## Relações

- Decisão aberta: [topologia dos trechos X](../open-decisions.md#topologia-dos-trechos-x-diverge-do-diagrama-oficial-do-pátio).
- ADR relacionado: nenhum.
