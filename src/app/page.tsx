import dynamic from 'next/dynamic';
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";

const About = dynamic(() => import("@/components/sections/about").then((mod) => mod.About));
const Skills = dynamic(() => import("@/components/sections/skills").then((mod) => mod.Skills));
const Projects = dynamic(() => import("@/components/sections/projects").then((mod) => mod.Projects));
const Experience = dynamic(() => import("@/components/sections/experience").then((mod) => mod.Experience));
const Contact = dynamic(() => import("@/components/sections/contact").then((mod) => mod.Contact));

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
