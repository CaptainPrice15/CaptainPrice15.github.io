"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerFast } from "@/lib/motion-variants";
import { Code2, Award, Briefcase, HeartHandshake } from "lucide-react";

const stats = [
  { icon: <Briefcase className="h-6 w-6" />, value: "4.5+", label: "Years Experience" },
  { icon: <Code2 className="h-6 w-6" />, value: "15+", label: "Projects Delivered" },
  { icon: <Award className="h-6 w-6" />, value: "3", label: "Team Lead Roles" },
  { icon: <HeartHandshake className="h-6 w-6" />, value: "99.9%", label: "Uptime Maintained" },
];

export function Stats() {
  return (
    <section className="py-12 md:py-16 bg-transparent -mt-8 relative z-10">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="glass rounded-2xl p-6 md:p-8 text-center relative overflow-hidden group hover:border-primary/20 transition-colors"
            >
              <div className="flex justify-center mb-3 text-primary group-hover:scale-110 transition-transform duration-300">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-foreground mb-1">
                {stat.value}
              </div>
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
