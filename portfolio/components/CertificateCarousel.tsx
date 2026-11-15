"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function CertificateCarousel({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [pointerInside, setPointerInside] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const row = track.current;
    if (!row || pointerInside || focused) return;

    const timer = window.setInterval(() => {
      if (document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const bounds = row.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
      const next = Array.from(row.children).find(card => card.getBoundingClientRect().left > bounds.left + 2);
      const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 2;
      const left = next && !atEnd ? row.scrollLeft + next.getBoundingClientRect().left - bounds.left : 0;
      row.scrollTo({ left, behavior: "smooth" });
    }, 4200);
    return () => window.clearInterval(timer);
  }, [pointerInside, focused]);

  return <>
    <h3 className="certificate-heading">Certificate Gallery</h3>
    <div id="certificate-track" ref={track} className="certificate-track"
      onPointerEnter={() => setPointerInside(true)} onPointerLeave={() => setPointerInside(false)}
      onFocus={() => setFocused(true)} onBlur={event => setFocused(event.currentTarget.contains(event.relatedTarget))}>
      {children}
    </div>
  </>;
}
