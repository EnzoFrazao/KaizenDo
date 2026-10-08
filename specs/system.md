# Sistema implementado

**Última verificação:** 2026-10-08
**Referência:** `working-tree`

## Finalidade e unidade executável

Protótipo web **só visual** do GUARÁ (posicionamento de maquinistas e manobristas no TFPM). A única
unidade executável é o app Next.js em `frontend/`.

## Stack e entrypoints

- Next.js 16 (App Router, Turbopack, `cacheComponents`), React 19, TypeScript, Tailwind 4, Leaflet;
- `frontend/src/app/layout.tsx`: layout raiz (viewport, barra lateral, navegação de celular,
  script que aplica o tema antes da primeira pintura, widget VLibras);
- `frontend/src/components/BotaoTema.tsx`: alternador de tema;
- `frontend/src/components/navegacao.ts`: lista única das telas, lida pela `Sidebar` (≥ 1024 px) e
  por `TopoMobile`/`AbasMobile` em `NavMobile.tsx` (< 1024 px);
- `frontend/src/components/PainelFiltros.tsx`: filtros em linha no desktop e recolhíveis no celular;
- `frontend/src/app/{dashboard,mapa,historico,cadastro}/page.tsx`: as quatro telas;
- `frontend/src/lib/dados.ts`: única porta de dados das telas (hoje lê `dados-mock.ts`).

## Temas

Dois temas: **claro** com as cores da Vale (padrão de quem visita) e **escuro**. Liga-se pelo
atributo `data-tema="claro"` no `<html>`, que já vem do servidor
(ADR [0002](decisions/0002-claro-como-padrao.md)); sem ele vale o escuro, que é a base do CSS.

- `globals.css` declara `@custom-variant claro`; cada elemento mantém a classe do escuro e
  **ganha** uma `claro:` ao lado. O escuro é, assim, imutável por construção
  (ADR [0001](decisions/0001-tema-claro-por-variante.md)).
- A escolha vive no `localStorage` (`guara.tema`). Um script inline no `<head>` lê `"escuro"`, tira
  o atributo e troca a meta `theme-color` antes da primeira pintura — um arquivo externo chegaria
  tarde e a página piscaria. Por isso o `<html>` leva `suppressHydrationWarning`: o DOM diverge do
  HTML do servidor de propósito.
- O Next insere uma segunda meta `theme-color` depois de hidratar. O navegador usa a primeira; o
  `BotaoTema` atualiza todas.
- `BotaoTema` lê o tema com `useSyncExternalStore`, porque a verdade mora no DOM, fora do React.
- O **mapa não muda**: `COR_STATUS_MAPA`, tiles, trechos e cobertura são iguais nos dois temas.

## Fronteiras e fluxo

As telas pedem dados a `@/lib/dados`, que devolve dados ilustrativos. Rótulos e cores de status vêm
de `@/lib/rotulos`. Não há backend, login nem conexão com ESP32 ou Raspberry Pi.

## Estado, persistência e integrações

- Nenhuma persistência; tudo é mock em memória.
- Tiles do mapa: OpenStreetMap, carregados pelo Leaflet no navegador.
- **VLibras** (tradução para Libras do governo federal): `next/script` carrega
  `https://vlibras.gov.br/app/vlibras-plugin.js` com `strategy="afterInteractive"` no layout raiz.
  O loader se inicializa sozinho, cria o botão flutuante à direita (dentro de um shadow DOM, fora da
  árvore React) e só baixa o app do avatar (Unity, via iframe e CDN jsDelivr) no primeiro clique. É
  idempotente: navegar entre telas não duplica o botão.

## Deploy

- Netlify, site `guaramonitora` (`https://guaramonitora.netlify.app`), a partir da `main`. O site
  antigo (`guaramonitoramento`) ficou na conta anterior e não é mais o oficial.
- Toda a configuração está no `netlify.toml` da raiz: `base = "frontend"`, `npm run build`, publish
  `.next`, Node 22 e plugin `@netlify/plugin-nextjs`. O painel não precisa de base directory.
- O arquivo fica na raiz porque o Netlify procura o `netlify.toml` na base directory do painel e,
  sem ela, na raiz. Quando ele morava em `frontend/`, o site novo (sem base no painel) buildou na
  raiz, que não tem `package.json`, e toda rota deu 404.
- O Netlify injeta o selo "Powered by Netlify" (`iframe#nl-badge-frame`, fixo embaixo à direita).
  No celular ele cobria as abas Histórico e Cadastro; `globals.css` sobe o selo para cima da barra
  abaixo de `lg`, e o `pb` do `<main>` (8rem) reserva abas + selo para o fim da página não ficar
  atrás dele. O "Hide this badge" do selo só vale para quem clicou (fica no navegador).
- O plugin é declarado explicitamente porque o Netlify não detectou o Next.js ("Runtime: Not set")
  e publicou o `.next` como estático: toda rota dava 404 e `/server/app/index.html` respondia 200.

## Restrições e lacunas

- Responsividade é só CSS (Tailwind `md`/`lg`): as telas renderizam tabela e cartões juntos e o
  breakpoint esconde um dos dois. Mudou a coluna de uma tabela, mude o cartão correspondente.
- O mapa usa `isolate` para conter os z-index do Leaflet (controles chegam a 1000); assim topo e
  abas do celular ficam por cima com `z-40`.
- O VLibras guarda no `localStorage` (`@vlibras-widget`) se o painel ficou aberto; reabrir a página
  com ele aberto não é bug do app.

- Os dois recursos externos (tiles e VLibras) exigem internet; offline, o mapa fica sem fundo e o
  botão de Libras não aparece.
- O primeiro carregamento do avatar VLibras é lento (dezenas de segundos em rede lenta).
