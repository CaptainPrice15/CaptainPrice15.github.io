import { ExternalLink, Link, Mail, Code } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export function Footer() {
  const { email, linkedin, github } = portfolioData.contact;

  return (
    <footer className="relative border-t border-border/30 bg-background/40 backdrop-blur-sm">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="text-center sm:text-left">
            <span className="text-base sm:text-lg font-bold tracking-tight">
              <span className="gradient-text">Gourab</span>
              <span className="text-primary">.</span>
            </span>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Building reliable systems & modern experiences
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-muted/40 border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
              aria-label="GitHub Profile"
            >
              <Code className="h-4 w-4" />
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-muted/40 border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
              aria-label="LinkedIn Profile"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${email}`}
              className="p-2.5 rounded-xl bg-muted/40 border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
              aria-label="Send Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-border/20 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Gourab Das. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
