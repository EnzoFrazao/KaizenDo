---
id: 0001
titulo: Tema claro como variante aditiva, com o escuro imutável
status: aceito
data: 2026-10-08
---

# Tema claro como variante aditiva, com o escuro imutável

## Contexto

O protótipo nasceu com tema escuro único. Pediu-se um segundo tema, claro, repaginado com as
cores oficiais da Vale, com duas restrições duras:

1. **o tema escuro não pode mudar em nada**;
2. **o mapa não muda de cor em nenhum dos temas** (tiles, pontos de status, círculos dos trechos
   e área de cobertura).

As ~190 classes de cor estavam espalhadas por 15 componentes, em Tailwind (`bg-zinc-900`,
`text-zinc-400`…). Havia três caminhos:

- **A.** Trocar cada classe por um token semântico (`bg-superficie`) e redefinir o token por tema.
- **B.** Redefinir as próprias variáveis do zinc sob `[data-tema="claro"]`.
- **C.** Manter as classes atuais e **acrescentar** uma variante `claro:` ao lado de cada uma.

## Decisão

**Opção C.** `globals.css` declara `@custom-variant claro (&:where([data-tema="claro"] *))`, e cada
elemento ganha a classe do claro ao lado da que já tinha:

```
bg-zinc-900 claro:bg-papel
```

O atributo `data-tema="claro"` no `<html>` liga o tema; sem ele vale o escuro.

## Porquê

- **O escuro fica intocado por construção.** Nenhuma classe existente foi alterada, então não há
  como um ajuste do claro vazar para o escuro. Era a restrição número um, e esta opção a garante
  sem depender de revisão nem de teste.
- A opção B foi descartada porque o mesmo tom carrega papéis opostos: `bg-zinc-100` é a pílula
  ativa (clara sobre escuro) e `text-zinc-100` é o texto forte. Inverter a escala acertaria um e
  quebraria o outro.
- A opção A dava o código mais limpo, mas reescrevia as ~190 classes do escuro — justamente o que
  não podia ser tocado.

## Consequências

- O custo é verbosidade: cada elemento colorido carrega duas classes.
- **Classe nova de cor exige o par `claro:`.** Sem ele o elemento fica com a cor do escuro no tema
  claro. Não há lint que pegue isso; a conferência é a auditoria de contraste do `testing.md`.
- `COR_STATUS_MAPA` (pontos do mapa, rosca e barras) **não tem variante**: é a mesma nos dois
  temas, por decisão do time. Por tabela, a matiz dos badges de status (`COR_STATUS`) também não
  muda — só a luminosidade do texto —, senão a legenda do mapa deixaria de bater com o ponto.
- O Cinza Vale oficial (#747678) dá 4,54:1 sobre branco puro, ou seja reprova em AA assim que o
  fundo ganha qualquer tom. O texto do tema claro usa Grafite (#242424), um meio-termo (#45494f) e
  Ardósia (#5f646c); o Cinza Vale fica para elementos não textuais.
