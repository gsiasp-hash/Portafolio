"use client";

import { useEffect, useState } from "react";
import Particles from "./Particles";

const LIGHT = ["#007aff", "#0056b3", "#4da6ff"];
const DARK = ["#007aff", "#4da6ff", "#80c0ff", "#b3d4ff"];

export default function ThemedParticles() {
  const [cfg, setCfg] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    const compute = () => {
      setCfg({
        dark: root.classList.contains("dark"),
        mobile: window.matchMedia("(max-width: 767px)").matches,
        reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      });
    };
    compute();
    const mo = new MutationObserver(compute);
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", compute);
    return () => {
      mo.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  if (!cfg) return null;

  const count = cfg.mobile ? 120 : cfg.dark ? 360 : 220;

  return (
    <Particles
      particleCount={count}
      particleColors={cfg.dark ? DARK : LIGHT}
      particleBaseSize={cfg.dark ? 110 : 90}
      speed={cfg.reduced ? 0 : 0.12}
      disableRotation={cfg.reduced}
      moveParticlesOnHover={!cfg.mobile && !cfg.reduced}
      particleHoverFactor={1.5}
      scrollParallax={!cfg.reduced}
      pixelRatio={cfg.mobile ? 1 : 1.5}
    />
  );
}
