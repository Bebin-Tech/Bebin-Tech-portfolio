"use client";

import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { soundEffects } from "@/lib/soundEffects";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

interface NavbarProps {
  theme: "dark" | "light" | "aurora";
  changeTheme: (theme: "dark" | "light" | "aurora") => void;
}

export default function Navbar({ theme, changeTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    soundEffects.playClick();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const themeSelector = (
    <select className="theme-selector" aria-label="Color theme" value={theme}
      onChange={(event) => {
        soundEffects.playToggle();
        changeTheme(event.target.value as NavbarProps["theme"]);
      }}>
      <option value="light">White</option>
      <option value="dark">Dark</option>
      <option value="aurora">Aurora</option>
    </select>
  );

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.3s ease",
          background: scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              soundEffects.playClick();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onMouseEnter={() => soundEffects.playHover(1.2)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <span style={{ color: "var(--accent)" }}>&lt;</span>
            {personalInfo.firstName}
            <span style={{ color: "var(--accent)" }}> /&gt;</span>
          </a>

          {/* Desktop Nav */}
          <div
            className="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.75rem",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                onMouseEnter={() => soundEffects.playHover(1)}
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: activeSection === link.href.slice(1) ? "var(--accent)" : "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  position: "relative",
                }}
              >
                {link.label}
              </a>
            ))}

            {/* Theme toggle */}
            {themeSelector}

            {/* Resume button */}
            <a
              href={personalInfo.resumeUrl}
              download
              onClick={() => soundEffects.playClick()}
              onMouseEnter={() => soundEffects.playHover(1.15)}
              className="btn-primary"
              style={{ fontSize: "0.8rem", padding: "0.5rem 1.25rem" }}
            >
              <Download size={14} />
              Resume
            </a>
          </div>

          {/* Mobile controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }} className="mobile-controls">
            {themeSelector}
            <button
              onClick={() => {
                soundEffects.playClick();
                setMenuOpen(!menuOpen);
              }}
              aria-label="Toggle menu"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--text-primary)",
                padding: "0.25rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "var(--bg-primary)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
            paddingTop: "64px",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              onMouseEnter={() => soundEffects.playHover(1)}
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={personalInfo.resumeUrl}
            download
            className="btn-primary"
            onClick={() => {
              soundEffects.playClick();
              setMenuOpen(false);
            }}
            style={{ marginTop: "1rem" }}
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-controls { display: none !important; }
        }
      `}</style>
    </>
  );
}
