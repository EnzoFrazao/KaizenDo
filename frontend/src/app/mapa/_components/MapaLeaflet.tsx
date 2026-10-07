"use client";

// Leaflet puro, sem react-leaflet.
//
// Por quê: o MapContainer do react-leaflet cria o mapa num callback de ref, e não num
// efeito. Com o duplo-mount do StrictMode (React 19) o mesmo <div> era reaproveitado por
// uma segunda instância, o que gerava os erros "Map container is being reused by another
// instance", "Cannot read properties of null (reading '_targets')" e o appendChild de
// undefined no TileLayer. Criando o mapa dentro de um useEffect, o cleanup chama
// map.remove() e devolve o <div> limpo antes da remontagem.

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { CENTRO_TFPM, TRECHOS } from "@/lib/dados-mock";
import { COR_STATUS_MAPA, ROTULO_FUNCAO, ROTULO_STATUS } from "@/lib/rotulos";
import type { PosicaoAtual } from "@/lib/tipos";

// Tiles do OpenStreetMap, escurecidos por CSS (.leaflet-tile-pane em globals.css).
// Os basemaps escuros prontos (CARTO, Stadia) passaram a exigir chave de API; inverter
// o tile claro resolve sem depender de cadastro nem de chave em produção.
const TILES = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const CREDITO = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

/** Monta o popup com DOM, e não com string, para nome digitado no cadastro não virar HTML. */
function popupDaPessoa(p: PosicaoAtual) {
  const raiz = document.createElement("div");
  raiz.className = "guara-popup";

  const nome = document.createElement("strong");
  nome.textContent = p.pessoa.nome;
  raiz.append(nome);

  const linhas = [
    `${ROTULO_FUNCAO[p.pessoa.funcao]} · Turno ${p.pessoa.turno}`,
    `${ROTULO_STATUS[p.status]} · ${p.trecho} · ${p.velocidadeKmh} km/h`,
    `${p.dispositivo.id} · bateria ${p.dispositivo.bateriaPct}%`,
  ];
  for (const texto of linhas) {
    const linha = document.createElement("p");
    linha.textContent = texto;
    raiz.append(linha);
  }
  return raiz;
}

export default function MapaLeaflet({ posicoes }: { posicoes: PosicaoAtual[] }) {
  const elemento = useRef<HTMLDivElement>(null);
  const mapa = useRef<L.Map | null>(null);
  const camadaPessoas = useRef<L.LayerGroup | null>(null);

  // Cria o mapa uma única vez e o destrói no cleanup.
  useEffect(() => {
    if (!elemento.current) return;

    const m = L.map(elemento.current, { center: CENTRO_TFPM, zoom: 14 });
    L.tileLayer(TILES, { attribution: CREDITO, maxZoom: 19 }).addTo(m);

    // Enquadra o pátio inteiro, em vez de confiar num zoom fixo. Sem animação: na
    // primeira pintura não há o que animar, e um fitBounds animado deixa trabalho
    // agendado para depois, que é justamente o que não queremos num componente que
    // pode ser desmontado a qualquer momento.
    m.fitBounds(L.latLngBounds(TRECHOS.map((t) => t.centro)), { padding: [48, 48], animate: false });

    // Trechos: círculos provisórios até termos os polígonos reais do pátio.
    for (const t of TRECHOS) {
      L.circle(t.centro, {
        radius: t.areaDeRisco ? 80 : 90,
        color: t.areaDeRisco ? "#f87171" : "#52525b",
        weight: t.areaDeRisco ? 2 : 1,
        fillColor: t.areaDeRisco ? "#ef4444" : "#a1a1aa",
        fillOpacity: t.areaDeRisco ? 0.12 : 0.05,
      })
        .bindTooltip(t.nome)
        .addTo(m);
    }

    camadaPessoas.current = L.layerGroup().addTo(m);
    mapa.current = m;

    return () => {
      m.remove();
      mapa.current = null;
      camadaPessoas.current = null;
    };
  }, []);

  // Redesenha os pontos a cada atualização de posição.
  useEffect(() => {
    const camada = camadaPessoas.current;
    const m = mapa.current;
    // `map.remove()` faz `delete this._mapPane`, e aí qualquer conta de coordenada
    // estoura com "Cannot read properties of undefined (reading '_leaflet_pos')".
    // Como a tela recarrega as posições a cada 5 s e o Fast Refresh remonta o
    // componente em desenvolvimento, dá para cair aqui com o mapa já destruído:
    // `getPane` devolve undefined nesse caso, e é o sinal de que não há onde desenhar.
    if (!camada || !m || !m.getPane("mapPane")) return;
    camada.clearLayers();
    for (const p of posicoes) {
      L.circleMarker([p.lat, p.lon], {
        radius: p.pessoa.funcao === "maquinista" ? 8 : 6,
        color: "#09090b",
        weight: 2,
        fillColor: COR_STATUS_MAPA[p.status],
        fillOpacity: 1,
      })
        .bindPopup(popupDaPessoa(p))
        .addTo(camada);
    }
  }, [posicoes]);

  return <div ref={elemento} className="h-[560px] w-full rounded-lg border border-zinc-800" />;
}
