"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { usePerformanceMode } from "@/lib/use-performance-mode";
import { cn } from "@/lib/utils";
import { SKILLS_DATA } from "./skill-data";

/**
 * SkillConstellation (wrapper)
 * Reduced motion / mobile → static skill grid (same visual language as the
 * grid view). Desktop lazily mounts the WebGL 3D force-directed graph so
 * `three` stays out of the initial chunk.
 */

const SkillGraphCanvas = dynamic(
  () => import("./skill-graph-canvas").then((m) => m.SkillGraphCanvas),
  { ssr: false }
);

function StaticSkillGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 glass rounded-2xl p-4 sm:p-6",
        className
      )}
    >
      {SKILLS_DATA.map((skill) => (
        <div
          key={skill.id}
          className="px-3 py-2.5 rounded-lg text-sm font-medium text-center transition-colors"
          style={{
            background: `${skill.color}18`,
            border: `1px solid ${skill.color}40`,
            color: "inherit",
          }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full mr-1.5 align-middle"
            style={{ background: skill.color }}
            aria-hidden="true"
          />
          {skill.label}
        </div>
      ))}
    </div>
  );
}

export function SkillConstellation({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const { reduceEffects } = usePerformanceMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (mounted && (prefersReducedMotion || reduceEffects)) {
    return <StaticSkillGrid className={className} />;
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
