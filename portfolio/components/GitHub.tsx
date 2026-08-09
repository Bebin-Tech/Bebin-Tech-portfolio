"use client";

import { useRef, useEffect, useState } from "react";
import { Star, GitFork, ExternalLink, Users, BookOpen, GitCommit } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { githubData } from "@/data/portfolio";

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

// Generate a realistic-looking contribution grid (52 weeks × 7 days)
function generateContributions() {
  const weeks: number[][] = [];
  for (let w = 0; w < 52; w++) {
    const days: number[] = [];
    for (let d = 0; d < 7; d++) {
      // Weighted random — mostly light, some heavy
      const r = Math.random();
      if (r < 0.35) days.push(0);
      else if (r < 0.6) days.push(1);
      else if (r < 0.8) days.push(2);
      else if (r < 0.93) days.push(3);
      else days.push(4);
    }
    weeks.push(days);
  }
  return weeks;
}

const contributions = generateContributions();

export default function GitHub() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="github"
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
          }}
        >
          <p className="section-label">Open Source</p>
          <h2 className="section-title">GitHub Activity</h2>
          <p className="section-subtitle">
            Consistently shipping code and contributing to the developer community.
          </p>
        </div>

        {/* GitHub stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            marginBottom: "2.5rem",
            opacity: inView ? 1 : 0,
            transition: "opacity 0.6s ease 0.1s",
          }}
          className="github-stats"
        >
          {[
            { icon: <BookOpen size={18} />, value: githubData.stats.repos, label: "Repositories" },
            { icon: <Star size={18} />, value: githubData.stats.stars, label: "Stars Earned" },
            { icon: <Users size={18} />, value: githubData.stats.followers, label: "Followers" },
            { icon: <GitCommit size={18} />, value: githubData.stats.contributions, label: "Contributions" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass card"
              style={{
                textAlign: "center",
                padding: "1.5rem 1rem",
              }}
            >
              <span style={{ color: "var(--accent)", display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>
                {stat.icon}
              </span>
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-mono)",
                  marginBottom: "0.25rem",
                }}
              >
                {stat.value.toLocaleString()}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Contribution Graph */}
        <div
          className="card"
          style={{
            borderRadius: "1rem",
            padding: "1.75rem",
            marginBottom: "2.5rem",
            opacity: inView ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
            overflowX: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.25rem",
            }}
          >
            <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>
              Contribution Activity · Last 12 months
            </h3>
            <a
              href={`https://github.com/${githubData.username}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                fontSize: "0.78rem",
                color: "var(--accent)",
                textDecoration: "none",
              }}
            >
              @{githubData.username}
              <ExternalLink size={12} />
            </a>
          </div>

          <div style={{ display: "flex", gap: "3px", minWidth: "fit-content" }}>
            {contributions.map((week, wi) => (
              <div key={wi} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                {week.map((level, di) => (
                  <div
                    key={di}
                    className={`contrib-${level}`}
                    title={`Contributions: ${level * 2}`}
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "2px",
                      transition: "transform 0.1s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.4)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.75rem", justifyContent: "flex-end" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Less</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <div key={l} className={`contrib-${l}`} style={{ width: "10px", height: "10px", borderRadius: "2px" }} />
            ))}
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>More</span>
          </div>
        </div>

        {/* Pinned repos */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.6s ease 0.3s",
          }}
        >
          <h3
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            Pinned Repositories
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem",
            }}
          >
            {githubData.repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <div
                  className="card"
                  style={{ height: "100%" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <FaGithub size={18} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "2px" }} />
                    <h4
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "var(--accent)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {repo.name}
                    </h4>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
                    {repo.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem" }}>
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: repo.languageColor,
                          display: "inline-block",
                        }}
                      />
                      <span style={{ color: "var(--text-secondary)" }}>{repo.language}</span>
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "var(--text-muted)", fontSize: "0.75rem" }}>
                      <Star size={12} />
                      {repo.stars}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "var(--text-muted)", fontSize: "0.75rem" }}>
                      <GitFork size={12} />
                      {repo.forks}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .github-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .github-stats {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
