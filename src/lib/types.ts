import type { ReactNode } from "react";

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  type: string;
  highlights?: string[];
  challenges?: string[];
};

export type SkillCategory = {
  title: string;
  icon: ReactNode;
  items: string[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  description: string;
};

export type PortfolioData = {
  hero: {
    name: string;
    title: string;
    headline: string;
    subtext: string;
  };
  about: {
    story: string;
    highlights: string[];
  };
  skills: {
    backend: string[];
    database: string[];
    automation: string[];
    ai: string[];
    monitoring: string[];
    tools: string[];
    mobile: string[];
  };
  projects: Project[];
  experience: ExperienceItem[];
  contact: {
    email: string;
    linkedin: string;
    phone: string;
    github: string;
  };
};
