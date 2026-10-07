// Camada de acesso a dados. HOJE devolve dados fictícios de dados-mock.ts.
// Quando o backend existir, só este arquivo muda (troca por fetch na API);
// as páginas continuam chamando as mesmas funções.
// Contrato da API: docs/arquitetura.md

import { ALERTAS, DISPOSITIVOS, LEITURAS, PESSOAS, TRECHOS } from "./dados-mock";
import type {
  Alerta,
  Dispositivo,
  FiltrosHistorico,
  Leitura,
  Pessoa,
  PosicaoAtual,
  Trecho,
} from "./tipos";

const atraso = <T,>(valor: T) => new Promise<T>((r) => setTimeout(() => r(valor), 150));

/** GET /api/trechos */
export async function listarTrechos(): Promise<Trecho[]> {
  return atraso(TRECHOS);
}

/** GET /api/pessoas */
export async function listarPessoas(): Promise<Pessoa[]> {
  return atraso(PESSOAS);
}

/** GET /api/dispositivos */
export async function listarDispositivos(): Promise<Dispositivo[]> {
  return atraso(DISPOSITIVOS);
}

/** GET /api/posicoes/atual — última leitura de cada pessoa com dispositivo. */
export async function posicoesAtuais(): Promise<PosicaoAtual[]> {
  const ultima = new Map<string, Leitura>();
  for (const l of LEITURAS) ultima.set(l.pessoaId, l);
  const posicoes: PosicaoAtual[] = [];
  for (const [pessoaId, leitura] of ultima) {
    const pessoa = PESSOAS.find((p) => p.id === pessoaId)!;
    const dispositivo = DISPOSITIVOS.find((d) => d.id === leitura.dispositivoId)!;
    posicoes.push({ ...leitura, pessoa, dispositivo });
  }
  return atraso(posicoes);
}

/** GET /api/historico?nome=&turno=&funcao=&status=&trecho=&dia= */
export async function historico(filtros: FiltrosHistorico = {}): Promise<(Leitura & { pessoa: Pessoa })[]> {
  const nome = filtros.nome?.toLowerCase().trim();
  const resultado = LEITURAS.flatMap((l) => {
    const pessoa = PESSOAS.find((p) => p.id === l.pessoaId)!;
    if (nome && !pessoa.nome.toLowerCase().includes(nome)) return [];
    if (filtros.turno && pessoa.turno !== filtros.turno) return [];
    if (filtros.funcao && pessoa.funcao !== filtros.funcao) return [];
    if (filtros.status && l.status !== filtros.status) return [];
    if (filtros.trecho && l.trecho !== filtros.trecho) return [];
    if (filtros.dia && !l.timestamp.startsWith(filtros.dia)) return [];
    return [{ ...l, pessoa }];
  });
  return atraso(resultado.reverse());
}

/** GET /api/alertas?ativos=true */
export async function listarAlertas(somenteAtivos = false): Promise<Alerta[]> {
  return atraso(somenteAtivos ? ALERTAS.filter((a) => a.fim === null) : ALERTAS);
}

/** PUT /api/vinculos — vincula (ou desvincula, com dispositivoId null) uma pessoa a um ESP32. */
export async function vincularDispositivo(pessoaId: string, dispositivoId: string | null): Promise<void> {
  const pessoa = PESSOAS.find((p) => p.id === pessoaId);
  if (!pessoa) throw new Error("Pessoa não encontrada");
  const anterior = DISPOSITIVOS.find((d) => d.pessoaId === pessoaId);
  if (anterior) anterior.pessoaId = null;
  if (dispositivoId) {
    const novo = DISPOSITIVOS.find((d) => d.id === dispositivoId);
    if (!novo) throw new Error("Dispositivo não encontrado");
    if (novo.pessoaId && novo.pessoaId !== pessoaId) throw new Error("Dispositivo já vinculado a outra pessoa");
    novo.pessoaId = pessoaId;
  }
  pessoa.dispositivoId = dispositivoId;
  return atraso(undefined);
}

/** POST /api/pessoas */
export async function cadastrarPessoa(dados: Omit<Pessoa, "id" | "ativo">): Promise<Pessoa> {
  const pessoa: Pessoa = { ...dados, id: `P${String(PESSOAS.length + 1).padStart(3, "0")}`, ativo: true };
  PESSOAS.push(pessoa);
  return atraso(pessoa);
}

/** POST /api/dispositivos */
export async function cadastrarDispositivo(id: string, mac: string): Promise<Dispositivo> {
  const d: Dispositivo = { id, mac, bateriaPct: 100, ultimoSinal: new Date().toISOString(), firmware: "0.1.0", pessoaId: null };
  DISPOSITIVOS.push(d);
  return atraso(d);
}
