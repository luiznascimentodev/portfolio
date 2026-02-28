import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { tiptapToHtml } from "@/lib/tiptap";
import { ShareButtons } from "@/components/portfolio/blog/ShareButtons";
import { BlogPostingJsonLd } from "@/components/seo/BlogPostingJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://luifelippe.dev";

// ISR: revalida o post a cada 60 segundos
export const revalidate = 60;

interface PostRecord {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  published: boolean;
  tags: string[];
  readingTime: number;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// ── Metadata dinâmico ───────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.post.findUnique({
    where: { slug, published: true },
    select: { title: true, excerpt: true, coverImage: true, tags: true },
  });

  if (!post) return {};

  const postUrl = `${BASE_URL}/blog/${slug}`;
  const ogImageUrl = `/api/og?type=post&title=${encodeURIComponent(post.title)}${post.excerpt ? `&description=${encodeURIComponent(post.excerpt)}` : ""}`;

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    keywords: post.tags,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      url: postUrl,
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
        : [{ url: ogImageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.coverImage ? [post.coverImage] : [ogImageUrl],
    },
  };
}

// ── Página ──────────────────────────────────────────────────────────────────

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  const post: PostRecord | null = await db.post.findUnique({
    where: { slug, published: true },
  });

  if (!post) notFound();

  // Navegação entre posts
  const [prevPost, nextPost] = await Promise.all([
    db.post.findFirst({
      where: {
        published: true,
        publishedAt: { lt: post.publishedAt ?? new Date() },
      },
      orderBy: { publishedAt: "desc" },
      select: { slug: true, title: true },
    }),
    db.post.findFirst({
      where: {
        published: true,
        publishedAt: { gt: post.publishedAt ?? new Date() },
      },
      orderBy: { publishedAt: "asc" },
      select: { slug: true, title: true },
    }),
  ]);

  const contentHtml = tiptapToHtml(post.content);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white dark:from-black dark:via-gray-950 dark:to-black">
      {/* JSON-LD */}
      <BlogPostingJsonLd
        title={post.title}
        slug={post.slug}
        description={post.excerpt}
        coverImage={post.coverImage}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        tags={post.tags}
        readingTime={post.readingTime}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      {/* Hero / Cover */}
      {post.coverImage && (
        <div className="relative w-full h-72 sm:h-96 lg:h-[480px]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors mb-8"
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
          Voltar ao blog
        </Link>

        {/* Header */}
        <header className="mb-10 space-y-4">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-lg border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formatDate(post.publishedAt)}
              </span>
            )}
            {post.readingTime > 0 && (
              <span className="flex items-center gap-1.5">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {post.readingTime} min de leitura
              </span>
            )}
          </div>
        </header>

        {/* Content */}
        <article
          className="prose prose-gray dark:prose-invert max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-code:text-primary prose-code:bg-primary/10 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-gray-900 dark:prose-pre:bg-black prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-xl
            prose-blockquote:border-primary prose-blockquote:text-gray-500 dark:prose-blockquote:text-gray-400
            prose-img:rounded-xl
            prose-hr:border-gray-200 dark:prose-hr:border-gray-800"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Divider */}
        <div className="my-12 border-t border-gray-200 dark:border-gray-800" />

        {/* Share */}
        <div className="mb-12">
          <ShareButtons title={post.title} slug={post.slug} />
        </div>

        {/* Prev / Next navigation */}
        {(prevPost || nextPost) && (
          <nav
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            aria-label="Navegação entre posts"
          >
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group flex flex-col gap-1 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary/40 transition-all duration-200 hover:shadow-lg hover:shadow-primary/10"
              >
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5"
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
                  Post anterior
                </span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors line-clamp-2">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group flex flex-col items-end gap-1 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary/40 transition-all duration-200 hover:shadow-lg hover:shadow-primary/10"
              >
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  Próximo post
                  <svg
                    className="w-3.5 h-3.5"
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
                </span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors text-right line-clamp-2">
                  {nextPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
