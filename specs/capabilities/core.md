---
id: core
contract_status: confirmed
implementation_status: partial
last_verified: 2026-10-08
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

- As rotas `/dashboard`, `/mapa`, `/historico` e `/cadastro` existem e `/` leva ao mapa (é o que o link
  publicado e o QR code abrem).
- Dois temas, alternados por um botão presente na barra lateral (desktop) e no topo (celular,
  só o ícone, com área de toque de 44 px): **claro** (padrão de quem visita, em qualquer aparelho),
  repaginado com as cores oficiais da Vale, e **escuro**. A escolha fica no `localStorage`
  (`guara.tema`) e é aplicada antes da primeira pintura, sem piscar.
- O **mapa não muda de cor** entre os temas: tiles, pontos de status, círculos dos trechos e área
  de cobertura são os mesmos. Só o cromo do Leaflet (popup, tooltip, botões de zoom) acompanha.
- Cores e rótulos de status vêm de `lib/rotulos.ts`; a matiz é a mesma nos dois temas, para a
  legenda do mapa continuar batendo com o ponto.
- No tema claro, cada texto atinge o contraste AA (4,5:1; 3:1 para texto grande).
- Status de trabalho: manobrando, almoçando, aguardando programação (disponível para acionar),
  descansando e sem sinal.
- Todas as telas funcionam no celular (375 px) sem rolagem lateral da página.
- Toda tela oferece tradução para Libras pelo widget VLibras: botão flutuante à direita que abre o
  avatar e traduz o texto clicado.
- Responsivo para celular (o protótipo é aberto por QR code na apresentação):
  - abaixo de 1024 px (`lg`) a barra lateral dá lugar a um topo com a marca e a uma barra inferior
    com as 4 telas, respeitando as áreas seguras do iPhone (`viewport-fit=cover`);
  - abaixo de 768 px (`md`) as tabelas de Dashboard, Histórico e Cadastro viram cartões; acima
    disso a tabela volta dentro de rolagem horizontal própria;
  - os filtros de Mapa e Histórico recolhem atrás de um botão "Filtros" (com contagem dos ativos)
    abaixo de 1024 px; abertos, ficam um por linha abaixo de 640 px (`sm`), senão o texto dos
    selects é cortado;
  - no Dashboard, abaixo de `md`, os alertas ativos vêm logo depois do resumo, antes da lista de
    quem está trabalhando (que no celular não tem altura máxima);
  - nenhuma rolagem horizontal da página a partir de 360 px; campos com 16 px abaixo de 1024 px
    (evita zoom do iOS) e alvos de toque de 44 px em `pointer: coarse`;
  - interações que eram só hover (rosca de status) também respondem a toque; o foco automático do
    wizard só acontece com mouse, para não abrir o teclado do celular sozinho;
  - o zoom do usuário continua liberado.

## Invariantes e regras de negócio

- As telas obtêm dados só por `@/lib/dados`.
- "Em campo" exclui quem está sem sinal.
- Um ESP32 pode ser cadastrado sozinho (vai para o estoque) ou já vinculado a uma pessoa nova,
  pelo wizard. Os dois caminhos valem as mesmas regras de id e MAC.
- Mapa e Dashboard mostram exatamente quem tem ESP32 vinculado agora no cadastro: cadastrar com
  ESP32 põe a pessoa no mapa na hora (posição inicial no pátio, fixa pelo id) e desvincular a tira.
- O widget VLibras aparece uma única vez por página, inclusive após navegação no cliente.
- No mapa, a área de cobertura usa o menor raio que conecta todas as pessoas visíveis no pátio e
  forma uma área única e translúcida; locais `foraDoPatio` (restaurante) não entram no cálculo
  (detalhe em `frontend/src/app/mapa/README.md`).
- No mapa, nenhum ponto fica sobre outro em nenhum zoom quando parado; o popup mostra a lat/lon
  real.
- No mapa, 60% das bolinhas (quem está sem sinal fica parado) oscilam alguns pixels, só no
  desenho, para mostrar que cada ponto é alguém. Andando, duas bolinhas podem se sobrepor por
  poucos pixels, mas uma nunca esconde a outra. A posição não muda e, com
  `prefers-reduced-motion`, nada se mexe.
- Nos dados ilustrativos, "almoçando" e "descansando" só valem para as três pessoas do
  restaurante.

## Estado atual e lacunas

As quatro telas têm versão inicial; as evoluções marcadas em `docs/telas.md` seguem pendentes. O
VLibras está implementado e foi conferido manualmente em 2026-10-07: botão presente, avatar Ícaro
carregado e tradução iniciada em `/mapa`. A cobertura do mapa foi conferida manualmente em
2026-10-07 (forma única, raio recalculado com filtro, popups clicáveis, sem erros no console). Os
novos status, o restaurante e a ausência de sobreposição (medida: 0 pares em 1280 px e em 375 px)
foram conferidos no mesmo dia. O layout responsivo (abas embaixo, tabelas em cartões, filtros
recolhíveis) foi conferido manualmente em 2026-10-07 nas quatro rotas em 360×740, 375×812,
768×1024 e desktop (ver `testing.md`), e de novo depois de juntado às mudanças do mapa. O site
publicado foi auditado tela a tela no mesmo dia, o que corrigiu o vínculo cadastro → mapa (antes,
quem era cadastrado com ESP32 não aparecia e quem era desvinculado continuava no mapa). As
coordenadas dos trechos divergem do diagrama oficial e seguem como aproximação.

## Evidências de implementação e teste

- Tema: [`frontend/src/components/BotaoTema.tsx`](../../frontend/src/components/BotaoTema.tsx) e o
  bloco "Temas" de [`frontend/src/app/globals.css`](../../frontend/src/app/globals.css);
  decisões em [`decisions/0001-tema-claro-por-variante.md`](../decisions/0001-tema-claro-por-variante.md)
  e [`decisions/0002-claro-como-padrao.md`](../decisions/0002-claro-como-padrao.md).
- Implementação: [`frontend/src/app/layout.tsx`](../../frontend/src/app/layout.tsx),
  `frontend/src/app/*/page.tsx` e, para o celular, `frontend/src/components/{NavMobile,PainelFiltros}.tsx`.
- Gates: `npm run lint` e `npm run build` em `frontend/` (ver [`testing.md`](../testing.md)).

## Relações

- Decisão aberta: [topologia dos trechos X](../open-decisions.md#topologia-dos-trechos-x-diverge-do-diagrama-oficial-do-pátio).
- ADRs relacionados: [0001 — tema claro como variante aditiva](../decisions/0001-tema-claro-por-variante.md)
  e [0002 — tema claro como padrão](../decisions/0002-claro-como-padrao.md).
