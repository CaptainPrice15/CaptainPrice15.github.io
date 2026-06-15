"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Mail, User, MessageSquare, Copy, Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { springTransition } from "@/lib/motion-variants";
import { buttonGradientClasses } from "@/lib/utils";

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
      aria-label={`${copied ? "Copied" : "Copy"} ${label}`}
    >
      <div className="p-2 bg-muted rounded-full group-hover:bg-primary/10 transition-colors">
        {copied ? (
          <Check className="h-4 w-4 text-emerald-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </div>
      <span className="text-sm">{text}</span>
    </button>
  );
}

function ContactForm() {
  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const mailtoLink = `mailto:${portfolioData.contact.email}?subject=Portfolio Contact from ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message)}%0A%0AFrom: ${encodeURIComponent(formState.email)}`;
    window.location.href = mailtoLink;
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={formState.name}
            onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={formState.email}
            onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            placeholder="you@email.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={formState.message}
          onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
          placeholder="Tell me about your project or idea..."
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className={`w-full sm:w-auto gap-2 ${buttonGradientClasses} rounded-full h-12 px-8`}
        disabled={status === "sending"}
      >
        {status === "sent" ? (
          <>
            <Check className="h-5 w-5" /> Opening email client...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" /> Send Message
          </>
        )}
      </Button>
    </form>
  );
}

export function Contact() {
  const { email, linkedin, phone } = portfolioData.contact;

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-transparent relative overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-[100px] opacity-50 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...springTransition }}
          className="glass p-6 sm:p-8 md:p-12 lg:p-16 rounded-3xl border border-border/50 shadow-2xl relative overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-30 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Available for opportunities
              </span>
            </div>

            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6 text-primary">
              <MessageSquare className="h-8 w-8" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 text-foreground tracking-tight">
              Let&apos;s build something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                impactful
              </span>
              .
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Whether you have a question, a project idea, or just want to say hi, I&apos;ll try my best to get back to you!
            </p>

            <div className="max-w-lg mx-auto mb-6 sm:mb-10">
              <ContactForm />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-10">
              <Button
                size="lg"
                className={`w-full sm:w-auto h-12 sm:h-14 text-base sm:text-lg px-6 sm:px-8 gap-3 ${buttonGradientClasses} rounded-full`}
                asChild
              >
                <a href={`mailto:${email}`}>
                  <Mail className="h-5 w-5" /> Say Hello
                </a>
              </Button>
              <Button
                size="lg"
                className={`w-full sm:w-auto h-12 sm:h-14 text-base sm:text-lg px-6 sm:px-8 gap-3 ${buttonGradientClasses} rounded-full`}
                asChild
              >
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                  <User className="h-5 w-5" /> Connect on LinkedIn
                </a>
              </Button>
            </div>

            <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-center items-center gap-6 text-sm font-medium">
              <CopyButton text={email} label="email address" />
              <span className="hidden md:inline text-border/50" aria-hidden="true">|</span>
              <CopyButton text={phone} label="phone number" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
