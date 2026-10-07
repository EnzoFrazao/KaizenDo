"use client";

// Ponto de partida da página. Veja o que construir em ../README.md.

import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { StatusBadge } from "@/components/StatusBadge";
import { historico } from "@/lib/api";
import { DIA_BASE, TRECHOS } from "@/lib/dados-mock";
import { ROTULO_FUNCAO, ROTULO_STATUS, ROTULO_TURNO } from "@/lib/rotulos";
import type { FiltrosHistorico, Leitura, Pessoa } from "@/lib/tipos";

type Linha = Leitura & { pessoa: Pessoa };
const POR_PAGINA = 50;

export function HistoricoView() {
  const [filtros, setFiltros] = useState<FiltrosHistorico>({ dia: DIA_BASE });
  const [linhas, setLinhas] = useState<Linha[]>([]);
  const [pagina, setPagina] = useState(0);

  useEffect(() => {
    historico(filtros).then((r) => {
      setLinhas(r);
      setPagina(0);
    });
  }, [filtros]);

  const mudar = (campo: keyof FiltrosHistorico, valor: string) =>
    setFiltros((f) => ({ ...f, [campo]: valor || undefined }));

  const visiveis = linhas.slice(pagina * POR_PAGINA, (pagina + 1) * POR_PAGINA);
  const select = "rounded border border-slate-300 bg-white px-2 py-1.5 text-sm";

  return (
    <div className="grid gap-4">
      <Card titulo="Filtros">
        <div className="flex flex-wrap gap-3">
          <input className={select} placeholder="Nome" onChange={(e) => mudar("nome", e.target.value)} />
          <select className={select} onChange={(e) => mudar("turno", e.target.value)}>
            <option value="">Todos os turnos</option>
            {Object.entries(ROTULO_TURNO).map(([v, r]) => <option key={v} value={v}>{r}</option>)}
          </select>
          <select className={select} onChange={(e) => mudar("funcao", e.target.value)}>
            <option value="">Todas as funções</option>
            {Object.entries(ROTULO_FUNCAO).map(([v, r]) => <option key={v} value={v}>{r}</option>)}
          </select>
          <select className={select} onChange={(e) => mudar("status", e.target.value)}>
            <option value="">Todos os status</option>
            {Object.entries(ROTULO_STATUS).map(([v, r]) => <option key={v} value={v}>{r}</option>)}
          </select>
          <select className={select} onChange={(e) => mudar("trecho", e.target.value)}>
            <option value="">Todos os trechos</option>
            {TRECHOS.map((t) => <option key={t.id} value={t.id}>{t.nome}</option>)}
          </select>
          <input type="date" className={select} defaultValue={DIA_BASE} onChange={(e) => mudar("dia", e.target.value)} />
        </div>
      </Card>

      <Card titulo={`${linhas.length} leituras`}>
        <table className="w-full text-left text-sm">
          <thead className="text-slate-500">
            <tr>
              <th className="py-2">Horário</th>
              <th>Nome</th>
              <th>Função</th>
              <th>Turno</th>
              <th>Trecho</th>
              <th>Velocidade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {visiveis.map((l) => (
              <tr key={`${l.pessoaId}-${l.timestamp}`} className="border-t border-slate-100">
                <td className="py-2">{l.timestamp.slice(11, 16)}</td>
                <td>{l.pessoa.nome}</td>
                <td>{ROTULO_FUNCAO[l.pessoa.funcao]}</td>
                <td>{l.pessoa.turno}</td>
                <td>{l.trecho}</td>
                <td>{l.velocidadeKmh} km/h</td>
                <td><StatusBadge status={l.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 flex items-center gap-3 text-sm">
          <button className="rounded border px-3 py-1 disabled:opacity-40" disabled={pagina === 0} onClick={() => setPagina((p) => p - 1)}>Anterior</button>
          <span>Página {pagina + 1} de {Math.max(1, Math.ceil(linhas.length / POR_PAGINA))}</span>
          <button className="rounded border px-3 py-1 disabled:opacity-40" disabled={(pagina + 1) * POR_PAGINA >= linhas.length} onClick={() => setPagina((p) => p + 1)}>Próxima</button>
        </div>
      </Card>
    </div>
  );
}
