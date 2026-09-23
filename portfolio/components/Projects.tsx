import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects, personalInfo } from "@/data/portfolio";

export default function Projects() {
  return (
    <section id="projects" className="section-padding repository-section">
      <div className="repository-container">
        <div className="repository-heading">
          <div><p className="section-label">Featured work</p><h2 className="section-title">Projects & Applications</h2></div>
          <p className="section-subtitle">Purpose-built platforms for academic coordination, campus resources, and connected teams.</p>
        </div>
        <div className="repository-grid">
          {projects.map((project) => (
            <article className={`repository-card ${project.featured ? "repository-featured" : "repository-supporting"}`} key={project.id}>
              <div className="repository-card-top"><span className="repository-icon"><FolderGit2 size={23}/></span><span className="repository-label">{project.featured ? "FEATURED PROJECT" : "ALSO BUILDING"}</span></div>
              <h3>{project.title}</h3>
              <p className="repository-subtitle">{project.subtitle}</p>
              <p className="repository-description">{project.description}</p>
              <ul className="repository-highlights">{project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
              <div className="repository-tags">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div>
              <div className="repository-path"><FaGithub size={13}/><span>{project.github.replace("https://github.com/", "")}</span></div>
              <div className="repository-actions">
                <a className="btn-primary" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View Project: ${project.title}`}>View Project <ArrowUpRight size={16}/></a>
                <a className="btn-secondary" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub: ${project.title}`}><FaGithub size={16}/> GitHub</a>
              </div>
            </article>
          ))}
        </div>
        <a className="repository-all" href={personalInfo.github} target="_blank" rel="noopener noreferrer">Browse all repositories <ArrowUpRight size={16}/></a>
      </div>
    </section>
  );
}
