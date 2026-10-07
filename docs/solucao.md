# KaizenDO · A solução

> Proposta de solução para o desafio **Posicionamento Operacional Inteligente**. **Atualizada em 05/10 com a visita de campo:** o rádio de voz não tem GPS, então a captura passou a usar o sistema de alerta de aproximação de trens, que já existe (ver seção 1.4, passo 1, e a seção 4). **Atualizada em 07/10 com a decisão de hardware:** cada pessoa leva um **ESP32** (GPS + rádio) como transmissor e o **Raspberry Pi** é o receptor, que pega latitude, longitude e velocidade (ver a seção 4.1 e [arquitetura.md](arquitetura.md)). O contexto, os dados e as perguntas abertas estão em [problema.md](problema.md). Esta proposta parte das hipóteses H1 a H6 daquele documento. Quando uma pergunta for respondida, confira a seção 7 deste arquivo para ver o que muda.

## 1. A solução explicada

Esta seção conta a solução do começo ao fim, sem pressupor conhecimento técnico. As seções seguintes detalham cada parte.

### 1.1 O nome e a promessa

Chamamos a solução de **Posicionamento Operacional Inteligente**, o mesmo nome da ficha da Vale. A promessa cabe em uma frase:

> **Quem coordena o pátio passa a saber, a qualquer momento, onde está cada operador, quanto tempo cada um leva para chegar a qualquer frente, e quem deve ser acionado ou render quem, com base em dados e não em memória.**

### 1.2 Como é hoje (o ponto de partida)

Imagine um coordenador no centro de operações. Um lote de 112 vagões acabou de sair do virador e precisa de um operador na frente seguinte. Hoje ele:

1. chama pelo rádio e pergunta quem está livre e onde está;
2. ouve as respostas e decide de cabeça quem está mais perto;
3. estima, pela experiência, quanto tempo aquela pessoa vai levar;
4. se errou na escolha ou na estimativa, o lote fica parado esperando.

No fim do turno, ninguém sabe dizer quantos minutos se perderam assim, porque nada foi registrado. E dois coordenadores diferentes tomam decisões diferentes diante da mesma situação. É isso que o slide 06 chama de "não há insight de deslocamento".

### 1.3 Como fica com a solução

O mesmo coordenador, na mesma situação, abre um painel no computador e vê:

- **um mapa do pátio**, dividido nos trechos entre os "X" (~1,5 km cada) e nas áreas nomeadas (viradores, recepção, formação, estacionamentos, oficina). Cada pessoa é um ponto, com um ícone diferente para **maquinista** (na locomotiva) e **manobrista** (no chão) e uma cor para o estado: livre, em atividade, deslocando ou em pausa;
- **a frente que precisa de alguém** destacada no mapa;
- **uma lista curta, já ordenada**: "1º João (manobrista), livre no trecho X06, chega a pé em ~6 min · 2º Maria (manobrista), livre no X07, chega em ~22 min a pé ou ~5 min de carro · 3º Pedro, terminando atividade na Formação, chega em ~25 min". Para maquinistas, a lista também sugere **qual locomotiva liberada está mais perto** para ele assumir.

Ele clica em "acionar" no primeiro nome, chama a pessoa pelo rádio como sempre fez, e o sistema registra a hora do acionamento. Quando o operador chega à frente, o sistema percebe pela posição do rádio e registra a hora de chegada. **Esse par "previsto × real" é o que permite medir e melhorar**, coisa que hoje não existe.

Perto da troca de turno ou do horário de refeição, o painel mostra também um **plano de revezamento sugerido**: "Ana (turno seguinte) rende João na frente FB às 18h; Carlos cobre o RA durante a pausa de Maria". O coordenador pode aceitar ou ajustar.

### 1.4 O que acontece por trás, passo a passo

```
 GPS + rádio do        Localização          Tempo de             Decisão              Registro
 alerta de        →    por trecho      →    deslocamento    →    (quem acionar,   →   (previsto × real)
 aproximação           "João está           "do X06 ao X07       quem rende quem)          │
 envia posição          no X06, livre"       leva ~20 min a pé"                            │
                                                  ▲                                         │
                                                  └─────────── aprende com o histórico ─────┘
```

**Passo 1 · Um rádio com GPS informa a posição.** A visita de campo mostrou que o rádio de voz **não tem GPS**: ele só revela por qual antena a chamada passou, o que cobre uma área grande demais. Mas a Vale já tem outro rádio que tem GPS: o **sistema de alerta de aproximação de trens**, usado na manutenção da via. Ele tem uma unidade fixa em 74% das locomotivas e unidades portáteis para as equipes. Um engenheiro da Vale já construiu um receptor com Raspberry Pi que **escuta esse rádio e extrai as coordenadas das locomotivas**. A solução usa esse caminho:
- **Maquinistas:** a posição do maquinista é a posição da locomotiva em que ele está, que **já é captada hoje** sem equipamento novo. Basta saber em qual locomotiva cada maquinista está.
- **Manobristas:** ficam no chão, longe da locomotiva, então precisam de um **dispositivo portátil**. Pode ser a unidade portátil do sistema de alerta (padrão Vale, ~R$ 15 mil cada) ou um rastreador de baixo custo (GPS + rádio, no capacete ou no cinto) que fala com o mesmo receptor. A seção 4 compara as duas.

Assim a restrição da ficha ("usar dados de localização de rádio portátil") continua respeitada: é um rádio portátil, só que um que tem GPS.

**Passo 2 · A posição vira "em qual trecho".** Uma coordenada sozinha (latitude e longitude) não diz nada a quem coordena. O sistema tem o mapa do terminal dividido nos **trechos entre os "X"** (~1,5 km cada, como o próprio mapa oficial já faz) e nas **áreas nomeadas** (viradores, recepção, formação, estacionamentos, oficina, CTMR), e traduz "-2.5712, -44.3701" em "trecho X06". Trabalhamos por trecho e não por linha de trilho porque as linhas são paralelas e muito próximas, e o GPS não tem precisão para distinguir uma da outra.

**Passo 3 · O sistema entende o que o operador está fazendo.** Olhando a sequência de posições: se está parado num pátio, está em atividade ou livre; se está mudando de pátio a passo de gente, está se deslocando; se está rápido demais para estar a pé, está de carro ou embarcado; se está no ponto de apoio, está em pausa. Se uma pessoa ficar **parada tempo demais num lugar isolado**, o sistema pode alertar, porque na operação há momentos em que alguém trabalha sozinho.

**Passo 4 · O sistema aprende quanto tempo leva ir de um pátio a outro.** Cada vez que alguém sai do pátio FB e chega ao CA, o sistema anota quanto tempo levou. Com o tempo, ele sabe que "do FB ao CA leva normalmente 6 minutos, e 9 minutos nos piores casos". Isso é muito melhor que medir distância em linha reta, porque no pátio não se anda em linha reta: há trilhos para atravessar e pontos de passagem. E quase tudo é **a pé**: são só 2 carros para 50 pessoas. A ~5 km/h, atravessar um trecho de 1,5 km leva cerca de **18 minutos**. Por isso, escolher a pessoa errada custa caro, e o sistema também pode sugerir **quando vale mandar o carro**. **Este é o coração da solução: o tempo de deslocamento deixa de ser estimativa e passa a ser medido.**

**Passo 5 · O sistema recomenda quem acionar.** Quando uma frente precisa de alguém, o sistema pega todos os operadores livres da função certa (maquinista ou manobrista), calcula o tempo de chegada de cada um usando o que aprendeu no passo 4, e ordena do mais rápido ao mais lento. O coordenador continua decidindo; o sistema só deixa a melhor opção óbvia.

**Passo 6 · O sistema monta o revezamento.** Para pausas e troca de turno, o problema é parecido, mas com várias pessoas ao mesmo tempo: quem do turno seguinte vai para qual frente, e quem cobre quem na pausa, de forma que **ninguém ande à toa e nenhuma frente fique descoberta**. Isso é um problema clássico de alocação, que um computador resolve em frações de segundo.

**Passo 7 · Tudo fica registrado.** Cada acionamento guarda o tempo previsto e o tempo real. Isso alimenta de volta o passo 4 (o sistema fica mais preciso a cada dia) e gera os números que a gestão precisa: quanto tempo se esperou por operador, em quais frentes, em quais horários.

### 1.5 Como cada parte resolve um elo do problema

| Elo do slide 08 | O que a solução faz |
|---|---|
| 1. Posição desconhecida | Passos 1 a 3: posição automática pelo rádio, traduzida em pátio e estado |
| 2. Deslocamento imprevisível | Passo 4: tempo entre pátios aprendido dos dados reais |
| 3. Revezamento no escuro | Passo 6: plano de revezamento sugerido com base em posição e tempo |
| 4. Parada se estende | Passo 5: o operador que chega mais rápido é acionado primeiro, e o passo 7 mede o ganho |

E a expectativa do slide 06, de que "o mesmo resultado independa de quem está no turno", é atendida porque **a recomendação vem dos dados**, igual para qualquer coordenador.

### 1.6 Ganho de segurança

O mesmo dado de posição protege as pessoas, que é o primeiro valor da Vale ("a vida em primeiro lugar"):
- **Alerta de pessoa isolada:** se alguém fica parado tempo demais sozinho, o coordenador é avisado.
- **Socorro mais rápido:** em uma emergência, o sistema mostra quem está mais perto para ajudar.
- **Aproximação de trem:** como o sistema conhece a posição das locomotivas e das pessoas, pode alertar quando uma pessoa está no caminho de um trem, que é exatamente o que o sistema de alerta já faz na via.
- **Bloqueio na área de basculamento:** se alguém estiver no virador ou em área de risco, os vagões não avançam. Está detalhado na seção 8.
- **Evolução futura**, anotada na visita: travar portões quando um trem chega.

### 1.7 O que a solução não faz (de propósito)

- **Não substitui o rádio nem o coordenador.** A comunicação continua igual; o coordenador continua decidindo. A solução só dá a informação que hoje falta.
- **Não rastreia ninguém fora do turno** e não serve para punir. A posição é usada para operação. Isso precisa ser dito com clareza aos empregados (ver P5.4 no problema).
- **Não prevê o movimento dos lotes de vagões.** Esse é o outro desafio da apresentação e está fora do escopo.

### 1.8 O que entregamos em uma semana

Um **protótipo funcionando**: o painel com mapa, a recomendação de quem acionar e o planejador de revezamento. Se a Vale liberar uma amostra das coordenadas das locomotivas do supervisório do Raspberry Pi, o protótipo usa esses dados para os maquinistas. O resto roda com um **simulador** que imita 20 trens por dia, 60 lotes e 50 pessoas (maquinistas e manobristas) circulando pelos trechos, gerando dados no mesmo formato do sistema de alerta. Para ligar nos dados reais depois, basta trocar a fonte.

Para provar o valor, o simulador roda o mesmo turno duas vezes: uma com a escolha feita "de cabeça" e outra com a recomendação do sistema. A diferença no tempo de espera, convertida em horas de vagão parado por mês, é o número central do pitch.

## 2. Ideia central

Transformar a posição do rádio portátil em três respostas para quem coordena:

1. **Onde está cada operador agora?** (em qual pátio ou frente, e o que está fazendo)
2. **Quem chega mais rápido a esta frente?** (por tempo estimado de chegada aprendido dos dados, não por distância)
3. **Como montar o próximo revezamento?** (quem rende quem e quando, com o menor deslocamento total)

Tudo parte do mesmo núcleo:

```
posição GPS via rádio  →  trecho / área  →  tempo de deslocamento aprendido do histórico
```

Isso responde aos quatro elos do slide 08 e à frase do slide 06: *"planejar o revezamento e acionar o operador mais próximo com base em dados de posição e tempo"*.

## 3. Opções

| Opção | O que entrega | Elos do slide 08 | Risco em 1 semana |
|---|---|---|---|
| **1. Mapa vivo + "acionar o mais próximo"** | Posição de cada operador por pátio em tempo real; matriz de tempo de deslocamento entre pátios aprendida do histórico; quando surge uma demanda numa frente, ranking dos operadores livres e habilitados por **tempo de chegada estimado** | 1, 2 e 4 | Baixo para maquinistas (dado já existe); médio para manobristas (precisa de dispositivo) |
| **2. Opção 1 + planejador de revezamento** | Para troca de turno e pausas, sugere quem rende quem e quando, minimizando o deslocamento total e o tempo de frente descoberta (problema de alocação: algoritmo húngaro ou heurística gulosa) | 1, 2, 3 e 4 | Médio |
| Plano B de captura | Inferir a região pela antena do rádio de voz que recebeu a chamada | 1 | Precisão de quilômetros; só como contingência |

### Recomendação

**Construir a Opção 2, com o Raspberry Pi como base da captura** (decisão do time em 05/10). O Raspberry Pi fica como **receptor** no pátio: escuta o sistema de alerta, como o engenheiro da Vale já faz para as locomotivas, e envia as posições para o painel. Para o dispositivo que o manobrista carrega, uma placa menor (microcontrolador com GPS e rádio) é mais leve e dura mais na bateria do que um Raspberry Pi; o Raspberry continua sendo o receptor. Ela cobre os quatro elos e responde exatamente o que a Vale disse esperar. Se o tempo apertar, a Opção 1 sozinha já é uma entrega completa.

## 4. Como funciona, por camada

**Camada 1 · Captura e localização**
- **Maquinistas:** ler as coordenadas das locomotivas pelo receptor Raspberry Pi que já escuta o sistema de alerta de aproximação, e associar cada maquinista à locomotiva em que está (P6.6). Atenção: 26% da frota está sem comunicar há mais de 15 dias, então parte das locomotivas pode ficar "invisível".
- **Manobristas:** dispositivo portátil com GPS. Comparação:

| Alternativa | Custo estimado | Prós | Contras |
|---|---|---|---|
| Unidade portátil do sistema de alerta, uma por pessoa | ~R$ 15 mil cada; ~R$ 750 mil para 50 *(valor citado na conversa)* | Padrão Vale, já homologado, já tem o alerta de trem | Caro; hoje é usado um por equipe |
| Mesma unidade, uma por dupla ou equipe | Fração do valor acima | Mais barato | Perde a posição individual, e no pátio as pessoas não andam em equipe fixa |
| Rastreador de baixo custo (placa GPS + rádio, no capacete ou cinto) falando com o mesmo receptor | Centenas de reais por unidade *(estimativa a validar)* | Barato, cabe no EPI, alinhado à ideia do relógio que já foi prototipado | Precisa de aprovação de frequência para não interferir (P6.5) e de piloto |

- Ligar a coordenada a um **trecho entre "X"** ou área nomeada, e não a uma linha individual (H2).
- Inferir o estado do operador pela sequência de posições: parado numa frente, deslocando, embarcado em locomotiva (velocidade alta), em pausa (no ponto de apoio).

### 4.1 Decisão de hardware (07/10)

O time fechou a alternativa do **rastreador de baixo custo**:
- **Transmissor:** um **ESP32** com GPS e rádio LoRa por pessoa, que envia latitude, longitude, velocidade e bateria a cada poucos segundos.
- **Receptor:** um **Raspberry Pi** no pátio, que escuta a frequência, decodifica os pacotes, envia para o backend e aciona o relé de segurança da seção 8.
- O vínculo entre pessoa e ESP32 é feito na tela de Cadastro.

O formato do pacote, a API e o modelo de dados estão em [arquitetura.md](arquitetura.md). As telas estão em [telas.md](telas.md).

**Camada 2 · Tempo de deslocamento**
- Para cada par de pátios, medir no histórico quanto os operadores levam para ir de um ao outro: mediana e percentil 90.
- Separar por modo: **a pé** (o caso comum) e **de carro** (só 2 carros). Como base inicial, ~5 km/h a pé, ou ~18 min por trecho de 1,5 km.
- Enquanto não houver histórico, começar com estimativas baseadas no caminho real pelo grafo do pátio (H3) e substituir pelos tempos medidos assim que existirem.

**Camada 3 · Decisão**
- **Acionar o mais próximo:** dada uma demanda numa frente, filtrar operadores livres da função certa (maquinista ou manobrista) e ordenar por tempo estimado de chegada.
- **Carro:** sugerir o carro quando o tempo a pé passar de um limite, e mostrar onde cada um dos 2 carros está.
- **Troca de locomotiva:** quando o maquinista entrega a locomotiva no virador, sugerir a locomotiva liberada mais próxima.
- **Segurança:** alerta de pessoa isolada parada e de pessoa no caminho de uma locomotiva.
- **Revezamento:** dados o plano de pausas e a troca de turno (P2.5, P2.6), sugerir quem rende quem, minimizando deslocamento e tempo de frente descoberta.
- **Registro:** guardar cada acionamento, tempo previsto e tempo real. Isso cria o histórico que hoje não existe (slide 06: "sem registro que permita medir ou melhorar").

## 5. Protótipo para a semana

1. **Modelo do pátio:** grafo com os trechos entre os "X" e as áreas nomeadas do mapa oficial como nós, e os caminhos a pé entre eles como arestas.
2. **Dados:** amostra real das coordenadas de locomotivas do supervisório do Raspberry Pi, se a Vale liberar (P6.2). Para o resto, um **simulador** com 20 trens por dia, 60 lotes, 50 pessoas divididas entre maquinistas e manobristas, 2 carros, turnos e pausas, gerando posições no mesmo formato do sistema de alerta. Assim, passar para o dado real é só trocar a fonte.
   - Opcional, se der tempo: **um rastreador de baixo custo montado de verdade** (placa GPS + rádio) andando pelo pátio, para mostrar que o hardware é viável.
3. **Painel de quem coordena** (P5.1):
   - mapa com os operadores por pátio e o estado de cada um;
   - botão "acionar o mais próximo" com o tempo estimado de chegada;
   - planejador da próxima troca de turno ou pausa.
4. **Indicador para o pitch:** na simulação, comparar o tempo médio de espera por operador **antes** (escolha "manual", simulada como o operador que respondeu primeiro no rádio ou o mais próximo em linha reta) e **depois** (ranking por tempo de chegada). Converter em horas de equipamento parado por mês e, se possível, em valor (P4.3).

**Stack sugerida:** Python (simulador e motor) com FastAPI, PostgreSQL com PostGIS, painel web com mapa (Leaflet ou MapLibre). A ingestão pode reaproveitar o receptor Raspberry Pi que já existe.

## 6. Para o pitch

- Abrir com a cadeia do slide 08 e mostrar cada elo sendo resolvido.
- Mostrar o número antes e depois da simulação.
- Destacar que o resultado **não depende de quem está no turno**, que é a expectativa literal do slide 06.
- Mostrar que a solução **aproveita o que a Vale já tem** (o sistema de alerta e o receptor Raspberry Pi), o que reduz custo e risco.
- Citar o ganho de **segurança** (seção 1.6) sem tirar o foco do pilar Produção.
- Tratar a privacidade de frente: localização só no turno, uso operacional, nunca punitivo (P5.4).

## 7. O que muda conforme as respostas do problema

| Se descobrirmos que… | Pergunta | Impacto na solução |
|---|---|---|
| ✅ **Aconteceu (05/10):** o rádio de voz **não tem GPS** | P1.2 | A captura passou a usar o sistema de alerta de aproximação (GPS + rádio): locomotivas pelo receptor que já existe, manobristas por dispositivo portátil |
| A posição só é enviada **quando o operador fala** | P1.3 | Não há tempo real contínuo; é preciso estimar a posição entre um envio e outro, ou pedir configuração de envio periódico |
| **Existe histórico** de posições | P1.4 | Os tempos de deslocamento passam a ser medidos, e não estimados. O pitch fica muito mais forte |
| A precisão é **boa o bastante para separar linhas** | P1.5 | Dá para localizar por linha, não só por pátio |
| **Rádios são compartilhados** | P1.6 | É preciso um passo de "login" do operador no rádio a cada turno |
| ✅ **Aconteceu:** há **duas funções**, maquinista e manobrista | P2.1 | O ranking filtra por função, e cada função é localizada de um jeito |
| ✅ **Aconteceu:** o deslocamento é **quase todo a pé**, com 2 carros | P2.3 | Tempos separados por modo, e o carro vira um recurso a alocar |
| ~~Os operadores são fixos por pátio~~ Não são: seguem os trens | P2.8 | Confirma o foco em "acionar o mais próximo" |
| **Não existe planta** georreferenciada | P3.1 | Teremos que desenhar as zonas à mão a partir do slide 07 e de imagem de satélite |
| A espera por operador é **pequena** no tempo total | P4.2 | O argumento muda de "produção" para "previsibilidade e segurança" |
| O usuário é o **próprio operador** e não o coordenador | P5.1 | A interface vira um app de celular ou mensagem no rádio, não um painel |
| Há **restrição forte** de rastreamento | P5.4 | Mostrar só agregados por pátio, sem identificar a pessoa, exceto no momento do acionamento |
| O sistema de alerta **não puder ser usado no pátio** ou o receptor não for liberado | P6.1, P6.2 | Manobristas e maquinistas passam a usar o rastreador de baixo custo, com receptor próprio |
| A Vale **não aprovar nova frequência** | P6.5 | Usar só unidades homologadas do sistema de alerta, ou começar só pelos maquinistas (sem hardware novo) |
| A maioria for **manobrista** | P6.3 | O custo do hardware portátil pesa mais; o rastreador de baixo custo ganha força |

## 8. Extra: Bloqueio de segurança na área de basculamento

### 8.1 A ideia

Se uma pessoa estiver dentro da área de basculamento (o virador) ou de outra área de risco, o sistema **impede que os vagões avancem** até ela sair. A posição já é coletada para a operação; aqui ela é usada também para proteger a pessoa.

### 8.2 Como funciona, passo a passo

1. **Cercas virtuais:** no mapa, desenhamos um polígono ao redor de cada virador e de cada área de risco, **com uma margem de segurança** de alguns metros a mais. A margem compensa a imprecisão do GPS, que é de alguns metros.
2. **Detecção:** o Raspberry Pi recebe a posição de cada pessoa e verifica se ela está dentro de alguma cerca.
3. **Bloqueio:** se houver alguém dentro, o Raspberry Pi **corta a permissão de movimento** daquele virador. Na prática, aciona um relé ligado à lógica de controle do virador e do posicionador de vagões (o braço que empurra os vagões para dentro do virador). Enquanto o relé estiver aberto, o equipamento não avança.
4. **Aviso:** ao mesmo tempo, o sistema dispara um alarme visual e sonoro no local, avisa o operador do virador e o CCO, e mostra no painel quem está na área.
5. **Liberação:** quando a pessoa sai da cerca, o bloqueio só é liberado depois de uma **confirmação humana** do operador. Ele nunca é liberado sozinho.

### 8.3 Regras de segurança do próprio módulo

- **Falha segura:** se o sinal de um dispositivo que estava dentro da área se perder, o sistema considera que **a pessoa continua lá** e mantém o bloqueio. O mesmo vale se o Raspberry Pi parar de responder: o relé é ligado de forma que, sem energia ou sem sinal, ele fica **aberto**, ou seja, bloqueando.
- **Camada extra, nunca a única:** GPS não é preciso nem confiável o bastante para ser a única proteção de uma pessoa. O módulo **soma-se** aos procedimentos que já existem (bloqueio e etiquetagem, permissão de trabalho, intertravamentos do virador) e **não substitui nenhum deles**.
- **Aprovação da Vale:** ligar qualquer coisa ao controle de um virador exige aprovação da engenharia e da segurança da Vale, e normalmente um equipamento com certificação de segurança. No hackathon, mostramos o conceito; em produção, o sinal entraria pelo intertravamento oficial.

### 8.4 Demonstração no hackathon

Para mostrar funcionando sem tocar em equipamento real:
- um Raspberry Pi com um **relé, um LED vermelho e um buzzer** ligados aos pinos dele;
- no painel, a cerca virtual do virador desenhada no mapa;
- um "manobrista" simulado (ou um rastreador de verdade carregado por alguém) entra na cerca, e no mesmo instante o LED acende, o buzzer toca, o relé abre e o painel mostra "Virador bloqueado: pessoa na área";
- a pessoa sai, o bloqueio continua até alguém clicar em "liberar".

### 8.5 O que falta descobrir

Perguntas registradas no problema (P6.9 e P6.10): como o virador e o posicionador são comandados hoje, quais intertravamentos já existem e quem precisa aprovar uma nova entrada de bloqueio.
