"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  language: string | null;
  owner: {
    avatar_url: string;
    login: string;
  };
}

interface Project {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  technologies: string[];
  techBadges?: string[];
  image: string;
  images: string[];
  github?: string;
  demo?: string;
  highlights: string[];
  stars?: number;
}

export const Projects = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const extractImagesFromReadme = (readme: string): string[] => {
      const imageRegex = /!\[.*?\]\((.*?)\)/g;
      const images: string[] = [];
      let match;
      while ((match = imageRegex.exec(readme)) !== null) {
        const imageUrl = match[1];
        if (imageUrl.startsWith("http") || imageUrl.startsWith("https")) {
          images.push(imageUrl);
        }
      }
      return images;
    };

    const fetchProjectImage = async (
      owner: string,
      repo: string,
    ): Promise<string | null> => {
      const previewPaths = [
        "main.png",
        "public/main.png",
        "screenshots/main.png",
        "screenshots/preview.png",
        "preview.png",
        "public/preview.png",
        "screenshot.png",
        "docs/preview.png",
        "assets/preview.png",
        ".github/preview.png",
      ];
      for (const path of previewPaths) {
        try {
          const response = await fetch(
            `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`,
            { method: "HEAD" },
          );
          if (response.ok) {
            return `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`;
          }
        } catch {
          // Tentar próximo caminho
        }
      }
      return null;
    };

    const fetchReadme = async (
      owner: string,
      repo: string,
    ): Promise<{
      text: string;
      images: string[];
      title?: string;
      technologies?: string[];
      techBadges?: string[];
      highlights?: string[];
      demoUrl?: string;
    }> => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/readme`,
          { headers: { Accept: "application/vnd.github.v3.raw" } },
        );
        if (response.ok) {
          const readme = await response.text();
          const images = extractImagesFromReadme(readme);

          const extract = (startTag: string, endTag: string) => {
            if (!readme.includes(startTag) || !readme.includes(endTag))
              return "";
            const start = readme.indexOf(startTag) + startTag.length;
            const end = readme.indexOf(endTag);
            return readme.substring(start, end).trim();
          };

          const projectTitle = extract(
            "<!-- PROJECT_TITLE_START -->",
            "<!-- PROJECT_TITLE_END -->",
          );

          let projectTechnologies: string[] = [];
          let projectTechBadges: string[] = [];
          const techContent = extract(
            "<!-- PROJECT_TECH_START -->",
            "<!-- PROJECT_TECH_END -->",
          );
          if (techContent) {
            const badgeRegex =
              /!\[([^\]]+)\]\((https:\/\/img\.shields\.io\/badge\/[^)]+)\)/g;
            let badgeMatch;
            while ((badgeMatch = badgeRegex.exec(techContent)) !== null) {
              projectTechnologies.push(badgeMatch[1]);
              projectTechBadges.push(badgeMatch[2]);
            }
            if (projectTechnologies.length === 0) {
              projectTechnologies = techContent
                .split(",")
                .map((tech) =>
                  tech
                    .replace(/\[.*?\]\(.*?\)/g, "")
                    .replace(/!\[.*?\]\(.*?\)/g, "")
                    .replace(/\(.*?\)/g, "")
                    .replace(/\[.*?\]/g, "")
                    .trim(),
                )
                .filter((tech) => tech.length > 0 && !tech.startsWith("http"));
            }
          }

          const highlightsContent = extract(
            "<!-- PROJECT_HIGHLIGHTS_START -->",
            "<!-- PROJECT_HIGHLIGHTS_END -->",
          );
          const projectHighlights = highlightsContent
            ? highlightsContent
                .split("\n")
                .map((l) => l.trim())
                .filter((l) => l.length > 0)
            : [];

          const projectDemoUrl = extract(
            "<!-- PROJECT_DEMO_START -->",
            "<!-- PROJECT_DEMO_END -->",
          );

          const tagContent = extract(
            "<!-- PROJECT_TAG_START -->",
            "<!-- PROJECT_TAG_END -->",
          );
          let description = tagContent
            ? tagContent
                .split("\n")
                .filter((line) => {
                  const t = line.trim();
                  return (
                    t &&
                    !t.startsWith("#") &&
                    !t.startsWith("!") &&
                    !t.startsWith("[") &&
                    !t.startsWith("<") &&
                    !t.startsWith("**") &&
                    !t.startsWith("✅") &&
                    !t.startsWith("-") &&
                    t !== "---"
                  );
                })
                .join(" ")
                .trim()
            : "";

          if (!description) {
            description = readme
              .split("\n")
              .filter((line) => {
                const t = line.trim();
                return (
                  t &&
                  !t.startsWith("#") &&
                  !t.startsWith("!") &&
                  !t.startsWith("[") &&
                  !t.startsWith("<") &&
                  !t.startsWith("**") &&
                  !t.startsWith("`") &&
                  !t.startsWith("-") &&
                  t !== "---" &&
                  t.length > 50
                );
              })
              .slice(0, 2)
              .join(" ")
              .slice(0, 500);
          }

          return {
            text: description || "README disponível no repositório.",
            images,
            title: projectTitle || undefined,
            technologies:
              projectTechnologies.length > 0 ? projectTechnologies : undefined,
            techBadges:
              projectTechBadges.length > 0 ? projectTechBadges : undefined,
            highlights:
              projectHighlights.length > 0 ? projectHighlights : undefined,
            demoUrl: projectDemoUrl || undefined,
          };
        }
        return { text: "README não disponível.", images: [] };
      } catch {
        return { text: "README não disponível.", images: [] };
      }
    };

    const fetchStarredRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/luiznascimentodev/starred",
        );
        const repos: GitHubRepo[] = await response.json();

        const mappedProjectsPromises = repos.map(async (repo) => {
          const readmeData = await fetchReadme(repo.owner.login, repo.name);
          const customImage = await fetchProjectImage(
            repo.owner.login,
            repo.name,
          );
          const mainImage =
            customImage ||
            `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`;

          return {
            id: repo.id,
            name: readmeData.title || repo.name,
            description: readmeData.text
              ? readmeData.text.slice(0, 150) +
                (readmeData.text.length > 150 ? "..." : "")
              : repo.description || "Sem descrição disponível",
            longDescription: readmeData.text,
            technologies:
              readmeData.technologies ||
              (repo.topics.length > 0
                ? repo.topics
                : repo.language
                  ? [repo.language]
                  : ["GitHub"]),
            techBadges: readmeData.techBadges,
            image: mainImage,
            images: [mainImage],
            github: repo.html_url,
            demo: readmeData.demoUrl || repo.homepage || undefined,
            highlights: readmeData.highlights || [
              `⭐ ${repo.stargazers_count} estrelas no GitHub`,
              `Tecnologias: ${repo.language || "Múltiplas"}`,
              repo.topics.length > 0
                ? `Topics: ${repo.topics.join(", ")}`
                : "Projeto open source",
            ],
            stars: repo.stargazers_count,
          };
        });

        const mappedProjects = await Promise.all(mappedProjectsPromises);
        setProjects(mappedProjects);
      } catch (error) {
        console.error("Erro ao buscar repositórios:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStarredRepos();
  }, []);

  return (
    <>
      <div className="space-y-8">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6 tracking-tight">
            {t.projects.title}
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-10">
            {t.projects.description}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Carregando projetos...
              </p>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400">
              Nenhum projeto encontrado.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-gradient-to-br from-gray-50/80 to-white/50 dark:from-gray-900/80 dark:to-gray-950/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 hover:border-primary/40 dark:hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 text-left overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent"></div>
                  <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-primary opacity-0 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="absolute left-0 top-48 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative space-y-3">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-medium bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 rounded-lg border border-primary/20 dark:border-primary/30"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2.5 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-500"></div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => {
              setSelectedProject(null);
              setCurrentImageIndex(0);
            }}
          ></div>

          <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50">
            <button
              onClick={() => {
                setSelectedProject(null);
                setCurrentImageIndex(0);
              }}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 shadow-lg"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="overflow-y-auto max-h-[90vh]">
              {/* Image Slider */}
              <div className="relative h-80 bg-gray-100 dark:bg-gray-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedProject.images[currentImageIndex]}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent"></div>

                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0
                            ? selectedProject.images.length - 1
                            : prev - 1,
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 rounded-full transition-colors duration-200 shadow-lg"
                    >
                      <svg
                        className="w-6 h-6 text-gray-700 dark:text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === selectedProject.images.length - 1
                            ? 0
                            : prev + 1,
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 rounded-full transition-colors duration-200 shadow-lg"
                    >
                      <svg
                        className="w-6 h-6 text-gray-700 dark:text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
                {selectedProject.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                    {selectedProject.name}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                    Destaques
                  </h3>
                  <div className="space-y-2">
                    {selectedProject.highlights.map((highlight, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-shrink-0 mt-1.5">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                    Tecnologias
                  </h3>
                  {selectedProject.techBadges &&
                  selectedProject.techBadges.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.techBadges.map((badge, index) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={index}
                          src={badge}
                          alt={
                            selectedProject.technologies[index] || "Technology"
                          }
                          className="h-7"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 text-sm font-medium bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 rounded-xl border border-primary/20 dark:border-primary/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white rounded-xl transition-colors duration-200"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      Ver no GitHub
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors duration-200"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Ver Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
