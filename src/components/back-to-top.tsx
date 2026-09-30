"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLenis } from "@/components/smooth-scroll";

export function BackToTop() {
  const [visible, setVisible] = React.useState(false);
  const { scrollTo } = useLenis();

  React.useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    scrollTo(0);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-[max(1.5rem,calc(env(safe-area-inset-bottom)+0.75rem))] right-[max(1rem,calc(env(safe-area-inset-right)+0.5rem))] sm:right-6 z-40 p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
