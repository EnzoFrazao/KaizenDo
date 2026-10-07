export function PageHeader({ titulo, descricao }: { titulo: string; descricao?: string }) {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-semibold text-slate-900">{titulo}</h1>
      {descricao && <p className="mt-1 text-sm text-slate-500">{descricao}</p>}
    </header>
  );
}
