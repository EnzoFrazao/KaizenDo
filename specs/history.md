# Marcos do projeto

## 2026-10-08 — tema claro com as cores da Vale

- Botão de alternar tema na barra lateral e no topo do celular; escolha guardada no `localStorage`
  e aplicada antes da primeira pintura.
- Tema claro repaginado com a paleta oficial (Verde, Vermelho e Amarelo Vale, Grafite e Ardósia);
  o escuro ficou intocado e o mapa não muda de cor em nenhum dos dois.
- Primeiro ADR: [0001 — tema claro como variante aditiva](decisions/0001-tema-claro-por-variante.md).
- Cadastro: ESP32 avulso pelo estoque (além do wizard), colunas de bateria e ações justas ao
  conteúdo e número do centro da rosca legível no tema claro.

## 2026-10-07 — site novo no Netlify e auditoria

- Conta do Netlify trocada; `netlify.toml` movido para a raiz (`base = "frontend"`) e selo do
  Netlify afastado das abas do celular.
- Auditoria do site publicado: mapa e dashboard passaram a seguir o vínculo ESP32 do cadastro;
  alertas sobem no dashboard do celular; filtros em uma coluna; prévia de link (Open Graph) e
  ícone de tela inicial do iPhone.

## 2026-10-07 — novos status, restaurante e layout de celular

- Status trocados para manobrando, almoçando, aguardando programação, descansando e sem sinal.
- Restaurante do Porto Vale no mapa, como local fora do pátio, com três pessoas.
- Pontos do mapa sem sobreposição e com lat/lon no popup; todas as telas adaptadas ao celular.

## 2026-10-07 — cobertura no mapa ao vivo

- Área de cobertura fundida ("gosma" azul) com raio calculado pela árvore geradora mínima.
- Coordenadas dos trechos conferidas contra o diagrama oficial; divergências registradas em
  `open-decisions.md`, sem correção.

## 2026-10-07 — memória técnica inicial e acessibilidade em Libras

- `specs/` criado a partir do código em `132c2cd`; `docs/` continua como fonte do contexto e das telas.
- Widget VLibras adicionado ao layout raiz, valendo para todas as telas.
- Git continua responsável pelo histórico granular.

## 2026-10-07 — versão para celular (QR code)

- Barra inferior de abas e topo compacto abaixo de 1024 px; tabelas viram cartões abaixo de 768 px;
  filtros recolhíveis; alvos de toque e campos de 16 px.
