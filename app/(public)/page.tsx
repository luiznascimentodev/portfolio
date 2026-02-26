import type { Metadata } from "next";
import { PortfolioApp } from "@/components/portfolio/PortfolioApp";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://luifelippe.dev";

export const metadata: Metadata = {
  title: "Luiz Felippe — Desenvolvedor Full Stack",
  description:
    "Portfolio de Luiz Felippe Nascimento, desenvolvedor Full Stack especializado em React, Next.js, TypeScript e Node.js.",
  keywords: [
    "desenvolvedor full stack",
    "react developer",
    "next.js",
    "typescript",
    "node.js",
    "portfolio",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Luiz Felippe — Desenvolvedor Full Stack",
    description:
      "Portfolio de Luiz Felippe Nascimento, desenvolvedor Full Stack especializado em React, Next.js e TypeScript.",
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
      "Portfolio de Luiz Felippe Nascimento, desenvolvedor Full Stack especializado em React, Next.js e TypeScript.",
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
