import type { ReactNode } from "react";

export function Card({ titulo, children, className = "" }: { titulo?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-lg border border-slate-200 bg-white p-4 ${className}`}>
      {titulo && <h2 className="mb-3 text-sm font-medium text-slate-500">{titulo}</h2>}
      {children}
    </section>
  );
}
