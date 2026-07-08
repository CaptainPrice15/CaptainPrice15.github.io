"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import { useLenis } from "@/components/smooth-scroll";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function ScrollProgress() {
  const { progress } = useLenis();
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const progressMotion = useMotionValue(0);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      // Fall back to the native scroll progress when Lenis is not active.
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      unsubscribeRef.current = scrollYProgress.on("change", (v) =>
        progressMotion.set(v)
      );
      progressMotion.set(scrollYProgress.get());
    } else {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      progressMotion.set(progress);
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [prefersReducedMotion, progress, scrollYProgress, progressMotion]);

  const scaleX = useSpring(progressMotion, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary via-accent to-primary"
      style={{ scaleX }}
    />
  );
}
