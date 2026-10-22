"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";

import es from "../../i18n/es";
import Image from "next/image";

const MotionImage = motion.create(Image);

const FOCUSABLE = "button, [href], [tabindex]:not([tabindex='-1'])";

export default function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
  t = es.projects,
}) {
  const dialogRef = useRef(null);
  const reduce = useReducedMotion();
  const total = images.length;
  const current = images[index];

  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector("[data-close]")?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, []);

  const go = (delta) => onIndexChange((index + delta + total) % total);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowLeft" && total > 1) {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight" && total > 1) {
      e.preventDefault();
      go(1);
    } else if (e.key === "Tab") {
      const nodes = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!dialogRef.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const navClass =
    "border border-hairline-strong rounded-sm px-3 py-2 text-sm text-ink bg-canvas hover:border-accent hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer";

  return createPortal(
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t.lightboxLabel}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.2 }}
      className="fixed inset-0 z-[100] bg-canvas flex flex-col p-4 sm:p-8 text-ink"
    >
      <div className="flex items-center justify-between gap-4 pb-4">
        <span className="text-sm text-mute" aria-live="polite">
          {index + 1} {t.shotOf} {total}
        </span>
        <button type="button" data-close onClick={onClose} className={navClass}>
          [x] {t.closeLightbox}
        </button>
      </div>
      <div className="relative grow min-h-0 flex items-center justify-center">
        {total > 1 && (
          <button
            type="button"
            aria-label={t.prevShot}
            onClick={() => go(-1)}
            className={`${navClass} absolute left-0 z-10`}
          >
            &larr;
          </button>
        )}
        <MotionImage
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={1568}
          height={736}
          sizes="100vw"
          quality={85}
          initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          className="h-auto w-auto max-h-full max-w-full object-contain border border-hairline"
        />
        {total > 1 && (
          <button
            type="button"
            aria-label={t.nextShot}
            onClick={() => go(1)}
            className={`${navClass} absolute right-0 z-10`}
          >
            &rarr;
          </button>
        )}
      </div>
      {current.caption && (
        <p className="pt-4 text-sm text-body text-center">{current.caption}</p>
      )}
    </motion.div>,
    document.body
  );
}
