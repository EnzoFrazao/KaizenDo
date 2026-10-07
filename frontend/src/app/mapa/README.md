# Tela: Mapa ao vivo

**Responsável:** _nome aqui_ · **Rota:** `/mapa` · **Especificação:** [docs/telas.md](../../../../docs/telas.md#2-mapa-ao-vivo)

## Arquivos desta tela (só você mexe)

```
mapa/
  page.tsx                  entrada da rota (não precisa mexer)
  _components/MapaView.tsx  filtros, legenda e atualização periódica
  _components/MapaLeaflet.tsx  o mapa (Leaflet), carregado só no navegador
```

O Leaflet não roda no servidor; por isso `MapaView` importa `MapaLeaflet` com `dynamic(..., { ssr: false })`. Mantenha assim.

## Por que Leaflet puro, e não react-leaflet

O `react-leaflet` foi **removido do projeto**. O `MapContainer` dele cria o mapa num callback de `ref`, e não num efeito, então com o duplo-mount do StrictMode (React 19) o mesmo `<div>` era reaproveitado por uma segunda instância. Daí os três erros:

- `Map container is being reused by another instance`
- `Cannot read properties of null (reading '_targets')`
- `Cannot read properties of undefined (reading 'appendChild')` no `TileLayer`

Agora o mapa é criado dentro de um `useEffect` e o cleanup chama `map.remove()`, devolvendo o `<div>` limpo antes da remontagem. **Não volte a usar `MapContainer`.**

Dois efeitos: um cria e destrói o mapa (roda uma vez), outro redesenha a camada de pessoas quando `posicoes` muda.

## Tiles

`tile.openstreetmap.org`, coloridos de propósito — a cor do terreno e da água ajuda a situar quem olha, e o resto da interface é escuro. Os basemaps escuros prontos (CARTO, Stadia) passaram a exigir chave de API; se um dia precisar de mapa escuro, prefira escurecer por CSS em `.leaflet-tile-pane` a depender de chave.

## Dados (de `@/lib/dados`)

- `posicoesAtuais()` · um ponto por pessoa (lat, lon, status, velocidade, bateria)
- `listarTrechos()` · centro de cada trecho e se é área de risco
- `listarAlertas(true)` · para destacar quem está em alerta

## Já feito

Mapa OpenStreetMap, círculos dos trechos (viradores em vermelho), pontos coloridos por status, popup com detalhes, filtros de nome, função, status, turno e trecho, legenda, selo "ao vivo" com hora da última leitura, enquadramento automático no pátio (`fitBounds`) e atualização a cada 5 s.

## A fazer

- [ ] Ajustar ao mockup
- [ ] Destacar pessoas com alerta ativo (piscar ou ícone)
- [ ] Rastro dos últimos minutos ao clicar numa pessoa (usar `historico({ nome, dia })`)
- [ ] Imagem do mapa oficial do TFPM como camada (`docs/slides/09-mapa-tfpm-a.png`)
- [ ] Polígonos de verdade dos trechos, no lugar dos círculos

## Coordenadas

Os centros dos trechos em `dados-mock.ts` vêm de **pontos levantados pela equipe**: os viradores, o PIAL (Posto de Inspeção e Abastecimento de Locomotivas), o centro da pera e cinco vértices do anel. Os outros cinco trechos são o ponto médio entre vizinhos, para os 12 ficarem espaçados ao redor do laço.

A pera cobre cerca de **1,2 x 1,9 km** e os trechos vizinhos ficam a ~200 m. Por isso os círculos têm raio de 90 m e a posição dentro do trecho é sorteada em ~50 m: dispersão maior misturaria um trecho com o outro.

Continua sendo aproximação — o polígono de cada trecho só sai com a planta oficial da Vale.

> Houve duas versões erradas antes desta: coordenadas inventadas (as pessoas apareciam **no mar**) e depois um corredor tirado do OpenStreetMap, longo demais e deslocado. Se precisar mexer, parta dos pontos levantados, não de estimativa.
