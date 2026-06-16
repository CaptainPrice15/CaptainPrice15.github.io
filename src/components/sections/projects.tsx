"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, Code, FolderGit2 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { fadeUp, scaleIn } from "@/lib/motion-variants";
import type { Project } from "@/lib/types";

function ProjectCard({ project }: { project: Project }) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    currentTarget.style.setProperty("--mouse-x", `${clientX - left}px`);
    currentTarget.style.setProperty("--mouse-y", `${clientY - top}px`);
  }

  return (
    <motion.div
      layout
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      onMouseMove={handleMouseMove}
      ref={cardRef}
      className="glass glass-hover rounded-2xl overflow-hidden flex flex-col h-full group relative"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={
          {
            background:
              "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.1), transparent 80%)",
          } as React.CSSProperties
        }
      />
      <div className="p-5 sm:p-6 md:p-8 flex-grow flex flex-col relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <FolderGit2 className="h-8 w-8 text-primary" />
          </div>
          <div className="flex gap-2">
            {project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1"
                aria-label="View source code on GitHub"
              >
                <Code className="h-5 w-5" />
              </a>
            )}
            {project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1"
                aria-label="View live demo"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 flex-grow leading-relaxed">
          {project.description}
        </p>
        {project.highlights && project.highlights.length > 0 && (
          <ul className="space-y-1 mb-4">
            {project.highlights.map((h, i) => (
              <li
                key={i}
                className="text-xs text-muted-foreground flex items-start gap-2"
              >
                <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
          {project.tech.map((tech: string, idx: number) => (
            <span
              key={idx}
              className="text-xs font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const { projects } = portfolioData;
  const [filter, setFilter] = React.useState("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.type)))];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.type === filter);

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-transparent relative">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <SectionHeading title="Featured Projects" className="mb-0" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
        >
          <div
            className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12 mt-6 sm:mt-8 px-2"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                role="tab"
                aria-selected={filter === category}
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

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
