"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { staggerContainer, heroItem, heroBadge } from "@/lib/motion-variants";
import { buttonGradientClasses } from "@/lib/utils";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const rotatingPhrases = [
  "Building Reliable Systems",
  "Automating at Scale",
  "Designing Modern Web Experiences",
  "Leading Production Teams",
];

function Typewriter({ phrases, delay = 0 }: { phrases: string[]; delay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = phrases[phraseIndex];
      if (!isDeleting) {
        setDisplayText(current.slice(0, displayText.length + 1));
        if (displayText.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayText(current.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 30 : 60);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, phrases]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-middle rounded-full"
      />
    </span>
  );
}

export function Hero() {
  const { name, title } = portfolioData.hero;

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden section !pt-28 sm:!pt-32 !pb-16 sm:!pb-20">
      <div
        className="absolute top-1/3 left-1/4 w-64 sm:w-80 md:w-[420px] h-64 sm:h-80 md:h-[420px] bg-primary/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-56 sm:w-72 md:w-[360px] h-56 sm:h-72 md:h-[360px] bg-accent/8 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        className="container px-4 sm:px-6 lg:px-8 relative z-10 mx-auto"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 sm:gap-14 lg:gap-20 items-center max-w-6xl mx-auto">
          <div className="text-center lg:text-left">
            <motion.div
              variants={heroBadge}
              className="eyebrow mb-6 sm:mb-8 justify-center lg:justify-start"
            >
              <span className="eyebrow-dot" aria-hidden="true" />
              {title}
            </motion.div>

            <motion.div variants={heroItem}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-4 sm:mb-6 leading-[1.1]">
                Hi, I'm{" "}
                <span className="gradient-text">{name}</span>.
              </h1>
            </motion.div>

            <motion.div variants={heroItem}>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground/70 mb-4 sm:mb-6 min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem] leading-snug">
                <Typewriter phrases={rotatingPhrases} delay={300} />
              </p>
            </motion.div>

            <motion.div variants={heroItem}>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-xl lg:mx-0 mx-auto leading-relaxed px-4 sm:px-0">
                {portfolioData.hero.subtext}
              </p>
            </motion.div>

            <motion.div
              variants={heroItem}
              className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
            >
              <Button
                size="lg"
                className={`w-full sm:w-auto gap-2 ${buttonGradientClasses} rounded-full h-12 sm:h-14 px-7 sm:px-8`}
                asChild
              >
                <Link href="#projects">
                  View Projects <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto gap-2 rounded-full h-12 sm:h-14 px-7 sm:px-8 border-border/60 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                asChild
              >
                <Link href="#contact">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" /> Get in Touch
                </Link>
              </Button>
            </motion.div>

            <motion.div
              variants={heroItem}
              className="mt-6 sm:mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground font-medium px-4 sm:px-0"
            >
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                4.5+ years experience
              </span>
              <span className="text-border/40" aria-hidden="true">&middot;</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Cognizant
              </span>
              <span className="text-border/40" aria-hidden="true">&middot;</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                Team Lead
              </span>
            </motion.div>
          </div>

          <motion.div
            variants={heroItem}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-[280px] xl:w-[320px] h-[280px] xl:h-[320px]">
              <div
                className="absolute -inset-6 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
                className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-glass-border glass animate-float shadow-xl"
              >
                <Image
                  src="/profile.jpg"
                  alt="Gourab Das Profile"
                  fill
                  className="object-cover"
                  priority
                  sizes="320px"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
