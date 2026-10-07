# Receptor (Raspberry Pi)

Código que roda no Raspberry Pi do pátio: escuta a frequência dos ESP32, decodifica os pacotes, envia para a API e aciona o relé de segurança.

- Entrada (pacote LoRa) e saída (`POST /api/leituras`): [docs/arquitetura.md, seções 3 e 4](../../docs/arquitetura.md#4-raspberry--backend).
- Bloqueio de segurança no virador: [docs/solucao.md, seção 8](../../docs/solucao.md).
- Sugestão de stack: Python 3 com a biblioteca do módulo LoRa (SX127x/SX126x), `requests` e SQLite para a fila local.

A fazer:
- [ ] Receber e validar pacotes `GUA1`
- [ ] Carimbar o horário e enviar para a API (com fila local se a API cair)
- [ ] Cerca virtual dos viradores gravada localmente e acionamento do relé (fail-safe)
- [ ] Simulador que gera pacotes falsos, para testar sem ESP32
