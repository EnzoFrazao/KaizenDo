# Firmware do transmissor (ESP32)

Código do dispositivo que cada pessoa carrega: lê o GPS e transmite por LoRa.

- Formato do pacote, intervalo de envio e hardware sugerido: [docs/arquitetura.md, seções 2 e 3](../../docs/arquitetura.md#3-pacote-de-rádio-esp32--raspberry).
- Sugestão de stack: Arduino (PlatformIO) com as bibliotecas `TinyGPSPlus` e `LoRa` (ou `RadioLib`).

A fazer:
- [ ] Ler lat, lon e velocidade do GPS
- [ ] Montar o pacote `GUA1,...` e enviar por LoRa (5 s em movimento, 15 s parado)
- [ ] Ler a bateria
- [ ] Gravar o `dispositivoId` (ex.: `ESP32-0A1B`) e imprimir na etiqueta
