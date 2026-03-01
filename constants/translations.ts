import type { Translation } from "@/types/portfolio";

export const translations: Record<"pt" | "en", Translation> = {
  pt: {
    nav: {
      about: "Sobre",
      projects: "Projetos",
      contact: "Contato",
      skills: "Habilidades",
      blog: "Blog",
    },
    about: {
      title: "Sobre Mim",
      description:
        "Sou desenvolvedor Full Stack com foco em Node.js, React e TypeScript. Construo aplicações web do front ao back — de interfaces responsivas e performáticas até APIs robustas e integrações com serviços externos. Gosto de projetos onde há espaço para pensar bem a solução antes de executar, e trabalho de forma assíncrona com comunicação direta e entregas previsíveis.",
      pillarsTitle: "Como trabalho",
      pillars: [
        {
          title: "Código que dura",
          description:
            "Estruturo projetos com arquitetura limpa e padrões que facilitam manutenção e evolução no longo prazo.",
        },
        {
          title: "Produto, não só código",
          description:
            "Penso em usabilidade, fluxo e impacto antes de escrever a primeira linha. Software precisa resolver problemas reais.",
        },
        {
          title: "Comunicação direta",
          description:
            "Prefiro clareza a jargão técnico. Alinho expectativas cedo e comunico impedimentos sem rodeios.",
        },
      ],
      focusTitle: "No que me especializo",
      focusAreas: [
        {
          title: "Backend & APIs",
          description:
            "Criação de APIs RESTful, autenticação, modelagem de banco de dados e integrações com serviços externos usando Node.js e TypeScript.",
          tags: ["Node.js", "TypeScript", "REST APIs", "PostgreSQL", "Prisma"],
        },
        {
          title: "Frontend & Interfaces",
          description:
            "Interfaces modernas, responsivas e acessíveis com React e Next.js — com atenção a performance, SEO e experiência do usuário.",
          tags: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
        },
        {
          title: "Integrações & Automações",
          description:
            "Conexão de plataformas, webhooks, fluxos automatizados e integrações com APIs de terceiros para reduzir trabalho manual.",
          tags: ["Webhooks", "APIs de terceiros", "Automação", "CI/CD"],
        },
      ],
    },
    projects: {
      title: "Projetos",
      description:
        "Confira alguns dos meus trabalhos recentes e projetos pessoais.",
    },
    contact: {
      title: "Contato",
      description:
        "Entre em contato comigo para discutir oportunidades ou projetos.",
      email: "Email",
      phone: "Telefone",
      location: "Localização",
    },
    skills: {
      title: "Habilidades",
      description: "Tecnologias e ferramentas que domino.",
    },
    theme: {
      light: "Modo Claro",
      dark: "Modo Escuro",
    },
    language: {
      pt: "Português",
      en: "English",
    },
  },
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      contact: "Contact",
      skills: "Skills",
      blog: "Blog",
    },
    about: {
      title: "About Me",
      description:
        "I'm a Full Stack developer focused on Node.js, React, and TypeScript. I build web applications from frontend to backend — from responsive, performant interfaces to robust APIs and third-party integrations. I enjoy projects with room to think through the solution before executing, working asynchronously with clear communication and predictable deliveries.",
      pillarsTitle: "How I work",
      pillars: [
        {
          title: "Code that lasts",
          description:
            "I structure projects with clean architecture and standards that make long-term maintenance and growth straightforward.",
        },
        {
          title: "Product, not just code",
          description:
            "I think about usability, flow, and impact before writing the first line. Software needs to solve real problems.",
        },
        {
          title: "Straight communication",
          description:
            "I prefer clarity over jargon. I align expectations early and surface blockers without beating around the bush.",
        },
      ],
      focusTitle: "What I specialize in",
      focusAreas: [
        {
          title: "Backend & APIs",
          description:
            "Building RESTful APIs, authentication, database modeling, and third-party service integrations using Node.js and TypeScript.",
          tags: ["Node.js", "TypeScript", "REST APIs", "PostgreSQL", "Prisma"],
        },
        {
          title: "Frontend & UI",
          description:
            "Modern, responsive, and accessible interfaces with React and Next.js — with attention to performance, SEO, and user experience.",
          tags: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
        },
        {
          title: "Integrations & Automation",
          description:
            "Connecting platforms, webhooks, automated workflows, and third-party API integrations to reduce manual work.",
          tags: ["Webhooks", "Third-party APIs", "Automation", "CI/CD"],
        },
      ],
    },
    projects: {
      title: "Projects",
      description: "Check out some of my recent work and personal projects.",
    },
    contact: {
      title: "Contact",
      description: "Get in touch with me to discuss opportunities or projects.",
      email: "Email",
      phone: "Phone",
      location: "Location",
    },
    skills: {
      title: "Skills",
      description: "Technologies and tools I master.",
    },
    theme: {
      light: "Light Mode",
      dark: "Dark Mode",
    },
    language: {
      pt: "Português",
      en: "English",
    },
  },
};
