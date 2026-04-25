"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Mail, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  const { email, linkedin, phone } = portfolioData.contact;

  return (
    <section id="contact" className="py-24 bg-transparent border-t border-glass-border">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Let's build something impactful.
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-lg px-8 gap-2" 
              onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank')}
            >
              <Mail className="h-5 w-5" /> Say Hello
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto text-lg px-8 gap-2" 
              onClick={() => window.open(linkedin, '_blank')}
            >
              <User className="h-5 w-5" /> Connect on LinkedIn
            </Button>
          </div>

          <div className="mt-16 pt-8 border-t border-border/50 text-muted-foreground flex flex-col md:flex-row justify-center items-center gap-6 text-sm">
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> {email}
            </span>
            <span className="hidden md:inline text-border">•</span>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> {phone}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
