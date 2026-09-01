"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { RotateCw, Sparkles, Code, Cpu } from "lucide-react";
import { SiReact, SiNextdotjs, SiPython, SiTypescript } from "react-icons/si";

export default function HeroPhotoAvatar() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  // Mouse tilt motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["18deg", "-18deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-18deg", "18deg"]);
  const sheenX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const sheenY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const trigger360Spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSpinCount((prev) => prev + 1);
    setTimeout(() => {
      setIsSpinning(false);
    }, 1200);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="perspective-1000"
    >
      {/* Outer ambient energy field */}
      <div
        style={{
          position: "absolute",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.22) 0%, rgba(129,140,248,0.12) 45%, transparent 70%)",
          filter: "blur(25px)",
          animation: "pulse-ring 4s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Outer 360° Rotating Orbital Ring 1 (Clockwise) */}
      <div
        className="animate-spin-slow"
        style={{
          position: "absolute",
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          border: "1.5px dashed rgba(6, 182, 212, 0.4)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "-5px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#22d3ee",
            boxShadow: "0 0 12px #22d3ee, 0 0 20px #06b6d4",
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: "-5px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#818cf8",
            boxShadow: "0 0 10px #818cf8",
          }}
        />
      </div>

      {/* Outer 360° Rotating Orbital Ring 2 (Counter-Clockwise) */}
      <div
        className="animate-spin-slow-reverse"
        style={{
          position: "absolute",
          width: "305px",
          height: "305px",
          borderRadius: "50%",
          border: "1px solid rgba(129, 140, 248, 0.25)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "-4px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#38bdf8",
            boxShadow: "0 0 10px #38bdf8",
          }}
        />
      </div>

      {/* Floating 3D Tech Badges Orbiting Around Photo */}
      {/* Badge 1: React */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        className="animate-float"
        style={{
          position: "absolute",
          top: "-15px",
          right: "-10px",
          zIndex: 10,
          background: "rgba(16, 22, 36, 0.85)",
          border: "1px solid rgba(6, 182, 212, 0.4)",
          backdropFilter: "blur(10px)",
          borderRadius: "9999px",
          padding: "0.45rem 0.9rem",
          display: "flex",
          alignItems: "center",
          gap: "0.45rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4), 0 0 15px rgba(6, 182, 212, 0.2)",
          cursor: "default",
        }}
      >
        <SiReact style={{ color: "#22d3ee", fontSize: "1.05rem" }} />
        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#f0f0f5", fontFamily: "var(--font-mono)" }}>
          React
        </span>
      </motion.div>

      {/* Badge 2: Python */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        className="animate-float-reverse"
        style={{
          position: "absolute",
          bottom: "15px",
          left: "-25px",
          zIndex: 10,
          background: "rgba(16, 22, 36, 0.85)",
          border: "1px solid rgba(251, 146, 60, 0.4)",
          backdropFilter: "blur(10px)",
          borderRadius: "9999px",
          padding: "0.45rem 0.9rem",
          display: "flex",
          alignItems: "center",
          gap: "0.45rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4), 0 0 15px rgba(251, 146, 60, 0.2)",
          cursor: "default",
        }}
      >
        <SiPython style={{ color: "#fb923c", fontSize: "1.05rem" }} />
        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#f0f0f5", fontFamily: "var(--font-mono)" }}>
          Python
        </span>
      </motion.div>

      {/* Badge 3: Next.js */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.0, type: "spring", stiffness: 200 }}
        className="animate-float-gentle"
        style={{
          position: "absolute",
          bottom: "-10px",
          right: "0px",
          zIndex: 10,
          background: "rgba(16, 22, 36, 0.85)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
          borderRadius: "9999px",
          padding: "0.45rem 0.9rem",
          display: "flex",
          alignItems: "center",
          gap: "0.45rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4), 0 0 15px rgba(255, 255, 255, 0.15)",
          cursor: "default",
        }}
      >
        <SiNextdotjs style={{ color: "#fff", fontSize: "1.05rem" }} />
        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#f0f0f5", fontFamily: "var(--font-mono)" }}>
          Next.js
        </span>
      </motion.div>

      {/* Badge 4: AI & ML */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        className="animate-float"
        style={{
          position: "absolute",
          top: "30px",
          left: "-25px",
          zIndex: 10,
          background: "rgba(16, 22, 36, 0.85)",
          border: "1px solid rgba(129, 140, 248, 0.4)",
          backdropFilter: "blur(10px)",
          borderRadius: "9999px",
          padding: "0.45rem 0.85rem",
          display: "flex",
          alignItems: "center",
          gap: "0.45rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4), 0 0 15px rgba(129, 140, 248, 0.2)",
          cursor: "default",
        }}
      >
        <Cpu style={{ color: "#818cf8", fontSize: "1.05rem" }} size={16} />
        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#f0f0f5", fontFamily: "var(--font-mono)" }}>
          AI / FullStack
        </span>
      </motion.div>

      {/* Main Interactive 3D Card with 360° Entrance Animation */}
      <motion.div
        initial={{ rotateY: -360, scale: 0.4, opacity: 0 }}
        animate={{
          rotateY: isSpinning ? (spinCount % 2 === 0 ? 360 : 720) : 0,
          scale: 1,
          opacity: 1,
        }}
        transition={{
          rotateY: {
            duration: isSpinning ? 1.2 : 1.4,
            ease: [0.34, 1.56, 0.64, 1],
          },
          scale: { duration: 1.0, ease: "easeOut" },
          opacity: { duration: 0.8 },
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          position: "relative",
          zIndex: 5,
          cursor: "pointer",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={trigger360Spin}
        title="Click to spin 360°"
      >
        {/* Conic Gradient Animated Glowing Border Frame */}
        <div
          style={{
            position: "relative",
            width: "270px",
            height: "310px",
            borderRadius: "2rem",
            padding: "4px",
            background: "linear-gradient(135deg, #06b6d4, #818cf8, #22d3ee, #06b6d4)",
            backgroundSize: "300% 300%",
            animation: "gradientShift 6s ease infinite",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 35px rgba(6, 182, 212, 0.35)",
          }}
        >
          {/* Inner Photo Container */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "calc(2rem - 4px)",
              overflow: "hidden",
              background: "var(--bg-surface)",
            }}
          >
            <Image
              src="/images/bebin.jpg"
              alt="Bebin R - Full Stack Developer"
              fill
              priority
              sizes="(max-width: 768px) 260px, 300px"
              style={{
                objectFit: "cover",
                objectPosition: "center 20%",
                transform: "scale(1.03)",
                transition: "transform 0.4s ease",
              }}
            />

            {/* Subtle bottom gradient vignette */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "50%",
                background: "linear-gradient(to top, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.2) 60%, transparent 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Dynamic Light Sheen overlay */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 65%)",
                mixBlendMode: "overlay",
                pointerEvents: "none",
                left: sheenX,
                top: sheenY,
              }}
            />

            {/* Bottom mini label inside photo */}
            <div
              style={{
                position: "absolute",
                bottom: "0.85rem",
                left: "1rem",
                right: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                zIndex: 2,
              }}
            >
              <div>
                <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "#ffffff", letterSpacing: "0.02em" }}>
                  Bebin R
                </p>
                <p style={{ margin: 0, fontSize: "0.72rem", color: "var(--accent-light)", fontFamily: "var(--font-mono)" }}>
                  Full Stack Engineer
                </p>
              </div>

              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "rgba(6, 182, 212, 0.25)",
                  border: "1px solid rgba(6, 182, 212, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#22d3ee",
                }}
              >
                <Sparkles size={14} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 360° Interactive Trigger Control Button */}
      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        onClick={trigger360Spin}
        disabled={isSpinning}
        style={{
          marginTop: "1.4rem",
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(6, 182, 212, 0.3)",
          backdropFilter: "blur(12px)",
          color: "var(--text-primary)",
          padding: "0.45rem 1.1rem",
          borderRadius: "9999px",
          fontSize: "0.8rem",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          transition: "all 0.25s ease",
          zIndex: 6,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.background = "rgba(6, 182, 212, 0.15)";
          e.currentTarget.style.boxShadow = "0 0 20px rgba(6, 182, 212, 0.3)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.3)";
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "none";
        }}
      >
        <RotateCw
          size={14}
          style={{
            color: "var(--accent-light)",
            transform: isSpinning ? "rotate(360deg)" : "none",
            transition: "transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
        <span>{isSpinning ? "Spinning 360°..." : "360° Spin"}</span>
      </motion.button>
    </div>
  );
}

