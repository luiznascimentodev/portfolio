import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PenSquare } from "lucide-react";
import Link from "next/link";
import { PostActions } from "./_components/PostActions";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Posts — Admin",
};

type SortField = "createdAt" | "publishedAt" | "title";
type SortOrder = "asc" | "desc";

interface SearchParams {
  orderBy?: SortField;
  order?: SortOrder;
}

async function getPosts(orderBy: SortField, order: SortOrder) {
  return db.post.findMany({
    orderBy:
      orderBy === "title"
        ? { title: order }
        : orderBy === "publishedAt"
          ? { publishedAt: order }
          : { createdAt: order },
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      tags: true,
      readingTime: true,
      publishedAt: true,
      createdAt: true,
    },
  });
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { orderBy = "createdAt", order = "desc" } = await searchParams;
  const posts = await getPosts(orderBy, order);

  // Helper para links de ordenação
  function sortHref(field: SortField) {
    const nextOrder = orderBy === field && order === "desc" ? "asc" : "desc";
    return `/admin/posts?orderBy=${field}&order=${nextOrder}`;
  }

  function sortIndicator(field: SortField) {
    if (orderBy !== field) return null;
    return order === "asc" ? " ↑" : " ↓";
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Posts</h1>
          <p className="mt-1 text-sm text-gray-400">
            {posts.length} post{posts.length !== 1 ? "s" : ""} no total
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary-dark text-white">
          <Link href="/admin/posts/new">
            <PenSquare className="mr-2 h-4 w-4" />
            Novo Post
          </Link>
        </Button>
      </div>

      {/* Tabela */}
      <div className="overflow-hidden rounded-xl border border-gray-800 bg-surface-dark">
        {posts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-500">Nenhum post encontrado.</p>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="mt-4 border-gray-700 text-gray-300 hover:border-primary hover:text-primary"
            >
              <Link href="/admin/posts/new">Criar primeiro post</Link>
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-400">
                  <Link
                    href={sortHref("title")}
                    className="inline-flex items-center gap-1 hover:text-white"
                  >
                    Título{sortIndicator("title")}
                  </Link>
                </TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="hidden text-gray-400 sm:table-cell">
                  Tags
                </TableHead>
                <TableHead className="hidden text-gray-400 md:table-cell">
                  <Link
                    href={sortHref("createdAt")}
                    className="inline-flex items-center gap-1 hover:text-white"
                  >
                    Criado em{sortIndicator("createdAt")}
                  </Link>
                </TableHead>
                <TableHead className="hidden text-gray-400 lg:table-cell">
                  <Link
                    href={sortHref("publishedAt")}
                    className="inline-flex items-center gap-1 hover:text-white"
                  >
                    Publicado em{sortIndicator("publishedAt")}
                  </Link>
                </TableHead>
                <TableHead className="w-12 text-gray-400" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow
                  key={post.id}
                  className="border-gray-800 hover:bg-gray-800/50"
                >
                  {/* Título */}
                  <TableCell className="max-w-xs font-medium text-white">
                    <div>
                      <p className="truncate">{post.title}</p>
                      <p className="mt-0.5 truncate text-xs text-gray-500">
                        /{post.slug}
                      </p>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        post.published
                          ? "bg-primary/15 text-primary hover:bg-primary/25"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      }
                    >
                      {post.published ? "Publicado" : "Rascunho"}
                    </Badge>
                  </TableCell>

                  {/* Tags */}
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-gray-800 px-1.5 py-0.5 text-xs text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Criado em */}
                  <TableCell className="hidden whitespace-nowrap text-sm text-gray-400 md:table-cell">
                    {formatDate(post.createdAt.toISOString())}
                  </TableCell>

                  {/* Publicado em */}
                  <TableCell className="hidden whitespace-nowrap text-sm text-gray-400 lg:table-cell">
                    {post.publishedAt
                      ? formatDate(post.publishedAt.toISOString())
                      : "—"}
                  </TableCell>

                  {/* Ações */}
                  <TableCell>
                    <PostActions
                      id={post.id}
                      title={post.title}
                      published={post.published}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
