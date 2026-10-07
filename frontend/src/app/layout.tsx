import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { AbasMobile, TopoMobile } from "@/components/NavMobile";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "GUARÁ · Posicionamento Operacional",
  description: "Localização em tempo real de maquinistas e manobristas no TFPM",
};

// Muita gente abre pelo celular, via QR code. `viewportFit: cover` deixa o fundo escuro ir
// até as bordas do iPhone; as barras compensam com env(safe-area-inset-*). O zoom do
// usuário fica liberado de propósito (acessibilidade).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased dark" style={{ colorScheme: "dark" }}>
      <body className="flex min-h-full flex-col bg-zinc-950 text-zinc-100 lg:flex-row">
        <Sidebar />
        <TopoMobile />
        {/* No celular, o padding de baixo reserva a altura das abas (3.5rem) + a área segura. */}
        <main className="min-w-0 flex-1 overflow-x-hidden px-4 pt-4 pb-[calc(5rem+env(safe-area-inset-bottom))] sm:px-6 lg:p-8">
          {children}
        </main>
        <AbasMobile />
        {/* VLibras (tradução para Libras do governo federal). O loader se inicializa
            sozinho: cria o botão flutuante à direita, fora da árvore do React, e só
            baixa o app do avatar quando alguém clica. */}
        <Script src="https://vlibras.gov.br/app/vlibras-plugin.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
