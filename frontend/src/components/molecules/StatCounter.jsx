"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

export default function StatCounter({ value, suffix = "", label, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const count = useMotionValue(value);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView || reduced) return;
    count.set(0);
    const controls = animate(count, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, reduced, value, count]);

  return (
    <div
      ref={ref}
      className={`group p-5 border-hairline transition-colors duration-300 hover:bg-surface-card/60 ${className}`}
    >
      <p
        className="text-3xl sm:text-4xl font-bold text-ink tabular-nums leading-none"
        aria-label={`${value}${suffix}`}
      >
        <span aria-hidden="true">
          <motion.span>{rounded}</motion.span>
          <span className="text-accent">{suffix}</span>
        </span>
      </p>
      <p className="mt-3 text-xs text-mute transition-colors duration-300 group-hover:text-ink">
        {label}
      </p>
    </div>
  );
}
