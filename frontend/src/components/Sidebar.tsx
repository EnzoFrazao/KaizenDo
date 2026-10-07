"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminAtual } from "@/lib/dados";

const ITENS = [
  { href: "/dashboard", rotulo: "Dashboard" },
  { href: "/mapa", rotulo: "Mapa ao vivo" },
  { href: "/historico", rotulo: "Histórico" },
  { href: "/cadastro", rotulo: "Cadastro" },
];

export function Sidebar() {
  const caminho = usePathname();
  // Protótipo sem login: o admin é fixo, só para deixar claro de quem é o sistema.
  const admin = adminAtual();
  return (
    // Fica presa na altura da tela para o bloco do admin não ir parar no fim da página.
    <aside className="sticky top-0 flex h-screen w-56 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="px-5 py-6">
        <p className="text-lg font-bold tracking-tight text-zinc-50">GUARÁ</p>
        <p className="text-xs text-zinc-500">Posicionamento Operacional · TFPM</p>
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {ITENS.map((item) => {
          const ativo = caminho.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={ativo ? "page" : undefined}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                ativo ? "bg-zinc-100 font-medium text-zinc-900" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
              }`}
            >
              {item.rotulo}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-zinc-800 px-5 py-4">
        <span className="inline-block rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-300">
          Administrador
        </span>
        <p className="mt-2 text-sm font-medium text-zinc-100">{admin.nome}</p>
        <p className="text-xs text-zinc-500">{admin.cargo}</p>
        <p className="font-mono text-xs text-zinc-600">{admin.matricula}</p>
      </div>
    </aside>
  );
}
