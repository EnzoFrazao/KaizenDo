"use client";

// Ponto de partida da página. Veja o que construir em ../README.md.

import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { listarDispositivos, listarPessoas, vincularDispositivo } from "@/lib/api";
import { ROTULO_FUNCAO } from "@/lib/rotulos";
import type { Dispositivo, Pessoa } from "@/lib/tipos";

export function CadastroView() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [dispositivos, setDispositivos] = useState<Dispositivo[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    const [ps, ds] = await Promise.all([listarPessoas(), listarDispositivos()]);
    setPessoas([...ps]);
    setDispositivos([...ds]);
  }, []);

  useEffect(() => {
    Promise.all([listarPessoas(), listarDispositivos()]).then(([ps, ds]) => {
      setPessoas([...ps]);
      setDispositivos([...ds]);
    });
  }, []);

  const livres = dispositivos.filter((d) => !d.pessoaId);

  async function trocar(pessoaId: string, dispositivoId: string) {
    setErro(null);
    try {
      await vincularDispositivo(pessoaId, dispositivoId || null);
      await carregar();
    } catch (e) {
      setErro((e as Error).message);
    }
  }

  return (
    <div className="grid gap-4">
      {/* TODO: formulários "Nova pessoa" e "Novo dispositivo" (api.cadastrarPessoa / api.cadastrarDispositivo). */}
      <Card titulo={`Dispositivos livres: ${livres.length}`}>
        <p className="text-sm text-slate-600">{livres.map((d) => d.id).join(", ") || "Nenhum"}</p>
      </Card>

      {erro && <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{erro}</p>}

      <Card titulo="Pessoas e dispositivos vinculados">
        <table className="w-full text-left text-sm">
          <thead className="text-slate-500">
            <tr>
              <th className="py-2">Nome</th>
              <th>Matrícula</th>
              <th>Função</th>
              <th>Turno</th>
              <th>ESP32 vinculado</th>
            </tr>
          </thead>
          <tbody>
            {pessoas.map((p) => (
              <tr key={p.id} className="border-t border-slate-100">
                <td className="py-2">{p.nome}</td>
                <td>{p.matricula}</td>
                <td>{ROTULO_FUNCAO[p.funcao]}</td>
                <td>{p.turno}</td>
                <td>
                  <select
                    className="rounded border border-slate-300 px-2 py-1"
                    value={p.dispositivoId ?? ""}
                    onChange={(e) => trocar(p.id, e.target.value)}
                  >
                    <option value="">Sem dispositivo</option>
                    {p.dispositivoId && <option value={p.dispositivoId}>{p.dispositivoId}</option>}
                    {livres.map((d) => (
                      <option key={d.id} value={d.id}>{d.id}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
