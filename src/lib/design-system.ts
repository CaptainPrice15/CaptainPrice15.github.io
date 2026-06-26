// =====================================================
// UNIFIED DESIGN SYSTEM
// Single source of truth for tokens, timings, and shared values
// =====================================================

/** Animation timing curves */
export const ease = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  spring: { type: "spring" as const, bounce: 0.2, duration: 0.8 },
  elastic: [0.68, -0.6, 0.32, 1.6] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
};

/** Shared transition presets */
export const transitions = {
  fast: { duration: 0.3, ease: ease.smooth },
  default: { duration: 0.6, ease: ease.smooth },
  slow: { duration: 0.8, ease: ease.outExpo },
  spring: ease.spring,
};

/** Color tokens (mirrors CSS variables in globals.css) */
export const colors = {
  primary: "#2563eb",
  primaryDark: "#3b82f6",
  accent: "#7c3aed",
  accentDark: "#8b5cf6",
  success: "#10b981",
  successDark: "#34d399",
  background: {
    light: "#f8fafc",
    dark: "#020617",
  },
  foreground: {
    light: "#0f172a",
    dark: "#f1f5f9",
  },
  muted: {
    light: "#475569",
    dark: "#94a3b8",
  },
};

/** Border radius scale */
export const radius = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  full: "9999px",
};

/** Z-index scale */
export const zIndex = {
  background: -1,
  content: 10,
  overlay: 50,
  nav: 100,
  modal: 200,
  tooltip: 300,
};

/** Animation stagger delays */
export const stagger = {
  fast: 0.1,
  default: 0.15,
  slow: 0.2,
};

/** Glass morphism shared values */
export const glass = {
  backdropBlur: "18px",
  borderColorLight: "rgba(255, 255, 255, 0.55)",
  borderColorDark: "rgba(255, 255, 255, 0.06)",
  bgLight: "rgba(255, 255, 255, 0.78)",
  bgDark: "rgba(15, 23, 42, 0.48)",
  shadowLight: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -6px rgba(37,99,235,0.08), 0 20px 48px -12px rgba(37,99,235,0.06)",
  shadowDark: "0 1px 2px rgba(0,0,0,0.2), 0 8px 24px -6px rgba(0,0,0,0.25), 0 20px 48px -12px rgba(0,0,0,0.2)",
};

/** Section spacing */
export const spacing = {
  section: {
    py: "5rem",
    pySm: "6rem",
    pyMd: "7rem",
    pyLg: "8rem",
  },
  container: "px-4 sm:px-6 lg:px-8",
};
