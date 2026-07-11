"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface LenisContextValue {
  /** Live scroll progress (0–1), read imperatively to avoid re-renders. */
  progressRef: React.MutableRefObject<number>;
  /** Subscribe to progress changes (for components that want to re-render). */
  subscribe: (cb: () => void) => () => void;
  /** Read the latest progress synchronously. */
  getProgress: () => number;
  /** Smoothly scroll to a target (number = px, string = selector). Falls back to native. */
  scrollTo: (target: number | string) => void;
}

const LenisContext = createContext<LenisContextValue | null>(null);

const fallback: LenisContextValue = {
  progressRef: { current: 0 },
  subscribe: () => () => {},
  getProgress: () => 0,
  scrollTo: (target) =>
    typeof target === "number"
      ? window.scrollTo({ top: target, behavior: "smooth" })
      : document.querySelector(target)?.scrollIntoView({ behavior: "smooth" }),
};

export const useLenis = () => useContext(LenisContext) ?? fallback;

export function SmoothScroll({ children }: { children: ReactNode }) {
  const progressRef = useRef(0);
  const listenersRef = useRef(new Set<() => void>());
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const subscribe = useCallback((cb: () => void) => {
    listenersRef.current.add(cb);
    return () => {
      listenersRef.current.delete(cb);
    };
  }, []);

  const getProgress = useCallback(() => progressRef.current, []);

  const scrollTo = useCallback((target: number | string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -80 });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const value = useMemo<LenisContextValue>(
    () => ({ progressRef, subscribe, getProgress, scrollTo }),
    [subscribe, getProgress, scrollTo]
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      anchors: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ({ progress: p }) => {
      progressRef.current = p;
      listenersRef.current.forEach((l) => l());
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}
