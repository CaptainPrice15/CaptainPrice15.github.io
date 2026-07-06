"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, Code, FolderGit2, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { fadeUp, scaleIn } from "@/lib/motion-variants";
import { sectionContainer } from "@/lib/utils";
import { Card3D } from "@/components/card-3d";
import type { Project } from "@/lib/types";

const projectGradients: Record<string, string> = {
  Monitoring: "from-blue-500/20 via-cyan-500/10 to-indigo-500/20",
  Automation: "from-amber-500/20 via-orange-500/10 to-yellow-500/20",
  Backend: "from-emerald-500/20 via-green-500/10 to-teal-500/20",
  Mobile: "from-teal-400/20 via-cyan-400/10 to-blue-400/20",
};

const projectAccentColors: Record<string, string> = {
  Monitoring: "text-blue-500",
  Automation: "text-amber-500",
  Backend: "text-emerald-500",
  Mobile: "text-teal-400",
};

function ProjectCard({ project }: { project: Project }) {
  const gradient = projectGradients[project.type] || "from-primary/20 via-accent/10 to-primary/20";
  const accentColor = projectAccentColors[project.type] || "text-primary";
  const metricHighlight = project.highlights?.[0];

  return (
    <Card3D
      className="h-full"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={scaleIn}
      layout
    >
      <div className="glass glass-hover rounded-2xl overflow-hidden flex flex-col h-full group relative">
        <div
          className={`relative h-40 sm:h-48 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xMCkiPjwvY2lyY2xlPgo8L3N2Zz4=')] opacity-40" aria-hidden="true" />
          <div className="p-4 bg-background/20 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-500">
            <FolderGit2 className={`h-10 w-10 ${accentColor}`} />
          </div>

          {metricHighlight && (
            <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-md rounded-full px-3 py-1.5 text-xs font-bold border border-border/40 flex items-center gap-1.5 shadow-sm">
              <TrendingUp className="h-3.5 w-3.5 text-success" />
              <span className={accentColor}>
                {metricHighlight.replace(/^Reduced |^Cut |^Handled /, "").split(" ").slice(0, 3).join(" ")}
              </span>
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6 flex-grow flex flex-col relative z-10">
          <div className="flex justify-end items-start -mt-10 mb-3 gap-2 relative z-20">
            {project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm"
                aria-label="View source code on GitHub"
              >
                <Code className="h-4 w-4" />
              </a>
            )}
            {project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm"
                aria-label="View live demo"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 flex-grow leading-relaxed">
            {project.description}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <ul className="space-y-1.5 mb-4">
              {project.highlights.map((h, i) => (
                <li
                  key={i}
                  className="text-xs text-muted-foreground flex items-start gap-2"
                >
                  <span className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 ${projectAccentColors[project.type]?.replace('text-', 'bg-') || 'bg-primary'}`} />
                  {h}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/40">
            {project.tech.map((tech: string, idx: number) => (
              <span
                key={idx}
                className="text-xs font-medium text-accent bg-accent/8 px-2.5 py-1 rounded-full border border-accent/15"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card3D>
  );
}

export function Projects() {
  const { projects } = portfolioData;
  const [filter, setFilter] = React.useState("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.type)))];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.type === filter);

  return (
    <section id="projects" className="section bg-transparent relative">
      <div className={sectionContainer}>
        <SectionHeading title="Featured Projects" eyebrow="My work" />

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
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === category
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-muted/50 border border-border/40 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
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
