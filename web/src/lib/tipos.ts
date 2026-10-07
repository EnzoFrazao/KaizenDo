// Tipos compartilhados por todas as telas.
// Espelham o contrato da API descrito em docs/arquitetura.md.
// Quem mudar algo aqui avisa o time: todas as páginas dependem destes tipos.

export type Funcao = "maquinista" | "manobrista";

/** Turnos de trabalho. Horários provisórios até a Vale confirmar a escala real. */
export type Turno = "A" | "B" | "C";

/** Situação de trabalho de uma pessoa, inferida pela posição e pela velocidade. */
export type StatusTrabalho =
  | "livre"
  | "em_atividade"
  | "deslocando"
  | "pausa"
  | "sem_sinal";

/** Trechos entre os "X" do mapa oficial e as áreas nomeadas do terminal. */
export type TrechoId =
  | "X01"
  | "X02"
  | "X03"
  | "X05"
  | "X06"
  | "X07"
  | "VIRADORES"
  | "RECEPCAO"
  | "FORMACAO"
  | "ESTACIONAMENTO"
  | "OFICINA"
  | "CTMR";

export interface Trecho {
  id: TrechoId;
  nome: string;
  /** Área de risco (ex.: basculamento): dispara o bloqueio de segurança. */
  areaDeRisco: boolean;
  /** Centro aproximado, usado no mapa até termos o polígono real. */
  centro: [number, number];
}

export interface Pessoa {
  id: string;
  nome: string;
  matricula: string;
  funcao: Funcao;
  turno: Turno;
  /** ESP32 vinculado. null quando a pessoa ainda não tem dispositivo. */
  dispositivoId: string | null;
  ativo: boolean;
}

/** Transmissor ESP32 (GPS + rádio) que a pessoa carrega. */
export interface Dispositivo {
  id: string; // ex.: "ESP32-0A1B"
  mac: string;
  bateriaPct: number;
  /** ISO 8601 do último pacote recebido pelo Raspberry Pi. */
  ultimoSinal: string;
  firmware: string;
  pessoaId: string | null;
}

/** Uma leitura recebida pelo Raspberry Pi e já enriquecida pelo backend. */
export interface Leitura {
  dispositivoId: string;
  pessoaId: string;
  timestamp: string; // ISO 8601
  lat: number;
  lon: number;
  velocidadeKmh: number;
  trecho: TrechoId;
  status: StatusTrabalho;
}

export type TipoAlerta =
  | "area_de_risco"
  | "pessoa_isolada"
  | "sem_sinal"
  | "bateria_baixa";

export interface Alerta {
  id: string;
  tipo: TipoAlerta;
  pessoaId: string;
  trecho: TrechoId;
  inicio: string;
  fim: string | null;
}

/** Posição atual de uma pessoa (última leitura + dados da pessoa). */
export interface PosicaoAtual extends Leitura {
  pessoa: Pessoa;
  dispositivo: Dispositivo;
}

export interface FiltrosHistorico {
  nome?: string;
  turno?: Turno;
  funcao?: Funcao;
  status?: StatusTrabalho;
  trecho?: TrechoId;
  /** Dia no formato AAAA-MM-DD. */
  dia?: string;
}
