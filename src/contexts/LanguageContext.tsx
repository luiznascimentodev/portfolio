import { createContext, useContext, useState, type ReactNode } from "react";
import type { Language, Translation } from "../types";
import { translations } from "../constants/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem("language") as Language | null;
    if (savedLang) {
      return savedLang;
    }

    // Detectar idioma do navegador
    const browserLang = navigator.language.toLowerCase();

    // Se começar com 'pt' (pt, pt-BR, pt-PT, etc), usar português
    if (browserLang.startsWith("pt")) {
      return "pt";
    }

    // Para qualquer outro idioma, usar inglês
    return "en";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
