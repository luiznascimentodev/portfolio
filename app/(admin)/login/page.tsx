import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "./_components/LoginForm";

export const metadata = {
  title: "Login — Admin",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background-dark px-4">
      <div className="w-full max-w-sm">
        {/* Logo / título */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 ring-1 ring-primary/40">
            <span className="text-2xl font-bold text-primary">A</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Área Administrativa</h1>
          <p className="mt-1 text-sm text-gray-400">
            Faça login para gerenciar seu portfolio
          </p>
        </div>

        {/* Card do formulário */}
        <div className="rounded-2xl border border-gray-800 bg-surface-dark p-8 shadow-xl shadow-black/40">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          Acesso restrito ao administrador
        </p>
      </div>
    </main>
  );
}
