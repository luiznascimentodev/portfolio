import type { Metadata } from "next";
import { PortfolioApp } from "@/components/portfolio/PortfolioApp";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://luifelippe.dev";

export const metadata: Metadata = {
  title: "Luiz Felippe — Desenvolvedor Full Stack",
  description:
    "Desenvolvedor Full Stack freelance especializado em Node.js, React, Next.js e TypeScript. Construo aplicações web completas: APIs robustas, interfaces modernas e integrações com serviços externos.",
  keywords: [
    "desenvolvedor full stack freelance",
    "desenvolvedor node.js",
    "desenvolvedor react",
    "next.js",
    "typescript",
    "desenvolvimento web sob demanda",
    "api rest",
    "postgresql",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Luiz Felippe — Desenvolvedor Full Stack",
    description:
      "Desenvolvedor Full Stack freelance especializado em Node.js, React, Next.js e TypeScript. Aplicações web completas, APIs robustas e integrações.",
    url: BASE_URL,
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
    title: "Luiz Felippe — Desenvolvedor Full Stack",
    description:
      "Desenvolvedor Full Stack freelance especializado em Node.js, React, Next.js e TypeScript. Aplicações web completas, APIs robustas e integrações.",
    images: [`/api/og`],
  },
};

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <PortfolioApp />
    </>
  );
}
