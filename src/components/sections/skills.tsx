"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Database, LayoutTemplate, Server, Settings, Terminal, Bot } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { staggerFast, staggerItems } from "@/lib/motion-variants";
import { glassClasses, cardHoverOverlay } from "@/lib/utils";

export function Skills() {
  const { skills } = portfolioData;

  const categories = [
    {
      title: "Backend & APIs",
      icon: <Server className="h-6 w-6 text-primary" />,
      items: skills.backend,
    },
    {
      title: "Database",
      icon: <Database className="h-6 w-6 text-accent" />,
      items: skills.database,
    },
    {
      title: "AI Agents",
      icon: <Bot className="h-6 w-6 text-purple-500" />,
      items: skills.ai,
    },
    {
      title: "Automation",
      icon: <Terminal className="h-6 w-6 text-blue-400" />,
      items: skills.automation,
    },
    {
      title: "Monitoring",
      icon: <LayoutTemplate className="h-6 w-6 text-emerald-400" />,
      items: skills.monitoring,
    },
    {
      title: "Tools & OS",
      icon: <Settings className="h-6 w-6 text-orange-400" />,
      items: skills.tools,
    },
  ];

  return (
    <section id="skills" className="py-24 bg-transparent">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl">
        <SectionHeading title="Skills & Technologies" subtitle="What I work with" />

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={staggerItems}
              className={glassClasses}
            >
              <div className={cardHoverOverlay}></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="px-3 py-1.5 bg-background/40 backdrop-blur-md text-foreground text-sm font-medium rounded-full border border-border/50 shadow-sm hover:border-primary/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
