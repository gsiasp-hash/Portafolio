"use client";

import { useEffect, useRef } from "react";

export default function AudioBars({ label, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const mouse = { x: -1, active: 0, target: 0 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let accent = "#007aff";
    let faint = "#646262";
    let tick = 0;

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      accent = s.getPropertyValue("--color-accent").trim() || accent;
      faint = s.getPropertyValue("--color-hairline-strong").trim() || faint;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time) => {
      if (tick++ % 60 === 0) readColors();
      ctx.clearRect(0, 0, width, height);
      const gap = width < 640 ? 8 : 10;
      const n = Math.floor(width / gap);
      const t = time * 0.001;
      mouse.active += (mouse.target - mouse.active) * 0.08;
      ctx.lineWidth = 1;
      for (let i = 0; i < n; i++) {
        const x = i * gap + gap / 2;
        const u = i / n;
        const base =
          0.5 +
          0.25 * Math.sin(u * 9 + t * 1.3) +
          0.15 * Math.sin(u * 23 - t * 2.1) +
          0.1 * Math.sin(u * 51 + t * 3.7);
        const env = 0.25 + 0.75 * Math.sin(Math.PI * u) ** 0.6;
        let h = base * env * 0.55;
        let near = 0;
        if (mouse.x >= 0) {
          const d = (x - mouse.x) / 90;
          near = Math.exp(-d * d) * mouse.active;
          h += near * 0.6;
        }
        h = Math.max(0.04, Math.min(h, 1)) * height;
        ctx.strokeStyle = near > 0.15 ? accent : faint;
        ctx.globalAlpha = near > 0.15 ? 0.5 + near * 0.5 : 0.55;
        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(x, height - h);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time) => {
      frame = requestAnimationFrame(loop);
      if (visible) draw(time);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      const inside =
        e.clientY > r.top - 200 &&
        e.clientY < r.bottom + 120 &&
        e.clientX >= r.left &&
        e.clientX <= r.right;
      mouse.target = inside ? 1 : 0;
    };
    const onLeave = () => {
      mouse.target = 0;
    };

    readColors();
    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      draw(2000);
      return () => window.removeEventListener("resize", resize);
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);
    if (!coarse) {
      window.addEventListener("pointermove", onMove);
      document.addEventListener("pointerleave", onLeave);
    }
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      className={`block w-full h-24 sm:h-32 ${className}`}
    />
  );
}
