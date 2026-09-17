"use client";
import { useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
export default function Navbar({theme, toggleTheme}: {theme: "dark" | "light"; toggleTheme: () => void}) {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><nav className="main-nav" aria-label="Main navigation">
    <a className="wordmark" href="#hero" onClick={() => setOpen(false)}>bebin<span>®</span><small>DEVELOPER & MAKER</small></a>
    <div id="primary-navigation" className={`nav-links ${open ? "is-open" : ""}`}>{[["Work","projects"],["About","about"],["Skills","skills"],["Experience","experience"],["Contact","contact"]].map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}</div>
    <div className="nav-actions"><button onClick={toggleTheme} className="theme-control" aria-label="Toggle theme">{theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}</button><a className="nav-resume" href={personalInfo.resumeUrl} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={16}/></a><button className="menu-control" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div>
  </nav></header>;
}
