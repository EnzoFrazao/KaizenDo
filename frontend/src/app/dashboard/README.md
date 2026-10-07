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

- Cartões de resumo (dispositivo ativo, alertas, sem sinal, bateria baixa)
- **Trabalhando agora:** tabela de quem está em campo, com busca por nome ou matrícula, filtro por função e os status como botões-filtro com contagem. "Em campo" exclui quem está sem sinal, porque não dá para acionar quem o sistema não enxerga
- Pessoas por status, com barra proporcional
- Pessoas por função, com quantos estão livres para acionar em cada uma
- Alertas ativos com nome da pessoa, nome do trecho e hora de início; os de segurança piscam
- Ocupação por trecho em barras
- Atualização automática a cada 5 s, com selo "ao vivo"

## A fazer

- [ ] Ajustar ao mockup
- [ ] "Livres mais próximos" de um trecho escolhido (o "acionar o mais próximo" do desafio)
- [ ] Bloco de saúde dos dispositivos (sem sinal, bateria baixa, sem vínculo)
- [ ] Clicar numa pessoa da tabela e abrir ela no mapa
