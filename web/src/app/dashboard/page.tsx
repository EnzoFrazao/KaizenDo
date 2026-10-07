import { PageHeader } from "@/components/PageHeader";
import { DashboardView } from "./_components/DashboardView";

export default function DashboardPage() {
  return (
    <>
      <PageHeader titulo="Dashboard de monitoramento" descricao="Visão geral do turno: pessoas, status, alertas e ocupação dos trechos." />
      <DashboardView />
    </>
  );
}
