"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

export default function RevealText({ text, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });
  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      <p className="sr-only">{text}</p>
      <p aria-hidden="true">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = Math.min(1, start + 1.5 / words.length);
          return reduced ? (
            <span key={i}>{word} </span>
          ) : (
            <span key={i}>
              <Word progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>{" "}
            </span>
          );
        })}
      </p>
    </div>
  );
}
