"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Gate on `mounted` so the first client render matches the server (which
  // can't know the user's reduced-motion preference) — avoids a hydration
  // mismatch and a flash of WebGL before swapping to the static fallback.
  if (prefersReducedMotion && mounted) return null;

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
