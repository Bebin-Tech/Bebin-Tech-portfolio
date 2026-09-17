"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail, Download, ExternalLink, Sparkles, Terminal } from "lucide-react";
import { FaGithub, FaInstagram } from "react-icons/fa6";
import { personalInfo } from "@/data/portfolio";
import HeroPhotoAvatar from "./HeroPhotoAvatar";
import { soundEffects } from "@/lib/soundEffects";

const titles = [
  "Full Stack Developer",
  "React & Next.js Expert",
  "Python Engineer",
  "AI & ML Enthusiast",
  "Scalable Systems Architect",
];

const codeSnippet = `// Building the future, one line at a time
const developer = {
  name: "Bebin R",
  stack: ["React", "Next.js", "Python", "AI"],
  passion: "scalable systems & slick UI",
  status: "available for hire 🚀",
};

async function buildSomethingAmazing() {
  const idea = await developer.think();
  const code = developer.write(idea);
  return deploy(code);
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
      <span className="cursor-blink" style={{ color: "var(--accent)", marginLeft: "1px" }}>
        |
      </span>
    </span>
  );
}

export default function Hero() {
  const [showCode, setShowCode] = useState(false);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
        paddingBottom: "4rem",
      }}
    >
      {/* Animated radial gradient aura */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 70% 50% at 15% 45%, rgba(6,182,212,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 45% at 85% 65%, rgba(129,140,248,0.1) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(34,211,238,0.03) 0%, transparent 80%),
            var(--bg-primary)
          `,
          zIndex: 0,
        }}
      />

      {/* Grid overlay with subtle glow */}
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
          padding: "2rem 1.5rem",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: "3.5rem",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
        className="hero-grid"
      >
        {/* Left Column: Bio, headline, CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              background: "rgba(6,182,212,0.1)",
              border: "1px solid rgba(6,182,212,0.3)",
              borderRadius: "9999px",
              padding: "0.4rem 1.1rem",
              marginBottom: "1.5rem",
              boxShadow: "0 0 20px rgba(6,182,212,0.15)",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
                boxShadow: "0 0 10px #22c55e",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
            <span style={{ fontSize: "0.82rem", color: "var(--accent-light)", fontWeight: 600, letterSpacing: "0.02em" }}>
              Available for new opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{
              fontSize: "clamp(2.8rem, 5.5vw, 4.2rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              color: "var(--text-primary)",
              marginBottom: "0.75rem",
              letterSpacing: "-0.025em",
            }}
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text">{personalInfo.name}</span>
          </motion.h1>

          {/* Typing effect title */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            style={{
              fontSize: "clamp(1.25rem, 2.6vw, 1.85rem)",
              fontWeight: 600,
              marginBottom: "1.4rem",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
              minHeight: "2.5rem",
            }}
          >
            <TypingEffect texts={titles} />
          </motion.h2>

          {/* Headline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: "0.85rem",
              maxWidth: "540px",
            }}
          >
            {personalInfo.headline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            style={{
              fontSize: "0.95rem",
              color: "var(--text-muted)",
              lineHeight: 1.7,
              marginBottom: "2.25rem",
              maxWidth: "520px",
            }}
          >
            {personalInfo.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.25rem" }}
          >
            <a
              href="#projects"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                soundEffects.playClick();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              onMouseEnter={() => soundEffects.playHover(1.1)}
            >
              <Sparkles size={16} />
              View My Projects
              <ExternalLink size={15} />
            </a>

            <a
              href={personalInfo.resumeUrl}
              download
              className="btn-secondary"
              onClick={() => soundEffects.playClick()}
              onMouseEnter={() => soundEffects.playHover(1.1)}
            >
              <Download size={15} />
              Download Resume
            </a>

            <button
              onClick={() => {
                soundEffects.playTab();
                setShowCode(!showCode);
              }}
              onMouseEnter={() => soundEffects.playHover(1.1)}
              className="btn-secondary"
              style={{
                borderColor: showCode ? "var(--accent)" : "var(--glass-border)",
                color: showCode ? "var(--accent)" : "var(--text-primary)",
              }}
            >
              <Terminal size={15} />
              {showCode ? "Hide Code" : "View Code"}
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 500 }}>
              Connect with me:
            </span>
            {[
              { href: personalInfo.github, icon: <FaGithub size={18} />, label: "GitHub" },
              { href: personalInfo.instagram, icon: <FaInstagram size={18} />, label: "Instagram" },
              { href: `mailto:${personalInfo.email}`, icon: <Mail size={18} />, label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                onClick={() => soundEffects.playClick()}
                onMouseEnter={(e) => {
                  soundEffects.playHover(1.2);
                  (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px) scale(1.05)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px var(--accent-glow)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                  (e.currentTarget as HTMLElement).style.transform = "none";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "0.6rem",
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-secondary)",
                  transition: "all 0.25s ease",
                  textDecoration: "none",
                }}
              >
                {social.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: 360° Rotating Photo Showcase + Terminal Snippet */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
          {/* Main 360° Rotating Photo */}
          <HeroPhotoAvatar />

          {/* Interactive Toggleable Terminal Code Snippet */}
          {showCode && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              style={{
                width: "100%",
                maxWidth: "420px",
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 25px rgba(6,182,212,0.15)",
                zIndex: 6,
              }}
            >
              <div
                style={{
                  background: "var(--bg-secondary)",
                  padding: "0.6rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div style={{ display: "flex", gap: "6px" }}>
                  {["#FF5F57", "#FEBC2E", "#28C840"].map((color, i) => (
                    <span
                      key={i}
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: color,
                        display: "block",
                      }}
                    />
                  ))}
                </div>
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  developer.ts
                </span>
              </div>

              <pre
                style={{
                  padding: "1rem 1.25rem",
                  margin: 0,
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.74rem",
                  lineHeight: 1.6,
                  overflowX: "auto",
                  color: "var(--text-secondary)",
                }}
              >
                {codeSnippet.split("\n").map((line, i) => (
                  <div key={i}>
                    <span style={{ color: "var(--text-muted)", marginRight: "0.75rem", userSelect: "none", fontSize: "0.68rem" }}>
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
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "1.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          color: "var(--text-muted)",
          animation: "float 2s ease-in-out infinite",
          cursor: "pointer",
          zIndex: 1,
        }}
        onClick={() => {
          soundEffects.playClick();
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
        onMouseEnter={() => soundEffects.playHover(1.0)}
      >
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>
          Explore Portfolio
        </span>
        <ArrowDown size={16} style={{ color: "var(--accent-light)" }} />
      </div>

      <style>{`
        @media (max-width: 950px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3.5rem !important;
            text-align: center;
          }
          .hero-grid > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-grid p {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-grid .btn-primary, .hero-grid .btn-secondary {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
