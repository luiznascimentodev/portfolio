import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Luiz Felippe — Desenvolvedor Full Stack",
    template: "%s | Luiz Felippe",
  },
  description:
    "Portfolio e blog de Luiz Felippe Nascimento, desenvolvedor Full Stack especializado em React, Next.js e TypeScript.",
  keywords: [
    "desenvolvedor",
    "full stack",
    "react",
    "next.js",
    "typescript",
    "portfolio",
    "blog",
  ],
  authors: [{ name: "Luiz Felippe Nascimento" }],
  creator: "Luiz Felippe Nascimento",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Luiz Felippe — Desenvolvedor Full Stack",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@luiznascimentodev",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
