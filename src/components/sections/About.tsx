import { useLanguage } from "../../contexts/LanguageContext";

export const About = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6 tracking-tight">
          {t.about.title}
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          {t.about.description}
        </p>
      </div>

      {/* Education Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full"></span>
          {t.about.educationTitle}
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Academic Formation */}
          <div className="group relative p-6 bg-gradient-to-br from-gray-50/80 to-white/50 dark:from-gray-900/80 dark:to-gray-950/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-primary/50 via-primary to-primary/50 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    {t.about.educationDegree}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {t.about.educationInstitution}
                  </p>
                  <span className="inline-block px-2.5 py-1 text-xs font-medium bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 rounded-full border border-primary/20 dark:border-primary/30">
                    {t.about.educationStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Language Skills */}
          <div className="group relative p-6 bg-gradient-to-br from-gray-50/80 to-white/50 dark:from-gray-900/80 dark:to-gray-950/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-primary/50 via-primary to-primary/50 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    {t.about.languageTitle}
                  </h4>
                  <div className="space-y-2">
                    {t.about.languages.map((lang, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="inline-block px-2.5 py-1 text-xs font-medium bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 rounded-full border border-primary/20 dark:border-primary/30">
                          {lang.name}: {lang.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full"></span>
          {t.about.experienceTitle}
        </h3>

        {/* Experience Card */}
        <div className="group relative p-6 bg-gradient-to-br from-gray-50/80 to-white/50 dark:from-gray-900/80 dark:to-gray-950/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
          {/* Accent line */}
          <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-primary/50 via-primary to-primary/50 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {t.about.experienceRole}
              </h4>
              <span className="text-sm font-medium text-primary/80 dark:text-primary/70 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {t.about.experiencePeriod}
              </span>
            </div>

            {/* Achievements */}
            <div className="space-y-3 pl-2">
              {t.about.experienceHighlights.map((highlight, index) => (
                <div key={index} className="flex gap-3 group/item">
                  <div className="flex-shrink-0 mt-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary/60 group-hover/item:bg-primary group-hover/item:scale-125 transition-all duration-300"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {highlight.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {t.about.experienceTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 rounded-full border border-primary/20 dark:border-primary/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
