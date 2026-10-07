import { PageHeader } from "@/components/PageHeader";
import { CadastroView } from "./_components/CadastroView";

export default function CadastroPage() {
  return (
    <>
      <PageHeader titulo="Cadastro" descricao="Cadastre pessoas e dispositivos ESP32 e vincule cada pessoa ao seu transmissor." />
      <CadastroView />
    </>
  );
}
