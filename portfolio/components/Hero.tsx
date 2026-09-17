import Image from "next/image";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa6";
import { personalInfo } from "@/data/portfolio";
export default function Hero() {
  return <section id="hero" className="editorial-hero">
    <div className="hero-topline"><span>INDEPENDENT MIND. PURPOSEFUL CODE.</span><span><MapPin size={13} /> COIMBATORE, INDIA</span></div>
    <div className="editorial-hero-grid">
      <div className="hero-copy">
        <div className="availability"><span /> Available for opportunities</div>
        <p className="hero-intro">Hey, I’m {personalInfo.name} <span>↗</span></p>
        <h1>Ideas into<br /><span>intelligent</span><br />experiences.</h1>
        <p className="hero-description">Full stack developer & AI enthusiast. I bring together thoughtful interfaces, scalable applications, and machine learning to build things that matter.</p>
        <div className="hero-actions"><a href="#projects" className="btn-primary">Explore my work <ArrowUpRight size={19} /></a><a href={`mailto:${personalInfo.email}`} className="hero-contact">Let’s talk <ArrowUpRight size={17} /></a></div>
      </div>
      <div className="portrait-composition">
        <div className="portrait-outline" aria-hidden="true" />
        <div className="portrait-frame"><Image src="/images/bebin.jpg" alt="Bebin R" fill sizes="(max-width: 760px) 90vw, 42vw" preload className="hero-portrait" /><div className="portrait-caption"><span>THE DEVELOPER BEHIND THE CODE</span><strong>Bebin R<span>✳</span></strong></div></div>
        <div className="portrait-note"><span className="note-symbol">✳</span><div>Built with curiosity.<br /><strong>Driven by craft.</strong></div></div>
        <span className="portrait-index">01 / A LITTLE ABOUT ME</span>
      </div>
    </div>
    <div className="hero-bottom"><a href="#projects"><ArrowDown size={15} /> SCROLL TO EXPLORE</a><span>FULL STACK <i /> MACHINE LEARNING <i /> MOBILE</span><a href={personalInfo.github} target="_blank" rel="noreferrer"><Github size={16} /> GITHUB <ArrowUpRight size={14} /></a></div>
    <div className="tech-ribbon" aria-label="Core technologies">{["React", "Next.js", "Python", "Machine Learning", "Flutter", "TypeScript"].map(item => <span key={item}>{item}<b aria-hidden="true">✳</b></span>)}</div>
  </section>;
}
