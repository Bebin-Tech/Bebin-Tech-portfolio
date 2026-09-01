"use client";

import { useRef, useEffect, useState } from "react";
import { GraduationCap, Award, Calendar, MapPin, Sparkles } from "lucide-react";
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
          <p className="section-label">Academic Foundations</p>
          <h2 className="section-title">Education & Certifications</h2>
          <p className="section-subtitle">
            Formal engineering background complemented with specialized industry credentials.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "2.5rem",
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
              className="glow-card-interactive"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "1.25rem",
                padding: "2.25rem",
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
                  width: "52px",
                  height: "52px",
                  borderRadius: "0.85rem",
                  background: "rgba(6,182,212,0.12)",
                  border: "1px solid rgba(6,182,212,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.4rem",
                  color: "var(--accent)",
                  boxShadow: "0 0 20px rgba(6,182,212,0.2)",
                }}
              >
                <GraduationCap size={26} />
              </div>

              <h3
                style={{
                  fontSize: "1.2rem",
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
                  color: "var(--accent-light)",
                  fontSize: "0.95rem",
                  marginBottom: "0.75rem",
                }}
              >
                {education.degree.institution}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  <MapPin size={14} style={{ color: "var(--accent)" }} />
                  {education.degree.location}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  <Calendar size={14} style={{ color: "var(--accent)" }} />
                  {education.degree.duration}
                </div>
              </div>

              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                {education.degree.description}
              </p>

              <div
                style={{
                  background: "rgba(6,182,212,0.08)",
                  border: "1px solid rgba(6,182,212,0.25)",
                  borderRadius: "0.6rem",
                  padding: "0.65rem 1.15rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                }}
              >
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500 }}>Academic Performance (GPA)</span>
                <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
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
              Verified Credentials
            </h3>
            {education.certifications.map((cert) => (
              <div
                key={cert.title}
                className="glow-card-interactive"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.2rem 1.4rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1.1rem",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "0.75rem",
                    background: `${cert.color}18`,
                    border: `1px solid ${cert.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: cert.color,
                    flexShrink: 0,
                    boxShadow: `0 0 15px ${cert.color}22`,
                  }}
                >
                  <Award size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                    {cert.title}
                  </h4>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{cert.issuer}</span>
                    <span
                      style={{
                        fontSize: "0.74rem",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                        color: cert.color,
                        background: `${cert.color}15`,
                        borderRadius: "0.3rem",
                        padding: "0.15rem 0.5rem",
                        border: `1px solid ${cert.color}30`,
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
        @media (max-width: 850px) {
          .edu-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
