"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Lightbox from "./Lightbox";

import es from "../../i18n/es";

const SWIPE = 60;

export default function Gallery({ images, t = es.projects }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dragged = useRef(false);
  const reduce = useReducedMotion();
  const total = images.length;
  const multi = total > 1;

  const go = (next) => setIndex(Math.min(Math.max(next, 0), total - 1));

  const handleKeyDown = (e) => {
    if (!multi || open) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    }
  };

  const handleDragEnd = (_, info) => {
    dragged.current = true;
    setTimeout(() => {
      dragged.current = false;
    }, 0);
    if (info.offset.x < -SWIPE) go(index + 1);
    else if (info.offset.x > SWIPE) go(index - 1);
  };

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 border border-hairline-strong rounded-sm px-3 py-2 text-sm bg-canvas text-ink hover:border-accent hover:text-accent transition-colors cursor-pointer disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t.galleryLabel}
      onKeyDown={handleKeyDown}
      className="flex flex-col gap-4"
    >
      <div className="relative border border-hairline overflow-hidden bg-surface-card/60 aspect-[1568/736]">
        <motion.div
          className="flex h-full touch-pan-y"
          animate={{ x: `-${index * 100}%` }}
          transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          drag={multi ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
        >
          {images.map((img, i) => (
            <div
              key={img.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} ${t.shotOf} ${total}`}
              aria-hidden={i !== index}
              className="w-full h-full shrink-0"
            >
              <button
                type="button"
                tabIndex={i === index ? 0 : -1}
                aria-label={t.openLightbox}
                onClick={() => {
                  if (!dragged.current) setOpen(true);
                }}
                className="block w-full h-full cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  draggable={false}
                  className="w-full h-full object-cover object-top select-none"
                />
              </button>
            </div>
          ))}
        </motion.div>
        {multi && (
          <>
            <button
              type="button"
              aria-label={t.prevShot}
              disabled={index === 0}
              onClick={() => go(index - 1)}
              className={`${arrowClass} left-3`}
            >
              &larr;
            </button>
            <button
              type="button"
              aria-label={t.nextShot}
              disabled={index === total - 1}
              onClick={() => go(index + 1)}
              className={`${arrowClass} right-3`}
            >
              &rarr;
            </button>
          </>
        )}
      </div>

      <div className="flex items-start justify-between gap-4">
        <p className="text-sm text-body leading-relaxed min-h-10" aria-live="polite">
          {images[index].caption}
        </p>
        {multi && (
          <span className="text-xs text-mute shrink-0 pt-0.5">
            {index + 1} {t.shotOf} {total}
          </span>
        )}
      </div>

      {multi && (
        <div
          role="group"
          aria-label={t.thumbnails}
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`${t.goToShot} ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
              className={`relative aspect-[1568/736] overflow-hidden border cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                i === index
                  ? "border-accent"
                  : "border-hairline opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img.src}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}

      {open && (
        <Lightbox
          images={images}
          index={index}
          onIndexChange={setIndex}
          onClose={() => setOpen(false)}
          t={t}
        />
      )}
    </div>
  );
}
