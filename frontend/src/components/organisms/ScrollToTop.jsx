"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-16 right-4 sm:right-6 z-50 bg-ink text-canvas border border-hairline-strong w-10 h-10 rounded-sm flex items-center justify-center cursor-pointer hover:bg-ink-deep transition-colors"
          aria-label="Volver arriba"
        >
          <span className="text-lg font-bold leading-none">↑</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
