"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { usePerformanceMode } from "@/lib/use-performance-mode";

/**
 * HeroAvatarWebGL (wrapper)
 * Renders a static DOM avatar when reduced motion or mobile performance mode
 * is active; otherwise lazily mounts the WebGL liquid-glass canvas so `three`
 * stays out of the initial chunk. SSR-safe via `dynamic(..., { ssr: false })`.
 */

const HeroAvatarCanvas = dynamic(
  () => import("./hero-avatar-canvas").then((m) => m.HeroAvatarCanvas),
  { ssr: false }
);

function StaticAvatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="relative rounded-full bg-gradient-to-br from-primary/30 via-accent/25 to-primary/20 p-[3px] shadow-lg shadow-primary/15">
        <div className="relative rounded-full bg-background/90 p-6 sm:p-8 flex items-center justify-center ring-1 ring-white/10">
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">
            {initials}
          </span>
        </div>
      </div>
    </div>
  );
}

export function HeroAvatarWebGL({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const { reduceEffects } = usePerformanceMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (mounted && (prefersReducedMotion || reduceEffects)) {
    return <StaticAvatar initials={initials} className={className} />;
  }

  return (
    <div className={className} style={{ position: "relative" }} aria-hidden="true">
      <HeroAvatarCanvas initials={initials} />
    </div>
  );
}
