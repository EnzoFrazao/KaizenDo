import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "GUARÁ · Posicionamento Operacional",
  description: "Localização em tempo real de maquinistas e manobristas no TFPM",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased dark" style={{ colorScheme: "dark" }}>
      <body className="flex min-h-full bg-zinc-950 text-zinc-100">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden p-8">{children}</main>
      </body>
    </html>
  );
}
