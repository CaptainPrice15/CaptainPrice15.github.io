"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ShieldCheck, Zap, Bot, Activity } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card3D } from "@/components/card-3d";
import { fadeUp, slideInLeft, slideInRight, staggerFast } from "@/lib/motion-variants";
import { glassClasses, cardHoverOverlay, sectionContainer } from "@/lib/utils";

const highlightIcons: Record<string, React.ReactNode> = {
  Leadership: <ShieldCheck className="h-5 w-5 text-primary" />,
  Automation: <Zap className="h-5 w-5 text-amber-500" />,
  "Agentic AI": <Bot className="h-5 w-5 text-purple-500" />,
  System: <Activity className="h-5 w-5 text-emerald-500" />,
};

function getHighlightIcon(title: string) {
  for (const [key, icon] of Object.entries(highlightIcons)) {
    if (title.includes(key)) return icon;
  }
  return <ShieldCheck className="h-5 w-5 text-primary" />;
}

const careerStats = [
  { label: "Experience", value: "4.5+" },
  { label: "Domain", value: "Enterprise Retail" },
  { label: "Focus", value: "Reliability & SLA" },
];

export function About() {
  const { story, highlights } = portfolioData.about;

  return (
    <section id="about" className="section bg-transparent">
      <div className={sectionContainer}>
        <SectionHeading title="About Me" eyebrow="Get to know me" />

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-start max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInLeft}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">
              The Journey
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap max-w-prose">
              {story}
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
              {careerStats.map((stat) => (
                <div
                  key={stat.label}
                  className="px-4 py-2.5 rounded-xl bg-primary/5 border border-primary/15 text-sm font-medium"
                >
                  <span className="text-primary font-bold">{stat.value}</span>
                  <span className="text-muted-foreground ml-1.5">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <Card3D
            maxRotation={8}
            shineIntensity={0.12}
            className="w-full"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInRight}
              className={`${glassClasses} !p-5 sm:!p-7 md:!p-9 rounded-2xl sm:rounded-3xl`}
            >
              <div className={cardHoverOverlay} aria-hidden="true" />

              <div className="relative z-10 preserve-3d">
                <h3 className="text-xl font-bold mb-6 text-foreground depth-layer-1">Key Focus Areas</h3>
                <motion.ul
                  variants={staggerFast}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-5"
                >
                  {highlights.map((highlight, index) => {
                    const colonIdx = highlight.indexOf(": ");
                    const hTitle = colonIdx > -1 ? highlight.slice(0, colonIdx) : highlight;
                    const description = colonIdx > -1 ? highlight.slice(colonIdx + 2) : "";
                    return (
                      <motion.li key={index} variants={fadeUp} className="flex gap-4">
                        <div className="p-2 rounded-lg bg-primary/5 border border-primary/10 flex-shrink-0 mt-0.5 depth-layer-2">
                          {getHighlightIcon(hTitle)}
                        </div>
                        <div className="depth-layer-1">
                          <strong className="block text-foreground text-base mb-1">{hTitle}</strong>
                          {description && (
                            <span className="text-muted-foreground text-sm leading-relaxed">
                              {description}
                            </span>
                          )}
                        </div>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>
            </motion.div>
          </Card3D>
        </div>
      </div>
    </section>
  );
}
