"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Briefcase } from "lucide-react";

export function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Timeline</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="space-y-12">
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
                <div className="md:col-span-1 flex flex-col md:items-end mb-4 md:mb-0 relative">
                  {/* Timeline line and dot for mobile */}
                  <div className="absolute left-[-31px] top-1 md:hidden h-full w-0.5 bg-border"></div>
                  <div className="absolute left-[-35px] top-1 md:hidden h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background"></div>
                  
                  <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full inline-block w-fit">
                    {exp.period}
                  </span>
                </div>
                
                <div className="md:col-span-4 relative">
                  {/* Timeline dot for desktop */}
                  <div className="hidden md:block absolute left-[-49px] top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-background z-10"></div>
                  {/* Timeline line for desktop */}
                  {idx !== experience.length - 1 && (
                    <div className="hidden md:block absolute left-[-44px] top-4 h-full w-0.5 bg-border mt-2"></div>
                  )}

                  <div className="bg-card border border-border p-6 rounded-xl hover:border-primary/30 transition-colors shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                    </div>
                    <h4 className="text-lg text-muted-foreground font-medium mb-4">{exp.company}</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
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
