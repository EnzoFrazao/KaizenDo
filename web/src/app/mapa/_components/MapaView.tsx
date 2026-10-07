"use client";

// Ponto de partida da página. Veja o que construir em ../README.md.
// O Leaflet usa `window`, então o mapa é carregado só no navegador (ssr: false).

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/Card";
import { posicoesAtuais } from "@/lib/api";
import { COR_STATUS_MAPA, ROTULO_FUNCAO, ROTULO_STATUS } from "@/lib/rotulos";
import type { Funcao, PosicaoAtual, StatusTrabalho } from "@/lib/tipos";

const MapaLeaflet = dynamic(() => import("./MapaLeaflet"), {
  ssr: false,
  loading: () => <div className="h-[560px] animate-pulse rounded bg-slate-100" />,
});

const INTERVALO_MS = 5000;

export function MapaView() {
  const [posicoes, setPosicoes] = useState<PosicaoAtual[]>([]);
  const [funcao, setFuncao] = useState<Funcao | "">("");
  const [status, setStatus] = useState<StatusTrabalho | "">("");
  const [busca, setBusca] = useState("");

  // TODO: quando houver backend, trocar o polling por WebSocket/SSE.
  useEffect(() => {
    const atualizar = () => posicoesAtuais().then(setPosicoes);
    atualizar();
    const id = setInterval(atualizar, INTERVALO_MS);
    return () => clearInterval(id);
  }, []);

  const filtradas = useMemo(
    () =>
      posicoes.filter(
        (p) =>
          (!funcao || p.pessoa.funcao === funcao) &&
          (!status || p.status === status) &&
          (!busca || p.pessoa.nome.toLowerCase().includes(busca.toLowerCase())),
      ),
    [posicoes, funcao, status, busca],
  );

  const campo = "rounded border border-slate-300 bg-white px-2 py-1.5 text-sm";

  return (
    <div className="grid gap-4">
      <Card>
        <div className="flex flex-wrap items-center gap-3">
          <input className={campo} placeholder="Buscar pessoa" onChange={(e) => setBusca(e.target.value)} />
          <select className={campo} onChange={(e) => setFuncao(e.target.value as Funcao | "")}>
            <option value="">Todas as funções</option>
            {Object.entries(ROTULO_FUNCAO).map(([v, r]) => <option key={v} value={v}>{r}</option>)}
          </select>
          <select className={campo} onChange={(e) => setStatus(e.target.value as StatusTrabalho | "")}>
            <option value="">Todos os status</option>
            {Object.entries(ROTULO_STATUS).map(([v, r]) => <option key={v} value={v}>{r}</option>)}
          </select>
          <span className="text-sm text-slate-500">{filtradas.length} pessoas no mapa</span>
          <div className="ml-auto flex flex-wrap gap-3 text-xs">
            {Object.entries(COR_STATUS_MAPA).map(([s, cor]) => (
              <span key={s} className="flex items-center gap-1">
                <span className="inline-block h-3 w-3 rounded-full" style={{ background: cor }} />
                {ROTULO_STATUS[s as StatusTrabalho]}
              </span>
            ))}
          </div>
        </div>
      </Card>
      <MapaLeaflet posicoes={filtradas} />
    </div>
  );
}
