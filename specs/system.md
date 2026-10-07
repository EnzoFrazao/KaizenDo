# Sistema implementado

**Última verificação:** 2026-10-07
**Referência:** `working-tree` (sobre `132c2cd`)

## Finalidade e unidade executável

Protótipo web **só visual** do GUARÁ (posicionamento de maquinistas e manobristas no TFPM). A única
unidade executável é o app Next.js em `frontend/`.

## Stack e entrypoints

- Next.js 16 (App Router, Turbopack, `cacheComponents`), React 19, TypeScript, Tailwind 4, Leaflet;
- `frontend/src/app/layout.tsx`: layout raiz (barra lateral, tema escuro, widget VLibras);
- `frontend/src/app/{dashboard,mapa,historico,cadastro}/page.tsx`: as quatro telas;
- `frontend/src/lib/dados.ts`: única porta de dados das telas (hoje lê `dados-mock.ts`).

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

- Netlify, site `guaramonitoramento` (`https://guaramonitoramento.netlify.app`), a partir da `main`.
- Painel: base directory `frontend`; o resto vem de `frontend/netlify.toml` (`npm run build`,
  publish `.next`, plugin `@netlify/plugin-nextjs`).
- O plugin é declarado explicitamente porque o Netlify não detectou o Next.js ("Runtime: Not set")
  e publicou o `.next` como estático: toda rota dava 404 e `/server/app/index.html` respondia 200.

## Restrições e lacunas

- Os dois recursos externos (tiles e VLibras) exigem internet; offline, o mapa fica sem fundo e o
  botão de Libras não aparece.
- O primeiro carregamento do avatar VLibras é lento (dezenas de segundos em rede lenta).
