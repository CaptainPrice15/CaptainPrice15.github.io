"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, Code, FolderGit2 } from "lucide-react";

export function Projects() {
  const { projects } = portfolioData;
  const [filter, setFilter] = React.useState("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.type)))];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter((p) => p.type === filter);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, type: "spring" as any, bounce: 0.2 } 
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.6, type: "spring" as any, bounce: 0.2 } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: -20, 
      filter: "blur(8px)",
      transition: { duration: 0.3, type: "spring" as any } 
    }
  };

  return (
    <section id="projects" className="py-24 bg-transparent relative">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-8"></div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-105"
                    : "bg-background/50 border border-border/50 text-muted-foreground hover:bg-muted hover:text-foreground backdrop-blur-sm"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={projectVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="glass glass-hover rounded-2xl overflow-hidden flex flex-col h-full group relative"
              >
                {/* Decorative glowing gradient inside the card */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="p-6 md:p-8 flex-grow flex flex-col relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <FolderGit2 className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex gap-2">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-background/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1" aria-label="GitHub Repository">
                        <Code className="h-5 w-5" />
                      </a>
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-background/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1" aria-label="Live Demo">
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="text-xs font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
