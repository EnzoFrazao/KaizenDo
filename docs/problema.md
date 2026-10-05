# KaizenDO · O problema

> Documento de contexto do desafio. Explica o problema, reúne todos os dados que temos e lista as perguntas que ainda precisam de resposta. A solução está em [solucao.md](solucao.md) e depende do que for descoberto aqui.

**Fontes:** 8 fotos de slides e 2 fotos do mapa oficial ([slides/](slides/)), as anotações e a conversa da visita de campo de 05/10 (seção 5), e a transcrição automática do áudio da apresentação. A transcrição tem muitos erros de reconhecimento. Cada dado abaixo indica de onde veio: **[slide NN]** quando foi lido no slide, **[áudio]** quando veio da transcrição, e **[inferido]** quando foi reconstruído a partir de uma transcrição truncada.

---

## 1. Resumo em três frases

1. No Terminal Ferroviário de Ponta da Madeira, em São Luís, cerca de **50 operadores por turno** trabalham espalhados em **13 km de pátio**, e hoje **ninguém sabe com precisão onde cada um está** [slide 08].
2. Por isso, quando um trem ou lote de vagões precisa de alguém numa frente de trabalho, a escolha de quem mandar e a estimativa de quando ele chega dependem da **experiência de quem coordena**, e o **revezamento é montado por estimativa** [slide 06].
3. Cada minuto que o vagão espera um operador chegar é **equipamento parado**, o que aumenta o **tempo de permanência dos vagões no terminal**, que é o indicador que a Vale quer melhorar [slides 03 e 08].

---

## 2. O programa KaizenDO

- **O que é:** programa da Vale que conecta a empresa a um ecossistema externo (universitários, SESI) para desenvolver pessoas resolvendo problemas reais [slide 04].
- **Práticas associadas:** Prática 9 (promover melhoria contínua e inovação) e Prática 4 (capacitar e desenvolver pessoas). Possibilidade declarada: atrair talentos para contratação [slide 04].
- **Norte do programa:** "selecionar desafios que mobilizem o talento multidisciplinar para criar soluções inovadoras e de alto impacto" [slide 03].
- **Formato:** desafio apresentado pela Vale e resolvido em **uma semana**.
- **Cultura Vale citada:** os valores incluem "a vida em primeiro lugar" e "orientação a resultado"; os comportamentos incluem "obsessão por segurança e gestão de riscos" e "entregamos resultados superiores com planejamento e disciplina" [slide 05]. Isso é útil para o pitch.

---

## 3. Onde acontece: o Terminal Ferroviário de Ponta da Madeira (TFPM)

### 3.1 Números do terminal

| Dado | Valor | Fonte |
|---|---|---|
| Posição | "O maior terminal ferroviário das Américas"; principal ponto de atendimento ao cliente, integra mina, ferrovia e porto | slide 02 |
| Volume movimentado | 166 a 191 milhões de toneladas por ano (2019–2024) | slide 02 |
| Recorde citado | cerca de 200 Mt em 2018 | áudio |
| Participação nas exportações | cerca de 13% das exportações nacionais | slide 02 |
| Profundidade natural | até 26 m na Baía de São Marcos | slide 02 |
| Viradores de vagões | 8, cada um descarrega 8 mil t/h | slide 02 |
| Capacidade estática de estoque | 6 a 9 milhões de toneladas | slide 02 |
| Linhas ferroviárias | 270 km, com 400 AMVs | slide 02 |
| Instalações no complexo | PIAL, CTR e CMR (ver glossário) | slide 02 |
| Origem do minério | Complexo de Carajás (PA), cerca de 1.000 km pela Estrada de Ferro Carajás (EFC) | áudio |

### 3.2 Como o trem passa pelo terminal

Descrição do áudio, na ordem do processo:

1. **Chegada:** o trem chega carregado com **336 vagões** [áudio].
2. **Desmembramento:** é dividido em **3 lotes de 112 vagões** [áudio].
3. **Posicionamento e descarga:** cada lote é posicionado e passa por um **virador**, que vira o vagão e despeja o minério. O minério vai para os pátios de estocagem e depois é embarcado nos navios [áudio].
4. **Pós-descarga:** ao sair do virador, o lote passa por vários pontos de decisão (inspeção, manutenção de vagões, troca de rodeiros; a locomotiva vai para inspeção e abastecimento) [áudio].
5. **Recomposição:** os lotes liberados são **reunidos de novo em um trem vazio de 336 vagões** (3 lotes), que volta para Carajás [áudio].

Outros dados da operação:
- Em média há **15 composições** no pátio, com **3 lotes cada** [áudio].
- Cada trecho desse circuito é chamado de **nó** [áudio].
- A malha é **sinalizada**: as linhas têm circuito de via, então o sistema sabe quando um trecho está ocupado (contato roda-trilho), mas isso não diz quem está ali [áudio].
- A operação foi comparada a uma **linha de produção**: o trem passa por uma sequência de processos, e há pessoas espalhadas ao longo de todo o caminho [áudio].

### 3.3 Os pátios e as frentes de trabalho

O terminal é dividido em **pátios**, e cada pátio tem **sua própria frente de trabalho**, com atividades distintas. **Os operadores se revezam entre essas frentes ao longo do turno** [slide 07].

Siglas legíveis no diagrama da malha [slide 07]:

| Linha superior | Linha inferior | Pontos marcados com ícone |
|---|---|---|
| VC, VV, RV, RC, RB, RA | CA, FC, FB, FA, PI, MR | R3, RP, RR |

O significado das siglas **não foi explicado**. Há palpites como PI = PIAL e MR = CMR, mas são [inferido] e precisam ser confirmados (ver P3.2).

O áudio também cita que **existem outros pátios** além do TFPM, então a solução deve poder ser replicada em outros lugares [áudio].

---

## 4. O desafio oficial

### 4.1 A ficha "Mapeamento de oportunidades" [slide 03]

| Campo | Conteúdo |
|---|---|
| Título | **Posicionamento Operacional Inteligente** |
| Situação atual | Não se conhece a localização das equipes de manobra dentro do pátio ferroviário |
| Indicador impactado | **Tempo de permanência dos vagões no Terminal Ferroviário Ponta da Madeira** |
| Consequências | Tempos dos vagões aumentam por espera de deslocamento de equipes |
| Pilar estratégico | **Produção** (outros pilares possíveis: Pessoas, Segurança, Custos, Sustentabilidade) |
| Impacto esperado | **Médio** |
| Benefícios esperados | Redução dos tempos de espera por deslocamento; redução de impactos no revezamento e nas trocas de turno |
| Escopo | Terminal Ferroviário de Ponta da Madeira |
| **Restrição** | **Deve-se utilizar dados de localização de rádio portátil** |
| O que já foi tentado | Nenhuma tentativa anterior |
| Nível de complexidade | **Alto** |
| Viabilidade de execução em 1 semana | **Baixa** |
| Documentos disponíveis | Somente "Outros: envolve utilização de dados de rádio portátil" (relatórios, fotos e dados não marcados) |
| Gerência geral | GG Operações EFC |
| Gerência de área | GA COI EFC |

**Time do projeto:**
- Sponsor: Lizandro Terceiro
- Especialistas do tema: Fernando Nunes, Andressa Chaves-Tharjes Lima, Rogerio Pereira
- Especialista em melhoria contínua: Fernando Nunes
- Estagiário: Itaio Conceição
- SESI: Maria Alice
- Universitários: Enzo Frazão, Grazielli Diniz, Luick Vieira

### 4.2 A cadeia do problema [slide 08]

O slide "Do deslocamento imprevisível ao tempo de parada" mostra o problema como 4 elos, em que **cada elo depende do anterior** e o erro se acumula até a frente de trabalho:

```
1. Posição desconhecida      →  2. Deslocamento imprevisível  →  3. Revezamento no escuro          →  4. Parada se estende
   50 operadores por turno       não se sabe quanto tempo         troca de turno e pausas              cada minuto de espera por
   em 13 km, localizados         cada equipe leva até a           planejadas por estimativa            um operador é tempo de
   por rádio                     próxima frente                                                        equipamento parado
```

Conclusão do slide: **"Com localização em tempo real, aciona-se o operador mais próximo, o tempo de chegada deixa de ser estimativa e o revezamento passa a ser planejado com dados."**

### 4.3 Hoje × expectativa [slide 06]

| Hoje: "Não há insight de deslocamento" | Expectativa: "Solução que não depende de insight manual" |
|---|---|
| A posição vem do rádio | Posição dos operadores **capturada automaticamente** |
| O tempo de chegada vem da experiência de quem coordena | **Tempo de deslocamento calculado a partir dos dados** |
| O revezamento é montado por estimativa | O mesmo resultado **independe de quem está no turno** |
| Não há registro que permita medir ou melhorar | (implícito) passa a haver histórico para medir e melhorar |

**Em uma frase, nas palavras da Vale:** *"queremos planejar o revezamento e acionar o operador mais próximo com base em dados de posição e tempo, não na leitura manual de cada técnico."* [slide 06]

### 4.4 O que fica fora do escopo

Na apresentação foi citado um segundo desafio: prever **onde cada lote de vagões e locomotiva estará** em horizontes de 2 a 24 horas (slide 01 e primeira parte do áudio). **Ele não faz parte deste trabalho.** O foco é apenas o posicionamento das pessoas.

---

## 5. Descobertas da visita de campo (05/10)

Fontes: anotações do Enzo na planta, conversa com um especialista em rádio e localização (transcrição automática, com muitos erros) e fotos do mapa oficial do terminal ([slides/09-mapa-tfpm-a.png](slides/09-mapa-tfpm-a.png) e [10](slides/10-mapa-tfpm-b.png)). Os dados desta seção vêm marcados como **[campo]**.

### 5.1 Volume e geometria

| Dado | Valor | Observação |
|---|---|---|
| Trens por dia | **20** | [campo] |
| Lotes por dia | **60** (3 por trem) | O Enzo anotou "3 lotes por hora"; a conta de 60 em 24 h dá 2,5 por hora |
| Vagões por trem | **336** | Confirma o número do áudio |
| Comprimento de um vagão de minério | **~10 m** | Logo um lote (112 vagões) tem ~1,1 km e um trem inteiro ~3,4 km |
| Percurso da "pera" (o laço completo do circuito) | **13 km** | Confirma o "13 km" do slide 08 |
| Trechos entre os "X" do mapa | **~1,5 km** cada | No mapa aparecem X01, X02, X03, X05 (provável), X06 e X07, entre o Pátio de Recepção, a Formação e os Estacionamentos |
| Extensão do pátio em linha reta | **8 a 10 km**, talvez 15 | Estimativa falada na conversa, sem certeza |

O mapa oficial divide o terminal em **Circuito Minério** (verde), **Circuito Carga Geral** (laranja), **Circuito Manutenção** (preto) e linhas não operacionais. Também mostra passagens de nível, cancelas eletrônicas, sinaleiros, o Pátio dos Viradores, o Pátio de Recepção, a Formação, os Estacionamentos, o CTMR e a oficina central.

### 5.2 Quem são as pessoas

- **Duas funções**, e a solução precisa localizar as duas:
  - **Maquinista:** fica **na locomotiva**.
  - **Manobrista:** fica **no chão**, ao lado dos vagões.
- **As equipes não são fixas.** Elas se movem conforme os trens chegam.
- **Deslocamento:** existem **só 2 carros para 50 pessoas**, então **a maior parte do percurso é feita a pé**.
- **Ciclo do maquinista:** ele entrega a locomotiva no virador. Para não atrasar a classificação, essa locomotiva vai para a oficina, e o maquinista assume outra unidade já liberada e volta para pegar os vagões. Ou seja, **o maquinista troca de locomotiva no meio do ciclo**.
- **Há momentos em que uma pessoa fica sozinha** na operação, o que é um ponto de segurança.
- Ainda falta saber a **proporção entre manobristas e maquinistas** nos 50.

### 5.3 O rádio de voz NÃO tem localização útil

Esta é a descoberta mais importante, porque derruba a hipótese H1.

- O rádio portátil é usado **só para voz e avisos**.
- O rádio tem **ID do funcionário** e um **botão de pânico**. Não ficou claro se o pânico envia a posição; o especialista achava que envia só o ID.
- A comunicação passa por cerca de **90 a 190 bases (repetidoras)** espalhadas pela ferrovia. O CCO grava e monitora as chamadas e sabe **por qual base** a chamada passou, mas **não a posição exata**, porque cada base cobre uma área grande.
- O sistema de rádio tem **protocolos de segurança e funções bloqueadas pelo fabricante**. Extrair dados dele é difícil, e algumas funções exigem licença paga.
- **As locomotivas têm rádio, mas não têm GPS** pelo rádio. *(Mas veja abaixo o sistema de alerta de aproximação, que tem GPS e está em 74% da frota. As duas informações parecem conflitar; vale confirmar.)*

### 5.4 O que já existe e pode ser aproveitado

**Sistema de alerta de aproximação de trens** (o nome saiu na transcrição como "EAT", "EHT" ou "ET"; **confirmar o nome e a sigla**):
- **Unidade fixa** dentro da locomotiva e **unidade portátil**, parecida com um rádio, levada pelo líder da equipe.
- Usa **GPS + rádio**. Avisa o empregado quando um trem se aproxima a menos de ~1 km.
- Hoje é usado **na via (manutenção da ferrovia), não no pátio**. A unidade portátil é **uma por equipe**, não uma por pessoa.
- Custo citado: **~R$ 15 mil por unidade**. Para 50 pessoas, ~R$ 750 mil, "quase 1 milhão". Só há custo de manutenção depois da compra.
- Alcance do rádio dele: **~2 km de raio** (incerto).

**Engenharia reversa já feita por um engenheiro da Vale:**
- Com um **Raspberry Pi** e o **mesmo modelo de rádio** do sistema de alerta, ele montou um receptor que **só escuta** a comunicação e **extrai as coordenadas GPS das locomotivas**.
- Daí saiu um **supervisório** que mostra no mapa **onde cada locomotiva comunicou** no TFPM. Exemplo mostrado: a locomotiva 719 nos últimos 5 dias, dentro da oficina central.
- Ele também mede a **saúde do sistema**: **74% da frota** de locomotivas comunica; ~3% está de 15 a 30 dias sem comunicar e ~23% está há mais de 30 dias sem comunicar.
- Na opinião do especialista, **é mais fácil e mais barato trabalhar com esse sistema do que com o rádio de voz**.

**Tentativas antigas:**
- **SPOT:** um módulo GPS individual com supervisório (posição, mensagem de emergência, rota). Foi abandonado, provavelmente por ser caro.
- **Relógio inteligente** para sinais vitais: foi desenvolvido em outro projeto, mas não entrou em produção. Seria possível acoplar uma placa de GPS nele.

**Cuidado com frequência:** qualquer equipamento novo de transmissão precisa usar uma frequência que **não interfira** nas outras áreas, porque o pátio fica no meio de vários setores.

### 5.5 Ideias anotadas na visita

Ideias do Enzo, registradas para avaliação na solução:
- **Segmentar o pátio pelos trechos entre os "X"** (~1,5 km cada) ou por pontos fixos.
- **Dividir as equipes por seção fixa** ou **mapear pessoa por pessoa**.
- Mapear **o caminho** (por onde a pessoa vai e para onde) e **o percurso de trabalho**.
- **Segurança:**
  - sensor anticolisão;
  - ao chegar um trem, **travar os portões** para barrar a entrada de pessoas;
  - **sensor de presença**, no trem e nos funcionários (talvez no capacete), para o vagão não se aproximar da área de basculamento se houver alguém em área de risco.
- Ideia-síntese: **controlar o percurso dá previsibilidade, aumenta a produtividade e também a segurança.**

### 5.6 Situação das perguntas e hipóteses depois da visita

| Item | Situação |
|---|---|
| P1.1 / P1.2 (rádio tem GPS?) | **Respondida: não.** O rádio de voz só dá a base por onde a chamada passou |
| P1.7 (dá para extrair dados do rádio?) | **Difícil:** protocolos bloqueados pelo fabricante |
| P2.1 (funções) | **Respondida:** maquinista (na locomotiva) e manobrista (no chão). Falta a proporção |
| P2.3 (como se deslocam) | **Respondida:** quase tudo a pé; 2 carros para 50 pessoas |
| P2.8 (fixos por pátio?) | **Respondida: não.** Seguem a chegada dos trens |
| P3.1 (planta do pátio) | **Parcial:** temos foto do mapa oficial, mas não o arquivo georreferenciado |
| H1 (rádio tem GPS) | **Falsa** para o rádio de voz. Verdadeira para o sistema de alerta de aproximação |
| H3 (deslocamento não é em linha reta) | **Confirmada**, e é majoritariamente a pé |
| H4 (nem todos fazem tudo) | **Confirmada:** duas funções distintas |

### 5.7 Novas perguntas

| # | Pergunta | Por que importa |
|---|---|---|
| P6.1 ★ | Qual o nome exato e o fabricante do sistema de alerta de aproximação de trens? Qual modelo de rádio ele usa? | É a base técnica mais promissora |
| P6.2 ★ | Podemos ver o supervisório do Raspberry Pi e usar uma amostra das coordenadas das locomotivas? | Daria dados reais de posição dos maquinistas para o protótipo |
| P6.3 ★ | Quantos são maquinistas e quantos são manobristas por turno? | Define quantos dispositivos portáteis seriam necessários |
| P6.4 | Com que frequência o sistema de alerta envia a posição? | Define o quanto o mapa é "tempo real" |
| P6.5 | Quem pode autorizar o uso de uma nova frequência ou de um novo equipamento no pátio? | Risco de interferência e de aprovação |
| P6.6 | Como o maquinista registra hoje a troca de locomotiva? | Para saber em qual locomotiva cada maquinista está |
| P6.7 | Onde ficam e como funcionam os 2 carros? Quem decide quem usa? | O carro também é um recurso a alocar |
| P6.8 | O que acontece hoje quando alguém está sozinho e passa mal ou se acidenta? | Argumento de segurança para o pitch |
| P6.9 | Como o virador e o posicionador de vagões são comandados hoje (CLP, operador local, CCO)? Quais intertravamentos de segurança já existem na área de basculamento? | Define onde o bloqueio do módulo extra se conectaria |
| P6.10 | Quem precisa aprovar uma nova entrada de bloqueio no controle do virador? Há exigência de certificação de segurança? | Define o caminho do módulo extra até a produção |

## 6. Glossário

| Termo | Significado |
|---|---|
| **AMV** | Aparelho de Mudança de Via: o "desvio" que permite o trem passar de uma linha para outra |
| **Ativo rodante** | Locomotivas e vagões |
| **Composição / trem** | Conjunto de locomotivas e vagões; aqui, 336 vagões |
| **Lote** | Parte do trem (112 vagões) que é processada separadamente no terminal |
| **Virador de vagões** | Equipamento que gira o vagão para despejar o minério |
| **Manobra** | Movimentação de vagões e locomotivas dentro do pátio (separar, posicionar, recompor) |
| **Equipe de manobra / operador / técnico** | Pessoas que executam a manobra; locomotivas de manobra são **tripuladas** (têm alguém a bordo) |
| **Frente de trabalho** | Local onde uma atividade acontece; cada pátio tem a sua |
| **Revezamento** | Troca de quem está em cada frente: pausas, rendição e troca de turno |
| **Tempo de permanência** | Quanto tempo o vagão fica no terminal, da chegada à saída |
| **Circuito de via** | Sistema elétrico nos trilhos que detecta se um trecho está ocupado |
| **PIAL** | Posto de Inspeção e Abastecimento de Locomotivas |
| **CTR** | Complexo de Troca de Rodeiros (rodeiro = eixo com as duas rodas) |
| **CMR** | Complexo de Manutenção de Rodeiros |
| **EFC** | Estrada de Ferro Carajás |
| **COI** | Provável Centro de Operações Integradas [inferido], onde fica quem coordena |
| **GPS / localização de rádio** | Alguns rádios digitais enviam a posição do aparelho; o rádio de voz do TFPM **não** faz isso (ver 5.3) |
| **Maquinista** | Quem conduz a locomotiva; fica a bordo [campo] |
| **Manobrista** | Quem trabalha no chão, junto aos vagões, durante a manobra [campo] |
| **"X" (X01, X02…)** | Marcos do mapa que dividem o circuito em trechos de ~1,5 km [campo] |
| **Pera** | O laço completo do circuito ferroviário do terminal, com ~13 km [campo] |
| **CCO** | Centro de Controle Operacional, que monitora e grava as chamadas de rádio [campo] |
| **Base / repetidora de rádio** | Antena que retransmite o rádio; cobre uma área grande, por isso não dá posição exata [campo] |
| **Sistema de alerta de aproximação** | Equipamento GPS + rádio que avisa quando um trem se aproxima; nome a confirmar (EAT/EHT) [campo] |

---

## 7. O que ainda não sabemos: perguntas para os especialistas

Várias destas perguntas já foram respondidas na visita de campo (ver 5.6), e há perguntas novas em 5.7. Cada pergunta tem um código (P1.1, P1.2…) para ser citada na [solução](solucao.md), e explica **por que importa**. As marcadas com ★ são as mais urgentes, porque sem elas o protótipo não sai do lugar.

### P1. O rádio portátil (a fonte de dados obrigatória)

| # | Pergunta | Por que importa |
|---|---|---|
| P1.1 ★ | Qual o modelo do rádio e qual o sistema (DMR, TETRA, outro)? | Define se existe GPS e como os dados saem |
| P1.2 ★ | O rádio tem GPS ativo? A posição já aparece hoje em algum console para quem coordena? | O slide 06 diz que "a posição vem do rádio". Precisamos saber se isso significa coordenadas ou só "o operador falou onde está" |
| P1.3 ★ | De quanto em quanto tempo o rádio manda a posição? Só quando aperta o botão de falar, ou periodicamente? | Define se dá para ter "tempo real" e calcular deslocamento |
| P1.4 ★ | Existe histórico de posições salvo? Conseguimos uma amostra (ex.: um turno ou um dia)? | Sem histórico não há como aprender os tempos de deslocamento; teremos que simular |
| P1.5 | Qual a precisão observada da posição? Há locais sem sinal (sob estruturas metálicas, perto dos viradores)? | Define se dá para saber a linha exata ou só o pátio |
| P1.6 | Cada rádio é fixo de uma pessoa ou é compartilhado por turno/função? | Para saber "quem" está em cada posição |
| P1.7 | Existe API, exportação (CSV, banco) ou integração com o sistema de despacho do rádio? | Define como a solução recebe os dados |

### P2. As pessoas e o trabalho

| # | Pergunta | Por que importa |
|---|---|---|
| P2.1 ★ | Quais funções existem entre os 50 operadores (manobrador, maquinista de manobra, inspetor…)? Qualquer um pode ir para qualquer frente? | O "operador mais próximo" precisa ser também o **habilitado** para a tarefa |
| P2.2 ★ | Como um operador é acionado hoje? Quem aciona, por qual canal, e como se escolhe quem vai? | É o processo que a solução vai substituir |
| P2.3 | Como o operador se desloca entre frentes: a pé, de carro, de locomotiva? | Muda totalmente o cálculo de tempo de deslocamento |
| P2.4 | Existem caminhos ou pontos obrigatórios para atravessar as linhas? Há restrições de segurança no deslocamento? | Distância em linha reta não serve; o caminho real é outro |
| P2.5 ★ | Como funciona o turno: horários, duração, onde acontece a troca, como é feita a passagem de serviço? | Base para planejar o revezamento |
| P2.6 | Como funcionam as pausas (refeição, descanso)? São fixas ou negociadas na hora? | O revezamento precisa cobrir as frentes durante as pausas |
| P2.7 | O que é "a última etapa realizada" por um operador? Existe registro das tarefas feitas? | O áudio citou isso como informação desejada |
| P2.8 | Os 50 operadores por turno são distribuídos de forma fixa por pátio ou circulam livremente? | Define o tamanho do problema de alocação |

### P3. O pátio

| # | Pergunta | Por que importa |
|---|---|---|
| P3.1 ★ | Existe planta georreferenciada do pátio (KML, CAD, shapefile) ou pelo menos as coordenadas de cada pátio? | Necessário para ligar a coordenada do rádio a um pátio |
| P3.2 ★ | O que significa cada sigla (VC, VV, RV, RC, RB, RA, CA, FC, FB, FA, PI, MR, R3, RP, RR) e qual atividade acontece em cada uma? | Define as frentes de trabalho e o que cada uma exige |
| P3.3 | Quais frentes são mais críticas (onde a espera custa mais)? | Prioridade na alocação |
| P3.4 | Onde ficam os pontos de apoio (salas, refeitório, local de troca de turno)? | Pontos de partida e chegada frequentes |

### P4. Medição e linha de base

| # | Pergunta | Por que importa |
|---|---|---|
| P4.1 ★ | Qual o tempo médio de permanência dos vagões hoje? | É o indicador oficial do desafio |
| P4.2 ★ | Quanto desse tempo é espera por operador? Existe alguma estimativa ou registro de atrasos com causa "aguardando equipe"? | É o ganho máximo possível, e o número que fecha o pitch |
| P4.3 | Quanto custa uma hora de vagão ou equipamento parado (em produção ou dinheiro)? | Para traduzir minutos economizados em valor |
| P4.4 | Como a Vale vai avaliar a solução no fim da semana? Há critérios de banca? | Direciona o que priorizar no protótipo |

### P5. Uso, implantação e regras

| # | Pergunta | Por que importa |
|---|---|---|
| P5.1 ★ | Quem vai usar a solução: o coordenador do COI, o supervisor de pátio, o próprio operador? | Define a interface |
| P5.2 | Quais sistemas eles já usam no dia a dia? A solução deve se integrar a algum? | Evita criar mais uma tela solta |
| P5.3 | Há restrições de TI (rede interna, nuvem, dispositivos permitidos)? | Define onde o sistema pode rodar |
| P5.4 ★ | Há política sobre rastreamento de empregados (LGPD, acordo com sindicato)? | Localizar pessoas exige base legal e transparência. Proposta: só durante o turno, uso operacional, nunca punitivo |
| P5.5 | A solução deve funcionar também nos outros pátios citados? | Define o quanto ela precisa ser genérica |

---

## 8. Hipóteses que estamos assumindo

Até as perguntas serem respondidas, a solução parte destas hipóteses. Cada uma diz qual pergunta a confirma.

| # | Hipótese | Confirmar com |
|---|---|---|
| H1 | ~~O rádio portátil tem GPS e consegue enviar posição periodicamente~~ **Falsa para o rádio de voz (ver 5.3)** | P1.2, P1.3 |
| H2 | A precisão do GPS permite saber o pátio, mas não a linha exata (linhas paralelas ficam a poucos metros uma da outra) | P1.5 |
| H3 | O deslocamento entre frentes não é em linha reta, por causa das linhas e dos pontos de travessia | P2.3, P2.4 |
| H4 | Nem todo operador pode fazer toda tarefa | P2.1 |
| H5 | Parte relevante do tempo de permanência é espera por operador | P4.2 |
| H6 | O usuário principal é quem coordena as equipes | P5.1 |

---

## 9. Pontos de atenção

- **Transcrição imprecisa:** os números que vieram só do áudio (336 vagões, 3 lotes de 112, 15 composições, 1.000 km, 200 Mt em 2018) devem ser confirmados. Os 50 operadores e 13 km estão no slide 08 e são confiáveis.
- **Volume:** o áudio cita 200 Mt em 2018; o slide traz 166 a 191 Mt em 2019–2024. Não se contradizem, mas no pitch use o número do slide.
- **A própria Vale marcou viabilidade baixa em uma semana.** O esperado é um protótipo convincente e bem fundamentado, não um sistema em produção.
- **Segurança:** saber onde há pessoas perto de ativos em movimento também atende o pilar Segurança, que é o primeiro valor da Vale, mesmo que a ficha tenha marcado Produção.
