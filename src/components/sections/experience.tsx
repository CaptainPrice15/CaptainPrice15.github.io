"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { Briefcase, Star, Building2, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card3D } from "@/components/card-3d";
import { springTransition, timelineNode } from "@/lib/motion-variants";
import { cn, glassClasses, sectionContainer } from "@/lib/utils";

export function Experience() {
  const { experience } = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  const getMilestone = (idx: number) => {
    if (idx === 0) return { label: "Current", Icon: Building2, color: "text-primary" };
    if (idx === experience.length - 1) return { label: "Start", Icon: Rocket, color: "text-accent" };
    return { label: "Milestone", Icon: Briefcase, color: "text-muted-foreground" };
  };

  return (
    <section id="experience" className="section bg-transparent relative overflow-hidden">
      {/* Localized viewport glow */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-full pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(37,99,235,0.15) 0%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <div className={`${sectionContainer} max-w-4xl`}>
        <SectionHeading title="Experience" eyebrow="Career path" />

        <div ref={containerRef} className="relative mt-6 sm:mt-8">
          <div
            className="absolute left-[11px] top-2 bottom-2 w-px bg-border/20"
            aria-hidden="true"
          />

          <motion.div
            className="absolute left-[11px] top-2 w-px bg-primary/60 origin-top"
            style={{ height: lineHeight }}
            aria-hidden="true"
          />

          <div className="space-y-5 sm:space-y-6 md:space-y-8">
            {experience.map((exp, idx) => {
              const isCurrent = idx === 0;
              const isLeft = idx % 2 === 0;
              const milestone = getMilestone(idx);

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ ...springTransition, delay: idx * 0.08 }}
                  className="relative pl-8 sm:pl-10"
                >
                  <motion.div
                    variants={timelineNode}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={`absolute left-0 top-2 h-6 w-6 rounded-full border-2 z-10 flex items-center justify-center ${
                      isCurrent
                        ? "bg-primary border-primary shadow-lg shadow-primary/30"
                        : "bg-background border-primary/30"
                    }`}
                    aria-hidden="true"
                  >
                    {isCurrent && <Star className="h-3 w-3 text-primary-foreground" />}
                    {!isCurrent && (
                      <motion.div
                        className="h-2 w-2 rounded-full bg-primary/40"
                        animate={isCurrent ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                    )}
                  </motion.div>

                  <Card3D maxRotation={6} shineIntensity={0.08} glare={false}>
                    <motion.div
                      whileHover={{ scale: 1.01, y: -2 }}
                      transition={{ duration: 0.25 }}
                      className={cn(glassClasses, "hover:border-primary/20 transition-colors preserve-3d")}
                    >
                      {/* Contextual milestone badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <milestone.Icon className={`h-3.5 w-3.5 ${milestone.color}`} />
                        <span className={`text-xs font-semibold uppercase tracking-wider ${milestone.color}`}>
                          {milestone.label}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5 depth-layer-2">
                          <div className="p-1.5 bg-primary/8 rounded-lg border border-primary/10">
                            <Briefcase className="h-4 w-4 text-primary" />
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-foreground">
                            {exp.role}
                          </h3>
                        </div>
                        <span
                          className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full inline-block w-fit depth-layer-1 ${
                            isCurrent
                              ? "bg-primary/10 text-primary border border-primary/20"
                              : "bg-muted text-muted-foreground border border-border/40"
                          }`}
                        >
                          {exp.period}
                        </span>
                      </div>

                      <p className="text-sm font-medium text-muted-foreground mb-3 depth-layer-1">
                        {exp.company}
                      </p>

                      <p className="text-sm text-muted-foreground leading-relaxed depth-layer-1">
                        {exp.description}
                      </p>
                    </motion.div>
                  </Card3D>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
