const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://luifelippe.dev";

interface BlogPostingJsonLdProps {
  title: string;
  slug: string;
  description?: string | null;
  coverImage?: string | null;
  publishedAt?: Date | null;
  updatedAt?: Date | null;
  tags?: string[];
  readingTime?: number;
}

export function BlogPostingJsonLd({
  title,
  slug,
  description,
  coverImage,
  publishedAt,
  updatedAt,
  tags = [],
  readingTime,
}: BlogPostingJsonLdProps) {
  const url = `${BASE_URL}/blog/${slug}`;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    url,
    description: description ?? undefined,
    image: coverImage ?? undefined,
    datePublished: publishedAt?.toISOString(),
    dateModified: updatedAt?.toISOString() ?? publishedAt?.toISOString(),
    keywords: tags.join(", ") || undefined,
    author: {
      "@type": "Person",
      name: "Luiz Felippe Nascimento",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Luiz Felippe Nascimento",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/avatar.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(readingTime ? { timeRequired: `PT${readingTime}M` } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
