import type { Variants, Transition } from "framer-motion";
import { ease, stagger } from "./design-system";

// Unified transitions from design system
export const springTransition: Transition = { ...ease.spring };

export const defaultTransition: Transition = {
  duration: 0.6,
  type: "spring",
  bounce: 0.2,
};

export const fastTransition: Transition = {
  duration: 0.3,
  type: "spring",
  bounce: 0.2,
};

export const slowTransition: Transition = {
  duration: 0.8,
  ease: ease.outExpo,
};

// Fade + upward motion (primary entrance animation)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: springTransition,
  },
};

export const fadeUpFast: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: fastTransition,
  },
};

// Horizontal slide entrances
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: springTransition,
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: "blur(0px)",
    transition: springTransition,
  },
};

// Scale entrance (for cards, modals)
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -20,
    filter: "blur(8px)",
    transition: fastTransition,
  },
};

// Hero-specific variants
export const heroItem: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: springTransition,
  },
};

export const heroBadge: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: springTransition,
  },
};

// Stagger containers (orchestrate children)
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.default,
      delayChildren: 0.2,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.fast,
    },
  },
};

// Individual stagger item
export const staggerItems: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: defaultTransition,
  },
};

// 3D tilt variants (for cards)
export const cardTilt: Variants = {
  rest: {
    rotateX: 0,
    rotateY: 0,
    transition: { duration: 0.4, ease: ease.smooth },
  },
  hover: {
    transition: { duration: 0.4, ease: ease.smooth },
  },
};

// Modal / overlay
export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: ease.outExpo },
  },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.25 } },
};

// Scroll-triggered fade
export const scrollFade: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.outExpo },
  },
};

// Timeline node animation
export const timelineNode: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

// Counter animation helper
export const countUp = (value: number, duration = 2) => ({
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: ease.outExpo },
  },
});
