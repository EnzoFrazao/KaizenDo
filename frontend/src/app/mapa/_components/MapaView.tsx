"use client";

// Filtros, legenda e atualização periódica. Veja o que falta em ../README.md.
// O Leaflet usa `window`, então o mapa é carregado só no navegador (ssr: false).

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AoVivo } from "@/components/AoVivo";
import { Card } from "@/components/Card";
import { raioDeCobertura } from "@/lib/cobertura";
import { listarTrechos, posicoesAtuais } from "@/lib/dados";
import { COR_STATUS_MAPA, ROTULO_FUNCAO, ROTULO_STATUS, ROTULO_TURNO } from "@/lib/rotulos";
import type { Funcao, PosicaoAtual, StatusTrabalho, Trecho, TrechoId, Turno } from "@/lib/tipos";

const MapaLeaflet = dynamic(() => import("./MapaLeaflet"), {
  ssr: false,
  loading: () => <div className="h-[560px] animate-pulse rounded-lg border border-zinc-800 bg-zinc-900" />,
});

const INTERVALO_MS = 5000;

export function MapaView() {
  const [posicoes, setPosicoes] = useState<PosicaoAtual[]>([]);
  const [trechos, setTrechos] = useState<Trecho[]>([]);
  const [atualizadoEm, setAtualizadoEm] = useState(0);
  const [funcao, setFuncao] = useState<Funcao | "">("");
  const [status, setStatus] = useState<StatusTrabalho | "">("");
  const [turno, setTurno] = useState<Turno | "">("");
  const [trecho, setTrecho] = useState<TrechoId | "">("");
  const [busca, setBusca] = useState("");
  const [cobertura, setCobertura] = useState(true);

  const aplicar = useCallback((ps: PosicaoAtual[]) => {
    setPosicoes(ps);
    setAtualizadoEm(Date.now());
  }, []);

  useEffect(() => {
    posicoesAtuais().then(aplicar);
    const id = setInterval(() => posicoesAtuais().then(aplicar), INTERVALO_MS);
    return () => clearInterval(id);
  }, [aplicar]);

  useEffect(() => {
    listarTrechos().then(setTrechos);
  }, []);

  const filtradas = useMemo(
    () =>
      posicoes.filter(
        (p) =>
          (!funcao || p.pessoa.funcao === funcao) &&
          (!status || p.status === status) &&
          (!turno || p.pessoa.turno === turno) &&
          (!trecho || p.trecho === trecho) &&
          (!busca || p.pessoa.nome.toLowerCase().includes(busca.toLowerCase())),
      ),
    [posicoes, funcao, status, turno, trecho, busca],
  );

  // Recalcula com o filtro: a malha mostrada é a de quem está no mapa.
  const raioCobertura = useMemo(() => raioDeCobertura(filtradas.map((p): [number, number] => [p.lat, p.lon])), [filtradas]);

  return (
    <div className="grid gap-4">
      <Card>
        <div className="flex flex-wrap items-center gap-3">
          <input className="campo" placeholder="Buscar pessoa" value={busca} onChange={(e) => setBusca(e.target.value)} />
          <select className="campo" value={funcao} onChange={(e) => setFuncao(e.target.value as Funcao | "")}>
            <option value="">Todas as funções</option>
            {Object.entries(ROTULO_FUNCAO).map(([v, r]) => <option key={v} value={v}>{r}</option>)}
          </select>
          <select className="campo" value={status} onChange={(e) => setStatus(e.target.value as StatusTrabalho | "")}>
            <option value="">Todos os status</option>
            {Object.entries(ROTULO_STATUS).map(([v, r]) => <option key={v} value={v}>{r}</option>)}
          </select>
          <select className="campo" value={turno} onChange={(e) => setTurno(e.target.value as Turno | "")}>
            <option value="">Todos os turnos</option>
            {Object.entries(ROTULO_TURNO).map(([v, r]) => <option key={v} value={v}>{r}</option>)}
          </select>
          <select className="campo" value={trecho} onChange={(e) => setTrecho(e.target.value as TrechoId | "")}>
            <option value="">Todos os trechos</option>
            {trechos.map((t) => <option key={t.id} value={t.id}>{t.nome}</option>)}
          </select>
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input type="checkbox" checked={cobertura} onChange={(e) => setCobertura(e.target.checked)} />
            Cobertura
          </label>
          <span className="text-sm text-zinc-400">
            <strong className="font-semibold text-zinc-100 tabular-nums">{filtradas.length}</strong> no mapa
          </span>
          <div className="ml-auto">
            <AoVivo atualizadoEm={atualizadoEm} rotulo="Posições a cada 5 s" />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-3 border-t border-zinc-800 pt-3 text-xs text-zinc-400">
          {Object.entries(COR_STATUS_MAPA).map(([s, cor]) => (
            <span key={s} className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: cor }} />
              {ROTULO_STATUS[s as StatusTrabalho]}
            </span>
          ))}
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full border border-red-400/60 bg-red-500/20" />
            Área de risco (viradores)
          </span>
          {cobertura && (
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full border border-blue-400 bg-blue-500/25" />
              Cobertura · raio <span className="tabular-nums">{raioCobertura}</span> m
            </span>
          )}
          <span className="ml-auto text-zinc-600">Ponto maior = maquinista</span>
        </div>
      </Card>

      <MapaLeaflet posicoes={filtradas} raioCoberturaM={cobertura ? raioCobertura : 0} />
    </div>
  );
}
