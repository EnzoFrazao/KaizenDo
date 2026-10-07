"use client";

// Navegação de celular e tablet (abaixo de lg, 1024 px), onde a barra lateral de 224 px não
// cabe. Muita gente chega aqui pelo QR code da apresentação, então as quatro telas ficam
// sempre visíveis numa barra de abas embaixo, ao alcance do polegar.

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icone } from "./Icone";
import { ITENS } from "./navegacao";

export function TopoMobile() {
  return (
    <header className="sticky top-0 z-40 flex items-center gap-2.5 border-b border-zinc-800 bg-zinc-950/95 px-4 pb-2.5 pt-[calc(0.625rem+env(safe-area-inset-top))] backdrop-blur lg:hidden">
      <Image src="/guara-marca.png" alt="" width={34} height={24} priority className="shrink-0" />
      <p className="text-base font-bold leading-none tracking-tight text-zinc-50">GUARÁ</p>
      <p className="ml-auto truncate text-xs text-zinc-500">Posicionamento · TFPM</p>
    </header>
  );
}

export function AbasMobile() {
  const caminho = usePathname();
  return (
    // z-40 basta: o mapa isola os z-index do Leaflet (ver MapaLeaflet.tsx).
    <nav
      aria-label="Telas"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-800 bg-zinc-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <ul className="mx-auto grid max-w-xl grid-cols-4">
        {ITENS.map((item) => {
          const ativo = caminho.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={ativo ? "page" : undefined}
                className={`flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                  ativo ? "text-zinc-50" : "text-zinc-500 active:text-zinc-200"
                }`}
              >
                <span
                  className={`flex h-7 w-12 items-center justify-center rounded-full transition-colors ${
                    ativo ? "bg-zinc-100 text-zinc-900" : ""
                  }`}
                >
                  <Icone nome={item.icone} className="h-5 w-5" />
                </span>
                {item.rotuloCurto}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
