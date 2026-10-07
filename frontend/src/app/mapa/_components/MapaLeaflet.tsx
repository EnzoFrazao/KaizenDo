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

// Cobertura ("radar" em volta de cada pessoa). Os círculos são desenhados opacos num pane
// próprio e o filtro SVG #guara-gosma, aplicado ao grupo inteiro (globals.css), borra e
// recorta o conjunto: círculos próximos se fundem numa forma única, como uma gosma. A
// transparência vem depois da fusão, então 50 círculos sobrepostos não escurecem.
const COR_COBERTURA = "#3b82f6";

/** Filtro da gosma: borra, aplica limiar no alfa (funde), separa a borda e clareia o miolo. */
function FiltroGosma() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <filter id="guara-gosma" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="borrao" />
        <feColorMatrix in="borrao" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="gosma" />
        <feMorphology in="gosma" operator="erode" radius="2" result="miolo" />
        <feComposite in="gosma" in2="miolo" operator="out" result="borda" />
        <feComponentTransfer in="gosma" result="preenchimento">
          <feFuncA type="linear" slope="0.18" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="preenchimento" />
          <feMergeNode in="borda" />
        </feMerge>
      </filter>
    </svg>
  );
}

export default function MapaLeaflet({ posicoes, raioCoberturaM }: { posicoes: PosicaoAtual[]; raioCoberturaM: number }) {
  const elemento = useRef<HTMLDivElement>(null);
  const mapa = useRef<L.Map | null>(null);
  const camadaPessoas = useRef<L.LayerGroup | null>(null);
  const camadaGosma = useRef<L.LayerGroup | null>(null);
  const camadaPulso = useRef<L.LayerGroup | null>(null);
  const renderers = useRef<{ gosma: L.Renderer; pulso: L.Renderer } | null>(null);

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

    // Panes da cobertura: acima dos tiles (200) e abaixo dos trechos e pessoas (400), sem
    // capturar clique, para os popups continuarem funcionando por cima da gosma.
    for (const [nome, z] of [["radar", "350"], ["radarPulso", "360"]] as const) {
      const pane = m.createPane(nome);
      pane.style.zIndex = z;
      pane.style.pointerEvents = "none";
    }
    // Um renderer por pane, criado uma vez: cada um tem o próprio <svg>, e o filtro vale só
    // para o da gosma. Criar renderer a cada redesenho deixaria um <svg> órfão a cada 5 s.
    renderers.current = { gosma: L.svg({ pane: "radar" }), pulso: L.svg({ pane: "radarPulso" }) };
    camadaGosma.current = L.layerGroup().addTo(m);
    camadaPulso.current = L.layerGroup().addTo(m);
    camadaPessoas.current = L.layerGroup().addTo(m);
    mapa.current = m;

    return () => {
      m.remove();
      mapa.current = null;
      camadaPessoas.current = null;
      camadaGosma.current = null;
      camadaPulso.current = null;
      renderers.current = null;
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
    const gosma = camadaGosma.current;
    const pulso = camadaPulso.current;
    const r = renderers.current;
    if (!camada || !gosma || !pulso || !r || !m || !m.getPane("mapPane")) return;
    camada.clearLayers();
    gosma.clearLayers();
    pulso.clearLayers();

    if (raioCoberturaM > 0) {
      for (const p of posicoes) {
        L.circle([p.lat, p.lon], {
          renderer: r.gosma,
          radius: raioCoberturaM,
          stroke: false,
          fillColor: COR_COBERTURA,
          fillOpacity: 1,
          interactive: false,
        }).addTo(gosma);
        L.circle([p.lat, p.lon], {
          renderer: r.pulso,
          radius: raioCoberturaM,
          color: COR_COBERTURA,
          weight: 1.5,
          fill: false,
          interactive: false,
          className: "guara-radar-pulso",
        }).addTo(pulso);
      }
    }

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
  }, [posicoes, raioCoberturaM]);

  return (
    <>
      <FiltroGosma />
      <div ref={elemento} className="h-[560px] w-full rounded-lg border border-zinc-800" />
    </>
  );
}
