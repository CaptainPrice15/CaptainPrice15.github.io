"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Database, LayoutTemplate, Server, Settings, Terminal } from "lucide-react";

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-muted rounded-lg">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className="px-3 py-1.5 bg-muted/50 text-muted-foreground text-sm rounded-full border border-border/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
