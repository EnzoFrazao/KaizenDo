# Tela: Histórico

**Responsável:** _nome aqui_ · **Rota:** `/historico` · **Especificação:** [docs/telas.md](../../../../docs/telas.md#3-histórico)

## Arquivos desta tela (só você mexe)

```
historico/
  page.tsx                     entrada da rota (não precisa mexer)
  _components/HistoricoView.tsx   filtros + tabela
```

## Dados (de `@/lib/dados`)

- `historico(filtros)` · leituras filtradas, mais recentes primeiro. Filtros: `nome`, `turno`, `funcao`, `status`, `trecho`, `dia` (tipo `FiltrosHistorico` em `@/lib/tipos`)
- `listarTrechos()` · opções do filtro de trecho

Os dados fictícios cobrem o dia **2026-10-07**, das 06h às 22h, uma leitura a cada 10 min por pessoa, **em ordem cronológica**. (Antes eram gerados pessoa por pessoa e nunca ordenados, então a tabela mostrava uma pessoa de cada vez em vez do turno acontecendo.)

## Já feito

- Todos os filtros acima
- **Reprodução do dia:** as leituras entrando em lote, como chegariam do receptor, com pausar e reiniciar. Cada passo avança um horário inteiro (os dados têm uma leitura por pessoa a cada 10 min, então andar de uma em uma deixaria o relógio parado por ~50 passos). A leitura mais nova fica destacada e as anteriores desbotam
- Gráfico de leituras por hora
- Barra de tempo em cada status, com percentual
- Tabela com paginação de 50 em 50

A reprodução é **reprodução mesmo**, não tempo real: os dados são de um dia fechado. O rótulo na tela diz isso.

## A fazer

- [ ] Ajustar ao mockup
- [ ] Filtro por faixa de horário
- [ ] Ordenar clicando no cabeçalho
- [ ] Exportar CSV
- [ ] Resumo do dia de uma pessoa (tempo em cada status) e percurso num mini-mapa
