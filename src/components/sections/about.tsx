"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { CheckCircle2 } from "lucide-react";

export function About() {
  const { story, highlights } = portfolioData.about;

  return (
    <section id="about" className="py-24 bg-transparent">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-foreground">The Journey</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {story}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-bold mb-6 text-foreground">Key Focus Areas</h3>
            <ul className="space-y-6">
              {highlights.map((highlight, index) => {
                const [title, description] = highlight.split(': ');
                return (
                  <li key={index} className="flex gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <strong className="block text-foreground text-lg mb-1">{title}</strong>
                      <span className="text-muted-foreground">{description}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
