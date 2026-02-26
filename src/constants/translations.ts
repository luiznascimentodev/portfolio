import type { Translation } from "../types";

export const translations: Record<"pt" | "en", Translation> = {
  pt: {
    nav: {
      about: "Sobre",
      projects: "Projetos",
      contact: "Contato",
      skills: "Habilidades",
    },
    about: {
      title: "Sobre Mim",
      description:
        "Desenvolvedor Full Stack especializado em construir experiências digitais excepcionais. Com expertise em Node.js, React e TypeScript, transformo ideias complexas em aplicações escaláveis e seguras que realmente fazem a diferença. Minha jornada inclui o desenvolvimento completo de uma plataforma educacional em produção, onde aplico princípios de arquitetura limpa, testes automatizados e as melhores práticas de segurança. Acredito que bom código não é apenas funcional - é elegante, mantível e centrado no usuário.",
      educationTitle: "Formação e Idiomas",
      educationDegree: "Análise e Desenvolvimento de Sistemas",
      educationInstitution: "Universidade Positivo",
      educationStatus: "Em andamento",
      languageTitle: "Idiomas",
      languages: [
        { name: "Português", level: "Nativo" },
        { name: "Inglês", level: "Intermediário" },
      ],
      experienceTitle: "Experiência Profissional",
      experienceRole:
        "Desenvolvedor Full Stack | Agência de Desenvolvimento Web",
      experiencePeriod: "2015 – 2018",
      experienceHighlights: [
        {
          title: "Entrega em Escala",
          description:
            "Liderei o desenvolvimento e manutenção de 55+ websites WordPress otimizados para o setor de construção civil, entregando soluções personalizadas e de alta performance.",
        },
        {
          title: "Arquitetura Customizada",
          description:
            "Desenvolvi temas e plugins sob medida utilizando PHP avançado, criando funcionalidades que elevaram a experiência do usuário com design 100% responsivo e acessível.",
        },
        {
          title: "Impacto Mensurável",
          description:
            "Implementei estratégias de SEO técnico e on-page que geraram resultados expressivos: +30% de tráfego orgânico e +40% em conversão de leads, impactando diretamente o ROI dos clientes.",
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
    },
    about: {
      title: "About Me",
      description:
        "Full Stack Developer specialized in building exceptional digital experiences. With expertise in Node.js, React, and TypeScript, I transform complex ideas into scalable and secure applications that truly make a difference. My journey includes full-stack development of an educational platform in production, where I apply clean architecture principles, automated testing, and security best practices. I believe that good code isn't just functional - it's elegant, maintainable, and user-centered.",
      educationTitle: "Education & Languages",
      educationDegree: "Systems Analysis and Development",
      educationInstitution: "Universidade Positivo",
      educationStatus: "In Progress",
      languageTitle: "Languages",
      languages: [
        { name: "Portuguese", level: "Native" },
        { name: "English", level: "Intermediate" },
      ],
      experienceTitle: "Professional Experience",
      experienceRole: "Full Stack Developer | Web Development Agency",
      experiencePeriod: "2015 – 2018",
      experienceHighlights: [
        {
          title: "Scale & Delivery",
          description:
            "Led development and maintenance of 55+ optimized WordPress websites for the construction industry, delivering customized high-performance solutions.",
        },
        {
          title: "Custom Architecture",
          description:
            "Built bespoke themes and plugins using advanced PHP, creating features that elevated user experience with 100% responsive and accessible design.",
        },
        {
          title: "Measurable Impact",
          description:
            "Implemented technical and on-page SEO strategies that generated outstanding results: +30% organic traffic and +40% lead conversion, directly impacting clients' ROI.",
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
