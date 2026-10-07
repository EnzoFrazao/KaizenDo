"use client";

import "leaflet/dist/leaflet.css";
import { Circle, CircleMarker, MapContainer, Popup, TileLayer, Tooltip } from "react-leaflet";
import { CENTRO_TFPM, TRECHOS } from "@/lib/dados-mock";
import { COR_STATUS_MAPA, ROTULO_FUNCAO, ROTULO_STATUS } from "@/lib/rotulos";
import type { PosicaoAtual } from "@/lib/tipos";

export default function MapaLeaflet({ posicoes }: { posicoes: PosicaoAtual[] }) {
  return (
    <MapContainer center={CENTRO_TFPM} zoom={14} className="h-[560px] w-full rounded-lg border border-slate-200">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Trechos: círculos provisórios até termos os polígonos reais. Áreas de risco em vermelho. */}
      {TRECHOS.map((t) => (
        <Circle
          key={t.id}
          center={t.centro}
          radius={300}
          pathOptions={{ color: t.areaDeRisco ? "#dc2626" : "#94a3b8", weight: 1, fillOpacity: 0.05 }}
        >
          <Tooltip>{t.nome}</Tooltip>
        </Circle>
      ))}

      {posicoes.map((p) => (
        <CircleMarker
          key={p.pessoaId}
          center={[p.lat, p.lon]}
          radius={p.pessoa.funcao === "maquinista" ? 8 : 6}
          pathOptions={{ color: "#ffffff", weight: 2, fillColor: COR_STATUS_MAPA[p.status], fillOpacity: 1 }}
        >
          <Popup>
            <strong>{p.pessoa.nome}</strong>
            <br />
            {ROTULO_FUNCAO[p.pessoa.funcao]} · Turno {p.pessoa.turno}
            <br />
            {ROTULO_STATUS[p.status]} · {p.trecho} · {p.velocidadeKmh} km/h
            <br />
            {p.dispositivo.id} · bateria {p.dispositivo.bateriaPct}%
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
