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
  coverGradient?: string;
  iconEmoji?: string;
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

export type HeroData = {
  name: string;
  title: string;
  headline: string;
  subtext: string;
};

export type AboutData = {
  story: string;
  highlights: string[];
};

export type SkillsData = {
  backend: string[];
  database: string[];
  automation: string[];
  ai: string[];
  monitoring: string[];
  tools: string[];
  mobile: string[];
  [category: string]: string[];
};

export type ContactData = {
  email: string;
  linkedin: string;
  phone: string;
  github: string;
};

export type PortfolioData = {
  hero: HeroData;
  about: AboutData;
  skills: SkillsData;
  projects: Project[];
  experience: ExperienceItem[];
  contact: ContactData;
};
