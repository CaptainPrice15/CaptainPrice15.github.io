"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { springTransition } from "@/lib/motion-variants";
import { glassClasses, cardHoverOverlay } from "@/lib/utils";

export function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-transparent relative">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl relative z-10">
        <SectionHeading title="Experience Timeline" />

        <div className="relative">
          <div
            className="absolute left-[7px] md:left-auto md:right-[calc(50%+24px)] top-0 bottom-0 w-0.5 bg-border/50"
            aria-hidden="true"
          />

          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            {experience.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...springTransition, delay: idx * 0.1 }}
                className="relative pl-8 sm:pl-10 md:pl-0"
              >
                <div
                  className="absolute left-0 top-2 h-4 w-4 rounded-full bg-primary ring-4 ring-background shadow-[0_0_10px_rgba(37,99,235,0.5)] z-10"
                  aria-hidden="true"
                />
                <div className="md:grid md:grid-cols-[120px_1fr] md:gap-8 items-start md:pl-0">
                  <div className="hidden md:flex md:justify-end mb-4 md:mb-0 md:pr-2">
                    <span className="text-sm font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 inline-block w-fit shadow-sm whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  <div className={`${glassClasses} rounded-xl sm:rounded-2xl`}>
                    <div className={cardHoverOverlay} aria-hidden="true" />

                    <div className="relative z-10">
                      <span className="md:hidden text-xs sm:text-sm font-bold text-primary bg-primary/10 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-primary/20 inline-block shadow-sm mb-2 sm:mb-3">
                        {exp.period}
                      </span>
                      <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                        <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg">
                          <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        </div>
                        <h3 className="text-base sm:text-xl font-bold text-foreground">
                          {exp.role}
                        </h3>
                      </div>
                      <h4 className="text-lg text-muted-foreground font-medium mb-4">
                        {exp.company}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed max-w-prose">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
