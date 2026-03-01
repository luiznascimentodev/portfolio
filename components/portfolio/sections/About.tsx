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

      {/* ── No que me especializo ── */}
      <section aria-labelledby="focus-heading">
        <h2
          id="focus-heading"
          className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-3 mb-4"
        >
          <span className="w-1.5 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
          {t.about.focusTitle}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {t.about.focusAreas.map((area, index) => (
            <div
              key={index}
              className="group relative p-5 rounded-2xl bg-gray-50/80 dark:bg-gray-900/60 border border-gray-200/50 dark:border-gray-800/50 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300"
            >
              <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-primary/50 via-primary to-primary/50 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {area.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                {area.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {area.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-medium bg-primary/10 dark:bg-primary/20 text-primary rounded-full border border-primary/20 dark:border-primary/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
