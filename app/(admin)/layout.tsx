// Layout do route group (admin) — apenas renderiza filhos.
// O layout com sidebar e autenticacao esta em app/(admin)/admin/layout.tsx.
// A rota /login usa este layout minimo (sem sidebar).
export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
