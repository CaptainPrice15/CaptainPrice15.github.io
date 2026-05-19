import dynamic from 'next/dynamic';
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";

const About = dynamic(() => import("@/components/sections/about").then((mod) => mod.About), { loading: () => <div className="py-24 text-center text-muted-foreground animate-pulse">Loading About...</div> });
const Skills = dynamic(() => import("@/components/sections/skills").then((mod) => mod.Skills), { loading: () => <div className="py-24 text-center text-muted-foreground animate-pulse">Loading Skills...</div> });
const Projects = dynamic(() => import("@/components/sections/projects").then((mod) => mod.Projects), { loading: () => <div className="py-24 text-center text-muted-foreground animate-pulse">Loading Projects...</div> });
const Experience = dynamic(() => import("@/components/sections/experience").then((mod) => mod.Experience), { loading: () => <div className="py-24 text-center text-muted-foreground animate-pulse">Loading Experience...</div> });
const Contact = dynamic(() => import("@/components/sections/contact").then((mod) => mod.Contact), { loading: () => <div className="py-24 text-center text-muted-foreground animate-pulse">Loading Contact...</div> });

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
