"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, Code, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Projects() {
  const { projects } = portfolioData;
  const [filter, setFilter] = React.useState("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.type)))];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter((p) => p.type === filter);

  return (
    <section id="projects" className="py-24 bg-transparent">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-8"></div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-xl overflow-hidden flex flex-col h-full group hover:border-primary/50 transition-colors"
              >
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <FolderGit2 className="h-10 w-10 text-primary" />
                    <div className="flex gap-3">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub Repository">
                        <Code className="h-5 w-5" />
                      </a>
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Live Demo">
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">
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
