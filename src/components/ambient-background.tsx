"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { usePerformanceMode } from "@/lib/use-performance-mode";

/**
 * AmbientBackground (wrapper)
 * Mounts the WebGL field lazily so the heavy `three` bundle stays out of the
 * initial chunk. On mobile / low-end devices we keep the CSS body gradients
 * only — same look, no continuous full-screen GPU cost.
 */

const AmbientCanvas = dynamic(
  () => import("./ambient-canvas").then((m) => m.AmbientCanvas),
  { ssr: false }
);

export function AmbientBackground() {
  const prefersReducedMotion = useReducedMotion();
  const { reduceEffects } = usePerformanceMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Gate on `mounted` so the first client render matches the server (which
  // can't know device capability) — avoids hydration mismatch.
  if (mounted && (prefersReducedMotion || reduceEffects)) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <AmbientCanvas />
    </div>
  );
}
