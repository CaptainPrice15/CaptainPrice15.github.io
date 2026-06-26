"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { SkillConstellation } from "./skill-constellation";
import { fadeUp, staggerFast } from "@/lib/motion-variants";
import { sectionContainer } from "@/lib/utils";

export function Skills() {
  const [viewMode, setViewMode] = useState<"constellation" | "grid">("constellation");

  return (
    <section id="skills" className="section bg-transparent relative overflow-hidden">
      <div className={`${sectionContainer} max-w-6xl`}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading title="Skills & Technologies" eyebrow="What I work with" />

          {/* View Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-muted/50 border border-border/40 w-fit">
            <button
              onClick={() => setViewMode("constellation")}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                viewMode === "constellation"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Constellation
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Grid
            </button>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerFast}
          className="mt-8 sm:mt-12"
        >
          {viewMode === "constellation" ? (
            <motion.div variants={fadeUp}>
              <SkillConstellation />
              <p className="text-center text-sm text-muted-foreground mt-4">
                Hover to explore connections. Each node drifts with physics.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[".NET", "C#", "Python", "PowerShell", "SQL Server", "MongoDB", "ELK Stack", "AI Agents", "Next.js", "Git", "Windows", "Linux"].map((s, i) => (
                <span
                  key={i}
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
