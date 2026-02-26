"use client";

import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <aside className="w-72 lg:w-80 h-screen bg-gradient-to-b from-surface-light to-white dark:from-surface-dark dark:to-black border-r border-gray-100 dark:border-gray-900 flex flex-col shadow-2xl">
      {/* Profile Section */}
      <div className="p-6 lg:p-8 flex flex-col items-center">
        <div className="relative group cursor-pointer">
          {/* Subtle glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Profile image container */}
          <div className="relative">
            <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
              <Image
                src="/avatar.webp"
                alt="Profile"
                width={144}
                height={144}
                className="w-full h-full object-cover object-top"
                priority
                draggable={false}
              />
            </div>

            {/* Minimal accent border */}
            <div className="absolute -inset-0.5 rounded-full border border-primary/30 group-hover:border-primary/60 transition-all duration-300"></div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent mt-4 lg:mt-6"></div>
      </div>

      {/* Social Links */}
      <div className="px-6 space-y-3">
        {/* GitHub Link */}
        <a
          href="https://github.com/luiznascimentodev"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-800/50 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-md"
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#24292e] group-hover:scale-110 transition-transform duration-300">
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
            GitHub
          </span>
        </a>

        {/* LinkedIn Link */}
        <a
          href="https://www.linkedin.com/in/luiz-felippe-nascimento/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-800/50 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-md"
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0077b5] group-hover:scale-110 transition-transform duration-300">
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
            LinkedIn
          </span>
        </a>
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Controls */}
      <div className="p-6 space-y-4 border-t border-gray-100 dark:border-gray-900">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full group relative overflow-hidden px-4 py-3 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10"
        >
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <div
                className={`w-9 h-5 rounded-full relative transition-all duration-300 ${
                  theme === "dark" ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${
                    theme === "dark" ? "left-[18px]" : "left-0.5"
                  }`}
                ></div>
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </span>
            </div>
            <div className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-300 group-hover:scale-110">
              {theme === "light" ? (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </div>
          </div>
        </button>

        {/* Language Toggle */}
        <div className="relative bg-gray-100 dark:bg-gray-900 p-1 rounded-2xl border border-gray-200/50 dark:border-gray-800/50">
          {/* Sliding indicator */}
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-xl shadow-lg shadow-primary/25 transition-all duration-300 ${
              language === "pt" ? "left-1" : "left-[calc(50%+4px-4px)]"
            }`}
          ></div>

          <div className="relative flex gap-1">
            <button
              onClick={() => setLanguage("pt")}
              className={`flex-1 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 z-10 ${
                language === "pt"
                  ? "text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
              }`}
            >
              PT
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`flex-1 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 z-10 ${
                language === "en"
                  ? "text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
