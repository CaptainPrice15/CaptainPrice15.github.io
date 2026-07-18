"use client";

import { useRef, useState, type ReactNode } from "react";
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
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const prefersReducedMotion = useReducedMotion();
  const { reduceEffects } = usePerformanceMode();
  const interactive = !prefersReducedMotion && !reduceEffects;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    setRotateX((mouseY / (rect.height / 2)) * -maxRotation);
    setRotateY((mouseX / (rect.width / 2)) * maxRotation);
    setShine({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setShine({ x: 50, y: 50 });
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
        <motion.div
          animate={{ rotateX, rotateY }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full h-full"
        >
          {glare && (
            <div
              className="absolute inset-0 rounded-[inherit] pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,${shineIntensity}), transparent 60%)`,
              }}
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
        </motion.div>
      ) : (
        <div className="relative w-full h-full">{children}</div>
      )}
    </motion.div>
  );
}
