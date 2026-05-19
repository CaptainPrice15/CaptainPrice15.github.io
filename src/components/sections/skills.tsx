"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Database, LayoutTemplate, Server, Settings, Terminal, Bot } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { fadeUp } from "@/lib/motion-variants";
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

  // Split into two rows for the marquee
  const row1 = categories.slice(0, 3);
  const row2 = categories.slice(3, 6);

  const SkillCard = ({ category }: { category: any }) => (
    <div className={`w-[350px] md:w-[400px] flex-shrink-0 ${glassClasses} group/card`}>
      <div className={cardHoverOverlay}></div>
      
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
              className="px-3 py-1.5 bg-background/40 backdrop-blur-md text-foreground text-sm font-medium rounded-full border border-border/50 shadow-sm hover:border-primary/30 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-24 bg-transparent overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl mb-12">
        <SectionHeading title="Skills & Technologies" subtitle="What I work with" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="flex flex-col gap-6 relative"
      >
        {/* Gradient Masks for smooth fading on edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-background to-transparent z-20"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-background to-transparent z-20"></div>

        {/* Row 1 - Scroll Left */}
        <div className="flex w-max gap-6 animate-marquee hover:[animation-play-state:paused]">
          {[...row1, ...row1, ...row1, ...row1].map((category, idx) => (
            <SkillCard key={`r1-${idx}`} category={category} />
          ))}
        </div>

        {/* Row 2 - Scroll Right */}
        <div className="flex w-max gap-6 animate-marquee-reverse hover:[animation-play-state:paused] -ml-[100px] md:-ml-[200px]">
          {[...row2, ...row2, ...row2, ...row2].map((category, idx) => (
            <SkillCard key={`r2-${idx}`} category={category} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}