import ThemeNavigation from "@/components/ThemeNavigation";
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
import GalaxyBackground from "@/components/GalaxyBackground";


export default function Home() {
  return (
    <CinematicExperience><main className="galaxy-portfolio" style={{ position: "relative", minHeight: "100vh" }}>
      <GalaxyBackground />



      <ThemeNavigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <GitHub />
      <Resume />
      <Contact />
      <Footer />
    </main></CinematicExperience>
  );
}

