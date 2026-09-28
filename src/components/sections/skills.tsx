"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { SkillConstellation } from "./skill-constellation";
import { TechRadar } from "./tech-radar";
import { fadeUp, staggerFast } from "@/lib/motion-variants";
import { sectionContainer } from "@/lib/utils";
import { skills } from "@/data/skills";
import { usePerformanceMode } from "@/lib/use-performance-mode";

export function Skills() {
  const [viewMode, setViewMode] = useState<"constellation" | "grid" | "radar">("constellation");
  const { reduceEffects } = usePerformanceMode();
  // On low-power devices, never mount the constellation; start on grid.
  const allowConstellation = !reduceEffects;
  const activeView =
    viewMode === "constellation" && !allowConstellation ? "grid" : viewMode;

  const gridSkills = Object.values(skills).flat();

  const modes: { id: "constellation" | "grid" | "radar"; label: string }[] = [
    ...(allowConstellation ? [{ id: "constellation" as const, label: "Constellation" }] : []),
    { id: "grid", label: "Grid" },
    { id: "radar", label: "Radar" },
  ];

  return (
    <section id="skills" aria-label="Skills and technologies" className="section bg-transparent relative overflow-hidden">
      <div className={`${sectionContainer} max-w-6xl`}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading title="Skills & Technologies" eyebrow="What I work with" />

          {/* View Toggle — all modes always visible so users can switch freely. */}
          <div
            className="flex items-center gap-1 p-1 rounded-full bg-muted/50 border border-border/40 w-fit"
            role="tablist"
            aria-label="Skills view"
          >
            {modes.map((m) => (
              <button
                key={m.id}
                role="tab"
                aria-selected={activeView === m.id}
                onClick={() => setViewMode(m.id)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                  activeView === m.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerFast}
          className="mt-8 sm:mt-12"
        >
          {activeView === "constellation" ? (
            <motion.div variants={fadeUp}>
              <SkillConstellation />
              <p className="text-center text-sm text-muted-foreground mt-4">
                Hover to explore connections. Each node drifts with physics.
              </p>
            </motion.div>
          ) : activeView === "radar" ? (
            <motion.div variants={fadeUp}>
              <TechRadar />
              <p className="text-center text-sm text-muted-foreground mt-4">
                Rotating radar showing category proficiency levels.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {gridSkills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-center bg-primary/5 border border-primary/10 text-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
