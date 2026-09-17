"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Sparkles, FolderGit2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects, personalInfo } from "@/data/portfolio";
import { soundEffects } from "@/lib/soundEffects";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false);

  // 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        soundEffects.playHover(1.15);
        setHovered(true);
      }}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          background: "var(--bg-surface)",
          border: `1px solid ${hovered ? "rgba(6,182,212,0.4)" : "var(--border)"}`,
          borderRadius: "1.25rem",
          overflow: "hidden",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: hovered
            ? "0 25px 60px rgba(0,0,0,0.5), 0 0 30px rgba(6,182,212,0.15)"
            : "0 4px 20px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Project Preview Image */}
        <div
          style={{
            position: "relative",
            height: "210px",
            overflow: "hidden",
            background: "var(--bg-secondary)",
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "cover",
              transition: "transform 0.6s cubic-bezier(0.2, 0, 0, 1)",
              transform: hovered ? "scale(1.08)" : "scale(1)",
            }}
          />
          {/* Overlay gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to bottom, transparent 30%, rgba(22,22,31,0.95) 100%)`,
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Top Badge */}
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              background: "rgba(10,10,15,0.75)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "9999px",
              padding: "0.25rem 0.65rem",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              fontSize: "0.72rem",
              color: "var(--text-primary)",
              fontWeight: 500,
            }}
          >
            <FolderGit2 size={12} style={{ color: "var(--accent-light)" }} />
            Featured Work
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <h3
            style={{
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.3,
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontSize: "0.88rem",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              flex: 1,
            }}
          >
            {project.description}
          </p>

          {/* Tech tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  background: "rgba(6,182,212,0.08)",
                  border: "1px solid rgba(6,182,212,0.2)",
                  color: "var(--accent-light)",
                  borderRadius: "0.35rem",
                  padding: "0.22rem 0.6rem",
                  fontSize: "0.74rem",
                  fontWeight: 500,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.4rem" }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.playClick()}
              onMouseEnter={(e) => {
                soundEffects.playHover(1.15);
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.45rem",
                padding: "0.55rem",
                borderRadius: "0.5rem",
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                color: "var(--text-secondary)",
                fontSize: "0.82rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <FaGithub size={15} />
              GitHub
            </a>

            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.playClick()}
              onMouseEnter={(e) => {
                soundEffects.playHover(1.25);
                (e.currentTarget as HTMLElement).style.background = "var(--accent-light)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 18px var(--accent-glow)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.45rem",
                padding: "0.55rem",
                borderRadius: "0.5rem",
                background: "var(--accent)",
                color: "#000",
                fontSize: "0.82rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <ExternalLink size={15} />
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { ref, inView } = useInView(0.08);

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding"
      style={{ background: "var(--bg-secondary)", position: "relative" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease",
            marginBottom: "3.5rem",
          }}
        >
          <p className="section-label">Featured Works</p>
          <h2 className="section-title">Projects & Applications</h2>
          <p className="section-subtitle">
            A curated portfolio of high-impact platforms — ranging from autonomous AI agents and machine learning engines to scalable web architectures.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "2rem",
            opacity: inView ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View all on GitHub */}
        <div
          style={{
            textAlign: "center",
            marginTop: "3.5rem",
            opacity: inView ? 1 : 0,
            transition: "opacity 0.6s ease 0.4s",
          }}
        >
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEffects.playClick()}
            onMouseEnter={() => soundEffects.playHover(1.1)}
            className="btn-secondary"
            style={{ display: "inline-flex" }}
          >
            <FaGithub size={16} />
            View Full Archive on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
