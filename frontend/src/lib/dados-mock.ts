// Dados ILUSTRATIVOS para o protótipo visual.
// Coordenadas aproximadas da região do TFPM, só para o mapa ter onde desenhar.
// Tudo é gerado com semente fixa, para servidor e navegador produzirem os mesmos dados.

import type {
  Admin,
  Alerta,
  Dispositivo,
  Funcao,
  Leitura,
  Pessoa,
  StatusTrabalho,
  Trecho,
  TrechoId,
  Turno,
} from "./tipos";

/** Gerador pseudoaleatório determinístico (mulberry32). */
function criarAleatorio(semente: number) {
  let a = semente;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Único usuário do sistema, fixo. O protótipo não tem login de propósito: quem avalia
 * abre a URL e o sistema já está funcionando. Ver src/app/cadastro/README.md.
 */
export const ADMIN_ATUAL: Admin = {
  id: "A001",
  nome: "Helena Marques",
  matricula: "800147",
  cargo: "Coordenação de turno · CCO",
};

// Cada centro abaixo é um ponto REAL da malha, tirado do OpenStreetMap: centroides de
// vias com service=yard da Estrada de Ferro Carajás em São Luís, escolhidos ao longo do
// feixe de linhas. Por isso as pessoas caem sobre os trilhos, e não no mar como antes.
//
// A ordem é a da operação: o trem chega na Recepção (sudeste), é formado, sobe pelos
// trechos X e termina nos Viradores, na ponta do terminal (noroeste).
// Ainda é aproximação: o polígono de cada trecho só sai com a planta oficial da Vale.

/** Centro aproximado do pátio. O mapa ajusta o enquadramento pelos trechos. */
export const CENTRO_TFPM: [number, number] = [-2.5853, -44.3434];

export const TRECHOS: Trecho[] = [
  { id: "VIRADORES", nome: "Pátio dos Viradores", areaDeRisco: true, centro: [-2.56540, -44.36972] },
  { id: "OFICINA", nome: "Oficina Central", areaDeRisco: false, centro: [-2.56813, -44.36564] },
  { id: "CTMR", nome: "CTMR", areaDeRisco: false, centro: [-2.57161, -44.35943] },
  { id: "X07", nome: "Trecho X07", areaDeRisco: false, centro: [-2.57078, -44.35502] },
  { id: "X06", nome: "Trecho X06", areaDeRisco: false, centro: [-2.57605, -44.35057] },
  { id: "X05", nome: "Trecho X05", areaDeRisco: false, centro: [-2.57780, -44.34321] },
  { id: "ESTACIONAMENTO", nome: "Estacionamento", areaDeRisco: false, centro: [-2.57908, -44.33884] },
  { id: "X03", nome: "Trecho X03", areaDeRisco: false, centro: [-2.57883, -44.33414] },
  { id: "X02", nome: "Trecho X02", areaDeRisco: false, centro: [-2.58517, -44.32853] },
  { id: "X01", nome: "Trecho X01", areaDeRisco: false, centro: [-2.58844, -44.32363] },
  { id: "FORMACAO", nome: "Formação", areaDeRisco: false, centro: [-2.59790, -44.32087] },
  { id: "RECEPCAO", nome: "Pátio de Recepção", areaDeRisco: false, centro: [-2.60527, -44.31711] },
];

const NOMES = [
  "Ana", "Bruno", "Carla", "Diego", "Elaine", "Fábio", "Gabriela", "Hugo", "Iara", "João",
  "Karina", "Lucas", "Marcela", "Nelson", "Olívia", "Paulo", "Queila", "Rafael", "Sabrina", "Tiago",
  "Úrsula", "Vinícius", "Wesley", "Ximena", "Yuri",
];
const SOBRENOMES = ["Silva", "Souza", "Costa", "Pereira", "Ribeiro", "Almeida", "Lima", "Araújo", "Carvalho", "Gomes"];

/** Data base dos dados fictícios. */
export const DIA_BASE = "2026-10-07";

const rand = criarAleatorio(42);
const escolher = <T,>(lista: readonly T[]) => lista[Math.floor(rand() * lista.length)];

/** 50 pessoas: proporção maquinista/manobrista provisória (pergunta P6.3). */
export const PESSOAS: Pessoa[] = Array.from({ length: 50 }, (_, i) => {
  const funcao: Funcao = i < 15 ? "maquinista" : "manobrista";
  const turno: Turno = (["A", "B", "C"] as const)[i % 3];
  return {
    id: `P${String(i + 1).padStart(3, "0")}`,
    nome: `${NOMES[i % NOMES.length]} ${escolher(SOBRENOMES)}`,
    matricula: String(810000 + i * 37),
    funcao,
    turno,
    // As duas últimas pessoas ficam sem dispositivo, para a tela de cadastro ter o que vincular.
    // 4 dígitos hexadecimais, como na etiqueta real e no exemplo do tipo Dispositivo.
    dispositivoId: i < 48 ? `ESP32-${(0x0a00 + i).toString(16).toUpperCase().padStart(4, "0")}` : null,
    ativo: true,
  };
});

/** Dispositivos: um por pessoa vinculada, mais 3 livres no estoque. */
export const DISPOSITIVOS: Dispositivo[] = [
  ...PESSOAS.filter((p) => p.dispositivoId).map((p, i) => ({
    id: p.dispositivoId as string,
    mac: `24:6F:28:${(0x10 + i).toString(16).toUpperCase()}:A1:${(0x20 + i).toString(16).toUpperCase()}`,
    bateriaPct: Math.round(15 + rand() * 85),
    ultimoSinal: `${DIA_BASE}T10:${String(Math.floor(rand() * 59)).padStart(2, "0")}:00-03:00`,
    firmware: "0.1.0",
    pessoaId: p.id,
  })),
  ...["ESP32-0B01", "ESP32-0B02", "ESP32-0B03"].map((id, i) => ({
    id,
    mac: `24:6F:28:FF:B0:0${i + 1}`,
    bateriaPct: 100,
    ultimoSinal: `${DIA_BASE}T06:00:00-03:00`,
    firmware: "0.1.0",
    pessoaId: null,
  })),
];

const STATUS: StatusTrabalho[] = ["livre", "em_atividade", "em_atividade", "deslocando", "pausa"];

function velocidadePara(status: StatusTrabalho, funcao: Funcao) {
  if (status === "deslocando") return funcao === "maquinista" ? 10 + rand() * 20 : 3 + rand() * 3;
  if (status === "em_atividade" && funcao === "maquinista") return rand() * 10;
  return rand() * 0.8;
}

/** Espalha a pessoa perto do centro do trecho, sem sair do feixe de linhas (~150 m). */
function pontoPerto(trecho: TrechoId): [number, number] {
  const t = TRECHOS.find((x) => x.id === trecho)!;
  return [t.centro[0] + (rand() - 0.5) * 0.0026, t.centro[1] + (rand() - 0.5) * 0.0026];
}

/** Gera leituras a cada 10 min das 06h às 22h do dia base. */
function gerarHistorico(): Leitura[] {
  const leituras: Leitura[] = [];
  for (const p of PESSOAS) {
    if (!p.dispositivoId) continue;
    let trecho = escolher(TRECHOS).id;
    for (let min = 6 * 60; min <= 22 * 60; min += 10) {
      if (rand() < 0.2) trecho = escolher(TRECHOS).id;
      const status = rand() < 0.03 ? "sem_sinal" : escolher(STATUS);
      const [lat, lon] = pontoPerto(trecho);
      const hh = String(Math.floor(min / 60)).padStart(2, "0");
      const mm = String(min % 60).padStart(2, "0");
      leituras.push({
        dispositivoId: p.dispositivoId,
        pessoaId: p.id,
        timestamp: `${DIA_BASE}T${hh}:${mm}:00-03:00`,
        lat,
        lon,
        velocidadeKmh: Math.round(velocidadePara(status, p.funcao) * 10) / 10,
        trecho,
        status,
      });
    }
  }
  // Gerado pessoa por pessoa, mas o histórico é cronológico: sem ordenar por horário,
  // a tabela e a reprodução mostrariam uma pessoa de cada vez, e não o turno acontecendo.
  return leituras.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}

/** Leituras do dia, da mais antiga para a mais recente. */
export const LEITURAS: Leitura[] = gerarHistorico();

export const ALERTAS: Alerta[] = [
  { id: "AL1", tipo: "area_de_risco", pessoaId: "P021", trecho: "VIRADORES", inicio: `${DIA_BASE}T10:12:00-03:00`, fim: null },
  { id: "AL2", tipo: "pessoa_isolada", pessoaId: "P033", trecho: "X03", inicio: `${DIA_BASE}T09:58:00-03:00`, fim: null },
  { id: "AL3", tipo: "bateria_baixa", pessoaId: "P007", trecho: "OFICINA", inicio: `${DIA_BASE}T09:40:00-03:00`, fim: null },
  { id: "AL4", tipo: "sem_sinal", pessoaId: "P044", trecho: "X07", inicio: `${DIA_BASE}T08:15:00-03:00`, fim: `${DIA_BASE}T08:31:00-03:00` },
];
