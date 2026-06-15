"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { fadeUp, slideInLeft, slideInRight, staggerFast } from "@/lib/motion-variants";
import { glassClasses, cardHoverOverlay } from "@/lib/utils";

export function About() {
  const { story, highlights } = portfolioData.about;

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-transparent">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <SectionHeading title="About Me" />

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInLeft}
          >
            <h3 className="text-2xl font-bold mb-6 text-foreground">The Journey</h3>
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap max-w-prose">
              {story}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInRight}
            className={`${glassClasses} p-6 sm:p-8 md:p-10 rounded-3xl`}
          >
            <div className={cardHoverOverlay} aria-hidden="true" />

            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-6 text-foreground">Key Focus Areas</h3>
              <motion.ul
                variants={staggerFast}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {highlights.map((highlight, index) => {
                  const colonIdx = highlight.indexOf(": ");
                  const title = colonIdx > -1 ? highlight.slice(0, colonIdx) : highlight;
                  const description = colonIdx > -1 ? highlight.slice(colonIdx + 2) : "";
                  return (
                    <motion.li key={index} variants={fadeUp} className="flex gap-4">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <strong className="block text-foreground text-lg mb-1">{title}</strong>
                        {description && (
                          <span className="text-muted-foreground">{description}</span>
                        )}
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
