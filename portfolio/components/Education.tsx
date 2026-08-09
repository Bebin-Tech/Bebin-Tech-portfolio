"use client";

import { useRef, useEffect, useState } from "react";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";
import { education } from "@/data/portfolio";

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

export default function Education() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="education"
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding"
      style={{ background: "var(--bg-secondary)" }}
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
          <p className="section-label">My background</p>
          <h2 className="section-title">Education & Certifications</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            alignItems: "start",
          }}
          className="edu-grid"
        >
          {/* Degree Card */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.6s ease 0.1s",
            }}
          >
            <div
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "1.25rem",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Accent bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "linear-gradient(90deg, var(--accent), #818cf8)",
                }}
              />

              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "0.75rem",
                  background: "rgba(6,182,212,0.12)",
                  border: "1px solid rgba(6,182,212,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  color: "var(--accent)",
                }}
              >
                <GraduationCap size={24} />
              </div>

              <h3
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "0.5rem",
                  lineHeight: 1.4,
                }}
              >
                {education.degree.title}
              </h3>

              <p
                style={{
                  fontWeight: 600,
                  color: "var(--accent)",
                  fontSize: "0.9rem",
                  marginBottom: "0.5rem",
                }}
              >
                {education.degree.institution}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)", fontSize: "0.82rem" }}>
                  <MapPin size={13} />
                  {education.degree.location}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)", fontSize: "0.82rem" }}>
                  <Calendar size={13} />
                  {education.degree.duration}
                </div>
              </div>

              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                {education.degree.description}
              </p>

              <div
                style={{
                  background: "rgba(6,182,212,0.08)",
                  border: "1px solid rgba(6,182,212,0.2)",
                  borderRadius: "0.5rem",
                  padding: "0.6rem 1rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>GPA</span>
                <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                  {education.degree.gpa}
                </span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.6s ease 0.2s",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
              Certifications
            </h3>
            {education.certifications.map((cert, i) => (
              <div
                key={cert.title}
                className="card"
                style={{
                  padding: "1.15rem 1.25rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  animationDelay: `${i * 60}ms`,
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "0.6rem",
                    background: `${cert.color}18`,
                    border: `1px solid ${cert.color}35`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: cert.color,
                    flexShrink: 0,
                  }}
                >
                  <Award size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.2rem" }}>
                    {cert.title}
                  </h4>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{cert.issuer}</span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                        color: cert.color,
                        background: `${cert.color}15`,
                        borderRadius: "0.25rem",
                        padding: "0.1rem 0.4rem",
                      }}
                    >
                      {cert.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .edu-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
