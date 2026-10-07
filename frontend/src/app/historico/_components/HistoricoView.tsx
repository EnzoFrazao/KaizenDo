"use client";

// Histórico com dois modos: a reprodução ao vivo (para o pitch) e a tabela com filtros
// e paginação (para análise). Veja o que falta em ../README.md.

import { useCallback, useEffect, useMemo, useState } from "react";
import { AoVivo } from "@/components/AoVivo";
import { Card } from "@/components/Card";
import { StatusBadge } from "@/components/StatusBadge";
import { historico, listarTrechos } from "@/lib/dados";
import { DIA_BASE } from "@/lib/dados-mock";
import { COR_STATUS_MAPA, ROTULO_FUNCAO, ROTULO_STATUS, ROTULO_TURNO } from "@/lib/rotulos";
import type { FiltrosHistorico, Leitura, Pessoa, StatusTrabalho, Trecho } from "@/lib/tipos";

type Linha = Leitura & { pessoa: Pessoa };

const POR_PAGINA = 50;
/** Ritmo da reprodução: um lote de leituras a cada 1,5 s. */
const PASSO_MS = 1500;
const NO_FEED = 10;
const ORDEM_STATUS: StatusTrabalho[] = ["livre", "em_atividade", "deslocando", "pausa", "sem_sinal"];

const hora = (iso: string) => iso.slice(11, 16);

export function HistoricoView() {
  const [filtros, setFiltros] = useState<FiltrosHistorico>({ dia: DIA_BASE });
  const [linhas, setLinhas] = useState<Linha[]>([]);
  const [trechos, setTrechos] = useState<Trecho[]>([]);
  const [pagina, setPagina] = useState(0);

  // Reprodução ao vivo
  const [aoVivo, setAoVivo] = useState(true);
  const [cursor, setCursor] = useState(NO_FEED);

  const aplicar = useCallback((r: Linha[]) => {
    setLinhas(r);
    setPagina(0);
    setCursor(NO_FEED);
  }, []);

  useEffect(() => {
    historico(filtros).then(aplicar);
  }, [filtros, aplicar]);

  useEffect(() => {
    listarTrechos().then(setTrechos);
  }, []);

  // `linhas` vem da mais recente para a mais antiga; a reprodução anda ao contrário.
  const cronologico = useMemo(() => [...linhas].reverse(), [linhas]);

  useEffect(() => {
    if (!aoVivo || cronologico.length === 0) return;
    const id = setInterval(() => {
      // Cada passo avança um horário inteiro. Os dados têm uma leitura por pessoa a cada
      // 10 min, então andar de uma em uma deixaria o relógio parado por ~50 passos.
      setCursor((c) => {
        if (c >= cronologico.length) return c;
        const horario = cronologico[Math.min(c, cronologico.length - 1)].timestamp;
        let n = c;
        while (n < cronologico.length && cronologico[n].timestamp === horario) n++;
        return n;
      });
    }, PASSO_MS);
    return () => clearInterval(id);
  }, [aoVivo, cronologico]);

  const feed = useMemo(() => {
    const fim = Math.min(cursor, cronologico.length);
    return cronologico.slice(Math.max(0, fim - NO_FEED), fim).reverse();
  }, [cronologico, cursor]);

  const terminou = cursor >= cronologico.length && cronologico.length > 0;

  /** Leituras por hora do dia, para a barra de atividade. */
  const porHora = useMemo(() => {
    const contagem = new Map<string, number>();
    for (const l of linhas) {
      const h = l.timestamp.slice(11, 13);
      contagem.set(h, (contagem.get(h) ?? 0) + 1);
    }
    const horas = [...contagem.keys()].sort();
    const maior = Math.max(1, ...contagem.values());
    return horas.map((h) => ({ h, n: contagem.get(h) ?? 0, altura: ((contagem.get(h) ?? 0) / maior) * 100 }));
  }, [linhas]);

  const porStatus = useMemo(() => {
    const total = linhas.length || 1;
    return ORDEM_STATUS.map((s) => ({
      s,
      n: linhas.filter((l) => l.status === s).length,
      pct: (linhas.filter((l) => l.status === s).length / total) * 100,
    }));
  }, [linhas]);

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

      {/* Reprodução: as leituras do dia entrando uma a uma, como entrariam do Raspberry. */}
      <Card
        titulo="Reprodução do dia"
        acao={
          <div className="flex items-center gap-2">
            <AoVivo
              atualizadoEm={feed[0] ? new Date(feed[0].timestamp).getTime() : 0}
              rotulo="Recebendo leituras"
              pausado={!aoVivo || terminou}
            />
            <button type="button" className="botao-secundario" onClick={() => setAoVivo((v) => !v)} disabled={terminou}>
              {aoVivo ? "Pausar" : "Retomar"}
            </button>
            <button
              type="button"
              className="botao-secundario"
              onClick={() => {
                setCursor(NO_FEED);
                setAoVivo(true);
              }}
            >
              Reiniciar
            </button>
          </div>
        }
      >
        <p className="mb-3 text-xs text-zinc-500">
          As leituras do dia {DIA_BASE.split("-").reverse().join("/")} entrando em ordem, no ritmo em que chegariam do
          receptor. {cronologico.length.toLocaleString("pt-BR")} leituras no filtro atual
          {terminou ? " · reprodução concluída" : ""}.
        </p>

        <ul className="grid gap-1.5">
          {feed.map((l, i) => (
            <li
              key={`${l.pessoaId}-${l.timestamp}`}
              className={`flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md border px-3 py-2 text-sm transition-colors ${
                i === 0 ? "border-emerald-500/40 bg-emerald-500/10" : "border-zinc-800 bg-zinc-950"
              }`}
              style={{ opacity: Math.max(0.35, 1 - i * 0.07) }}
            >
              <span
                className={`inline-block h-2 w-2 shrink-0 rounded-full ${i === 0 ? "pulso" : ""}`}
                style={{ background: COR_STATUS_MAPA[l.status] }}
              />
              <span className="font-mono text-xs tabular-nums text-zinc-500">{hora(l.timestamp)}</span>
              <span className="font-medium text-zinc-100">{l.pessoa.nome}</span>
              <span className="text-xs text-zinc-500">{ROTULO_FUNCAO[l.pessoa.funcao]}</span>
              <span className="text-zinc-400">{nomeTrecho.get(l.trecho) ?? l.trecho}</span>
              <span className="tabular-nums text-zinc-500">{l.velocidadeKmh} km/h</span>
              <StatusBadge status={l.status} />
              <span className="ml-auto font-mono text-xs text-zinc-600">{l.dispositivoId}</span>
            </li>
          ))}
          {feed.length === 0 && <li className="py-6 text-center text-sm text-zinc-500">Nenhuma leitura no filtro.</li>}
        </ul>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card titulo="Leituras por hora">
          <div className="flex h-28 items-end gap-1">
            {porHora.map(({ h, n, altura }) => (
              <div key={h} className="group flex flex-1 flex-col items-center gap-1" title={`${h}h · ${n} leituras`}>
                <div
                  className="w-full rounded-t bg-sky-500/40 transition-colors group-hover:bg-sky-400/70"
                  style={{ height: `${Math.max(2, altura)}%` }}
                />
                <span className="text-[10px] tabular-nums text-zinc-600">{h}</span>
              </div>
            ))}
            {porHora.length === 0 && <p className="text-sm text-zinc-500">Sem leituras no filtro.</p>}
          </div>
        </Card>

        <Card titulo="Tempo em cada status">
          <div className="mb-3 flex h-3 overflow-hidden rounded-full bg-zinc-950">
            {porStatus.map(({ s, pct }) => (
              <div key={s} style={{ width: `${pct}%`, background: COR_STATUS_MAPA[s] }} title={ROTULO_STATUS[s]} />
            ))}
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {porStatus.map(({ s, n, pct }) => (
              <li key={s} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-zinc-400">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: COR_STATUS_MAPA[s] }} />
                  {ROTULO_STATUS[s]}
                </span>
                <span className="tabular-nums text-zinc-300">{pct.toFixed(0)}% · {n}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card titulo={`${linhas.length.toLocaleString("pt-BR")} leituras no filtro`}>
        <table className="w-full text-left text-sm">
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
