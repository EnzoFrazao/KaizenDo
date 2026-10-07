# Tela: Cadastro (pessoa ↔ ESP32)

**Responsável:** _nome aqui_ · **Rota:** `/cadastro` · **Especificação:** [docs/telas.md](../../../../docs/telas.md#4-cadastro)

## Arquivos desta tela (só você mexe)

```
cadastro/
  page.tsx                    entrada da rota (não precisa mexer)
  _components/CadastroView.tsx   lista, vínculo e (a fazer) formulários
```

## Dados (de `@/lib/dados`)

- `listarPessoas()`, `listarDispositivos()`
- `vincularDispositivo(pessoaId, dispositivoId)` · passe `null` para desvincular. Dá erro se o ESP32 já estiver com outra pessoa
- `cadastrarPessoa({ nome, matricula, funcao, turno, dispositivoId: null })`
- `cadastrarDispositivo(id, mac)`

Regra: o vínculo é 1 para 1 (um ESP32 por pessoa).

## Já feito

Tabela de pessoas com seletor para vincular, trocar ou desvincular o ESP32, cartão de dispositivos livres e mensagem de erro.

## A fazer

- [ ] Ajustar ao mockup
- [ ] Formulário "Nova pessoa"
- [ ] Formulário "Novo dispositivo" (validar id `ESP32-XXXX` e MAC)
- [ ] Busca e filtro por turno/função na tabela
- [ ] Mostrar bateria e último sinal do dispositivo vinculado
