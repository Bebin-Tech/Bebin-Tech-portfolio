"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, Code2, Lightbulb, Heart, RotateCw, Sparkles, Trophy } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { soundEffects } from "@/lib/soundEffects";

const highlights = [
  { icon: <Code2 size={18} />, label: "Clean Code", desc: "Readable, maintainable, tested architecture" },
  { icon: <Lightbulb size={18} />, label: "Problem Solver", desc: "Analytical, creative, system-level thinker" },
  { icon: <Heart size={18} />, label: "Detail-Oriented", desc: "Pixel perfection and smooth interactions" },
];

const techBadges = [
  "React", "Next.js", "TypeScript", "Python", "Node.js",
  "PostgreSQL", "MongoDB", "Docker", "Tailwind CSS",
  "GraphQL", "FastAPI", "Machine Learning"
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function AboutAvatar3D() {
  const [isSpinning, setIsSpinning] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["14deg", "-14deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-14deg", "14deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const triggerSpin = () => {
    if (isSpinning) return;
    soundEffects.playSpin();
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000);
  };

  return (
    <div style={{ position: "relative" }} className="perspective-1000">
      {/* Background ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: "-10px",
          borderRadius: "2rem",
          background: "radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(129,140,248,0.15) 50%, transparent 75%)",
          filter: "blur(20px)",
          zIndex: 0,
        }}
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          position: "relative",
          zIndex: 1,
          cursor: "pointer",
        }}
        animate={{
          rotateY: isSpinning ? 360 : 0,
        }}
        transition={{
          rotateY: { duration: 1, ease: [0.34, 1.56, 0.64, 1] },
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={triggerSpin}
        onMouseEnter={() => soundEffects.playHover(1.1)}
        title="Click to spin 360°"
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "320px",
            height: "380px",
            margin: "0 auto",
            borderRadius: "1.75rem",
            padding: "3px",
            background: "linear-gradient(135deg, rgba(6,182,212,0.9), rgba(129,140,248,0.9), rgba(34,211,238,0.9))",
            boxShadow: "0 20px 45px rgba(0,0,0,0.5), 0 0 30px rgba(6,182,212,0.3)",
          }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: "calc(1.75rem - 3px)",
              overflow: "hidden",
              width: "100%",
              height: "100%",
              background: "#0d131f",
            }}
          >
            <Image
              src="/images/bebin.jpg"
              alt="Bebin R — Full Stack Developer"
              fill
              sizes="(max-width: 768px) 90vw, 320px"
              priority
              style={{
                objectFit: "cover",
                objectPosition: "center 15%",
                display: "block",
              }}
            />

            {/* Click to spin prompt on avatar */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "rgba(10,10,15,0.75)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(6,182,212,0.4)",
                borderRadius: "9999px",
                padding: "0.25rem 0.65rem",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "var(--accent-light)",
                fontSize: "0.72rem",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              }}
            >
              <RotateCw size={12} className={isSpinning ? "animate-spin" : ""} />
              360°
            </div>

            {/* Bottom mini status badge */}
            <div
              style={{
                position: "absolute",
                bottom: "12px",
                left: "12px",
                background: "rgba(10,10,15,0.75)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(34,197,94,0.4)",
                borderRadius: "9999px",
                padding: "0.25rem 0.65rem",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "#4ade80",
                fontSize: "0.72rem",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 8px #22c55e",
                }}
              />
              Available for work
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function About() {
  const { ref, inView } = useInView(0.12);

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding"
      style={{ background: "var(--bg-secondary)", position: "relative", overflow: "hidden" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
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
          {/* Avatar Column */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-30px)",
              transition: "all 0.6s ease 0.15s",
            }}
          >
            <AboutAvatar3D />

            {/* Location badge */}
            <div
              style={{
                marginTop: "1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                color: "var(--text-secondary)",
                fontSize: "0.88rem",
              }}
            >
              <MapPin size={15} style={{ color: "var(--accent)" }} />
              {personalInfo.location}
            </div>

            {/* Mini stats with glowing glass effect */}
            <div
              style={{
                marginTop: "1.5rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.85rem",
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
                  className="glass glow-card-interactive"
                  onMouseEnter={() => soundEffects.playHover(1.15)}
                  style={{
                    borderRadius: "0.85rem",
                    padding: "1rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.45rem",
                      fontWeight: 800,
                      color: "var(--accent)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Column */}
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
                marginBottom: "1.5rem",
              }}
            >
              {personalInfo.bio2}
            </p>

            {/* Philosophy */}
            <blockquote
              style={{
                borderLeft: "3px solid var(--accent)",
                background: "rgba(6,182,212,0.04)",
                borderRadius: "0 0.75rem 0.75rem 0",
                padding: "1rem 1.25rem",
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
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2.25rem", flexWrap: "wrap" }}>
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="glass glow-card-interactive"
                  onMouseEnter={() => soundEffects.playHover(1.2)}
                  style={{
                    borderRadius: "0.85rem",
                    padding: "1.1rem 1.25rem",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.85rem",
                    flex: "1 1 160px",
                  }}
                >
                  <span style={{ color: "var(--accent)", marginTop: "2px" }}>{h.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--text-primary)" }}>
                      {h.label}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                      {h.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech badges */}
            <div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "0.85rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                CORE TECHNOLOGIES & STACK
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {techBadges.map((tech) => (
                  <span
                    key={tech}
                    onMouseEnter={(e) => {
                      soundEffects.playHover(1.25);
                      (e.currentTarget as HTMLElement).style.background = "rgba(6,182,212,0.22)";
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-light)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px) scale(1.04)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(6,182,212,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(6,182,212,0.08)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.25)";
                      (e.currentTarget as HTMLElement).style.transform = "none";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                    style={{
                      background: "rgba(6,182,212,0.08)",
                      border: "1px solid rgba(6,182,212,0.25)",
                      color: "var(--accent)",
                      borderRadius: "0.5rem",
                      padding: "0.35rem 0.85rem",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      fontFamily: "var(--font-mono)",
                      transition: "all 0.25s ease",
                      cursor: "default",
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
