"use client";

import { useEffect, useState } from "react";

export default function CountUp({ to, suffix = "", duration = 1400, delay = 0 }) {
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame;
    const reset = setTimeout(() => setValue(0), 0);
    const timer = setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(reset);
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [to, duration, delay]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}
