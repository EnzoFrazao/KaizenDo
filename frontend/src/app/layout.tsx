import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { AbasMobile, TopoMobile } from "@/components/NavMobile";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

const TITULO = "GUARÁ · Posicionamento Operacional";
const DESCRICAO = "Localização em tempo real de maquinistas e manobristas no TFPM";

// openGraph dá título e descrição à prévia quando o link é colado no WhatsApp ou no Teams.
// O ícone de tela inicial do iPhone vem de app/apple-icon.png (convenção de arquivo do Next).
export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  openGraph: { title: TITULO, description: DESCRICAO, locale: "pt_BR", type: "website" },
};

// Muita gente abre pelo celular, via QR code. `viewportFit: cover` deixa o fundo ir
// até as bordas do iPhone; as barras compensam com env(safe-area-inset-*). O zoom do
// usuário fica liberado de propósito (acessibilidade).
// themeColor e colorScheme saem daqui: quem manda neles é o tema escolhido. O script
// abaixo ajusta a meta, e o color-scheme vem do CSS (:root e [data-tema="claro"]).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#09090b",
};

// Roda antes da primeira pintura, senão a página aparece escura e "pisca" para o claro.
// Fica inline no <head> de propósito: um arquivo externo chegaria tarde demais.
const TEMA_SEM_PISCAR = `try{if(localStorage.getItem("guara.tema")==="claro"){document.documentElement.setAttribute("data-tema","claro")}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: o script abaixo põe data-tema="claro" no <html> antes
    // do React hidratar, então o HTML do servidor (sem o atributo) e o DOM divergem de
    // propósito. O aviso vale só para este elemento, não desce para os filhos.
    <html lang="pt-BR" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: TEMA_SEM_PISCAR }} />
      </head>
      <body className="flex min-h-full flex-col bg-zinc-950 claro:bg-areia text-zinc-100 claro:text-tinta claro:bg-areia claro:text-tinta lg:flex-row">
        <Sidebar />
        <TopoMobile />
        {/* No celular, o padding de baixo reserva as abas (3.5rem), o selo do Netlify que fica
            logo acima delas (~3.5rem, ver globals.css) e a área segura. Sem contar o selo, o fim
            da página ficava escondido atrás dele. */}
        <main className="min-w-0 flex-1 overflow-x-hidden px-4 pt-4 pb-[calc(8rem+env(safe-area-inset-bottom))] sm:px-6 lg:p-8">
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
