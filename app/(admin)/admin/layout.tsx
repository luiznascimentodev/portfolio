import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { SidebarNav } from "@/components/admin/SidebarNav";
import { MobileSidebarToggle } from "@/components/admin/MobileSidebarToggle";

export default async function AdminAreaLayout({
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
    <div className="flex min-h-screen bg-background-dark text-white">
      {/* ── Sidebar desktop ─────────────────────────────────── */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-gray-800 bg-surface-dark md:flex">
        {/* Logo */}
        <div className="flex h-14 items-center gap-2.5 border-b border-gray-800 px-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 ring-1 ring-primary/40">
            <span className="text-sm font-bold text-primary">A</span>
          </div>
          <span className="text-sm font-semibold text-gray-200">
            Admin Panel
          </span>
        </div>

        {/* Navegação */}
        <div className="flex-1 overflow-y-auto">
          <SidebarNav />
        </div>

        {/* Rodapé */}
        <div className="border-t border-gray-800 p-3">
          <div className="flex items-center justify-between rounded-lg px-2 py-2">
            <span className="truncate text-xs text-gray-500">
              {session.user.email}
            </span>
            <LogoutButton iconOnly />
          </div>
        </div>
      </aside>

      {/* ── Área principal ──────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header mobile */}
        <header className="sticky top-0 z-50 flex h-14 items-center gap-3 border-b border-gray-800 bg-surface-dark/80 px-4 backdrop-blur-sm md:hidden">
          <MobileSidebarToggle />
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 ring-1 ring-primary/40">
            <span className="text-sm font-bold text-primary">A</span>
          </div>
          <span className="flex-1 text-sm font-semibold text-gray-200">
            Admin Panel
          </span>
          <span className="max-w-[120px] truncate text-xs text-gray-500">
            {session.user.email}
          </span>
          <LogoutButton iconOnly />
        </header>

        {/* Conteúdo */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
