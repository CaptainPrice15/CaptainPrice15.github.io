"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { CheckCircle2 } from "lucide-react";

export function About() {
  const { story, highlights } = portfolioData.about;

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, type: "spring" as any, bounce: 0.2 } 
    },
  };

  const slideInLeftVariant = {
    hidden: { opacity: 0, x: -40, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, type: "spring" as any, bounce: 0.2 } 
    },
  };

  const slideInRightVariant = {
    hidden: { opacity: 0, x: 40, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, type: "spring" as any, bounce: 0.2 } 
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section id="about" className="py-24 bg-transparent">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInLeftVariant}
          >
            <h3 className="text-2xl font-bold mb-6 text-foreground">The Journey</h3>
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {story}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInRightVariant}
            className="glass glass-hover p-8 md:p-10 rounded-3xl shadow-sm relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-6 text-foreground">Key Focus Areas</h3>
              <motion.ul 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {highlights.map((highlight, index) => {
                  const [title, description] = highlight.split(': ');
                  return (
                    <motion.li key={index} variants={fadeUpVariant} className="flex gap-4">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <strong className="block text-foreground text-lg mb-1">{title}</strong>
                        <span className="text-muted-foreground">{description}</span>
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
