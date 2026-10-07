"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITENS = [
  { href: "/dashboard", rotulo: "Dashboard" },
  { href: "/mapa", rotulo: "Mapa ao vivo" },
  { href: "/historico", rotulo: "Histórico" },
  { href: "/cadastro", rotulo: "Cadastro" },
];

export function Sidebar() {
  const caminho = usePathname();
  return (
    <aside className="w-56 shrink-0 border-r border-slate-200 bg-white">
      <div className="px-5 py-6">
        <p className="text-lg font-bold text-slate-900">GUARÁ</p>
        <p className="text-xs text-slate-500">Posicionamento Operacional · TFPM</p>
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {ITENS.map((item) => {
          const ativo = caminho.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm ${
                ativo ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item.rotulo}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
