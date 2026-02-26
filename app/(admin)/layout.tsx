import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Redundância ao middleware — garante proteção mesmo sem Edge Runtime
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background-dark text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-surface-dark/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 ring-1 ring-primary/40">
              <span className="text-sm font-bold text-primary">A</span>
            </div>
            <span className="text-sm font-semibold text-gray-200">
              Admin Panel
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-gray-500 sm:block">
              {session.user.email}
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
