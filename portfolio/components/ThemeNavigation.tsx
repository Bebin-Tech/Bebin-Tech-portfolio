"use client";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
export default function ThemeNavigation() {
  const [theme, setTheme] = useState<"dark" | "light" | "aurora">("dark");

  useEffect(() => {
    const timeout = setTimeout(() => {
      try { const saved = localStorage.getItem("portfolio-theme"); if (saved === "dark" || saved === "light" || saved === "aurora") setTheme(saved); } catch { /* Storage is optional. */ }
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("aurora", theme === "aurora");
    document.documentElement.style.colorScheme = theme === "light" ? "light" : "dark";
  }, [theme]);

  const changeTheme = (next: "dark" | "light" | "aurora") => {
    setTheme(next);
    try { localStorage.setItem("portfolio-theme", next); } catch { /* Theme works without storage. */ }
  };

  return <Navbar theme={theme} changeTheme={changeTheme} />;
}
