"use client";

import { useRef, useCallback } from "react";

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(0, 122, 255, 0.08)",
  ...props
}) {
  const divRef = useRef(null);
  const spotRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      const el = divRef.current;
      const spot = spotRef.current;
      if (!el || !spot) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      spot.style.background = `radial-gradient(circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`;
    },
    [spotlightColor]
  );

  const handleMouseLeave = useCallback(() => {
    const spot = spotRef.current;
    if (!spot) return;
    spot.style.opacity = "0";
  }, []);

  const handleMouseEnter = useCallback(() => {
    const spot = spotRef.current;
    if (!spot) return;
    spot.style.opacity = "1";
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <div
        ref={spotRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500"
        style={{ background: "transparent" }}
      />
      {children}
    </div>
  );
}
