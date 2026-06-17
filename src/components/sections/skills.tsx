"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import {
  Database,
  Server,
  Settings,
  Terminal,
  Bot,
  Activity,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { fadeUp, staggerFast } from "@/lib/motion-variants";
import { sectionContainer } from "@/lib/utils";
import type { SkillCategory } from "@/lib/types";

const categoryMeta: Record<string, { icon: React.ReactNode; badge: string; desc: string }> = {
  backend: {
    icon: <Server className="h-5 w-5 text-primary" />,
    badge: "badge-blue",
    desc: "Building APIs and services",
  },
  database: {
    icon: <Database className="h-5 w-5 text-purple-500" />,
    badge: "badge-purple",
    desc: "Data modeling and storage",
  },
  ai: {
    icon: <Bot className="h-5 w-5 text-purple-500" />,
    badge: "badge-purple",
    desc: "AI-driven development",
  },
  automation: {
    icon: <Terminal className="h-5 w-5 text-amber-600" />,
    badge: "badge-amber",
    desc: "Scripts and pipelines",
  },
  monitoring: {
    icon: <Activity className="h-5 w-5 text-emerald-600" />,
    badge: "badge-emerald",
    desc: "Observability and alerting",
  },
  tools: {
    icon: <Settings className="h-5 w-5 text-slate-500" />,
    badge: "badge-slate",
    desc: "Platforms and tooling",
  },
};

const categories: SkillCategory[] = [
  {
    title: "Backend & APIs",
    icon: categoryMeta.backend.icon,
    items: portfolioData.skills.backend,
  },
  {
    title: "Database",
    icon: categoryMeta.database.icon,
    items: portfolioData.skills.database,
  },
  {
    title: "AI Agents",
    icon: categoryMeta.ai.icon,
    items: portfolioData.skills.ai,
  },
  {
    title: "Automation",
    icon: categoryMeta.automation.icon,
    items: portfolioData.skills.automation,
  },
  {
    title: "Monitoring",
    icon: categoryMeta.monitoring.icon,
    items: portfolioData.skills.monitoring,
  },
  {
    title: "Tools & OS",
    icon: categoryMeta.tools.icon,
    items: portfolioData.skills.tools,
  },
];

function getBadgeClass(title: string): string {
  for (const [key, meta] of Object.entries(categoryMeta)) {
    if (title.toLowerCase().includes(key)) return meta.badge;
  }
  return "badge-slate";
}

function getCategoryDesc(title: string): string {
  for (const [key, meta] of Object.entries(categoryMeta)) {
    if (title.toLowerCase().includes(key)) return meta.desc;
  }
  return "";
}

function SkillCard({ category }: { category: SkillCategory }) {
  const badgeClass = getBadgeClass(category.title);
  const desc = getCategoryDesc(category.title);

  return (
    <div className="glass glass-hover rounded-xl sm:rounded-2xl p-5 sm:p-6 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-1.5">
          <div className="p-2.5 bg-primary/5 rounded-xl border border-border/40 group-hover:scale-110 transition-transform duration-300">
            {category.icon}
          </div>
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {category.title}
          </h3>
        </div>
        {desc && (
          <p className="text-xs text-muted-foreground mb-4 ml-[52px]">{desc}</p>
        )}
        <div className="flex flex-wrap gap-2 mt-4">
          {category.items.map((skill: string, skillIdx: number) => (
            <span
              key={skillIdx}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${badgeClass} transition-all hover:scale-[1.03]`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section bg-transparent">
      <div className={`${sectionContainer} max-w-6xl`}>
        <SectionHeading title="Skills & Technologies" eyebrow="What I work with" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerFast}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-6 sm:mt-8"
        >
          {categories.map((category) => (
            <motion.div key={category.title} variants={fadeUp}>
              <SkillCard category={category} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
