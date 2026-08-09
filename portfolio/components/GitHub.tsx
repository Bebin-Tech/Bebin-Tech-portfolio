"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { ExternalLink, GitFork, Star, Users, BookOpen, Clock } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { githubData, personalInfo } from "@/data/portfolio";

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

type GitHubProfile = {
  login: string;
  html_url: string;
  public_repos: number;
  followers: number;
};

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string | null;
  archived: boolean;
  fork: boolean;
};

type GitHubSnapshot = {
  profile: GitHubProfile;
  repos: GitHubRepo[];
};

const languageColors: Record<string, string> = {
  Dart: "#00b4ab",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  TypeScript: "#3178c6",
  HTML: "#e34f26",
  CSS: "#1572b6",
  Java: "#b07219",
  PHP: "#777bb4",
  Shell: "#89e051",
};

function getGitHubUsername() {
  try {
    const url = new URL(personalInfo.github);
    const [username] = url.pathname.split("/").filter(Boolean);
    return username || githubData.username;
  } catch {
    return githubData.username;
  }
}

function formatUpdatedDate(value: string | null) {
  if (!value) return "No recent pushes";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function getRepoScore(repo: GitHubRepo) {
  return repo.stargazers_count * 2 + repo.forks_count + (repo.fork ? 0 : 1);
}

export default function GitHub() {
  const { ref, inView } = useInView(0.1);
  const username = getGitHubUsername();
  const [snapshot, setSnapshot] = useState<GitHubSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGitHub() {
      try {
        setLoading(true);
        setError(null);

        const [profileResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github+json" },
          }),
          fetch(`https://api.github.com/users/${username}/repos?type=owner&sort=updated&per_page=100`, {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github+json" },
          }),
        ]);

        if (!profileResponse.ok || !reposResponse.ok) {
          throw new Error("GitHub profile unavailable");
        }

        const profile = (await profileResponse.json()) as GitHubProfile;
        const repos = (await reposResponse.json()) as GitHubRepo[];
        setSnapshot({ profile, repos: repos.filter((repo) => !repo.archived) });
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError("GitHub activity is unavailable right now.");
      } finally {
        setLoading(false);
      }
    }

    loadGitHub();
    return () => controller.abort();
  }, [username]);

  const repos = useMemo(() => snapshot?.repos ?? [], [snapshot]);
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const visibleRepos = useMemo(
    () =>
      [...repos]
        .sort((a, b) => {
          const scoreDiff = getRepoScore(b) - getRepoScore(a);
          if (scoreDiff !== 0) return scoreDiff;
          return new Date(b.pushed_at ?? 0).getTime() - new Date(a.pushed_at ?? 0).getTime();
        }),
    [repos]
  );

  const stats = [
    { icon: <BookOpen size={18} />, value: snapshot?.profile.public_repos ?? 0, label: "Public Repos" },
    { icon: <Star size={18} />, value: totalStars, label: "Stars" },
    { icon: <GitFork size={18} />, value: totalForks, label: "Forks" },
    { icon: <Users size={18} />, value: snapshot?.profile.followers ?? 0, label: "Followers" },
  ];

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
            Public repositories, stars, forks, and profile stats from GitHub.
          </p>
        </div>

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
          {stats.map((stat) => (
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
                {loading ? "..." : stat.value.toLocaleString()}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div
          className="card"
          style={{
            borderRadius: "1rem",
            padding: "1.75rem",
            marginBottom: "2.5rem",
            opacity: inView ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                Public Repository Snapshot
              </h3>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                {loading ? "Loading GitHub profile..." : `${visibleRepos.length} repositories shown from @${snapshot?.profile.login ?? username}`}
              </p>
            </div>
            <a
              href={snapshot?.profile.html_url ?? personalInfo.github}
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
              @{snapshot?.profile.login ?? username}
              <ExternalLink size={12} />
            </a>
          </div>

          {error ? (
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{error}</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1rem",
              }}
            >
              {(loading ? Array.from({ length: 3 }) : visibleRepos).map((repo, index) => {
                if (loading) {
                  return (
                    <div
                      key={index}
                      className="glass"
                      style={{
                        borderRadius: "0.75rem",
                        minHeight: "150px",
                        border: "1px solid var(--border)",
                      }}
                    />
                  );
                }

                const typedRepo = repo as GitHubRepo;
                const language = typedRepo.language ?? "Code";
                const languageColor = languageColors[language] ?? "var(--accent)";

                return (
                  <a
                    key={typedRepo.id}
                    href={typedRepo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", display: "block" }}
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
                          {typedRepo.name}
                        </h4>
                      </div>
                      <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
                        {typedRepo.description ?? "Public GitHub repository"}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem" }}>
                          <span
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              background: languageColor,
                              display: "inline-block",
                            }}
                          />
                          <span style={{ color: "var(--text-secondary)" }}>{language}</span>
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "var(--text-muted)", fontSize: "0.75rem" }}>
                          <Star size={12} />
                          {typedRepo.stargazers_count}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "var(--text-muted)", fontSize: "0.75rem" }}>
                          <GitFork size={12} />
                          {typedRepo.forks_count}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "var(--text-muted)", fontSize: "0.75rem" }}>
                          <Clock size={12} />
                          {formatUpdatedDate(typedRepo.pushed_at)}
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
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
