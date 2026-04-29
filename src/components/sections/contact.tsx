"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Mail, User, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  const { email, linkedin, phone } = portfolioData.contact;

  return (
    <section id="contact" className="py-32 bg-transparent relative overflow-hidden">
      {/* Decorative blurred background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-[100px] opacity-50 pointer-events-none"></div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" as any, bounce: 0.2 }}
          className="glass p-8 sm:p-12 md:p-16 rounded-3xl border border-border/50 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-30 pointer-events-none"></div>

          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-8 text-primary">
            <MessageSquare className="h-8 w-8" />
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-foreground tracking-tight">
            Let&apos;s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">impactful</span>.
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether you have a question, a project idea, or just want to say hi, I&apos;ll try my best to get back to you!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button 
              size="lg" 
              className="w-full sm:w-auto h-14 text-lg px-8 gap-3 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1" 
              onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank')}
            >
              <Mail className="h-5 w-5" /> Say Hello
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto h-14 text-lg px-8 gap-3 rounded-full border-border/50 hover:bg-muted/50 backdrop-blur-sm transition-all hover:-translate-y-1" 
              onClick={() => window.open(linkedin, '_blank')}
            >
              <User className="h-5 w-5 text-primary" /> Connect on LinkedIn
            </Button>
          </div>

          <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-center items-center gap-6 text-sm font-medium">
            <a href={`mailto:${email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <div className="p-2 bg-muted rounded-full">
                <Mail className="h-4 w-4" />
              </div>
              {email}
            </a>
            <span className="hidden md:inline text-border/50">•</span>
            <a href={`tel:${phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <div className="p-2 bg-muted rounded-full">
                <Phone className="h-4 w-4" />
              </div>
              {phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
