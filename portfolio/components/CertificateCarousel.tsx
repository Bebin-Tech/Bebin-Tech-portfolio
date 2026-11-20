"use client";

import { Children, Fragment, useEffect, useRef, useState, type ReactNode } from "react";

export default function CertificateCarousel({
  children,
  heading = "Certificate Gallery",
  trackId = "certificate-track",
  shuffle = true,
}: {
  children: ReactNode;
  heading?: string | null;
  trackId?: string;
  shuffle?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const cards = Children.toArray(children);
  const [order, setOrder] = useState<number[] | null>(null);
  const cardCount = cards.length;

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const shuffled = Array.from({ length: cardCount }, (_, index) => index);
      for (let index = shuffle ? shuffled.length - 1 : 0; index > 0; index--) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
      }
      setOrder(shuffled);
    });
    return () => cancelAnimationFrame(frame);
  }, [cardCount, shuffle]);

  useEffect(() => {
    const row = track.current;
    if (!row || focused || !order || cardCount < 2) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previousTime = 0;
    let position = row.scrollLeft;
    let visible = false;
    let loopWidth = 0;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(row);
    const resizeObserver = new ResizeObserver(() => {
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      loopWidth = (row.scrollWidth + gap) / 2;
      position = row.scrollLeft;
    });
    resizeObserver.observe(row);

    const animate = (time: number) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 50) : 0;
      previousTime = time;
      if (visible && !document.hidden && !motionPreference.matches && loopWidth > 0) {
        // Keep fractional pixels so motion stays consistent across refresh rates.
        if (Math.abs(row.scrollLeft - position) > 2) position = row.scrollLeft;
        position = (position + elapsed * 0.035) % loopWidth;
        row.scrollLeft = position;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [focused, order, cardCount]);

  const orderedCards = order?.length === cardCount ? order.map(index => cards[index]) : cards;

  return <>
    {heading && <h3 className="certificate-heading">{heading}</h3>}
    <div id={trackId} ref={track} className="certificate-track"
      onFocus={() => setFocused(true)} onBlur={event => setFocused(event.currentTarget.contains(event.relatedTarget))}>
      {orderedCards}
      {cardCount > 1 && orderedCards.map((card, index) => <Fragment key={`loop-${index}`}>{card}</Fragment>)}
    </div>
  </>;
}
