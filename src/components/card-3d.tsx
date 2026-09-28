"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { usePerformanceMode } from "@/lib/use-performance-mode";

/**
 * Card3D
 * Desktop: perspective tilt + glare on hover.
 * Mobile / reduced-motion: same glass card with layout animations, no tilt work.
 */
interface Card3DProps extends Omit<MotionProps, "onMouseMove" | "onMouseLeave"> {
  children: ReactNode;
  className?: string;
  shineIntensity?: number;
  maxRotation?: number;
  depth?: boolean;
  glare?: boolean;
}

export function Card3D({
  children,
  className,
  shineIntensity = 0.15,
  maxRotation = 12,
  depth = true,
  glare = true,
  ...props
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  // Direct DOM nodes for transform/shine — avoids a React re-render on every
  // mousemove frame (was a setState per tick → style recalc storm).
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pending = useRef<{ rx: number; ry: number; sx: number; sy: number } | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { reduceEffects } = usePerformanceMode();
  const interactive = !prefersReducedMotion && !reduceEffects;

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const flush = () => {
    rafRef.current = null;
    const p = pending.current;
    if (!p) return;
    const inner = innerRef.current;
    if (inner) {
      inner.style.transform = `rotateX(${p.rx}deg) rotateY(${p.ry}deg)`;
    }
    const glow = glareRef.current;
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${p.sx}% ${p.sy}%, rgba(255,255,255,${shineIntensity}), transparent 60%)`;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - (rect.left + rect.width / 2);
    const mouseY = e.clientY - (rect.top + rect.height / 2);
    pending.current = {
      rx: (mouseY / (rect.height / 2)) * -maxRotation,
      ry: (mouseX / (rect.width / 2)) * maxRotation,
      sx: ((e.clientX - rect.left) / rect.width) * 100,
      sy: ((e.clientY - rect.top) / rect.height) * 100,
    };
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(flush);
  };

  const handleMouseLeave = () => {
    pending.current = { rx: 0, ry: 0, sx: 50, sy: 50 };
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(flush);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={interactive ? handleMouseMove : undefined}
      onMouseLeave={interactive ? handleMouseLeave : undefined}
      className={cn("group", className)}
      style={
        interactive
          ? { perspective: 1200, transformStyle: "preserve-3d" }
          : undefined
      }
      {...props}
    >
      {interactive ? (
        <div
          ref={innerRef}
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
            transition: "transform 0.15s ease-out",
          }}
          className="relative w-full h-full"
        >
          {glare && (
            <div
              ref={glareRef}
              className="absolute inset-0 rounded-[inherit] pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          )}

          <div
            className={cn(
              "relative z-10",
              depth && "[transform:translateZ(30px)]"
            )}
          >
            {children}
          </div>

          {depth && (
            <div
              className="absolute inset-0 rounded-[inherit] pointer-events-none z-0"
              style={{
                transform: "translateZ(-10px)",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))",
                filter: "blur(4px)",
              }}
            />
          )}
        </div>
      ) : (
        <div className="relative w-full h-full">{children}</div>
      )}
    </motion.div>
  );
}
