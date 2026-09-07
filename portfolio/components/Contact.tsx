"use client";

import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Send, CheckCircle, MapPin, Clock } from "lucide-react";
import { FaGithub, FaInstagram } from "react-icons/fa6";
import { personalInfo } from "@/data/portfolio";
import { soundEffects } from "@/lib/soundEffects";

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

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg-primary)",
  border: "1px solid var(--border)",
  borderRadius: "0.625rem",
  padding: "0.75rem 1rem",
  fontSize: "0.9rem",
  color: "var(--text-primary)",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  fontFamily: "var(--font-inter), sans-serif",
};

export default function Contact() {
  const { ref, inView } = useInView(0.1);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    soundEffects.playClick();
    setSending(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1400));
    console.log("Form data:", data);
    setSending(false);
    setSubmitted(true);
    soundEffects.playSuccess();
    reset();
    setTimeout(() => setSubmitted(false), 6000);
  };

  const contactLinks = [
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: "#06b6d4",
    },
    {
      icon: <FaInstagram size={20} />,
      label: "Instagram",
      value: "instagram.com/bebin.tech",
      href: personalInfo.instagram,
      color: "#e1306c",
    },
    {
      icon: <FaGithub size={20} />,
      label: "GitHub",
      value: personalInfo.github.replace("https://", ""),
      href: personalInfo.github,
      color: "#ffffff",
    },
  ];

  return (
    <section
      id="contact"
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
          <p className="section-label">Let&apos;s connect</p>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind or just want to say hi? I&apos;d love to hear from you. I&apos;m currently open to new opportunities.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "3rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left — Links */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-30px)",
              transition: "all 0.6s ease 0.1s",
            }}
          >
            <div
              style={{
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                  color: "var(--text-secondary)",
                  fontSize: "0.875rem",
                }}
              >
                <MapPin size={15} style={{ color: "var(--accent)" }} />
                {personalInfo.location}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "var(--text-secondary)",
                  fontSize: "0.875rem",
                }}
              >
                <Clock size={15} style={{ color: "var(--accent)" }} />
                IST (UTC+5:30) · Available Mon–Sat
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="card"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1rem 1.25rem",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${link.color}55`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    }}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "0.6rem",
                        background: `${link.color}12`,
                        border: `1px solid ${link.color}25`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: link.color,
                        flexShrink: 0,
                      }}
                    >
                      {link.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.15rem" }}>
                        {link.label}
                      </div>
                      <div style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--text-primary)" }}>
                        {link.value}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(30px)",
              transition: "all 0.6s ease 0.2s",
            }}
          >
            <div
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "1.25rem",
                padding: "2rem",
              }}
            >
              {submitted ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    padding: "3rem 0",
                    textAlign: "center",
                  }}
                >
                  <CheckCircle size={52} style={{ color: "#22c55e" }} />
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                        Name <span style={{ color: "var(--accent)" }}>*</span>
                      </label>
                      <input
                        id="contact-name"
                        {...register("name", { required: "Name is required" })}
                        placeholder="John Doe"
                        style={{
                          ...inputStyle,
                          borderColor: errors.name ? "#ef4444" : "var(--border)",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent)";
                          e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-glow)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = errors.name ? "#ef4444" : "var(--border)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                      {errors.name && (
                        <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.3rem" }}>{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                        Email <span style={{ color: "var(--accent)" }}>*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                        })}
                        placeholder="john@example.com"
                        style={{
                          ...inputStyle,
                          borderColor: errors.email ? "#ef4444" : "var(--border)",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent)";
                          e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-glow)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = errors.email ? "#ef4444" : "var(--border)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                      {errors.email && (
                        <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.3rem" }}>{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      {...register("subject")}
                      placeholder="Project collaboration, job opportunity..."
                      style={inputStyle}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "var(--accent)";
                        e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-glow)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                      Message <span style={{ color: "var(--accent)" }}>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      {...register("message", { required: "Message is required", minLength: { value: 10, message: "Message too short" } })}
                      placeholder="Tell me about your project or opportunity..."
                      rows={5}
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        borderColor: errors.message ? "#ef4444" : "var(--border)",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "var(--accent)";
                        e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-glow)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = errors.message ? "#ef4444" : "var(--border)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    {errors.message && (
                      <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.3rem" }}>{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={sending}
                    className="btn-primary"
                    style={{ justifyContent: "center", opacity: sending ? 0.7 : 1, cursor: sending ? "wait" : "pointer" }}
                  >
                    {sending ? (
                      <>
                        <span
                          style={{
                            width: "16px",
                            height: "16px",
                            border: "2px solid rgba(0,0,0,0.3)",
                            borderTopColor: "#000",
                            borderRadius: "50%",
                            display: "inline-block",
                            animation: "spin 0.7s linear infinite",
                          }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
