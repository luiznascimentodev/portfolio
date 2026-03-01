const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://luifelippe.dev";

interface PersonJsonLdProps {
  name?: string;
  url?: string;
  image?: string;
  description?: string;
  jobTitle?: string;
  sameAs?: string[];
}

export function PersonJsonLd({
  name = "Luiz Felippe Nascimento",
  url = BASE_URL,
  image = `${BASE_URL}/avatar.webp`,
  description = "Desenvolvedor Full Stack freelance especializado em Node.js, React, Next.js e TypeScript. Construo aplicações web do front ao back — APIs robustas, interfaces performáticas e integrações com serviços externos — com comunicação direta e entregas previsíveis.",
  jobTitle = "Desenvolvedor Full Stack",
  sameAs = [
    "https://github.com/luifelippe",
    "https://www.linkedin.com/in/luifelippe",
  ],
}: PersonJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url,
    image,
    description,
    jobTitle,
    sameAs,
    knowsAbout: [
      "Node.js",
      "React",
      "Next.js",
      "TypeScript",
      "Full Stack Development",
      "Web Performance",
      "SEO Técnico",
      "Desenvolvimento de Software",
    ],
    knowsLanguage: [
      { "@type": "Language", name: "Portuguese" },
      { "@type": "Language", name: "English" },
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Universidade Positivo",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
