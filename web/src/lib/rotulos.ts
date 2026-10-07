import type { Funcao, StatusTrabalho, TipoAlerta, Turno } from "./tipos";

export const ROTULO_STATUS: Record<StatusTrabalho, string> = {
  livre: "Livre",
  em_atividade: "Em atividade",
  deslocando: "Deslocando",
  pausa: "Em pausa",
  sem_sinal: "Sem sinal",
};

/** Classes Tailwind de cada status. Use sempre estas para manter as telas consistentes. */
export const COR_STATUS: Record<StatusTrabalho, string> = {
  livre: "bg-emerald-100 text-emerald-800",
  em_atividade: "bg-blue-100 text-blue-800",
  deslocando: "bg-amber-100 text-amber-800",
  pausa: "bg-slate-200 text-slate-700",
  sem_sinal: "bg-red-100 text-red-800",
};

/** Cor dos pontos no mapa. */
export const COR_STATUS_MAPA: Record<StatusTrabalho, string> = {
  livre: "#059669",
  em_atividade: "#2563eb",
  deslocando: "#d97706",
  pausa: "#64748b",
  sem_sinal: "#dc2626",
};

export const ROTULO_FUNCAO: Record<Funcao, string> = {
  maquinista: "Maquinista",
  manobrista: "Manobrista",
};

export const ROTULO_TURNO: Record<Turno, string> = {
  A: "Turno A (07h–15h)",
  B: "Turno B (15h–23h)",
  C: "Turno C (23h–07h)",
};

export const ROTULO_ALERTA: Record<TipoAlerta, string> = {
  area_de_risco: "Pessoa em área de risco",
  pessoa_isolada: "Pessoa isolada parada",
  sem_sinal: "Dispositivo sem sinal",
  bateria_baixa: "Bateria baixa",
};
