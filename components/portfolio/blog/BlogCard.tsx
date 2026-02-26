import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  tags: string[];
  readingTime: number;
  publishedAt: Date | null;
}

export function BlogCard({
  slug,
  title,
  excerpt,
  coverImage,
  tags,
  readingTime,
  publishedAt,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 hover:border-primary/40 dark:hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 overflow-hidden"
    >
      {/* Cover */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 space-y-3">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-md border border-primary/20"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
          {title}
        </h2>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed flex-1">
            {excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between pt-2 text-xs text-gray-500 dark:text-gray-500">
          <span>{publishedAt ? formatDate(publishedAt) : ""}</span>
          <span className="flex items-center gap-1">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {readingTime} min
          </span>
        </div>
      </div>

      {/* Accent line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-500" />
    </Link>
  );
}
