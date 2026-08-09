"use client";

import { useRef, useEffect, useState } from "react";
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact,
  SiNextdotjs, SiTailwindcss, SiPython, SiNodedotjs,
  SiExpress, SiPostman, SiMongodb, SiPostgresql, SiMysql,
  SiGit, SiGithub, SiDocker, SiVscodium, SiDart, SiFlutter, SiScikitlearn
} from "react-icons/si";
import { Cpu } from "lucide-react";
import { skills } from "@/data/portfolio";

const iconMap: Record<string, React.ReactElement> = {
  SiHtml5: <SiHtml5 />,
  SiCss: <SiCss />,
  SiJavascript: <SiJavascript />,
  SiTypescript: <SiTypescript />,
  SiReact: <SiReact />,
  SiNextdotjs: <SiNextdotjs />,
  SiTailwindcss: <SiTailwindcss />,
  SiPython: <SiPython />,
  SiNodedotjs: <SiNodedotjs />,
  SiExpress: <SiExpress />,
  SiPostman: <SiPostman />,
  SiMongodb: <SiMongodb />,
  SiPostgresql: <SiPostgresql />,
  SiMysql: <SiMysql />,
  SiGit: <SiGit />,
  SiGithub: <SiGithub />,
  SiDocker: <SiDocker />,
  SiVscodium: <SiVscodium />,
  SiDart: <SiDart />,
  SiFlutter: <SiFlutter />,
  SiScikitlearn: <SiScikitlearn />,
  SiOpenai: <Cpu />,
};

const categories = [
  {
    title: "Frontend & Mobile",
    items: skills.frontend,
  },
  {
    title: "Backend & Machine Learning",
    items: skills.backend,
  },
  {
    title: "Database",
    items: skills.database,
  },
  {
    title: "Tools & DevOps",
    items: skills.tools,
  },
];

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

function SkillCard({ name, icon, color, delay }: { name: string; icon: string; color: string; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.06)" : "var(--bg-primary)",
        border: `1px solid ${hovered ? color + "55" : "var(--border)"}`,
        borderRadius: "0.875rem",
        padding: "1.25rem 1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.6rem",
        cursor: "default",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? `0 0 20px ${color}22` : "none",
        animationDelay: `${delay}ms`,
      }}
    >
      <span
        style={{
          fontSize: "2rem",
          color: hovered ? color : "var(--text-muted)",
          transition: "color 0.25s ease, transform 0.25s ease",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          display: "flex",
        }}
      >
        {iconMap[icon] ?? <Cpu />}
      </span>
      <span
        style={{
          fontSize: "0.78rem",
          fontWeight: 600,
          color: hovered ? "var(--text-primary)" : "var(--text-secondary)",
          textAlign: "center",
          transition: "color 0.25s ease",
          fontFamily: "var(--font-mono)",
        }}
      >
        {name}
      </span>
    </div>
  );
}

export default function Skills() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding"
      style={{ background: "var(--bg-primary)" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease",
            marginBottom: "3.5rem",
            textAlign: "center",
          }}
        >
          <p className="section-label" style={{ justifyContent: "center" }}>What I work with</p>
          <h2 className="section-title" style={{ textAlign: "center" }}>Skills & Technical Expertise</h2>
          <p className="section-subtitle" style={{ textAlign: "center", margin: "0 auto" }}>
            A comprehensive toolkit spanning Machine Learning algorithms, Python pipelines, Mobile development, and Full-Stack Web engineering.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {categories.map((cat, catIdx) => (
            <div
              key={cat.title}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${catIdx * 0.1 + 0.1}s`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {cat.title}
                </h3>
                <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {cat.items.map((skill, i) => (
                  <SkillCard
                    key={skill.name}
                    name={skill.name}
                    icon={skill.icon}
                    color={skill.color}
                    delay={i * 40}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
