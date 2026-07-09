"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * HeroAvatarWebGL (wrapper)
 * Renders a static DOM avatar when reduced motion is preferred, otherwise
 * lazily mounts the WebGL liquid-glass canvas so `three` stays out of the
 * initial chunk. SSR-safe via `dynamic(..., { ssr: false })`.
 */

const HeroAvatarCanvas = dynamic(
  () => import("./hero-avatar-canvas").then((m) => m.HeroAvatarCanvas),
  { ssr: false }
);

export function HeroAvatarWebGL({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
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
        <div className="relative rounded-full bg-gradient-to-br from-background to-muted p-[3px]">
          <div className="relative rounded-full bg-background/80 backdrop-blur-sm p-6 sm:p-8 flex items-center justify-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">
              {initials}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={{ position: "relative" }}>
      <HeroAvatarCanvas initials={initials} />
    </div>
  );
}
