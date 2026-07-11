"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";
import { SKILLS_DATA } from "./skill-data";

/**
 * SkillConstellation (wrapper)
 * Reduced motion → static grid of skill badges. Otherwise lazily mounts the
 * WebGL 3D force-directed graph so `three` stays out of the initial chunk.
 * SSR-safe via `dynamic(..., { ssr: false })`.
 */

const SkillGraphCanvas = dynamic(
  () => import("./skill-graph-canvas").then((m) => m.SkillGraphCanvas),
  { ssr: false }
);

export function SkillConstellation({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (prefersReducedMotion && mounted) {
    return (
      <div className={cn("grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3", className)}>
        {SKILLS_DATA.map((skill) => (
          <div
            key={skill.id}
            className="px-3 py-2 rounded-lg text-sm font-medium text-center"
            style={{
              background: `${skill.color}22`,
              border: `1px solid ${skill.color}44`,
            }}
          >
            {skill.label}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden glass",
        className
      )}
      aria-hidden="true"
    >
      <SkillGraphCanvas />
    </div>
  );
}
