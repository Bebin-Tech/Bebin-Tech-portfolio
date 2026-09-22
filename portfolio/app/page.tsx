"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
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


export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light" | "aurora">("dark");

  useEffect(() => {
    const timeout = setTimeout(() => {
      try { const saved = localStorage.getItem("portfolio-theme"); if (saved === "dark" || saved === "light" || saved === "aurora") setTheme(saved); } catch { /* Storage is optional. */ }
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("aurora", theme === "aurora");
    document.documentElement.style.colorScheme = theme === "light" ? "light" : "dark";
  }, [theme]);

  const changeTheme = (next: "dark" | "light" | "aurora") => {
    setTheme(next);
    try { localStorage.setItem("portfolio-theme", next); } catch { /* Theme works without storage. */ }
  };

  return (
    <CinematicExperience><main style={{ position: "relative", minHeight: "100vh" }}>



      <Navbar theme={theme} changeTheme={changeTheme} />
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

