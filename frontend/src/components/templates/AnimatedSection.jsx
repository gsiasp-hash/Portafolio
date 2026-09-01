"use client";

import { useRef, useEffect } from "react";
import FadeContent from "../rb/FadeContent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedSection({ children, className = "" }) {
  return (
    <FadeContent
      className={className}
      duration={800}
      ease="power2.out"
      threshold={0.15}
      blur
    >
      {children}
    </FadeContent>
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
    if (!el) return;

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
    };
  }, [distance, stagger, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
