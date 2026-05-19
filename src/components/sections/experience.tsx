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
    <section id="experience" className="py-24 bg-transparent relative">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl relative z-10">
        <SectionHeading title="Experience Timeline" />

        <div className="space-y-12">
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ ...springTransition, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
                <div className="md:col-span-1 flex flex-col md:items-end mb-4 md:mb-0 relative">
                  <div className="absolute left-[-31px] top-1 md:hidden h-full w-0.5 bg-border/50"></div>
                  <div className="absolute left-[-35px] top-1 md:hidden h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
                  
                  <span className="text-sm font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 inline-block w-fit shadow-sm">
                    {exp.period}
                  </span>
                </div>
                
                <div className="md:col-span-4 relative">
                  <div className="hidden md:block absolute left-[-49px] top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-background shadow-[0_0_10px_rgba(37,99,235,0.5)] z-10"></div>
                  {idx !== experience.length - 1 && (
                    <div className="hidden md:block absolute left-[-44px] top-4 h-[calc(100%+3rem)] w-0.5 bg-gradient-to-b from-primary/50 to-transparent mt-2"></div>
                  )}

                  <div className={`${glassClasses} p-6 md:p-8 rounded-2xl`}>
                    <div className={cardHoverOverlay}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{exp.role}</h3>
                      </div>
                      <h4 className="text-lg text-muted-foreground font-medium mb-4">{exp.company}</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
