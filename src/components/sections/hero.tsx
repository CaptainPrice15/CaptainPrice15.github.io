"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Wrench, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import Link from "next/link";
import { staggerContainer, heroItem, heroBadge } from "@/lib/motion-variants";
import { buttonGradientClasses } from "@/lib/utils";

export function Hero() {
  const { name, title, headline, subtext } = portfolioData.hero;

  const btnClass = `${buttonGradientClasses} rounded-full h-14 px-8`;

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
        variants={staggerContainer}
      >
        <motion.div
          variants={heroBadge}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-foreground/80">{title}</span>
        </motion.div>

        <motion.div variants={heroItem}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">{name}</span>.
            <br className="hidden sm:block" />
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground/80 mb-6 max-w-4xl mx-auto leading-tight">
            {headline}
          </p>
        </motion.div>

        <motion.div variants={heroItem}>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {subtext}
          </p>
        </motion.div>

        <motion.div
          variants={heroItem}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Link href="#projects">
            <Button size="lg" className={`w-full sm:w-auto gap-2 ${btnClass}`}>
              View Projects <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Button size="lg" className={`w-full sm:w-auto gap-2 ${btnClass}`} asChild>
            <a href="https://tools.gourab.app" target="_blank" rel="noopener noreferrer">
              Tools App <Wrench className="h-5 w-5" />
            </a>
          </Button>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button size="lg" className={`flex-1 sm:w-auto gap-2 ${btnClass}`} asChild>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Resume <Download className="h-5 w-5" />
              </a>
            </Button>
            <Link href="#contact" className="flex-1 sm:flex-none">
              <Button size="lg" className={`w-full sm:w-auto gap-2 ${btnClass}`}>
                Contact <Mail className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
