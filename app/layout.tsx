import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://luifelippe.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
    url: BASE_URL,
    siteName: "Luiz Felippe — Desenvolvedor Full Stack",
    images: [
      {
        url: `/api/og`,
        width: 1200,
        height: 630,
        alt: "Luiz Felippe — Desenvolvedor Full Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@luiznascimentodev",
    images: [`/api/og`],
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
        {/* Skip-to-content para navegação por teclado (WCAG 2.4.1) */}
        <a href="#main-content" className="skip-to-content">
          Ir para o conteúdo principal
        </a>
        {children}
      </body>
    </html>
  );
}
