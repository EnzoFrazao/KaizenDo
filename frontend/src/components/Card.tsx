import type { ReactNode } from "react";

export function Card({
  titulo,
  acao,
  children,
  className = "",
}: {
  titulo?: string;
  /** Conteúdo alinhado à direita do título (filtro, contador, botão). */
  acao?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-lg border border-zinc-800 bg-zinc-900 p-4 ${className}`}>
      {(titulo || acao) && (
        <div className="mb-3 flex items-center justify-between gap-3">
          {titulo && <h2 className="text-sm font-medium text-zinc-400">{titulo}</h2>}
          {acao}
        </div>
      )}
      {children}
    </section>
  );
}
