# Backend (API)

Recebe as leituras do Raspberry, calcula trecho e status, gera alertas e serve as telas web.

- Rotas, regras de status e alertas, modelo de dados: [docs/arquitetura.md, seções 5 a 7](../docs/arquitetura.md#5-backend).
- As rotas seguem exatamente as funções de `web/src/lib/api.ts`. Quando a API estiver pronta, só esse arquivo do web muda.
- Sugestão de stack: Python + FastAPI + PostgreSQL com PostGIS.

A fazer:
- [ ] `POST /api/leituras` (entrada do Raspberry)
- [ ] Rotas de leitura das telas (`/api/posicoes/atual`, `/api/historico`, `/api/alertas`…)
- [ ] Cadastro e vínculo (`/api/pessoas`, `/api/dispositivos`, `/api/vinculos`)
- [ ] Polígonos reais dos trechos
