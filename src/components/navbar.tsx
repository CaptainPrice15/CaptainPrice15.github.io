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

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 sm:pt-6 px-4 transition-all duration-300 ${
        scrolled ? "pt-2 sm:pt-4" : ""
      }`}
    >
      <nav
        className={`w-full max-w-5xl transition-all duration-500 rounded-full border border-border/50 bg-background/70 backdrop-blur-md shadow-lg ${
          scrolled ? "py-2 px-4 shadow-xl border-primary/20" : "py-3 px-6"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold tracking-tight hover:text-primary transition-colors flex items-center gap-1">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Gourab
              </span>
              <span className="text-primary">.</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-1 lg:space-x-4 bg-muted/30 px-4 py-1.5 rounded-full border border-border/40">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background/80 rounded-full transition-all duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-muted/50"
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
                className="rounded-full hover:bg-muted/50"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 md:hidden border border-border/50 bg-background/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
