"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "01<>/{}[]=+*#%&";

export default function ScrambleReveal({
  text,
  delay = 0,
  duration = 900,
  className = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame;
    let start;
    const chars = [...text];
    const step = duration / chars.length;

    const tick = (now) => {
      start ??= now;
      const elapsed = now - start - delay;
      if (elapsed < 0) {
        el.textContent = chars.map(() => " ").join("");
        frame = requestAnimationFrame(tick);
        return;
      }
      let done = true;
      el.textContent = chars
        .map((c, i) => {
          if (elapsed >= (i + 1) * step) return c;
          done = false;
          return elapsed >= i * step * 0.5
            ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            : " ";
        })
        .join("");
      if (done) {
        el.textContent = text;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      el.textContent = text;
    };
  }, [text, delay, duration]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
