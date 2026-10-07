import type { ReactNode } from "react";

export function PageHeader({
  titulo,
  descricao,
  acao,
}: {
  titulo: string;
  descricao?: string;
  /** Conteúdo à direita do título (indicador "ao vivo", botão, contador). */
  acao?: ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-50">{titulo}</h1>
        {descricao && <p className="mt-1 text-sm text-zinc-400">{descricao}</p>}
      </div>
      {acao}
    </header>
  );
}
