"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * AmbientBackground (wrapper)
 * Mounts the WebGL field lazily so the heavy `three` bundle stays out of the
 * initial chunk. SSR-safe via `dynamic(..., { ssr: false })`. All mouse/scroll
 * handling lives inside the canvas module.
 */

const AmbientCanvas = dynamic(
  () => import("./ambient-canvas").then((m) => m.AmbientCanvas),
  { ssr: false }
);

export function AmbientBackground() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      <AmbientCanvas />
    </div>
  );
}
