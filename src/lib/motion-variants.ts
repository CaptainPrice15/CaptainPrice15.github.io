import type { Variants, Transition } from "framer-motion";

export const springTransition: Transition = {
  type: "spring",
  bounce: 0.2,
  duration: 0.8,
};

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
    x: 0,
    filter: "blur(0px)",
    transition: springTransition,
  },
};

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

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
