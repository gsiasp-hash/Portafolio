"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function Timeline({ title, steps }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  return (
    <div ref={ref} className="mt-16">
      <h3 className="text-xs font-bold text-ink uppercase tracking-wider mb-8">
        [~] {title}
      </h3>
      <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
        <span
          aria-hidden="true"
          className="absolute bg-hairline left-[5px] top-2 bottom-2 w-px md:left-0 md:right-0 md:top-[5px] md:bottom-auto md:h-px md:w-auto"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: reduced ? 1 : fill }}
          className="absolute bg-accent origin-top left-[5px] top-2 bottom-2 w-px md:hidden"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleX: reduced ? 1 : fill }}
          className="absolute bg-accent origin-left hidden md:block left-0 right-0 top-[5px] h-px"
        />
        {steps.map((step, i) => (
          <motion.li
            key={step.title}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            className="relative pl-7 md:pl-0 md:pt-8 group"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0.5 md:top-0 block w-[11px] h-[11px] bg-canvas border border-accent transition-colors duration-300 group-hover:bg-accent"
            />
            <p className="text-[11px] text-accent mb-1">[0{i + 1}]</p>
            <p className="text-sm font-medium text-ink mb-1">{step.title}</p>
            <p className="text-xs text-mute leading-relaxed">{step.description}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
