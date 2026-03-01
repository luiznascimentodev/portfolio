export type Theme = "light" | "dark";

export type Language = "pt" | "en";

export type Section = "about" | "projects" | "contact" | "skills";

export interface Translation {
  nav: {
    about: string;
    projects: string;
    contact: string;
    skills: string;
    blog: string;
  };
  about: {
    title: string;
    description: string;
    pillarsTitle: string;
    pillars: Array<{
      title: string;
      description: string;
    }>;
    focusTitle: string;
    focusAreas: Array<{
      title: string;
      description: string;
      tags: string[];
    }>;
  };
  projects: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    description: string;
    email: string;
    phone: string;
    location: string;
  };
  skills: {
    title: string;
    description: string;
  };
  theme: {
    light: string;
    dark: string;
  };
  language: {
    pt: string;
    en: string;
  };
}
