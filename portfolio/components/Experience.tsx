"use client";

import { useRef, useEffect, useState } from "react";
import { Briefcase, MapPin, Award, ChevronRight, Sparkles } from "lucide-react";
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
      style={{ background: "var(--bg-primary)", position: "relative" }}
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
          <p className="section-label">Professional Trajectory</p>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            Hands-on engineering roles crafting production-ready platforms, full-stack architectures, and AI systems.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Vertical Track line */}
          <div
            style={{
              position: "absolute",
              left: "20px",
              top: 0,
              bottom: 0,
              width: "2px",
              background: "rgba(255, 255, 255, 0.08)",
              opacity: inView ? 1 : 0,
              transition: "opacity 0.6s ease 0.3s",
              overflow: "hidden",
            }}
          >
            {/* Flowing electric light beam */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "120px",
                background: "linear-gradient(to bottom, transparent, var(--accent), transparent)",
                animation: "light-beam 3s ease-in-out infinite",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {experience.map((exp, i) => (
              <div
                key={exp.id}
                style={{
                  paddingLeft: "55px",
                  position: "relative",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0)" : "translateX(-30px)",
                  transition: `all 0.6s ease ${i * 0.15 + 0.2}s`,
                }}
              >
                {/* Timeline Pulsing Node */}
                <div
                  style={{
                    position: "absolute",
                    left: "11px",
                    top: "1.25rem",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "var(--bg-primary)",
                    border: "3px solid var(--accent)",
                    boxShadow: "0 0 16px rgba(6,182,212,0.8)",
                    zIndex: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--accent-light)",
                      boxShadow: "0 0 8px var(--accent-light)",
                    }}
                  />
                </div>

                {/* Glass Experience Card */}
                <div
                  className="card glow-card-interactive"
                  style={{
                    borderRadius: "1.25rem",
                    padding: "1.75rem",
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
                      marginBottom: "1.2rem",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          marginBottom: "0.3rem",
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
                        <Briefcase size={14} style={{ color: "var(--accent)" }} />
                        <span
                          style={{
                            fontWeight: 600,
                            color: "var(--accent)",
                            fontSize: "0.92rem",
                          }}
                        >
                          {exp.company}
                        </span>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>•</span>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            color: "var(--accent-light)",
                            background: "rgba(6,182,212,0.08)",
                            border: "1px solid rgba(6,182,212,0.2)",
                            borderRadius: "0.35rem",
                            padding: "0.15rem 0.55rem",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "0.84rem",
                          fontWeight: 600,
                          color: "var(--text-secondary)",
                          fontFamily: "var(--font-mono)",
                          marginBottom: "0.25rem",
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
                          fontSize: "0.8rem",
                          justifyContent: "flex-end",
                        }}
                      >
                        <MapPin size={12} />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                    {exp.description.map((bullet, bi) => (
                      <li
                        key={bi}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.6rem",
                          fontSize: "0.9rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.65,
                        }}
                      >
                        <ChevronRight
                          size={15}
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
                          gap: "0.35rem",
                          background: "rgba(34,197,94,0.08)",
                          border: "1px solid rgba(34,197,94,0.25)",
                          color: "#4ade80",
                          borderRadius: "0.4rem",
                          padding: "0.3rem 0.75rem",
                          fontSize: "0.76rem",
                          fontWeight: 600,
                        }}
                      >
                        <Award size={12} />
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
