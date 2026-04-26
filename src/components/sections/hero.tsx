"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import Link from "next/link";

export function Hero() {
  const { name, title, headline, subtext } = portfolioData.hero;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 bg-transparent">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-primary font-mono text-sm sm:text-base font-semibold tracking-wider uppercase mb-4">
            {title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6">
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{name}</span>.
            <br className="hidden sm:block" />
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground/80 mb-6 max-w-4xl mx-auto leading-tight">
            {headline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {subtext}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="#projects">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              View Projects <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button size="lg" variant="default" className="w-full sm:w-auto gap-2 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <a href="https://tools.gourab.app" target="_blank" rel="noopener noreferrer">
              Tools App <Wrench className="h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2" asChild>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Download Resume <Download className="h-4 w-4" />
            </a>
          </Button>
          <Link href="#contact">
            <Button size="lg" variant="ghost" className="w-full sm:w-auto gap-2">
              Contact Me <Mail className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
