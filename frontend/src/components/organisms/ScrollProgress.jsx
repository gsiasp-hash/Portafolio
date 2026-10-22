"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 32, mass: 0.4 });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-px z-50 pointer-events-none"
    >
      <motion.div className="h-full bg-accent origin-left" style={{ scaleX }} />
    </div>
  );
}
