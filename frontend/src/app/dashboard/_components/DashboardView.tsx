"use client";

// Ponto de partida da página. Veja o que construir em ../README.md.

import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { StatusBadge } from "@/components/StatusBadge";
import { listarAlertas, listarTrechos, posicoesAtuais } from "@/lib/dados";
import { ROTULO_ALERTA } from "@/lib/rotulos";
import type { Alerta, PosicaoAtual, StatusTrabalho, Trecho } from "@/lib/tipos";

const ORDEM_STATUS: StatusTrabalho[] = ["livre", "em_atividade", "deslocando", "pausa", "sem_sinal"];

export function DashboardView() {
  const [posicoes, setPosicoes] = useState<PosicaoAtual[]>([]);
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [trechos, setTrechos] = useState<Trecho[]>([]);

  useEffect(() => {
    posicoesAtuais().then(setPosicoes);
    listarAlertas(true).then(setAlertas);
    listarTrechos().then(setTrechos);
  }, []);

  const porStatus = (s: StatusTrabalho) => posicoes.filter((p) => p.status === s).length;
  const bateriaBaixa = posicoes.filter((p) => p.dispositivo.bateriaPct < 20).length;

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card titulo="Pessoas com dispositivo ativo">
          <p className="text-3xl font-semibold">{posicoes.length}</p>
        </Card>
        <Card titulo="Alertas ativos">
          <p className="text-3xl font-semibold text-red-700">{alertas.length}</p>
        </Card>
        <Card titulo="Sem sinal">
          <p className="text-3xl font-semibold">{porStatus("sem_sinal")}</p>
        </Card>
        <Card titulo="Bateria abaixo de 20%">
          <p className="text-3xl font-semibold">{bateriaBaixa}</p>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card titulo="Pessoas por status">
          <ul className="space-y-2">
            {ORDEM_STATUS.map((s) => (
              <li key={s} className="flex items-center justify-between">
                <StatusBadge status={s} />
                <span className="font-medium">{porStatus(s)}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card titulo="Alertas ativos">
          {alertas.length === 0 ? (
            <p className="text-sm text-slate-500">Nenhum alerta ativo.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {alertas.map((a) => (
                <li key={a.id} className="rounded border border-red-200 bg-red-50 px-3 py-2">
                  <strong>{ROTULO_ALERTA[a.tipo]}</strong> · {a.pessoaId} · {a.trecho}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card titulo="Ocupação por trecho">
        {/* TODO: trocar por um gráfico de barras ou mapa de calor. */}
        <ul className="grid grid-cols-2 gap-2 text-sm md:grid-cols-4">
          {trechos.map((t) => (
            <li key={t.id} className="flex justify-between rounded bg-slate-50 px-3 py-2">
              <span>{t.nome}</span>
              <span className="font-medium">{posicoes.filter((p) => p.trecho === t.id).length}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
