"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa6";
import { projects, personalInfo } from "@/data/portfolio";
const filters = ["All work", "Web apps", "AI & ML", "Mobile"];
function category(project: typeof projects[number]) {
  if (project.tech.includes("Flutter")) return "Mobile";
  if (project.tech.includes("Machine Learning")) return "AI & ML";
  return "Web apps";
}
export default function Projects() {
  const [filter, setFilter] = useState("All work");
  const visible = projects.filter(project => filter === "All work" || category(project) === filter);
  return <section id="projects" className="section-padding selected-work"><div className="work-container">
    <div className="work-heading"><div><p className="section-label">01 — SELECTED WORK</p><h2 className="section-title">A few things<br />I’ve <em>built.</em></h2></div><p className="section-subtitle">From the first idea to the final interaction. A selection of applications, experiments, and practical solutions.</p></div>
    <div className="project-filters" aria-label="Filter projects">{filters.map(item => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === "All work" && <span>{projects.length.toString().padStart(2, "0")}</span>}</button>)}</div>
    <div className="work-grid">{visible.map(project => <article className="work-card" key={project.id}>
      <div className="work-image"><Image src={project.image} alt={project.title} fill sizes="(max-width: 760px) 100vw, 50vw" /><span className="work-category">{category(project)}</span><span className="work-number">0{project.id}</span></div>
      <div className="work-content"><h3>{project.title}</h3><p>{project.description}</p><div className="work-tags">{project.tech.slice(0,4).map(tech => <span key={tech}>{tech}</span>)}</div><div className="work-links"><a href={project.live} target="_blank" rel="noreferrer">Explore project <ArrowUpRight size={18} /></a><a href={project.github} target="_blank" rel="noreferrer" aria-label={`Source code for ${project.title}`}><Github size={18} /></a></div></div>
    </article>)}</div><a className="archive-link" href={personalInfo.github} target="_blank" rel="noreferrer">More experiments on GitHub <ArrowUpRight size={20} /></a>
  </div></section>;
}
