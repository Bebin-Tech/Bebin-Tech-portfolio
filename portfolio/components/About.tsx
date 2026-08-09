"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Code2, Lightbulb, Heart } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const highlights = [
  { icon: <Code2 size={18} />, label: "Clean Code", desc: "Readable, maintainable, tested" },
  { icon: <Lightbulb size={18} />, label: "Problem Solver", desc: "Analytical & creative thinker" },
  { icon: <Heart size={18} />, label: "Detail-Oriented", desc: "Precision in every pixel" },
];

const techBadges = [
  "React", "Next.js", "TypeScript", "Python", "Node.js",
  "PostgreSQL", "MongoDB", "Docker", "Tailwind CSS",
];

function useInView(threshold = 0.2) {
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

export default function About() {
  const { ref, inView } = useInView(0.15);

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease",
            marginBottom: "3.5rem",
          }}
        >
          <p className="section-label">Get to know me</p>
          <h2 className="section-title">About Me</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Avatar */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-30px)",
              transition: "all 0.6s ease 0.15s",
            }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: "1.25rem",
                overflow: "hidden",
                border: "2px solid var(--accent)",
                boxShadow: "0 0 40px rgba(6,182,212,0.15)",
                aspectRatio: "1",
              }}
            >
              <Image
                src="/images/bebin.jpg"
                alt="Bebin R — Full Stack Developer"
                width={400}
                height={400}
                style={{ objectFit: "cover", objectPosition: "center top", width: "100%", height: "100%" }}
              />
              {/* Overlay accent */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(to top, rgba(6,182,212,0.25), transparent)",
                  padding: "1rem",
                }}
              />
            </div>

            {/* Location badge */}
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                color: "var(--text-secondary)",
                fontSize: "0.85rem",
              }}
            >
              <MapPin size={14} style={{ color: "var(--accent)" }} />
              {personalInfo.location}
            </div>

            {/* Mini stats */}
            <div
              style={{
                marginTop: "1.5rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
              }}
            >
              {[
                { value: "2+", label: "Years Exp." },
                { value: "15+", label: "Projects" },
                { value: "10+", label: "Clients" },
                { value: "5+", label: "Open Source" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass"
                  style={{
                    borderRadius: "0.75rem",
                    padding: "1rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 800,
                      color: "var(--accent)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(30px)",
              transition: "all 0.6s ease 0.25s",
            }}
          >
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                marginBottom: "1.25rem",
              }}
            >
              {personalInfo.bio}
            </p>
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                marginBottom: "1.25rem",
              }}
            >
              {personalInfo.bio2}
            </p>

            {/* Philosophy */}
            <blockquote
              style={{
                borderLeft: "3px solid var(--accent)",
                paddingLeft: "1.25rem",
                marginBottom: "2rem",
                fontStyle: "italic",
                color: "var(--text-primary)",
                fontSize: "1rem",
                lineHeight: 1.7,
              }}
            >
              &ldquo;{personalInfo.philosophy}&rdquo;
            </blockquote>

            {/* Highlights */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="glass"
                  style={{
                    borderRadius: "0.75rem",
                    padding: "1rem 1.25rem",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    flex: "1 1 160px",
                  }}
                >
                  <span style={{ color: "var(--accent)", marginTop: "2px" }}>{h.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text-primary)" }}>
                      {h.label}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                      {h.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech badges */}
            <div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.75rem", fontWeight: 500 }}>
                TECHNOLOGIES I WORK WITH
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {techBadges.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      background: "rgba(6,182,212,0.08)",
                      border: "1px solid rgba(6,182,212,0.2)",
                      color: "var(--accent)",
                      borderRadius: "0.375rem",
                      padding: "0.3rem 0.75rem",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      fontFamily: "var(--font-mono)",
                      transition: "all 0.2s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(6,182,212,0.18)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(6,182,212,0.08)";
                      (e.currentTarget as HTMLElement).style.transform = "none";
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
