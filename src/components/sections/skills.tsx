"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Database, LayoutTemplate, Server, Settings, Terminal, Bot } from "lucide-react";

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

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, type: "spring" as any, bounce: 0.2 } 
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.6, type: "spring" as any, bounce: 0.2 },
    },
  };

  return (
    <section id="skills" className="py-24 bg-transparent">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass glass-hover rounded-2xl p-6 md:p-8 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
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
