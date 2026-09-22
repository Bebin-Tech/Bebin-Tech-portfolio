"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import { Play } from "lucide-react";
import { createIntroSound } from "@/lib/introSound";
import type { ReactNode } from "react";

export default function CinematicExperience({ children }: { children: ReactNode }) {
  const [intro, setIntro] = useState(false);
  const [sequence, setSequence] = useState(0);

  const audio = useRef<ReturnType<typeof createIntroSound> | null>(null);
  const soundPlayed = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });

  const stopSound = useCallback(() => {
    audio.current?.stop();
    audio.current = null;

  }, []);
  const dismiss = useCallback(() => {
    setIntro(false);
    if (timer.current) clearTimeout(timer.current);
  }, []);
  const start = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    stopSound();
    try { audio.current = createIntroSound(); void audio.current.resume().then(playing => { if (playing) soundPlayed.current = true; }); } catch { /* Audio is optional. */ }
    setSequence(value => value + 1);
    setIntro(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(dismiss, 3800);
  }, [dismiss, stopSound]);

  useEffect(() => {
    // Deep links go straight to their destination; a fresh home visit gets the intro.
    const kickoff = setTimeout(() => { if (!window.location.hash) start(); }, 0);
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { soundPlayed.current = true; dismiss(); stopSound(); } };
    window.addEventListener("keydown", escape);
    return () => {
      clearTimeout(kickoff);
      if (timer.current) clearTimeout(timer.current);
      window.removeEventListener("keydown", escape);
      audio.current?.stop();
    };
  }, [start, dismiss, stopSound]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (preference.matches) return;
        const cards = entry.target.querySelectorAll(".repository-card, .professional-copy > *, .professional-profile, .professional-stack");
        const targets = cards.length ? Array.from(cards) : [entry.target];
        targets.forEach((target, index) => {
          animations.push(target.animate([
            { opacity: 0, translate: "0 24px" },
            { opacity: 1, translate: "0 0" },
          ], { duration: 850, delay: Math.min(index * 85, 500), easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" }));
        });
      });
    }, { threshold: 0.06 });
    document.querySelectorAll("main section[id]").forEach(section => observer.observe(section));
    const reduce = () => {
      if (preference.matches) { animations.forEach(animation => animation.cancel()); dismiss(); stopSound(); }
    };
    preference.addEventListener("change", reduce);
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); preference.removeEventListener("change", reduce); };
  }, [dismiss, stopSound]);

  useEffect(() => {
    // Autoplay may stay suspended beyond the visual intro. Keep the first
    // gesture eligible, and let the audio finish on its own playback clock.
    const resume = (event: Event) => {
      if (event instanceof KeyboardEvent && event.key === "Escape") return;
      if (soundPlayed.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!audio.current) return;
      soundPlayed.current = true;
      void audio.current.resume().then(playing => { soundPlayed.current = playing; });
    };
    window.addEventListener("pointerdown", resume);
    window.addEventListener("keydown", resume);
    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
  }, []);
  return <MotionConfig reducedMotion="user">
    <motion.div className="reading-progress" style={{ scaleX: progress }} aria-hidden="true" />
    <div inert={intro}>{children}
    <button className="intro-replay" onClick={start} aria-label="Replay cinematic intro"><Play size={13} /> Replay intro</button></div>
    {intro && <div className="cinematic-intro" key={sequence}>
      <div className="celestial-scene" aria-hidden="true">
        <div className="celestial-aura" /><div className="celestial-ring" />
        <div className="celestial-horizon" />
        {Array.from({ length: 24 }, (_, i) => <i className="celestial-star" key={i} style={{ left: `${(i * 37 + 11) % 100}%`, top: `${(i * 23 + 7) % 100}%`, animationDelay: `${i * 0.055}s` }} />)}
      </div>
      <div className="cinematic-title"><h2><button type="button" onClick={start} style={{ font: "inherit", color: "inherit", letterSpacing: "inherit", background: "none", border: 0, padding: 0, cursor: "pointer" }}>Bebin Tech</button></h2></div>
    </div>}
  </MotionConfig>;
}


