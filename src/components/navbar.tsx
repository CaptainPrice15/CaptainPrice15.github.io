"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export function Navbar() {
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("");
  const menuRef = React.useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 20);
    if (latest > previous && latest > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 sm:pt-5 px-3 sm:px-4",
        hidden && "pointer-events-none"
      )}
      aria-hidden={hidden}
      style={{ willChange: "transform" }}
    >
      <nav
        className={cn(
          "w-full max-w-5xl transition-all duration-500 rounded-full border bg-background/75 backdrop-blur-xl",
          scrolled
            ? "py-2 px-4 border-border/60 shadow-lg shadow-primary/[0.07]"
            : "py-2.5 px-5 border-border/40"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-lg sm:text-xl font-bold tracking-tight hover:text-primary transition-colors flex items-center gap-1 hover:opacity-90 active:scale-95 duration-200"
              aria-label="Gourab Das Home"
            >
              <span className="gradient-text">Gourab</span>
              <span className="text-primary">.</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-1 bg-muted/50 px-3 py-1.5 rounded-full border border-border/40">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-95",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-9 w-9 sm:h-10 sm:w-10 hover:bg-muted/60 active:scale-95 transition-all duration-200"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Toggle theme"
            >
              <Sun className="h-[18px] w-[18px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-9 w-9 sm:h-10 sm:w-10 hover:bg-muted/60 active:scale-95 transition-all duration-200"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ opacity: 0, y: -16, scale: 0.97, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, scale: 0.97, filter: "blur(8px)" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute md:hidden top-[4.5rem] left-4 right-4 border border-border/60 bg-background/95 backdrop-blur-xl rounded-2xl p-3 shadow-2xl"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.header>
  );
}
