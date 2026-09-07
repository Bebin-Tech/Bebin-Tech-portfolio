"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact,
  SiNextdotjs, SiTailwindcss, SiPython, SiNodedotjs,
  SiExpress, SiPostman, SiMongodb, SiPostgresql, SiMysql,
  SiGit, SiGithub, SiDocker, SiVscodium, SiDart, SiFlutter, SiScikitlearn
} from "react-icons/si";
import { Cpu, Sparkles, Layers } from "lucide-react";
import { skills } from "@/data/portfolio";
import { soundEffects } from "@/lib/soundEffects";

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
  { id: "all", title: "All Skills" },
  { id: "frontend", title: "Frontend & Mobile", items: skills.frontend },
  { id: "backend", title: "Backend & ML", items: skills.backend },
  { id: "database", title: "Database", items: skills.database },
  { id: "tools", title: "Tools & DevOps", items: skills.tools },
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

function SkillCard({ name, icon, color }: { name: string; icon: string; color: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      onMouseEnter={() => {
        soundEffects.playHover(1.2);
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.06)" : "var(--bg-surface)",
        border: `1px solid ${hovered ? color : "var(--border)"}`,
        borderRadius: "1rem",
        padding: "1.25rem 1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        boxShadow: hovered ? `0 10px 30px ${color}33, 0 0 15px ${color}22` : "0 4px 15px rgba(0,0,0,0.2)",
        transform: hovered ? "translateY(-4px) scale(1.03)" : "none",
        transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
      }}
    >
      {/* Background colored glow pulse on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at center, ${color}18 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      )}

      <span
        style={{
          fontSize: "2.2rem",
          color: hovered ? color : "var(--text-secondary)",
          transition: "color 0.25s ease, transform 0.25s ease",
          transform: hovered ? "scale(1.18)" : "scale(1)",
          display: "flex",
        }}
      >
        {iconMap[icon] ?? <Cpu />}
      </span>
      <span
        style={{
          fontSize: "0.82rem",
          fontWeight: 600,
          color: hovered ? "var(--text-primary)" : "var(--text-secondary)",
          textAlign: "center",
          transition: "color 0.25s ease",
          fontFamily: "var(--font-mono)",
        }}
      >
        {name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const { ref, inView } = useInView(0.1);
  const [activeTab, setActiveTab] = useState("all");

  const allSkills = [
    ...skills.frontend,
    ...skills.backend,
    ...skills.database,
    ...skills.tools,
  ];

  const getFilteredSkills = () => {
    if (activeTab === "all") return allSkills;
    if (activeTab === "frontend") return skills.frontend;
    if (activeTab === "backend") return skills.backend;
    if (activeTab === "database") return skills.database;
    if (activeTab === "tools") return skills.tools;
    return allSkills;
  };

  const displayedSkills = getFilteredSkills();

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding"
      style={{ background: "var(--bg-primary)", position: "relative" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease",
            marginBottom: "3rem",
            textAlign: "center",
          }}
        >
          <p className="section-label" style={{ justifyContent: "center" }}>Technical Proficiency</p>
          <h2 className="section-title" style={{ textAlign: "center" }}>Skills & Tech Stack</h2>
          <p className="section-subtitle" style={{ textAlign: "center", margin: "0 auto" }}>
            A battle-tested arsenal spanning Machine Learning, High-Performance Full-Stack Web, Modern Mobile Apps, and Scalable Cloud Architectures.
          </p>
        </div>

        {/* Interactive Filter Pills */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.6rem",
            marginBottom: "3rem",
          }}
        >
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundEffects.playTab();
                  setActiveTab(cat.id);
                }}
                onMouseEnter={(e) => {
                  soundEffects.playHover(1.1);
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--text-primary)";
                    e.currentTarget.style.borderColor = "var(--accent)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.borderColor = "var(--glass-border)";
                  }
                }}
                style={{
                  background: isActive ? "var(--accent)" : "var(--glass-bg)",
                  color: isActive ? "#000000" : "var(--text-secondary)",
                  border: `1px solid ${isActive ? "var(--accent)" : "var(--glass-border)"}`,
                  borderRadius: "9999px",
                  padding: "0.5rem 1.25rem",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: isActive ? "0 0 20px var(--accent-glow)" : "none",
                }}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Dynamic Animated Skill Grid */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: "1rem",
          }}
        >
          <AnimatePresence>
            {displayedSkills.map((skill) => (
              <SkillCard
                key={skill.name}
                name={skill.name}
                icon={skill.icon}
                color={skill.color}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
