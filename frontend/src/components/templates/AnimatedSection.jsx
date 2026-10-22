"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const variants = {
  fade: { opacity: 0, filter: "blur(10px)" },
  up: { opacity: 0, y: 56 },
  left: { opacity: 0, x: -64 },
  right: { opacity: 0, x: 64 },
  scale: { opacity: 0, scale: 0.94, filter: "blur(6px)" },
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function AnimatedSection({
  children,
  className = "",
  variant = "fade",
  duration = 0.9,
  start = "top 85%",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const from = variants[variant] ?? variants.fade;
    gsap.set(el, { ...from, visibility: "visible" });

    const tl = gsap.timeline({ paused: true });
    tl.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration,
      ease: "power3.out",
      clearProps: "transform,filter,opacity",
    });

    const st = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => tl.play(),
    });

    if (ScrollTrigger.isInViewport(el)) {
      tl.play();
    }

    return () => {
      st.kill();
      tl.kill();
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "all" });
    };
  }, [variant, duration, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function AnimatedSectionUp({
  children,
  className = "",
  distance = 48,
  stagger = 0.08,
  duration = 0.7,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const targets = [...el.children];

    gsap.set(targets, {
      y: distance,
      opacity: 0,
      visibility: "visible",
    });

    const tl = gsap.timeline({ paused: true });

    tl.to(targets, {
      y: 0,
      opacity: 1,
      duration,
      ease: "power3.out",
      stagger,
      clearProps: "transform,opacity",
    });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => tl.play(),
    });

    if (ScrollTrigger.isInViewport(el)) {
      tl.play();
    }

    return () => {
      st.kill();
      tl.kill();
      gsap.set(targets, { clearProps: "all" });
    };
  }, [distance, stagger, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
