"use client";

import { ArrowUp, Globe, ExternalLink, Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export function Footer() {
  const { email, linkedin } = portfolioData.contact;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <span className="text-xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Gourab
              </span>
              <span className="text-primary">.</span>
            </span>
            <p className="text-sm text-muted-foreground mt-2">
              Building reliable systems & modern experiences
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-muted/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all hover:-translate-y-1"
              aria-label="LinkedIn"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${email}`}
              className="p-2.5 rounded-full bg-muted/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all hover:-translate-y-1"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/gourab-das"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-muted/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all hover:-translate-y-1"
              aria-label="GitHub"
            >
              <Globe className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Gourab Das. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group"
          >
            Back to top
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
