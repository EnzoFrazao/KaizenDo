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
- Responsivo para celular (o protótipo é aberto por QR code na apresentação):
  - abaixo de 1024 px (`lg`) a barra lateral dá lugar a um topo com a marca e a uma barra inferior
    com as 4 telas, respeitando as áreas seguras do iPhone (`viewport-fit=cover`);
  - abaixo de 768 px (`md`) as tabelas de Dashboard, Histórico e Cadastro viram cartões; acima
    disso a tabela volta dentro de rolagem horizontal própria;
  - os filtros de Mapa e Histórico recolhem atrás de um botão "Filtros" (com contagem dos ativos)
    abaixo de 1024 px;
  - nenhuma rolagem horizontal da página a partir de 360 px; campos com 16 px abaixo de 1024 px
    (evita zoom do iOS) e alvos de toque de 44 px em `pointer: coarse`;
  - interações que eram só hover (rosca de status) também respondem a toque; o foco automático do
    wizard só acontece com mouse, para não abrir o teclado do celular sozinho;
  - o zoom do usuário continua liberado.

## Invariantes e regras de negócio

- As telas obtêm dados só por `@/lib/dados`.
- "Em campo" exclui quem está sem sinal.
- O widget VLibras aparece uma única vez por página, inclusive após navegação no cliente.

## Estado atual e lacunas

As quatro telas têm versão inicial; as evoluções marcadas em `docs/telas.md` seguem pendentes. O
VLibras está implementado e foi conferido manualmente em 2026-10-07: botão presente, avatar Ícaro
carregado e tradução iniciada em `/mapa`. O layout responsivo foi conferido manualmente em
2026-10-07 nas quatro rotas em 360×740, 375×812, 768×1024 e desktop (ver `testing.md`).

## Evidências de implementação e teste

- Implementação: [`frontend/src/app/layout.tsx`](../../frontend/src/app/layout.tsx),
  `frontend/src/app/*/page.tsx` e, para o celular, `frontend/src/components/{NavMobile,PainelFiltros}.tsx`.
- Gates: `npm run lint` e `npm run build` em `frontend/` (ver [`testing.md`](../testing.md)).

## Relações

- Decisão aberta: nenhuma.
- ADR relacionado: nenhum.
