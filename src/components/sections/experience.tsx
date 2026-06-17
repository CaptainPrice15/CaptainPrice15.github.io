"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Briefcase, Star } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { springTransition } from "@/lib/motion-variants";
import { sectionContainer } from "@/lib/utils";

export function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="section bg-transparent relative">
      <div className={`${sectionContainer} max-w-4xl`}>
        <SectionHeading title="Experience" eyebrow="Career path" />

        <div className="relative mt-6 sm:mt-8">
          <div
            className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-5 sm:space-y-6 md:space-y-8">
            {experience.map((exp, idx) => {
              const isCurrent = idx === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ ...springTransition, delay: idx * 0.08 }}
                  className="relative pl-8 sm:pl-10"
                >
                  <div
                    className={`absolute left-0 top-2 h-6 w-6 rounded-full border-2 z-10 flex items-center justify-center ${
                      isCurrent
                        ? "bg-primary border-primary shadow-lg shadow-primary/30"
                        : "bg-background border-primary/30"
                    }`}
                    aria-hidden="true"
                  >
                    {isCurrent && <Star className="h-3 w-3 text-primary-foreground" />}
                    {!isCurrent && <div className="h-2 w-2 rounded-full bg-primary/40" />}
                  </div>

                  <div className="glass rounded-xl sm:rounded-2xl p-5 sm:p-6 group hover:border-primary/20 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-primary/8 rounded-lg border border-primary/10">
                          <Briefcase className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground">
                          {exp.role}
                        </h3>
                      </div>
                      <span
                        className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full inline-block w-fit ${
                          isCurrent
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "bg-muted text-muted-foreground border border-border/40"
                        }`}
                      >
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-sm font-medium text-muted-foreground mb-3">
                      {exp.company}
                    </p>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
