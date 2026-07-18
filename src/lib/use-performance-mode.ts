"use client";

import { useSyncExternalStore } from "react";

/**
 * Device capability snapshot used to gate continuous GPU / RAF work on phones
 * and low-end hardware without relying only on prefers-reduced-motion.
 */
export interface PerformanceMode {
  /** Narrow viewport or coarse pointer (phone / tablet touch). */
  isMobile: boolean;
  /** Save-Data, few CPU cores, or other low-power signals. */
  isLowEnd: boolean;
  saveData: boolean;
  /**
   * Skip full-screen WebGL, Lenis, heavy particle fields, and Card3D tilt.
   * Still keeps static / CSS visuals so the site looks polished.
   */
  reduceEffects: boolean;
}

const DESKTOP: PerformanceMode = {
  isMobile: false,
  isLowEnd: false,
  saveData: false,
  reduceEffects: false,
};

function readMode(): PerformanceMode {
  if (typeof window === "undefined") return DESKTOP;

  const isMobile = window.matchMedia(
    "(max-width: 768px), (pointer: coarse)"
  ).matches;

  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  const saveData = connection?.saveData === true;
  const slowNetwork =
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g";
  const cores = navigator.hardwareConcurrency || 8;
  const isLowEnd = saveData || slowNetwork || cores <= 4;
  const reduceEffects = isMobile || isLowEnd;

  return { isMobile, isLowEnd, saveData, reduceEffects };
}

function subscribe(callback: () => void) {
  const mql = window.matchMedia("(max-width: 768px), (pointer: coarse)");
  mql.addEventListener("change", callback);

  const connection = (
    navigator as Navigator & {
      connection?: EventTarget & { saveData?: boolean };
    }
  ).connection;
  connection?.addEventListener?.("change", callback);

  return () => {
    mql.removeEventListener("change", callback);
    connection?.removeEventListener?.("change", callback);
  };
}

/**
 * Reactive performance mode. Server snapshot is desktop (no reduction) so
 * hydration stays stable; gate WebGL mounts with a `mounted` check in callers.
 */
export function usePerformanceMode(): PerformanceMode {
  return useSyncExternalStore(subscribe, readMode, () => DESKTOP);
}
