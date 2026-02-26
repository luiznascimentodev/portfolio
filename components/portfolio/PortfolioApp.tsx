"use client";

import { useState } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/portfolio/Sidebar";
import { Card } from "@/components/portfolio/Card";
import { About } from "@/components/portfolio/sections/About";
import { Projects } from "@/components/portfolio/sections/Projects";
import { Contact } from "@/components/portfolio/sections/Contact";
import { Skills } from "@/components/portfolio/sections/Skills";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Section } from "@/types/portfolio";

export function PortfolioApp() {
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t } = useLanguage();

  const sections: Array<{ id: Section; icon: ReactElement }> = [
    {
      id: "about",
      icon: (
        <svg
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      id: "projects",
      icon: (
        <svg
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: "contact",
      icon: (
        <svg
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: "skills",
      icon: (
        <svg
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case "about":
        return <About />;
      case "projects":
        return <Projects />;
      case "contact":
        return <Contact />;
      case "skills":
        return <Skills />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-gray-50 to-white dark:from-black dark:via-gray-950 dark:to-black">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 flex items-center justify-center bg-primary text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isSidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative h-screen z-40 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      <main
        className={`flex-1 overflow-y-auto flex ${
          !activeSection ? "items-center" : "items-start pt-4 lg:pt-16"
        } justify-center`}
      >
        <div className="w-full max-w-7xl space-y-8 lg:space-y-12 px-4 sm:px-6 lg:px-8 pb-8">
          {/* Cards horizontais */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 ${
              !activeSection ? "" : "mt-16 lg:mt-0"
            }`}
          >
            {sections.map((section) => (
              <Card
                key={section.id}
                section={section.id}
                title={t.nav[section.id]}
                icon={section.icon}
                onClick={() => setActiveSection(section.id)}
              />
            ))}

            {/* Blog card — navega para /blog */}
            <Link
              href="/blog"
              className="group relative p-8 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 hover:border-primary/40 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 min-h-[220px] w-full overflow-hidden flex flex-col items-center justify-center text-center space-y-5"
              aria-label="Ir para o Blog"
            >
              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex flex-col items-center justify-center text-center space-y-5 h-full">
                <div className="relative">
                  <div className="absolute inset-0 blur-2xl bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-16 h-16 text-gray-600 dark:text-gray-400 group-hover:text-primary group-hover:scale-110 transition-all duration-500">
                    <svg
                      className="w-full h-full"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors duration-500 tracking-wide">
                  {t.nav.blog}
                </h3>
              </div>

              {/* accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-500" />
            </Link>
          </div>

          {/* Conteúdo da seção selecionada */}
          {activeSection && (
            <div className="animate-fadeIn">{renderSectionContent()}</div>
          )}
        </div>
      </main>
    </div>
  );
}
