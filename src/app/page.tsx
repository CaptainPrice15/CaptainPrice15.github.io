import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { SectionReveal } from "@/components/section-reveal";

const About = dynamic(
  () =>
    import("@/components/sections/about").then((mod) => mod.About),
  {
    loading: () => (
      <div className="py-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);
const Skills = dynamic(
  () =>
    import("@/components/sections/skills").then((mod) => mod.Skills),
  {
    loading: () => (
      <div className="py-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);
const Projects = dynamic(
  () =>
    import("@/components/sections/projects").then((mod) => mod.Projects),
  {
    loading: () => (
      <div className="py-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);
const Experience = dynamic(
  () =>
    import("@/components/sections/experience").then((mod) => mod.Experience),
  {
    loading: () => (
      <div className="py-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);
const Contact = dynamic(
  () =>
    import("@/components/sections/contact").then((mod) => mod.Contact),
  {
    loading: () => (
      <div className="py-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <SectionReveal><Stats /></SectionReveal>
        <SectionReveal delay={0.05}><About /></SectionReveal>
        <SectionReveal delay={0.1}><Skills /></SectionReveal>
        <SectionReveal delay={0.15}><Projects /></SectionReveal>
        <SectionReveal delay={0.2}><Experience /></SectionReveal>
        <SectionReveal delay={0.25}><Contact /></SectionReveal>
      </main>
    </>
  );
}
