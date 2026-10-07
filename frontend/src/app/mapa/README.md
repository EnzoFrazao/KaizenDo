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

## Dados (de `@/lib/dados`)

- `posicoesAtuais()` · um ponto por pessoa (lat, lon, status, velocidade, bateria)
- `listarTrechos()` · centro de cada trecho e se é área de risco
- `listarAlertas(true)` · para destacar quem está em alerta

## Já feito

Mapa OpenStreetMap, círculos dos trechos (viradores em vermelho), pontos coloridos por status, popup com detalhes, filtros de nome, função e status, legenda, atualização a cada 5 s.

## A fazer

- [ ] Ajustar ao mockup
- [ ] Filtros de turno e trecho
- [ ] Destacar pessoas com alerta ativo (piscar ou ícone)
- [ ] Rastro dos últimos minutos ao clicar numa pessoa (usar `historico({ nome, dia })`)
- [ ] Imagem do mapa oficial do TFPM como camada (`docs/slides/09-mapa-tfpm-a.png`)

Obs.: as coordenadas dos dados fictícios são inventadas. São só ilustrativas.
