"use client";

// Filtros e tabela das leituras registradas. Veja o que falta em ../README.md.

import { useCallback, useEffect, useMemo, useState } from "react";
import { Card } from "@/components/Card";
import { StatusBadge } from "@/components/StatusBadge";
import { historico, listarTrechos } from "@/lib/dados";
import { DIA_BASE } from "@/lib/dados-mock";
import { ROTULO_FUNCAO, ROTULO_STATUS, ROTULO_TURNO } from "@/lib/rotulos";
import type { FiltrosHistorico, Leitura, Pessoa, Trecho } from "@/lib/tipos";

type Linha = Leitura & { pessoa: Pessoa };

const POR_PAGINA = 50;

const hora = (iso: string) => iso.slice(11, 16);

export function HistoricoView() {
  const [filtros, setFiltros] = useState<FiltrosHistorico>({ dia: DIA_BASE });
  const [linhas, setLinhas] = useState<Linha[]>([]);
  const [trechos, setTrechos] = useState<Trecho[]>([]);
  const [pagina, setPagina] = useState(0);

  const aplicar = useCallback((r: Linha[]) => {
    setLinhas(r);
    setPagina(0);
  }, []);

  useEffect(() => {
    historico(filtros).then(aplicar);
  }, [filtros, aplicar]);

  useEffect(() => {
    listarTrechos().then(setTrechos);
  }, []);

  const mudar = (campo: keyof FiltrosHistorico, valor: string) =>
    setFiltros((f) => ({ ...f, [campo]: valor || undefined }));

  const visiveis = linhas.slice(pagina * POR_PAGINA, (pagina + 1) * POR_PAGINA);
  const nomeTrecho = useMemo(() => new Map(trechos.map((t) => [t.id, t.nome])), [trechos]);

  return (
    <div className="grid gap-4">
      <Card titulo="Filtros">
        <div className="flex flex-wrap gap-3">
          <input className="campo" placeholder="Nome" onChange={(e) => mudar("nome", e.target.value)} />
          <select className="campo" onChange={(e) => mudar("turno", e.target.value)}>
            <option value="">Todos os turnos</option>
            {Object.entries(ROTULO_TURNO).map(([v, r]) => <option key={v} value={v}>{r}</option>)}
          </select>
          <select className="campo" onChange={(e) => mudar("funcao", e.target.value)}>
            <option value="">Todas as funções</option>
            {Object.entries(ROTULO_FUNCAO).map(([v, r]) => <option key={v} value={v}>{r}</option>)}
          </select>
          <select className="campo" onChange={(e) => mudar("status", e.target.value)}>
            <option value="">Todos os status</option>
            {Object.entries(ROTULO_STATUS).map(([v, r]) => <option key={v} value={v}>{r}</option>)}
          </select>
          <select className="campo" onChange={(e) => mudar("trecho", e.target.value)}>
            <option value="">Todos os trechos</option>
            {trechos.map((t) => <option key={t.id} value={t.id}>{t.nome}</option>)}
          </select>
          <input type="date" className="campo" defaultValue={DIA_BASE} onChange={(e) => mudar("dia", e.target.value)} />
        </div>
      </Card>

      <Card titulo={`${linhas.length.toLocaleString("pt-BR")} leituras no filtro`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-zinc-500">
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
                <tr key={`${l.pessoaId}-${l.timestamp}`} className="border-t border-zinc-800">
                  <td className="py-2 font-mono text-xs tabular-nums text-zinc-400">{hora(l.timestamp)}</td>
                  <td>{l.pessoa.nome}</td>
                  <td className="text-zinc-400">{ROTULO_FUNCAO[l.pessoa.funcao]}</td>
                  <td className="text-zinc-400">{l.pessoa.turno}</td>
                  <td className="text-zinc-400">{nomeTrecho.get(l.trecho) ?? l.trecho}</td>
                  <td className="tabular-nums text-zinc-400">{l.velocidadeKmh} km/h</td>
                  <td><StatusBadge status={l.status} /></td>
                </tr>
              ))}
              {visiveis.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-zinc-500">Nenhuma leitura com esses filtros.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center gap-3 text-sm text-zinc-400">
          <button className="botao-secundario" disabled={pagina === 0} onClick={() => setPagina((p) => p - 1)}>
            Anterior
          </button>
          <span className="tabular-nums">
            Página {pagina + 1} de {Math.max(1, Math.ceil(linhas.length / POR_PAGINA))}
          </span>
          <button
            className="botao-secundario"
            disabled={(pagina + 1) * POR_PAGINA >= linhas.length}
            onClick={() => setPagina((p) => p + 1)}
          >
            Próxima
          </button>
        </div>
      </Card>
    </div>
  );
}
