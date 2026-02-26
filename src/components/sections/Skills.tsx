import { useLanguage } from "../../contexts/LanguageContext";

export const Skills = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      category: "Frontend",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vue.js"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express", "NestJS", "PostgreSQL", "MongoDB"],
    },
    {
      category: "DevOps & Tools",
      skills: ["Git", "Docker", "CI/CD", "AWS", "Linux"],
    },
    {
      category: "Soft Skills",
      skills: [
        "Trabalho em Equipe",
        "Comunicação",
        "Resolução de Problemas",
        "Liderança",
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6 tracking-tight">
          {t.skills.title}
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-400 mb-10">
          {t.skills.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {skillCategories.map((category) => (
          <div
            key={category.category}
            className="p-6 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 hover:border-primary/30 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full"></span>
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-lg border border-primary/20 hover:bg-primary/20 transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
