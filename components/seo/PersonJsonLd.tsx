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
  description = "Desenvolvedor Full Stack especializado em React, Next.js e TypeScript.",
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
