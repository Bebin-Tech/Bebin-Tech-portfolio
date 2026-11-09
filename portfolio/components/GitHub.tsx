import { FaGithub } from "react-icons/fa6";
import { ArrowUpRight } from "lucide-react";
import { personalInfo, projects } from "@/data/portfolio";

export default function GitHub() {
  return <section id="github" className="section-padding">
    <div style={{ maxWidth:1160, margin:"0 auto" }}>
      <p className="section-label">Source code</p>
      <h2 className="section-title">Explore my GitHub</h2>
      <p className="section-subtitle">Read the code, setup instructions, and project documentation. Current activity and repository statistics are available on GitHub.</p>
      <div className="source-links">{projects.map(project => <a key={project.id} href={project.github} target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden="true" /><span>{project.title}</span><ArrowUpRight size={16} aria-hidden="true" /></a>)}</div>
      <a className="btn-secondary" href={personalInfo.github} target="_blank" rel="noopener noreferrer">Visit GitHub profile <ArrowUpRight size={16}/></a>
    </div>
  </section>;
}
