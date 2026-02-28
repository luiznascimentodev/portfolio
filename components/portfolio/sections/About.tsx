"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export const About = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-10 max-w-4xl">
      {/* ── Apresentação ── */}
      <section aria-labelledby="about-heading">
        <h1
          id="about-heading"
          className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 tracking-tight"
        >
          {t.about.title}
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
          {t.about.description}
        </p>
      </section>

      {/* ── Como trabalho ── */}
      <section aria-labelledby="pillars-heading">
        <h2
          id="pillars-heading"
          className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-3 mb-4"
        >
          <span className="w-1.5 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
          {t.about.pillarsTitle}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {t.about.pillars.map((pillar, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-gray-50/80 dark:bg-gray-900/60 border border-gray-200/50 dark:border-gray-800/50 hover:border-primary/30 dark:hover:border-primary/30 transition-colors duration-300"
            >
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Formação e Idiomas ── */}
      <section aria-labelledby="education-heading">
        <h2
          id="education-heading"
          className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-3 mb-4"
        >
          <span className="w-1.5 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
          {t.about.educationTitle}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Formação Acadêmica */}
          <div className="group relative p-5 rounded-2xl bg-gray-50/80 dark:bg-gray-900/60 border border-gray-200/50 dark:border-gray-800/50 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300">
            <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-primary/50 via-primary to-primary/50 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {t.about.educationDegree}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {t.about.educationInstitution}
                </p>
                <span className="mt-2 inline-block px-2.5 py-1 text-xs font-medium bg-primary/10 dark:bg-primary/20 text-primary rounded-full border border-primary/20 dark:border-primary/30">
                  {t.about.educationStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Idiomas */}
          <div className="group relative p-5 rounded-2xl bg-gray-50/80 dark:bg-gray-900/60 border border-gray-200/50 dark:border-gray-800/50 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300">
            <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-primary/50 via-primary to-primary/50 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  {t.about.languageTitle}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.about.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-xs font-medium bg-primary/10 dark:bg-primary/20 text-primary rounded-full border border-primary/20 dark:border-primary/30"
                    >
                      {lang.name}: {lang.level}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experiência ── */}
      <section aria-labelledby="experience-heading">
        <h2
          id="experience-heading"
          className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-3 mb-4"
        >
          <span className="w-1.5 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
          {t.about.experienceTitle}
        </h2>

        <article className="group relative p-6 rounded-2xl bg-gray-50/80 dark:bg-gray-900/60 border border-gray-200/50 dark:border-gray-800/50 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300">
          <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-primary/50 via-primary to-primary/50 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
              {t.about.experienceRole}
            </h3>
          </header>

          <ul className="space-y-4 mb-4" role="list">
            {t.about.experienceHighlights.map((highlight, index) => (
              <li key={index} className="flex gap-3">
                <div className="flex-shrink-0 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {highlight.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-0.5">
                    {highlight.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200/50 dark:border-gray-800/50">
            {t.about.experienceTags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium bg-primary/10 dark:bg-primary/20 text-primary rounded-full border border-primary/20 dark:border-primary/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};
