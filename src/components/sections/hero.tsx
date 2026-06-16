"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { staggerContainer, heroItem, heroBadge } from "@/lib/motion-variants";
import { buttonGradientClasses } from "@/lib/utils";
import Image from "next/image";
import React, { useState, useEffect } from "react";

function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayText("");
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle"
      />
    </span>
  );
}

export function Hero() {
  const { name, title, headline, subtext } = portfolioData.hero;

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden py-16 sm:py-20 bg-transparent pt-28 sm:pt-32">
      <div
        className="absolute top-1/4 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-primary/20 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px] mix-blend-screen animate-pulse pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-accent/20 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px] mix-blend-screen animate-pulse delay-1000 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] md:w-[800px] h-[320px] sm:h-[500px] md:h-[800px] bg-gradient-to-tr from-primary/10 to-accent/10 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] opacity-30 sm:opacity-50 pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        className="container px-4 sm:px-6 lg:px-8 relative z-10 mx-auto"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              variants={heroBadge}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-foreground/80">{title}</span>
            </motion.div>

            <motion.div variants={heroItem}>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-3 sm:mb-5 leading-tight">
                Hi, I&apos;m{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">
                  {name}
                </span>
                .
              </h1>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground/80 mb-3 sm:mb-5 max-w-4xl lg:mx-0 mx-auto leading-tight min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem]">
                <Typewriter text={headline} delay={500} />
              </div>
            </motion.div>

            <motion.div variants={heroItem}>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl lg:mx-0 mx-auto leading-relaxed px-2 sm:px-0">
                {subtext}
              </p>
            </motion.div>

            <motion.div
              variants={heroItem}
              className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
            >
              <Button
                size="lg"
                className={`w-full sm:w-auto gap-2 ${buttonGradientClasses} rounded-full h-14 px-8`}
                asChild
              >
                <Link href="#projects">
                  View Projects <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                className={`w-full sm:w-auto gap-2 ${buttonGradientClasses} rounded-full h-14 px-8`}
                asChild
              >
                <Link href="#contact">
                  Contact Me <Mail className="h-5 w-5" />
                </Link>
              </Button>
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-4 mt-3 sm:mt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground gap-2"
                  asChild
                >
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="h-4 w-4" /> Resume
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground gap-2"
                  asChild
                >
                  <a
                    href={siteConfig.links.tools}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Wrench className="h-4 w-4" /> Tools App
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={heroItem}
            className="hidden lg:flex justify-center items-center relative"
          >
            <div className="relative w-[350px] xl:w-[400px] h-[350px] xl:h-[400px]">
              <div
                className="absolute inset-0 rounded-full border-2 border-primary/20 border-dashed animate-[spin_20s_linear_infinite]"
                aria-hidden="true"
              />
              <div
                className="absolute inset-4 rounded-full border-2 border-accent/20 border-dashed animate-[spin_15s_linear_infinite_reverse]"
                aria-hidden="true"
              />

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
                className="absolute inset-8 rounded-full bg-gradient-to-tr from-primary/10 to-accent/10 backdrop-blur-xl border border-white/10 flex items-center justify-center overflow-hidden animate-float"
              >
                <Image
                  src="/profile.jpg"
                  alt="Gourab Das Profile"
                  fill
                  className="object-cover"
                  priority
                  sizes="400px"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
