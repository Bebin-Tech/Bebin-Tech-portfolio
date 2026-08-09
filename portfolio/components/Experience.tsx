"use client";

import { useRef, useEffect, useState } from "react";
import { Briefcase, MapPin, Award, ChevronRight } from "lucide-react";
import { experience } from "@/data/portfolio";

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

export default function Experience() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding"
      style={{ background: "var(--bg-primary)" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease",
            marginBottom: "3.5rem",
          }}
        >
          <p className="section-label">My journey</p>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            Professional experiences that shaped my skills and approach to software development.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "20px",
              top: 0,
              bottom: 0,
              width: "2px",
              background: "linear-gradient(to bottom, var(--accent), transparent)",
              opacity: inView ? 1 : 0,
              transition: "opacity 0.6s ease 0.3s",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {experience.map((exp, i) => (
              <div
                key={exp.id}
                style={{
                  paddingLeft: "60px",
                  position: "relative",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0)" : "translateX(-30px)",
                  transition: `all 0.6s ease ${i * 0.15 + 0.2}s`,
                }}
              >
                {/* Timeline dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "1.25rem",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    border: "3px solid var(--bg-primary)",
                    boxShadow: "0 0 12px rgba(6,182,212,0.5)",
                    zIndex: 1,
                  }}
                />

                {/* Card */}
                <div
                  className="card"
                  style={{
                    borderRadius: "1rem",
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "0.75rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {exp.role}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <Briefcase size={13} style={{ color: "var(--accent)" }} />
                        <span
                          style={{
                            fontWeight: 600,
                            color: "var(--accent)",
                            fontSize: "0.9rem",
                          }}
                        >
                          {exp.company}
                        </span>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>•</span>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--text-secondary)",
                            background: "rgba(6,182,212,0.08)",
                            border: "1px solid rgba(6,182,212,0.15)",
                            borderRadius: "0.3rem",
                            padding: "0.1rem 0.5rem",
                          }}
                        >
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "var(--text-secondary)",
                          fontFamily: "var(--font-mono)",
                          marginBottom: "0.2rem",
                        }}
                      >
                        {exp.duration}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          color: "var(--text-muted)",
                          fontSize: "0.78rem",
                          justifyContent: "flex-end",
                        }}
                      >
                        <MapPin size={11} />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem 0", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {exp.description.map((bullet, bi) => (
                      <li
                        key={bi}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          fontSize: "0.88rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.65,
                        }}
                      >
                        <ChevronRight
                          size={14}
                          style={{ color: "var(--accent)", marginTop: "3px", flexShrink: 0 }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Achievements */}
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {exp.achievements.map((ach) => (
                      <span
                        key={ach}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          background: "rgba(34,197,94,0.08)",
                          border: "1px solid rgba(34,197,94,0.2)",
                          color: "#4ade80",
                          borderRadius: "0.35rem",
                          padding: "0.25rem 0.65rem",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        }}
                      >
                        <Award size={11} />
                        {ach}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
