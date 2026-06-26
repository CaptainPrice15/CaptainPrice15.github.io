"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Card3D
 * A card wrapper that applies real 3D perspective tilt on hover.
 * Features:
 * - Mouse-driven rotateX/rotateY tilt
 * - Shine/gloss overlay that follows cursor
 * - Children can have translateZ for depth layering
 * - Glow edge on hover
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotX = (mouseY / (rect.height / 2)) * -maxRotation;
    const rotY = (mouseX / (rect.width / 2)) * maxRotation;

    setRotateX(rotX);
    setRotateY(rotY);

    const shineX = ((e.clientX - rect.left) / rect.width) * 100;
    const shineY = ((e.clientY - rect.top) / rect.height) * 100;
    setShine({ x: shineX, y: shineY });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setShine({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("group", className)}
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* Glare overlay (follows cursor) */}
        {glare && (
          <div
            className="absolute inset-0 rounded-[inherit] pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,${shineIntensity}), transparent 60%)`,
            }}
          />
        )}

        {/* Content with optional depth */}
        <div
          className={cn(
            "relative z-10",
            depth && "[transform:translateZ(30px)]"
          )}
          style={depth ? { transform: `translateZ(30px)` } : undefined}
        >
          {children}
        </div>

        {/* Depth shadow layer */}
        {depth && (
          <div
            className="absolute inset-0 rounded-[inherit] pointer-events-none z-0"
            style={{
              transform: `translateZ(-10px)`,
              background: `linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))`,
              filter: `blur(4px)`,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
