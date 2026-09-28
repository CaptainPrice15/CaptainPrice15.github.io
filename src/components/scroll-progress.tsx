"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import { useLenis } from "@/components/smooth-scroll";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function ScrollProgress() {
  const { subscribe, getProgress } = useLenis();
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const progressMotion = useMotionValue(0);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // Write scroll progress straight into the motion value (no React re-render per
  // frame). We subscribe to Lenis' imperative progress store and fall back to the
  // native scroll progress when reduced motion is active.
  useEffect(() => {
    const clean = () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };

    if (prefersReducedMotion) {
      clean();
      unsubscribeRef.current = scrollYProgress.on("change", (v) =>
        progressMotion.set(v)
      );
      progressMotion.set(scrollYProgress.get());
    } else {
      clean();
      progressMotion.set(getProgress());
      unsubscribeRef.current = subscribe(() => progressMotion.set(getProgress()));
    }

    return clean;
  }, [prefersReducedMotion, subscribe, getProgress, scrollYProgress, progressMotion]);

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
