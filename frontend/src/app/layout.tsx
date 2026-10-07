import type { Metadata } from "next";
import Script from "next/script";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "GUARÁ · Posicionamento Operacional",
  description: "Localização em tempo real de maquinistas e manobristas no TFPM",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased dark" style={{ colorScheme: "dark" }}>
      <body className="flex min-h-full flex-col bg-zinc-950 text-zinc-100 md:flex-row">
        <Sidebar />
        <main className="min-w-0 flex-1 overflow-x-hidden p-4 md:p-8">{children}</main>
        {/* VLibras (tradução para Libras do governo federal). O loader se inicializa
            sozinho: cria o botão flutuante à direita, fora da árvore do React, e só
            baixa o app do avatar quando alguém clica. */}
        <Script src="https://vlibras.gov.br/app/vlibras-plugin.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
