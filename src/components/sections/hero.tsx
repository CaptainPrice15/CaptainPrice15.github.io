"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { staggerContainer, heroItem, heroBadge } from "@/lib/motion-variants";
import { buttonGradientClasses } from "@/lib/utils";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const rotatingPhrases = [
  "Building Reliable Systems",
  "Automating at Scale",
  "Designing Modern Web Experiences",
  "Crafting Android Apps",
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

function ParticleNetwork({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const PARTICLE_COUNT = 50;
    const MAX_DIST = 120;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(37, 99, 235, 0.25)";
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.12 * (1 - dist / MAX_DIST)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
}



export function Hero() {
  const { name, title } = portfolioData.hero;

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden section !pt-28 sm:!pt-32 !pb-16 sm:!pb-20">
      <ParticleNetwork className="absolute inset-0" />

      {/* 3D floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
        <div className="absolute top-[15%] left-[8%] w-3 h-3 rounded-full bg-primary/30 animate-float-3d" style={{ animationDelay: "0s", animationDuration: "5s" }} />
        <div className="absolute top-[25%] right-[12%] w-2 h-2 rounded-full bg-accent/40 animate-float-3d-reverse" style={{ animationDelay: "0.5s", animationDuration: "6s" }} />
        <div className="absolute bottom-[20%] left-[15%] w-4 h-4 rounded-full bg-primary/20 animate-float-3d" style={{ animationDelay: "1s", animationDuration: "7s" }} />
        <div className="absolute bottom-[30%] right-[8%] w-2.5 h-2.5 rounded-full bg-success/30 animate-float-3d-reverse" style={{ animationDelay: "1.5s", animationDuration: "5.5s" }} />
      </div>

      <motion.div
        className="container px-4 sm:px-6 lg:px-8 relative z-10 mx-auto"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 gap-10 sm:gap-14 items-center max-w-4xl mx-auto text-center">
          <div className="text-center preserve-3d">
            <motion.div
              variants={heroBadge}
              className="eyebrow mb-6 sm:mb-8 justify-center depth-layer-1"
            >
              <span className="eyebrow-dot" aria-hidden="true" />
              {title}
            </motion.div>

            <motion.div variants={heroItem} className="depth-layer-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-4 sm:mb-6 leading-[1.1]">
                Hi, I'm{" "}
                <span className="gradient-text">{name}</span>.
              </h1>
            </motion.div>

            <motion.div variants={heroItem} className="depth-layer-2">
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground/70 mb-4 sm:mb-6 min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem] leading-snug">
                <Typewriter phrases={rotatingPhrases} delay={300} />
              </p>
            </motion.div>

            <motion.div variants={heroItem} className="depth-layer-1">
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                {portfolioData.hero.subtext}
              </p>
            </motion.div>

            <motion.div
              variants={heroItem}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0 depth-layer-3"
            >
              <Button
                size="lg"
                className={`w-full sm:w-auto gap-2 ${buttonGradientClasses} rounded-full h-12 sm:h-14 px-7 sm:px-8 depth-shadow`}
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
              className="mt-6 sm:mt-8 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground font-medium px-4 sm:px-0 depth-layer-1"
            >
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary depth-layer-1" aria-hidden="true" />
                4.5+ years experience
              </span>
              <span className="text-border/40" aria-hidden="true">&middot;</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Android & .NET
              </span>
              <span className="text-border/40" aria-hidden="true">&middot;</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-success depth-layer-2" aria-hidden="true" />
                Play Store Publisher
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
