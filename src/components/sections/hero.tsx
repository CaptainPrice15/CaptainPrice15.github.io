"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Wrench, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import Link from "next/link";

export function Hero() {
  const { name, title, headline, subtext } = portfolioData.hero;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { duration: 0.8, type: "spring" as any, bounce: 0.2 } 
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { duration: 0.8, type: "spring" as any, bounce: 0.2 } 
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 bg-transparent pt-32">
      {/* Animated Glowing Orbs Background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-primary/10 to-accent/10 rounded-full blur-[100px] opacity-50 pointer-events-none"></div>

      <motion.div 
        className="container px-4 sm:px-6 lg:px-8 relative z-10 mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          variants={badgeVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-foreground/80">{title}</span>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">{name}</span>.
            <br className="hidden sm:block" />
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground/80 mb-6 max-w-4xl mx-auto leading-tight">
            {headline}
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {subtext}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Link href="#projects">
            <Button size="lg" className="w-full sm:w-auto gap-2 rounded-full h-14 px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1 hover:scale-105 active:scale-95">
              View Projects <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Button size="lg" variant="default" className="w-full sm:w-auto gap-2 bg-gradient-to-r from-accent to-purple-600 text-white hover:opacity-90 rounded-full h-14 px-8 shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all hover:-translate-y-1 hover:scale-105 active:scale-95" asChild>
            <a href="https://tools.gourab.app" target="_blank" rel="noopener noreferrer">
              Tools App <Wrench className="h-5 w-5" />
            </a>
          </Button>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button size="lg" variant="outline" className="flex-1 sm:w-auto gap-2 rounded-full h-14 px-6 border-border/50 hover:bg-muted/50 backdrop-blur-sm transition-all hover:-translate-y-1 hover:scale-105 active:scale-95" asChild>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Resume <Download className="h-4 w-4" />
              </a>
            </Button>
            <Link href="#contact" className="flex-1 sm:flex-none">
              <Button size="lg" variant="ghost" className="w-full sm:w-auto gap-2 rounded-full h-14 px-6 hover:bg-muted/50 transition-all hover:scale-105 active:scale-95">
                Contact <Mail className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
