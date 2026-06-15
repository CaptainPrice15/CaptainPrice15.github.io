"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("");
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

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
      window.removeEventListener("scroll", handleScroll);
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
      animate={{ y: 0, opacity: 1 }}
      transition={
        { duration: 0.6, type: "spring", stiffness: 80, damping: 20 } as const
      }
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 sm:pt-6 px-3 sm:px-4 transition-all duration-300 ${
        scrolled ? "pt-1 sm:pt-4" : ""
      }`}
    >
      <nav
        className={`w-full max-w-5xl transition-all duration-500 rounded-full border border-border/50 bg-background/70 backdrop-blur-md shadow-lg ${
          scrolled ? "py-2 px-4 shadow-xl border-primary/20" : "py-3 px-6"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight hover:text-primary transition-colors flex items-center gap-1 hover:scale-105 active:scale-95 duration-300"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Gourab
              </span>
              <span className="text-primary">.</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-1 lg:space-x-4 bg-muted/30 px-4 py-1.5 rounded-full border border-border/40">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${
                      isActive
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-muted/50 hover:scale-105 active:scale-95 transition-all duration-300"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-muted/50 hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            initial={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute md:hidden border border-border/50 bg-background/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl ${
              scrolled ? "top-16" : "top-20"
            } left-4 right-4`}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                    }`}
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
