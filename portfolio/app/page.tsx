import ThemeNavigation from "@/components/ThemeNavigation";
import GalaxyBackground from "@/components/GalaxyBackground";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import GitHub from "@/components/GitHub";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CinematicExperience from "@/components/CinematicExperience";
import OfficialPresence from "@/components/OfficialPresence";
import {identityGraph} from "@/lib/identity";
import type {Metadata} from "next";

export const metadata:Metadata={alternates:{canonical:'https://bebin-tech.vercel.app/'}};


export default function Home() {
  return (
    <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(identityGraph).replace(/</g,'\\u003c')}}/><CinematicExperience><main className="grid-portfolio" style={{ position: "relative", minHeight: "100vh" }}>
      <GalaxyBackground />
      <ThemeNavigation />
      <Hero />
      <About />
      <OfficialPresence />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <GitHub />
      <Resume />
      <Contact />
      <Footer />
    </main></CinematicExperience></>
  );
}

