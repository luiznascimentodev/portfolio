import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <main id="main-content">{children}</main>
      </LanguageProvider>
    </ThemeProvider>
  );
}
