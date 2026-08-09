"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Mail, Download, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { personalInfo } from "@/data/portfolio";

const titles = ["Full Stack Developer", "React Developer", "Python Engineer", "AI Enthusiast"];

const codeSnippet = `// Building the future, one line at a time
const developer = {
  name: "Bebin R",
  stack: ["React", "Next.js", "Python"],
  passion: "scalable systems",
  coffee: Infinity,
};

async function buildSomethingAmazing() {
  const idea = await developer.think();
  const code = developer.write(idea);
  return deploy(code); // 🚀
}`;

function TypingEffect({ texts }: { texts: string[] }) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (charIndex < current.length) {
        timeout = setTimeout(() => setCharIndex((c) => c + 1), 60);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => setCharIndex((c) => c - 1), 35);
      } else {
        timeout = setTimeout(() => {
          setDeleting(false);
          setTextIndex((i) => (i + 1) % texts.length);
        }, 35);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, texts]);

  const displayed = texts[textIndex].slice(0, charIndex);

  return (
    <span>
      <span style={{ color: "var(--accent)" }}>{displayed}</span>
      <span className="cursor-blink" style={{ color: "var(--accent)", marginLeft: "1px" }}>|</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "64px",
      }}
    >
      {/* Animated background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 50% at 10% 40%, rgba(6,182,212,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 90% 70%, rgba(129,140,248,0.06) 0%, transparent 60%),
            var(--bg-primary)
          `,
          zIndex: 0,
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "4rem 1.5rem",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
        className="hero-grid"
      >
        {/* Left content */}
        <div
          style={{
            opacity: 1,
            transform: "translateY(0)",
          }}
        >
          {/* Available badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(6,182,212,0.1)",
              border: "1px solid rgba(6,182,212,0.25)",
              borderRadius: "9999px",
              padding: "0.35rem 1rem",
              marginBottom: "1.75rem",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
            <span style={{ fontSize: "0.78rem", color: "var(--accent)", fontWeight: 500 }}>
              Available for opportunities
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              color: "var(--text-primary)",
              marginBottom: "0.75rem",
              letterSpacing: "-0.02em",
            }}
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text">{personalInfo.name}</span>
          </h1>

          {/* Typing effect title */}
          <h2
            style={{
              fontSize: "clamp(1.3rem, 3vw, 1.9rem)",
              fontWeight: 500,
              marginBottom: "1.5rem",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
              minHeight: "2.5rem",
            }}
          >
            <TypingEffect texts={titles} />
          </h2>

          {/* Headline */}
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: "0.75rem",
              maxWidth: "520px",
            }}
          >
            {personalInfo.headline}
          </p>

          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--text-muted)",
              lineHeight: 1.7,
              marginBottom: "2.25rem",
              maxWidth: "500px",
            }}
          >
            {personalInfo.bio}
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <a
              href="#projects"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View My Projects
              <ExternalLink size={15} />
            </a>
            <a href={personalInfo.resumeUrl} download className="btn-secondary">
              <Download size={15} />
              Download Resume
            </a>
          </div>

          {/* Social links */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Find me on</span>
            {[
              { href: personalInfo.github, icon: <FaGithub size={18} />, label: "GitHub" },
              { href: personalInfo.linkedin, icon: <FaLinkedinIn size={18} />, label: "LinkedIn" },
              { href: `mailto:${personalInfo.email}`, icon: <Mail size={18} />, label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "0.5rem",
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-secondary)",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px var(--accent-glow)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                  (e.currentTarget as HTMLElement).style.transform = "none";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right — Code visual */}
        <div
          className="hero-code-panel"
          style={{
            opacity: 1,
            transform: "translateY(0)",
          }}
        >
          <div
            className="animate-float"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "1rem",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(6,182,212,0.1)",
            }}
          >
            {/* Terminal header */}
            <div
              style={{
                background: "var(--bg-secondary)",
                padding: "0.75rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div style={{ display: "flex", gap: "6px" }}>
                {["#FF5F57", "#FEBC2E", "#28C840"].map((color, i) => (
                  <span
                    key={i}
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: color,
                      display: "block",
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                portfolio.ts
              </span>
            </div>

            {/* Code content */}
            <pre
              style={{
                padding: "1.5rem",
                margin: 0,
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                lineHeight: 1.75,
                overflowX: "auto",
                color: "var(--text-secondary)",
              }}
            >
              {codeSnippet.split("\n").map((line, i) => (
                <div key={i}>
                  <span style={{ color: "var(--text-muted)", marginRight: "1rem", userSelect: "none", fontSize: "0.7rem" }}>
                    {String(i + 1).padStart(2, " ")}
                  </span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: line
                        .replace(/(".*?")/g, '<span style="color:#22d3ee">$1</span>')
                        .replace(/\b(const|async|function|return|await)\b/g, '<span style="color:#818cf8">$1</span>')
                        .replace(/\/\/.*/g, '<span style="color:#6b7280">$&</span>')
                        .replace(/\b(developer|idea|code)\b(?=\s*[.:])/g, '<span style="color:#fb923c">$&</span>'),
                    }}
                  />
                </div>
              ))}
            </pre>

            {/* Status bar */}
            <div
              style={{
                background: "var(--accent)",
                padding: "0.3rem 1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: "0.7rem", color: "#000", fontWeight: 600, fontFamily: "var(--font-mono)" }}>
                TypeScript
              </span>
              <span style={{ fontSize: "0.7rem", color: "#000", fontWeight: 500, fontFamily: "var(--font-mono)" }}>
                ✓ Ready to build
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--text-muted)",
          animation: "float 2s ease-in-out infinite",
          cursor: "pointer",
          zIndex: 1,
        }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>scroll</span>
        <ArrowDown size={16} />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .hero-code-panel {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
