// Providers de tema e idioma serão adicionados no Milestone 6
// quando os componentes do Vite forem migrados.
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
