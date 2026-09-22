import Image from "next/image";
import { ArrowUpRight, Download, MapPin, Code2, BrainCircuit } from "lucide-react";
import { FaGithub, FaInstagram } from "react-icons/fa6";
import { personalInfo } from "@/data/portfolio";

export default function Hero() {
  return <section id="hero" className="professional-hero">
    <div className="professional-hero-inner">
      <div className="professional-copy">
        <span className="opportunity-badge"><i /> Available for opportunities</span>
        <p className="intro-eyebrow">DEVELOPER · CREATOR · PROBLEM SOLVER</p>
        <h1>Hi, I’m <span className="gradient-text">Bebin R.</span><br />I turn ideas into<br />working products.</h1>
        <p className="professional-description">Full stack development meets machine learning. I build thoughtful web applications and practical AI solutions, from the first interface to the final deployment.</p>
        <div className="professional-actions"><a className="btn-primary" href="#projects">Explore my work <ArrowUpRight size={18}/></a><a className="btn-secondary" href={personalInfo.resumeUrl} download><Download size={16}/> Download résumé</a></div>
        <div className="professional-social"><span>LET’S CONNECT</span><a href={personalInfo.github} aria-label="GitHub" target="_blank" rel="noreferrer"><FaGithub/></a><a href={personalInfo.instagram} aria-label="Instagram" target="_blank" rel="noreferrer"><FaInstagram/></a><a href={`mailto:${personalInfo.email}`}>Say hello <ArrowUpRight size={14}/></a></div>
      </div>
      <div className="professional-profile">
        <div className="profile-image"><Image src="/images/bebin.jpg" alt="Bebin R, full stack developer" fill sizes="(max-width: 800px) 90vw, 420px" preload/><span className="profile-location"><MapPin size={13}/> Coimbatore, India</span></div>
        <div className="profile-caption"><div><strong>Bebin R</strong><p>Full Stack & ML Developer</p></div><span className="profile-monogram">BR</span></div>
        <div className="profile-specialties"><span><Code2 size={16}/> Web applications</span><span><BrainCircuit size={16}/> Machine learning</span></div>
      </div>
    </div>
    <div className="professional-stack"><span>MY EVERYDAY TOOLKIT</span><div>{["React", "Next.js", "Python", "TypeScript", "Flutter", "MySQL"].map(item=><span key={item}>{item}</span>)}</div><a href="#skills">View skills <ArrowUpRight size={14}/></a></div>
  </section>;
}
