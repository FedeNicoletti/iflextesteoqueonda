import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 1. Importar la fuente
import "./globals.css";
import { cn } from "@/lib/utils";

// 2. Configurar la fuente
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iFlexCoach - Login",
  description: "Your journey starts here!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* 3. Aplicar la fuente y las clases globales de fondo/texto */}
      <body
        className={cn(
          "min-h-screen bg-black text-white antialiased",
          inter.className
        )}
      >
        {children}
      </body>
    </html>
  );
}