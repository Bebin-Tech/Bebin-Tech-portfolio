"use client";

import { Mail, Heart } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { personalInfo } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        padding: "3rem 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        {/* Left */}
        <div>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.2rem",
              marginBottom: "0.4rem",
            }}
          >
            <span style={{ color: "var(--accent)" }}>&lt;</span>
            {personalInfo.name}
            <span style={{ color: "var(--accent)" }}>/&gt;</span>
          </a>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", maxWidth: "280px", lineHeight: 1.5 }}>
            Building scalable, modern web applications that solve real-world problems.
          </p>
        </div>

        {/* Center */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "0.78rem",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              justifyContent: "center",
              marginBottom: "0.4rem",
            }}
          >
            Built with <Heart size={12} style={{ color: "#ef4444" }} /> using Next.js & Tailwind CSS
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            © {year} {personalInfo.name}. All rights reserved.
          </p>
        </div>

        {/* Right */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {[
            { href: personalInfo.github, icon: <FaGithub size={17} />, label: "GitHub" },
            { href: personalInfo.linkedin, icon: <FaLinkedinIn size={17} />, label: "LinkedIn" },
            { href: `mailto:${personalInfo.email}`, icon: <Mail size={17} />, label: "Email" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "0.5rem",
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
