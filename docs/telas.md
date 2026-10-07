# GUARÁ · Especificação das telas

São 4 telas, uma por membro da equipe. O protótipo é **só visual, com dados ilustrativos**. Todas já existem em [`frontend/`](../frontend/) com uma versão inicial, para ninguém começar do zero. Cada pessoa evolui a sua a partir do mockup (quando houver) e desta especificação.

| Tela | Rota | Pasta | Responsável |
|---|---|---|---|
| Dashboard de monitoramento | `/dashboard` | [`frontend/src/app/dashboard/`](../frontend/src/app/dashboard/) | _a definir_ |
| Mapa ao vivo | `/mapa` | [`frontend/src/app/mapa/`](../frontend/src/app/mapa/) | _a definir_ |
| Histórico | `/historico` | [`frontend/src/app/historico/`](../frontend/src/app/historico/) | _a definir_ |
| Cadastro (pessoa ↔ ESP32) | `/cadastro` | [`frontend/src/app/cadastro/`](../frontend/src/app/cadastro/) | Luick Vieira |

Cada pasta tem um `README.md` com o que a tela precisa ter, as funções de dados a usar e o que falta fazer. Como trabalhar em equipe está em [`frontend/README.md`](../frontend/README.md).

## Quem usa

Quem coordena o turno no pátio (ou no CCO), olhando um monitor ou tablet. Precisa responder rápido: **onde está cada um, quem está livre perto de onde preciso, e tem alguém em risco?**

**O operário não é usuário do sistema.** Ele entra como *dado*, pela tag ESP32 que carrega, e nunca abre nenhuma tela. Por isso as 4 telas são todas do ponto de vista de quem coordena, e **não existe tela de login** no protótipo: quem avalia abre a URL e o sistema já está funcionando. O papel de administrador aparece como um usuário fixo no rodapé da barra lateral (`adminAtual()`), sem senha e sem sessão. O porquê da decisão está no [README da tela de Cadastro](../frontend/src/app/cadastro/README.md#por-que-não-tem-login).

## 1. Dashboard de monitoramento

Visão do turno em uma tela, sem precisar abrir o mapa.

**Pontos importantes (proposta):**

| Bloco | O que mostra | Por que importa |
|---|---|---|
| Cartões de resumo | pessoas com dispositivo ativo, alertas ativos, sem sinal, bateria < 20% | Saber em 2 segundos se está tudo bem |
| Pessoas por status | livre, em atividade, deslocando, pausa, sem sinal | Quantos estão disponíveis para acionar |
| Pessoas por função | maquinistas e manobristas em campo | São equipes diferentes |
| Alertas ativos | lista com tipo, pessoa, trecho e há quanto tempo | Segurança primeiro: área de risco e pessoa isolada no topo |
| Ocupação por trecho | quantas pessoas em cada trecho (X01, X02, Viradores…) | Ver trechos descobertos e trechos lotados |
| Trabalhando agora | tabela de quem está em campo, com busca e com os status como botões-filtro | É a pergunta direta de quem coordena: quem está aí e o que cada um está fazendo |
| Livres mais próximos | (evolução) para um trecho escolhido, quem está livre e mais perto | É o "acionar o mais próximo" do desafio |
| Saúde dos dispositivos | (evolução) sem sinal, bateria baixa, sem vínculo | Manutenção dos ESP32 |

Atualiza sozinho a cada 5 s, com selo "ao vivo" mostrando a hora da última leitura.

"Em campo" exclui quem está **sem sinal**: não dá para acionar quem o sistema não enxerga.

## 2. Mapa ao vivo

Mapa do pátio com cada pessoa como um ponto colorido pelo status.

- **Filtros:** busca por nome, função, status, turno e trecho.
- **Ponto:** cor = status; tamanho ou ícone = função (maquinista maior).
- **Ao clicar:** nome, matrícula, função, status, trecho, velocidade, bateria e horário da última leitura.
- **Trechos:** desenhados no mapa; área de risco (viradores) em vermelho.
- **Legenda** de cores e contador "N pessoas no mapa".
- **Atualização:** a cada 5 s.
- **Enquadramento:** o mapa se ajusta sozinho ao pátio (`fitBounds` nos trechos).
- **Coordenadas:** os centros dos trechos são pontos reais da malha da Estrada de Ferro Carajás, tirados do OpenStreetMap. Os tiles ficam coloridos; o resto da interface é escuro.
- Evolução: rastro dos últimos minutos ao clicar numa pessoa; imagem do mapa oficial do TFPM como camada; polígonos reais no lugar dos círculos.

## 3. Histórico

Consulta do que aconteceu, para análise e para o pitch (tempos de deslocamento, ociosidade).

- **Filtros:** nome, turno, função, status de trabalho, trecho e dia (e, como evolução, faixa de horário).
- **Reprodução do dia:** as leituras entrando em lote, no ritmo em que chegariam do receptor, com pausar e reiniciar. A mais nova fica destacada e as anteriores desbotam. É **reprodução**, não tempo real — os dados são de um dia fechado, e a tela diz isso.
- **Leituras por hora** e **tempo em cada status**, em gráfico.
- **Tabela:** horário, pessoa, função, turno, trecho, status, velocidade.
- **Paginação** (50 por página), em ordem cronológica.
- Evolução: exportar CSV; ver o percurso de uma pessoa no dia num mini-mapa.

## 4. Cadastro

Vincular cada pessoa ao ESP32 que ela carrega. Sem isso o sistema não sabe de quem é cada ponto.

- **Cadastro em wizard de 4 passos:** pessoa → função e turno → dispositivo → conferir. Não avança com passo inválido.
- **Lista de pessoas** com matrícula, função, turno e o dispositivo vinculado, com busca e filtro por função e turno.
- **Vincular / trocar / desvincular** o ESP32 de uma pessoa (um dispositivo só pode estar com uma pessoa).
- **Dispositivos livres** visíveis, com bateria e último sinal.
- **Nova pessoa** (nome, matrícula, função, turno, ESP32 opcional) e **novo dispositivo** (id da etiqueta e MAC).
- **Validações** ficam em `lib/dados.ts`, não na tela: matrícula de 6 dígitos sem repetir, id no formato `ESP32-XXXX`, MAC válido e vínculo 1 para 1.
- **Persistência:** o cadastro é guardado no `localStorage` para sobreviver ao F5 na demonstração. Continua tudo no front, sem servidor. O botão "Restaurar dados originais" volta ao estado de `dados-mock.ts` — use antes de apresentar.
- Evolução: ler o id do ESP32 por QR code na etiqueta; histórico de trocas.

## Convenções visuais (valem para todas as telas)

**Tema escuro único**, sem alternância: o painel fica num CCO, muitas vezes em sala de pouca luz. A exceção é o mapa, cujos tiles ficam coloridos — a cor do terreno e da água ajuda a situar quem olha.

| Status | Cor | Paleta Tailwind |
|---|---|---|
| Livre | verde | `emerald` |
| Em atividade | azul | `sky` |
| Deslocando | âmbar | `amber` |
| Em pausa | cinza | `zinc` |
| Sem sinal | vermelho | `red` |

- Cores e rótulos ficam em [`frontend/src/lib/rotulos.ts`](../frontend/src/lib/rotulos.ts). **Não repita cores na página**, importe de lá.
- Campos e botões são `.campo`, `.botao` e `.botao-secundario`, definidos em `globals.css`.
- Superfícies: fundo `zinc-950`, cartões `zinc-900`, bordas `zinc-800`, texto `zinc-100` e `zinc-400`.
- Componentes comuns em `frontend/src/components/`: `PageHeader`, `Card`, `StatusBadge`, `Sidebar`, `AoVivo`.
- Textos em português; horários no formato 24 h; ids técnicos (P001, ESP32-0A1B) em fonte monoespaçada.

## Sobre o mockup

O repositório **não tem mockup**. As telas iniciais seguem esta especificação. Se houver um mockup (Figma, imagem, papel), coloque em `docs/mockups/` com o nome da tela (ex.: `docs/mockups/dashboard.png`) e linke aqui.
