"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import Link from "next/link";
import { staggerContainer, heroItem, heroBadge } from "@/lib/motion-variants";
import { buttonGradientClasses } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

function HeroAvatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const angleRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const animate = () => {
      angleRef.current = (angleRef.current + 0.3) % 360;
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion]);

  return (
    <div className={className} style={{ position: "relative" }}>
      <div
        className="absolute inset-0 rounded-full blur-[60px] opacity-30 pointer-events-none"
        style={{
          background: `conic-gradient(from ${angleRef.current}deg, #2563eb, #7c3aed, #ec4899, #2563eb)`,
          transform: "scale(1.15)",
        }}
        aria-hidden="true"
      />
      <div
        className="relative rounded-full border-2 bg-gradient-to-br from-background to-muted p-[3px]"
        style={{
          background: `conic-gradient(from ${angleRef.current}deg, #2563eb, #7c3aed, #ec4899, #2563eb)`,
        }}
      >
        <div className="relative rounded-full bg-background/80 backdrop-blur-sm p-6 sm:p-8 flex items-center justify-center">
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">
            {initials}
          </span>
        </div>
      </div>
    </div>
  );
}

const rotatingPhrases = [
  "Building Reliable Systems",
  "Automating at Scale",
  "Designing Modern Web Experiences",
  "Crafting Android Apps",
  "Leading Production Teams",
];

function Typewriter({
  phrases,
  onPhraseComplete,
}: {
  phrases: string[];
  onPhraseComplete?: () => void;
}) {
  const [displayText, setDisplayText] = useState("");
  const indexRef = useRef(0);
  const deletingRef = useRef(false);
  const textRef = useRef("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const tick = () => {
      const current = phrases[indexRef.current];

      if (!deletingRef.current) {
        const next = current.slice(0, textRef.current.length + 1);
        textRef.current = next;
        setDisplayText(next);
        if (next === current) {
          onPhraseComplete?.();
          timerRef.current = setTimeout(() => {
            deletingRef.current = true;
            tick();
          }, 2200);
          return;
        }
      } else {
        const next = current.slice(0, Math.max(0, textRef.current.length - 1));
        textRef.current = next;
        setDisplayText(next);
        if (next.length === 0) {
          deletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % phrases.length;
        }
      }

      const speed = deletingRef.current ? 30 : 60;
      timerRef.current = setTimeout(tick, speed);
    };

    tick();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phrases, prefersReducedMotion, onPhraseComplete]);

  if (prefersReducedMotion) {
    return <span>{phrases[0] || ""}</span>;
  }

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

function ParticleNetwork({
  className,
  burstSignal = 0,
}: {
  className?: string;
  burstSignal?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const burstsRef = useRef<
    { x: number; y: number; vx: number; vy: number; life: number; max: number; r: number; color: string }[]
  >([]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!burstSignal) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const cx = w / 2;
    const cy = h * 0.42;
    const count = 26;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const speed = 2 + Math.random() * 3.5;
      burstsRef.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 80,
        max: 80,
        r: Math.random() * 2 + 1,
        color: Math.random() < 0.5 ? "37, 99, 235" : "124, 58, 237",
      });
    }
  }, [burstSignal, prefersReducedMotion]);

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

      // Phrase-completion burst particles
      const bursts = burstsRef.current;
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.96;
        b.vy *= 0.96;
        b.life -= 1;
        const alpha = Math.max(0, b.life / b.max);

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${b.color}, ${alpha * 0.9})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${b.color}, ${alpha * 0.12})`;
        ctx.fill();

        if (b.life <= 0) bursts.splice(i, 1);
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
      burstsRef.current = [];
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
  const initials = name
    .split(" ")
    .map((w) => w[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [burstSignal, setBurstSignal] = useState(0);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(tiltY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(-py * 4);
    tiltY.set(px * 5);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100dvh] flex items-center overflow-hidden section !pt-28 sm:!pt-32 !pb-16 sm:!pb-20"
    >
      <ParticleNetwork className="absolute inset-0" burstSignal={burstSignal} />

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-center max-w-4xl mx-auto">
          {/* Avatar Column */}
          <motion.div
            variants={heroItem}
            className="flex justify-center lg:justify-end order-1 lg:order-1 depth-layer-3"
          >
            <HeroAvatar initials={initials} className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64" />
          </motion.div>

          {/* Text Column */}
          <motion.div
            className="text-center lg:text-left preserve-3d"
            style={{
              rotateX: prefersReducedMotion ? 0 : rotateX,
              rotateY: prefersReducedMotion ? 0 : rotateY,
              transformPerspective: 1000,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              variants={heroBadge}
              className="eyebrow mb-6 sm:mb-8 justify-center lg:justify-start depth-layer-1"
            >
              <span className="eyebrow-dot" aria-hidden="true" />
              {title}
            </motion.div>

            <motion.div variants={heroItem} className="depth-layer-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-4 sm:mb-6 leading-[1.1]">
                Hi, I&apos;m{" "}
                <span className="gradient-text">{name}</span>.
              </h1>
            </motion.div>

            <motion.div variants={heroItem} className="depth-layer-2">
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground/70 mb-4 sm:mb-6 min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem] leading-snug">
                <Typewriter
                  phrases={rotatingPhrases}
                  onPhraseComplete={() => setBurstSignal((n) => n + 1)}
                />
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
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
