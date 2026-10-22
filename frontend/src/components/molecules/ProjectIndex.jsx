"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CursorPreview from "./CursorPreview";
import ProjectIndexRow from "./ProjectIndexRow";
import es from "../../i18n/es";

export default function ProjectIndex({ lang = "es", t = es.projects, items }) {
  const [touch, setTouch] = useState(true);
  const [active, setActive] = useState(null);
  const [point, setPoint] = useState(null);
  const [mode, setMode] = useState("follow");
  const [open, setOpen] = useState(null);

  const anchorEl = useRef(null);

  const groups = useMemo(
    () =>
      (items ?? []).map((item) => ({
        slug: item.slug,
        label: item.nombre,
        shots: item.images?.length
          ? item.images
          : [{ src: item.screenshot, alt: item.nombre }],
      })),
    [items]
  );

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      setTouch(!mq.matches);
      setActive(null);
      setPoint(null);
    };
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  const onActivate = (slug) => {
    setMode("follow");
    setActive(slug);
  };

  const onDeactivate = (slug) => {
    setActive((a) => (a === slug ? null : a));
    setPoint(null);
  };

  const measure = () => {
    const el = anchorEl.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPoint({ x: rect.right - 460, y: rect.top + rect.height / 2 });
  };

  useEffect(() => {
    if (mode !== "anchor" || !active) return undefined;
    window.addEventListener("scroll", measure, { passive: true });
    return () => window.removeEventListener("scroll", measure);
  }, [mode, active]);

  const onAnchor = (slug, el) => {
    try {
      if (!el.matches(":focus-visible")) return;
    } catch {
      void 0;
    }
    anchorEl.current = el;
    setMode("anchor");
    setActive(slug);
    measure();
    requestAnimationFrame(measure);
  };

  const onMove = (e) => {
    if (touch || e.pointerType !== "mouse") return;
    setMode("follow");
    setPoint({ x: e.clientX, y: e.clientY });
  };

  if (!items?.length) return null;

  return (
    <div className="mt-24">
      <div className="flex items-baseline justify-between gap-4 border-b border-hairline-strong pb-3">
        <h3 className="text-sm font-bold text-ink whitespace-nowrap">
          [+] {t.moreProjects}
        </h3>
        <p className="text-xs text-mute text-right">
          {touch ? t.indexHintTouch : t.indexHint}
        </p>
      </div>
      <ul aria-label={t.indexListLabel} onPointerMove={onMove}>
        {items.map((item, i) => (
          <ProjectIndexRow
            key={item.slug}
            lang={lang}
            t={t}
            item={item}
            position={i}
            touch={touch}
            active={active === item.slug}
            dimmed={!touch && active !== null && active !== item.slug}
            open={open === item.slug}
            onOpen={(slug) => setOpen((o) => (o === slug ? null : slug))}
            onActivate={onActivate}
            onDeactivate={onDeactivate}
            onAnchor={onAnchor}
          />
        ))}
      </ul>
      {!touch && (
        <CursorPreview groups={groups} activeSlug={active} point={point} mode={mode} />
      )}
    </div>
  );
}
