# GUARÁ · Telas web

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 4 + Leaflet. Hoje tudo roda com **dados fictícios**; não precisa de backend.

## Rodar

Precisa de Node.js 20 ou mais novo.

```bash
cd web
npm install
npm run dev
```

Abra http://localhost:3000. Antes de enviar: `npm run lint` e `npm run build`.

## Divisão da equipe: uma tela por pessoa

| Tela | Pasta | O que ler primeiro |
|---|---|---|
| Dashboard | `src/app/dashboard/` | [README da tela](src/app/dashboard/README.md) |
| Mapa ao vivo | `src/app/mapa/` | [README da tela](src/app/mapa/README.md) |
| Histórico | `src/app/historico/` | [README da tela](src/app/historico/README.md) |
| Cadastro | `src/app/cadastro/` | [README da tela](src/app/cadastro/README.md) |

Especificação completa: [docs/telas.md](../docs/telas.md). Contrato de dados e API: [docs/arquitetura.md](../docs/arquitetura.md).

## Regras para não dar conflito

1. **Cada pessoa mexe só na pasta da sua tela.** Componentes próprios vão em `_components/` dessa pasta.
2. **Arquivos compartilhados** (`src/lib/`, `src/components/`, `src/app/layout.tsx`, `globals.css`, `package.json`) são do Enzo. Precisa mudar algo neles (um campo novo, um componente comum, uma biblioteca)? Peça no grupo.
3. **Dados sempre por `@/lib/api`.** Nunca importe `dados-mock.ts` direto na tela: quando o backend chegar, só `api.ts` muda e as telas continuam funcionando.
4. **Cores e rótulos de status** vêm de `@/lib/rotulos`.
5. **Uma branch por tela:** `tela/dashboard`, `tela/mapa`, `tela/historico`, `tela/cadastro`. Abra um Pull Request para `main`.

```bash
git checkout -b tela/mapa
# ...trabalhe...
git add web/src/app/mapa
git commit -m "Mapa: filtro por turno"
git push -u origin tela/mapa
```

## Estrutura

```
src/
  app/
    layout.tsx          barra lateral + conteúdo (compartilhado)
    page.tsx            redireciona para /dashboard
    dashboard/          ← tela 1
    mapa/               ← tela 2
    historico/          ← tela 3
    cadastro/           ← tela 4
  components/           Sidebar, PageHeader, Card, StatusBadge (compartilhado)
  lib/
    tipos.ts            tipos de dados (Pessoa, Dispositivo, Leitura, Alerta…)
    api.ts              funções de dados; hoje devolvem mock
    dados-mock.ts       50 pessoas, 51 ESP32, leituras de um dia
    rotulos.ts          textos e cores de status, função, turno, alerta
```

Atenção: esta versão do Next.js é mais nova que muitos tutoriais. Em dúvida, a documentação instalada está em `node_modules/next/dist/docs/`.
