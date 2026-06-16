"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerFast } from "@/lib/motion-variants";
import { Code2, Award, Briefcase, HeartHandshake } from "lucide-react";

const stats = [
  { icon: <Briefcase className="h-6 w-6" />, value: 4.5, suffix: "+", label: "Years Experience" },
  { icon: <Code2 className="h-6 w-6" />, value: 15, suffix: "+", label: "Projects Delivered" },
  { icon: <Award className="h-6 w-6" />, value: 3, suffix: "", label: "Team Lead Roles" },
  { icon: <HeartHandshake className="h-6 w-6" />, value: 99.9, suffix: "%", label: "Uptime Maintained" },
];

function CountUpNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const hasAnimated = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(value * eased);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  const display =
    value % 1 !== 0 ? count.toFixed(1) : Math.round(count).toString();

  return (
    <div ref={ref} className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-1">
      {display}
      {suffix}
    </div>
  );
}

export function Stats() {
  return (
    <section className="py-8 sm:py-10 md:py-16 bg-transparent -mt-8 relative z-10">
      <div className="container px-3 sm:px-6 lg:px-8 mx-auto">
        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="glass rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-8 text-center relative overflow-hidden group hover:border-primary/20 transition-colors"
            >
              <div className="flex justify-center mb-2 sm:mb-3 text-primary group-hover:scale-110 transition-transform duration-300">
                <div className="p-1.5 sm:p-2.5 bg-primary/10 rounded-lg sm:rounded-xl">
                  {stat.icon}
                </div>
              </div>
              <CountUpNumber value={stat.value} suffix={stat.suffix} />
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
