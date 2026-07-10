"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { contact } from "@/data/contact";
import { Mail, Copy, Check, Send, Link, Phone, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card3D } from "@/components/card-3d";
import { springTransition } from "@/lib/motion-variants";
import { buttonGradientClasses, cn, glassClasses, sectionContainer } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";

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
      className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-muted/50 border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all group w-full text-left"
      aria-label={`${copied ? "Copied" : "Copy"} ${label}`}
    >
      <div className="p-2 bg-primary/8 rounded-lg border border-primary/10 group-hover:bg-primary/15 transition-colors">
        {copied ? (
          <Check className="h-4 w-4 text-success" />
        ) : (
          <Copy className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <span className="text-xs text-muted-foreground font-medium block">{label}</span>
        <span className="text-sm text-foreground font-medium truncate block">{text}</span>
      </div>
    </button>
  );
}

const contactLinks = [
  {
    icon: <Mail className="h-4 w-4" />,
    label: "Email",
    href: "mailto:gourabdas.13@gmail.com",
    display: "gourabdas.13@gmail.com",
  },
  {
    icon: <Link className="h-4 w-4" />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gourab-das-4078431b8/",
    display: "Gourab Das",
  },
  {
    icon: <Phone className="h-4 w-4" />,
    label: "Phone",
    href: "tel:+918274987485",
    display: "+91 8274987485",
  },
  {
    icon: <Code className="h-4 w-4" />,
    label: "GitHub",
    href: "https://github.com/gourab-das",
    display: "gourab-das",
  },
];

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

    const mailtoLink = `mailto:${contact.email}?subject=Portfolio Contact from ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message)}%0A%0AFrom: ${encodeURIComponent(formState.email)}`;
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
            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/40 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
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
            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/40 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
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
          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/40 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all resize-none"
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
            <Check className="h-4 w-4" /> Opening email client...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send Message
          </>
        )}
      </Button>
    </form>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section bg-transparent relative overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] h-[300px] bg-gradient-to-b from-primary/[0.04] to-transparent rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className={`${sectionContainer} max-w-4xl relative z-10`}>
        <SectionHeading
          title="Let's Connect"
          eyebrow="Get in touch"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ ...springTransition }}
          className="mt-6 sm:mt-8"
        >
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                Whether you have a question, a project idea, or just want to say hi, I&apos;ll try my best to get back to you!
              </p>

              <div className="space-y-3">
                {contactLinks.map((link) => (
                  <Card3D key={link.label} maxRotation={5} shineIntensity={0.08} glare={false} depth={false} className="block">
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-muted/50 border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                    >
                      <div className="p-2 bg-primary/8 rounded-lg border border-primary/10 group-hover:bg-primary/15 transition-colors text-muted-foreground group-hover:text-primary depth-layer-1">
                        {link.icon}
                      </div>
                      <div className="depth-layer-1">
                        <span className="text-xs text-muted-foreground font-medium block">{link.label}</span>
                        <span className="text-sm text-foreground font-medium">{link.display}</span>
                      </div>
                    </a>
                  </Card3D>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-center sm:justify-start gap-3">
                <CopyButton text={contact.email} label="Copy email" />
                <CopyButton text={contact.phone} label="Copy phone" />
              </div>
            </div>

            <Card3D maxRotation={6} shineIntensity={0.1} className="w-full">
              <div className={cn(glassClasses, "preserve-3d")}>
                <h3 className="text-lg font-bold text-foreground mb-4 depth-layer-1">Send a message</h3>
                <ContactForm />
              </div>
            </Card3D>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
