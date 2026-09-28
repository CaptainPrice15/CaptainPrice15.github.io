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

  // Gate on `mounted` before rendering anything WebGL-related so the first
  // client render matches the server AND low-capability devices never even
  // start downloading the `three` chunk (it would otherwise be fetched while
  // `mounted` is still false, then unmounted on the post-effect pass).
  if (!mounted) return null;
  if (prefersReducedMotion || reduceEffects) return null;

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
