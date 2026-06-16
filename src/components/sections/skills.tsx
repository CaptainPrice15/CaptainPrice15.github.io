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
import { glassClasses, cardHoverOverlay } from "@/lib/utils";
import type { SkillCategory } from "@/lib/types";

const iconMap: Record<string, React.ReactNode> = {
  backend: <Server className="h-6 w-6 text-primary" />,
  database: <Database className="h-6 w-6 text-accent" />,
  ai: <Bot className="h-6 w-6 text-purple-500" />,
  automation: <Terminal className="h-6 w-6 text-blue-400" />,
  monitoring: <Activity className="h-6 w-6 text-emerald-400" />,
  tools: <Settings className="h-6 w-6 text-orange-400" />,
};

const categories: SkillCategory[] = [
  {
    title: "Backend & APIs",
    icon: iconMap.backend,
    items: portfolioData.skills.backend,
  },
  {
    title: "Database",
    icon: iconMap.database,
    items: portfolioData.skills.database,
  },
  {
    title: "AI Agents",
    icon: iconMap.ai,
    items: portfolioData.skills.ai,
  },
  {
    title: "Automation",
    icon: iconMap.automation,
    items: portfolioData.skills.automation,
  },
  {
    title: "Monitoring",
    icon: iconMap.monitoring,
    items: portfolioData.skills.monitoring,
  },
  {
    title: "Tools & OS",
    icon: iconMap.tools,
    items: portfolioData.skills.tools,
  },
];

function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <div className={`${glassClasses} group/card`}>
      <div className={cardHoverOverlay} />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50 group-hover/card:scale-110 transition-transform duration-300">
            {category.icon}
          </div>
          <h3 className="text-xl font-bold text-foreground group-hover/card:text-primary transition-colors duration-300">
            {category.title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {category.items.map((skill: string, skillIdx: number) => (
            <span
              key={skillIdx}
              className="px-3 py-1.5 bg-background/40 backdrop-blur-md text-foreground text-sm font-medium rounded-full border border-border/50 shadow-sm hover:border-primary/30 hover:bg-primary/5 transition-colors"
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
    <section id="skills" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-transparent">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl">
        <SectionHeading title="Skills & Technologies" subtitle="What I work with" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerFast}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8 md:mt-12"
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
