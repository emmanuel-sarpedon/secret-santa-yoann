import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Secret Santa",
  description: "Chaque jour, une citation pour te rappeler que la vie, c’est comme un Secret Santa : imprévisible, parfois drôle, et souvent bizarre. Clique, savoure, répète !",
  icons: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎅</text></svg>",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
