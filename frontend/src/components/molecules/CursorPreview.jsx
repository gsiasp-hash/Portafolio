"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

const WIDTH = 440;
const HEIGHT = 207;
const GAP = 28;
const MARGIN = 16;
const CYCLE = 1600;

function place(x, y, mode) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const top = Math.max(MARGIN, Math.min(y - HEIGHT / 2, vh - HEIGHT - MARGIN));
  if (mode === "anchor") {
    return { x: Math.max(MARGIN, Math.min(x, vw - WIDTH - MARGIN)), y: top };
  }
  const right = x + GAP + WIDTH <= vw - MARGIN;
  return { x: Math.max(MARGIN, right ? x + GAP : x - GAP - WIDTH), y: top };
}

export default function CursorPreview({ groups, activeSlug, point, mode = "follow" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const current = useRef(null);
  const [cycle, setCycle] = useState({ key: null, i: 0 });
  const activeGroup = groups.find((g) => g.slug === activeSlug);
  const visible = Boolean(activeGroup && point);
  const count = activeGroup?.shots.length ?? 0;
  const key = activeSlug;

  useEffect(() => {
    if (!visible || reduce || count < 2) return undefined;
    const id = setInterval(
      () => setCycle((c) => ({ key, i: ((c.key === key ? c.i : 0) + 1) % count })),
      CYCLE
    );
    return () => clearInterval(id);
  }, [key, visible, reduce, count]);

  const index = cycle.key === key ? cycle.i : 0;
  const x = point?.x;
  const y = point?.y;

  useEffect(() => {
    const el = ref.current;
    if (!el || x === undefined) return undefined;
    const target = place(x, y, mode);
    if (reduce || !current.current) {
      current.current = target;
      el.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      return undefined;
    }
    let raf;
    const tick = () => {
      const c = current.current;
      c.x += (target.x - c.x) * 0.16;
      c.y += (target.y - c.y) * 0.16;
      el.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
      if (Math.abs(target.x - c.x) > 0.3 || Math.abs(target.y - c.y) > 0.3) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [x, y, mode, reduce]);

  useEffect(() => {
    if (!visible) current.current = null;
  }, [visible]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-testid="cursor-preview"
      data-visible={visible}
      style={{ width: WIDTH, height: HEIGHT }}
      className="pointer-events-none fixed left-0 top-0 z-50 will-change-transform"
    >
      <div
        className={`relative h-full w-full overflow-hidden border border-hairline-strong bg-surface-card transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {groups.map((group) =>
          group.shots.map((shot, i) => (
            <Image
              key={shot.src}
              src={shot.src}
              alt={shot.alt ?? group.label ?? ""}
              width={WIDTH}
              height={HEIGHT}
              sizes="440px"
              loading="eager"
              className={`absolute inset-0 h-full w-full object-cover ${
                reduce ? "" : "transition-opacity duration-500"
              } ${group.slug === activeSlug && i === index ? "opacity-100" : "opacity-0"}`}
            />
          ))
        )}
      </div>
    </div>
  );
}
