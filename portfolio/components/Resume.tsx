"use client";

import { Download, FileText, ArrowRight } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

export default function Resume() {
  return (
    <section
      id="resume"
      style={{
        background: "var(--bg-secondary)",
        padding: "5rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 70% 80% at 50% 50%, rgba(6,182,212,0.06) 0%, transparent 70%)
          `,
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "1rem",
            background: "rgba(6,182,212,0.1)",
            border: "1px solid rgba(6,182,212,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.75rem",
            color: "var(--accent)",
          }}
        >
          <FileText size={28} />
        </div>

        <p className="section-label" style={{ justifyContent: "center" }}>Career documents</p>

        <h2
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            color: "var(--text-primary)",
            marginBottom: "1rem",
            lineHeight: 1.15,
          }}
        >
          Want to know more about my experience?
        </h2>

        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            maxWidth: "520px",
            margin: "0 auto 2.5rem",
          }}
        >
          My resume covers my complete work history, skills, projects, and education. Updated regularly with my latest work.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href={personalInfo.resumeUrl}
            download
            className="btn-primary"
            style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}
          >
            <Download size={18} />
            Download Resume
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-secondary"
            style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}
          >
            Get In Touch
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
