"use client";

import { useRef, useCallback } from "react";

const GlareHover = ({
  borderRadius = "0.375rem",
  borderColor = "transparent",
  children,
  glareColor = "rgba(0, 122, 255, 0.06)",
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  className = "",
  style = {},
}) => {
  const glareRef = useRef(null);

  const sweepOn = useCallback(() => {
    const el = glareRef.current;
    if (!el) return;
    el.style.backgroundPosition = "100% 100%";
  }, []);

  const sweepOff = useCallback(() => {
    const el = glareRef.current;
    if (!el) return;
    el.style.backgroundPosition = "-100% -100%";
  }, []);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius, border: `1px solid ${borderColor}`, ...style }}
      onMouseEnter={sweepOn}
      onMouseLeave={sweepOff}
    >
      {children}
      <div
        ref={glareRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(${glareAngle}deg, transparent 0%, transparent 60%, ${glareColor} 70%, transparent 100%)`,
          backgroundSize: `${glareSize}% ${glareSize}%`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "-100% -100%",
          transition: `background-position ${transitionDuration}ms ease`,
        }}
      />
    </div>
  );
};

export default GlareHover;
