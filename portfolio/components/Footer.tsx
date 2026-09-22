"use client";

import { Mail } from "lucide-react";
import { FaGithub, FaInstagram } from "react-icons/fa6";
import { personalInfo } from "@/data/portfolio";

export default function Footer() {


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

        </div>

        {/* Right */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {[
            { href: personalInfo.github, icon: <FaGithub size={17} />, label: "GitHub" },
            { href: personalInfo.instagram, icon: <FaInstagram size={17} />, label: "Instagram" },
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
