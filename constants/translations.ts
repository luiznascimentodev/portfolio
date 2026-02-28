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
        "Sou desenvolvedor Full Stack com foco em Node.js, React e TypeScript. Trabalho no desenvolvimento de aplicações web do front ao back, com atenção a performance, acessibilidade e código limpo. Tenho experiência prática com projetos em produção — incluindo uma plataforma educacional que desenvolvo de ponta a ponta — e gosto de ambientes onde precisão técnica e bom senso caminham juntos.",
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
      educationTitle: "Formação e Idiomas",
      educationDegree: "Análise e Desenvolvimento de Sistemas",
      educationInstitution: "Universidade Positivo",
      educationStatus: "Em andamento",
      languageTitle: "Idiomas",
      languages: [
        { name: "Português", level: "Nativo" },
        { name: "Inglês", level: "Intermediário" },
      ],
      experienceTitle: "Experiência",
      experienceRole:
        "Desenvolvedor Full Stack · Agência de Desenvolvimento Web",
      experiencePeriod: "2015 – 2018",
      experienceHighlights: [
        {
          title: "55+ projetos para o setor de construção civil",
          description:
            "Desenvolvi e mantive websites WordPress de alta performance, adaptando cada solução às necessidades específicas de cada cliente.",
        },
        {
          title: "Plugins e temas WordPress customizados",
          description:
            "Construí funcionalidades sob medida em PHP, garantindo design responsivo e acessível em todos os projetos.",
        },
        {
          title: "SEO técnico com resultados mensuráveis",
          description:
            "Implementei melhorias de SEO técnico e on-page que resultaram em +30% de tráfego orgânico e +40% em conversão de leads.",
        },
      ],
      experienceTags: [
        "WordPress",
        "PHP",
        "SEO",
        "Design Responsivo",
        "Otimização de Performance",
        "UX/UI",
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
        "I'm a Full Stack developer focused on Node.js, React, and TypeScript. I work across the full stack — from interface to API — with attention to performance, accessibility, and clean code. I have hands-on experience with production projects, including an educational platform I build end-to-end, and I thrive in environments where technical precision and pragmatism go hand in hand.",
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
      educationTitle: "Education & Languages",
      educationDegree: "Systems Analysis and Development",
      educationInstitution: "Universidade Positivo",
      educationStatus: "In Progress",
      languageTitle: "Languages",
      languages: [
        { name: "Portuguese", level: "Native" },
        { name: "English", level: "Intermediate" },
      ],
      experienceTitle: "Experience",
      experienceRole: "Full Stack Developer · Web Development Agency",
      experiencePeriod: "2015 – 2018",
      experienceHighlights: [
        {
          title: "55+ projects for the construction industry",
          description:
            "Developed and maintained high-performance WordPress websites, tailoring each solution to the specific needs of each client.",
        },
        {
          title: "Custom WordPress plugins and themes",
          description:
            "Built bespoke features in PHP, ensuring responsive and accessible design across all projects.",
        },
        {
          title: "Technical SEO with measurable results",
          description:
            "Implemented technical and on-page SEO improvements resulting in +30% organic traffic and +40% lead conversion.",
        },
      ],
      experienceTags: [
        "WordPress",
        "PHP",
        "SEO",
        "Responsive Design",
        "Performance Optimization",
        "UX/UI",
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
