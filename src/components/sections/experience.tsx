"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Briefcase } from "lucide-react";

export function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-24 bg-transparent relative">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Timeline</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
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
                  <div className="absolute left-[-31px] top-1 md:hidden h-full w-0.5 bg-border/50"></div>
                  <div className="absolute left-[-35px] top-1 md:hidden h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
                  
                  <span className="text-sm font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 inline-block w-fit shadow-sm">
                    {exp.period}
                  </span>
                </div>
                
                <div className="md:col-span-4 relative">
                  {/* Timeline dot for desktop */}
                  <div className="hidden md:block absolute left-[-49px] top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-background shadow-[0_0_10px_rgba(37,99,235,0.5)] z-10"></div>
                  {/* Timeline line for desktop */}
                  {idx !== experience.length - 1 && (
                    <div className="hidden md:block absolute left-[-44px] top-4 h-[calc(100%+3rem)] w-0.5 bg-gradient-to-b from-primary/50 to-transparent mt-2"></div>
                  )}

                  <div className="glass glass-hover p-6 md:p-8 rounded-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
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
