"use client";

import { useEffect, useRef, useState, useId } from "react";
import { Sun, Moon, Sparkles, ChevronDown, Check } from "lucide-react";

const themes = [
  { value: "light", label: "White", detail: "Clean & bright", Icon: Sun },
  { value: "dark", label: "Dark", detail: "Quiet & focused", Icon: Moon },
  { value: "aurora", label: "Aurora", detail: "Colorful & cosmic", Icon: Sparkles },
] as const;
type Theme = typeof themes[number]["value"];

export default function ThemePicker({ theme, onChange }: { theme: Theme; onChange: (theme: Theme) => void }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  const selected = themes.find(item => item.value === theme)!;
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  return <div className="theme-picker" ref={root}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    onKeyDown={event => { if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); } }}>
    <button ref={trigger} className="theme-picker-trigger" type="button" aria-expanded={open} aria-controls={id} aria-label={`Color theme: ${selected.label}`} onClick={() => setOpen(!open)}>
      <selected.Icon size={16} aria-hidden="true" /><span>{selected.label}</span><ChevronDown size={13} className={open ? "theme-chevron-open" : ""} aria-hidden="true" />
    </button>
    {open && <div id={id} className="theme-picker-panel" role="group" aria-label="Choose appearance">
      <p className="theme-picker-heading">APPEARANCE</p>
      {themes.map(({ value, label, detail, Icon }) => <button type="button" key={value} className={`theme-picker-option ${theme === value ? "is-selected" : ""}`} aria-pressed={theme === value} onClick={() => { onChange(value); setOpen(false); trigger.current?.focus(); }}>
        <span className={`theme-swatch theme-swatch-${value}`}><Icon size={18} aria-hidden="true" /></span>
        <span className="theme-option-copy"><strong>{label}</strong><small>{detail}</small></span>
        {theme === value && <Check size={16} className="theme-check" aria-hidden="true" />}
      </button>)}
    </div>}
  </div>;
}
