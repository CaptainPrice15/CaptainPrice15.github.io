import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buttonGradientClasses =
  "bg-gradient-to-r from-primary to-primary hover:from-primary hover:to-accent text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-accent/40 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]";

export const glassClasses =
  "glass glass-hover rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden group";

export const cardHoverOverlay =
  "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none";
