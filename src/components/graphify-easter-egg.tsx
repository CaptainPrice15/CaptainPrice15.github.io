"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Network } from "lucide-react";
import { springTransition } from "@/lib/motion-variants";

const TRIGGER = "graphify";
const STATS = {
  nodes: 107,
  edges: 57,
  communities: 56,
  extraction: "74% extracted · 23% inferred · 4% ambiguous",
};

export function GraphifyEasterEgg() {
  const [open, setOpen] = useState(false);
  const buffer = useRef("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      buffer.current += e.key.toLowerCase();
      // Keep only the last N characters
      while (buffer.current.length > TRIGGER.length) {
        buffer.current = buffer.current.slice(1);
      }
      if (buffer.current === TRIGGER) {
        setOpen(true);
        buffer.current = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={springTransition}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-background border border-border/50 rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 border border-border/40 text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Network className="h-8 w-8 text-primary" />
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">Graphify Stats</h3>
            <p className="text-sm text-muted-foreground mb-6">Knowledge graph analysis of this portfolio</p>

            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-xl p-4">
                <span className="block text-2xl font-extrabold text-primary">{STATS.nodes}</span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Nodes</span>
              </div>
              <div className="glass rounded-xl p-4">
                <span className="block text-2xl font-extrabold text-primary">{STATS.edges}</span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Edges</span>
              </div>
              <div className="glass rounded-xl p-4">
                <span className="block text-2xl font-extrabold text-accent">{STATS.communities}</span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Communities</span>
              </div>
              <div className="glass rounded-xl p-4">
                <span className="block text-lg font-extrabold text-emerald-500">74%</span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Extracted</span>
              </div>
            </div>

            <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
              {STATS.extraction}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
