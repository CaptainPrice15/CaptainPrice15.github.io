// Pure data for the skills constellation — no `three` imports so the client
// wrapper can use it for the reduced-motion grid fallback without pulling the
// WebGL bundle into the initial chunk.

import { portfolioData } from "@/data/portfolio";

const CATEGORY_LABELS: Record<string, string> = {
  backend: "Backend",
  database: "Database",
  automation: "Automation",
  ai: "AI",
  monitoring: "Monitoring",
  tools: "Tools",
  mobile: "Mobile",
};

export const CATEGORY_COLORS: Record<string, string> = {
  Backend: "#3b82f6",
  Database: "#8b5cf6",
  Automation: "#10b981",
  AI: "#f59e0b",
  Monitoring: "#ef4444",
  Tools: "#6b7280",
  Frontend: "#ec4899",
  Mobile: "#00bcd4",
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32);
}

export interface SkillDatum {
  id: string;
  label: string;
  category: string;
  color: string;
}

function buildSkillData(): SkillDatum[] {
  const nodes: SkillDatum[] = [];
  Object.entries(portfolioData.skills).forEach(([key, items]) => {
    const category = CATEGORY_LABELS[key] ?? key;
    items.forEach((label) => {
      nodes.push({
        id: slugify(label),
        label,
        category,
        color: CATEGORY_COLORS[category] || "#94a3b8",
      });
    });
  });
  return nodes;
}

export const SKILLS_DATA = buildSkillData();

const SKILL_CONNECTIONS: [string, string][] = [
  [".NET", "C#"],
  ["C#", "ASP.NET"],
  ["ASP.NET", "REST APIs"],
  ["SQL Server", "MongoDB"],
  ["Python", "PowerShell"],
  ["Python", "Power Automate"],
  ["ELK Stack", "Kibana"],
  ["Windows", "Linux"],
  ["Linux", "Git"],
  [".NET", "SQL Server"],
  ["Python", "ELK Stack"],
  ["AI Agent Coding (Claude, Codex, Gemini)", "Python"],
  ["Next.js", "REST APIs"],
  ["Android (Kotlin/Java)", "C#"],
];

export const CONNECTIONS: [number, number][] = SKILL_CONNECTIONS.map(
  ([a, b]) => {
    const ia = SKILLS_DATA.findIndex((n) => n.label === a);
    const ib = SKILLS_DATA.findIndex((n) => n.label === b);
    return ia >= 0 && ib >= 0 ? ([ia, ib] as [number, number]) : null;
  }
).filter((pair): pair is [number, number] => pair !== null);
