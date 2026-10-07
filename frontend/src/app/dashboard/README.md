# Tela: Dashboard de monitoramento

**Responsável:** _nome aqui_ · **Rota:** `/dashboard` · **Especificação:** [docs/telas.md](../../../../docs/telas.md#1-dashboard-de-monitoramento)

## Arquivos desta tela (só você mexe)

```
dashboard/
  page.tsx                    entrada da rota (não precisa mexer)
  _components/DashboardView.tsx   a tela em si
  _components/...             crie aqui os componentes que quiser (gráficos, cartões)
```

## Dados (de `@/lib/dados`)

- `posicoesAtuais()` · status, função e trecho de cada pessoa agora
- `listarAlertas(true)` · alertas ativos
- `listarPessoas()`, `listarDispositivos()` · totais, sem vínculo, bateria
- `listarTrechos()` · nomes e área de risco

## Já feito

Cartões de resumo, pessoas por status, alertas ativos e ocupação por trecho (em lista).

## A fazer

- [ ] Ajustar ao mockup
- [ ] Gráfico de ocupação por trecho (barras ou mapa de calor)
- [ ] Pessoas por função (maquinista × manobrista)
- [ ] Atualização automática a cada 5 s
- [ ] "Livres mais próximos" de um trecho escolhido
- [ ] Bloco de saúde dos dispositivos (sem sinal, bateria baixa, sem vínculo)
