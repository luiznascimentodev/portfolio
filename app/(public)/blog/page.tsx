import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { BlogCard } from "@/components/portfolio/blog/BlogCard";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const POSTS_PER_PAGE = 9;
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://luifelippe.dev";

// ISR: revalida a cada 60 segundos
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos sobre desenvolvimento web, React, Next.js, TypeScript e muito mais.",
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: "Blog | Luiz Felippe",
    description:
      "Artigos sobre desenvolvimento web, React, Next.js, TypeScript e muito mais.",
    url: `${BASE_URL}/blog`,
    images: [
      {
        url: `/api/og?title=Blog&description=Artigos+sobre+desenvolvimento+web`,
        width: 1200,
        height: 630,
        alt: "Blog | Luiz Felippe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Luiz Felippe",
    description:
      "Artigos sobre desenvolvimento web, React, Next.js, TypeScript e muito mais.",
    images: [
      `/api/og?title=Blog&description=Artigos+sobre+desenvolvimento+web`,
    ],
  },
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string; tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: pageParam, tag } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);

  const where = {
    published: true,
    ...(tag ? { tags: { has: tag } } : {}),
  };

  const [posts, total, allPostsTags] = await Promise.all([
    db.post.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      take: POSTS_PER_PAGE,
      skip: (currentPage - 1) * POSTS_PER_PAGE,
      select: {
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        tags: true,
        readingTime: true,
        publishedAt: true,
      },
    }),
    db.post.count({ where }),
    db.post.findMany({
      where: { published: true },
      select: { tags: true },
    }),
  ]);

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);
  const allTags = [...new Set(allPostsTags.flatMap((p) => p.tags))].sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white dark:from-black dark:via-gray-950 dark:to-black">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors mb-6"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar ao portfolio
          </Link>

          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
            Blog
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Artigos sobre desenvolvimento web, tecnologia e carreira.
          </p>
        </div>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <nav
            aria-label="Filtro por tags"
            className="mb-10 flex flex-wrap gap-2"
          >
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                !tag
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                  : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-primary/50"
              }`}
            >
              Todos
            </Link>
            {allTags.map((t) => (
              <Link
                key={t}
                href={`/blog?tag=${encodeURIComponent(t)}`}
                aria-current={tag === t ? "true" : undefined}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  tag === t
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-primary/50"
                }`}
              >
                {t}
              </Link>
            ))}
          </nav>
        )}

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {tag
                ? `Nenhum post com a tag "${tag}".`
                : "Nenhum post publicado ainda."}
            </p>
            {tag && (
              <Link
                href="/blog"
                className="mt-4 text-primary hover:underline text-sm"
              >
                Ver todos os posts
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                aria-label="Paginação"
                className="mt-12 flex items-center justify-center gap-2"
              >
                {currentPage > 1 && (
                  <Link
                    href={`/blog?${tag ? `tag=${encodeURIComponent(tag)}&` : ""}page=${currentPage - 1}`}
                    aria-label="Página anterior"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:border-primary/50 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Anterior
                  </Link>
                )}

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <Link
                        key={p}
                        href={`/blog?${tag ? `tag=${encodeURIComponent(tag)}&` : ""}page=${p}`}
                        aria-label={`Página ${p}`}
                        aria-current={p === currentPage ? "page" : undefined}
                        className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 ${
                          p === currentPage
                            ? "bg-primary text-white shadow-lg shadow-primary/25"
                            : "bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary/50"
                        }`}
                      >
                        {p}
                      </Link>
                    ),
                  )}
                </div>

                {currentPage < totalPages && (
                  <Link
                    href={`/blog?${tag ? `tag=${encodeURIComponent(tag)}&` : ""}page=${currentPage + 1}`}
                    aria-label="Próxima página"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:border-primary/50 transition-colors"
                  >
                    Próximo
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                )}
              </nav>
            )}

            {/* Count */}
            <p
              role="status"
              aria-live="polite"
              className="mt-6 text-center text-sm text-gray-500 dark:text-gray-500"
            >
              {total} {total === 1 ? "post" : "posts"}
              {tag ? ` com a tag "${tag}"` : " publicados"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
