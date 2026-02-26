import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, FileEdit } from "lucide-react";

export const metadata = {
  title: "Dashboard — Admin",
};

async function getStats() {
  const [total, published, drafts] = await Promise.all([
    db.post.count(),
    db.post.count({ where: { published: true } }),
    db.post.count({ where: { published: false } }),
  ]);
  return { total, published, drafts };
}

export default async function DashboardPage() {
  const session = await auth();
  const stats = await getStats();

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-400">
          Bem-vindo de volta,{" "}
          <span className="text-primary">{session?.user?.email}</span>
        </p>
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

      {/* Placeholder para próximas features (M4) */}
      <div className="rounded-xl border border-dashed border-gray-800 p-8 text-center">
        <p className="text-sm text-gray-500">
          Gerenciamento de posts disponível no{" "}
          <span className="text-primary">Milestone 4</span>
        </p>
      </div>
    </div>
  );
}
