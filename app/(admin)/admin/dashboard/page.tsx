import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  BookOpen,
  FileEdit,
  PenSquare,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Dashboard — Admin",
};

async function getStats() {
  const [total, published, drafts, recent] = await Promise.all([
    db.post.count(),
    db.post.count({ where: { published: true } }),
    db.post.count({ where: { published: false } }),
    db.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true,
        slug: true,
      },
    }),
  ]);
  return { total, published, drafts, recent };
}

export default async function DashboardPage() {
  const session = await auth();
  const stats = await getStats();

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-400">
            Bem-vindo de volta,{" "}
            <span className="text-primary">{session?.user?.email}</span>
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary-dark text-white">
          <Link href="/admin/posts/new">
            <PenSquare className="mr-2 h-4 w-4" />
            Novo Post
          </Link>
        </Button>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-gray-800 bg-surface-dark">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total de Posts
            </CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-surface-dark">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Publicados
            </CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {stats.published}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-surface-dark">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Rascunhos
            </CardTitle>
            <FileEdit className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.drafts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Posts recentes */}
      <Card className="border-gray-800 bg-surface-dark">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold text-white">
            Posts Recentes
          </CardTitle>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <Link href="/admin/posts">
              Ver todos <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {stats.recent.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-gray-500">Nenhum post ainda.</p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="mt-3 border-gray-700 text-gray-300 hover:border-primary hover:text-primary"
              >
                <Link href="/admin/posts/new">Criar primeiro post</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-800">
              {stats.recent.map((post) => (
                <li
                  key={post.id}
                  className="flex items-center justify-between py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {post.title}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <span
                    className={`ml-4 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                      post.published
                        ? "bg-primary/15 text-primary"
                        : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    {post.published ? "Publicado" : "Rascunho"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
