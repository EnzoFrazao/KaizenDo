---
id: 0002
titulo: Tema claro como padrão de quem visita
status: aceito
data: 2026-10-08
---

# Tema claro como padrão de quem visita

## Contexto

Com a [ADR 0001](0001-tema-claro-por-variante.md), o tema claro entrou como variante opcional e o
escuro continuou sendo o padrão: o script do `<head>` só ligava o claro se `guara.tema` fosse
`"claro"`. O time decidiu que o link publicado deve abrir no claro, em qualquer aparelho, e não só
no celular.

## Decisão

- O servidor manda `<html data-tema="claro">` e `themeColor` `#f3f4f5`. O claro vale até sem
  JavaScript, e o `getServerSnapshot` do `BotaoTema` (`"claro"`) bate com o HTML.
- O script inline (primeiro filho do `<body>`; no `<head>` ele quebrava a hidratação no Netlify,
  ver `system.md`) só age quando `guara.tema === "escuro"`: tira o atributo e troca a
  meta `theme-color` para `#09090b` antes da primeira pintura.
- O botão grava sempre a escolha explícita (`"claro"` ou `"escuro"`).

## Porquê

- Pôr o atributo no servidor, em vez de deixar o script ligá-lo, evita que a primeira visita pinte
  escuro e pisque para o claro, e mantém o HTML coerente com o padrão.
- A ADR 0001 continua valendo: o escuro segue sendo a **base do CSS** (sem atributo) e imutável. Muda
  só qual tema o visitante recebe sem ter escolhido.

## Consequências

- Quem visita pela primeira vez, ou nunca usou o botão, passa a ver o claro, incluindo quem usava o
  escuro sem nunca ter clicado. No CCO, cada navegador precisa trocar uma vez; a escolha persiste.
- Quem escolheu o escuro antes desta mudança continua no escuro, porque o botão já gravava `"escuro"`.
- O Next insere uma segunda meta `theme-color` depois de hidratar, que fica com a cor do claro. Não
  afeta a barra do celular, porque o navegador usa a primeira; o botão atualiza todas.
