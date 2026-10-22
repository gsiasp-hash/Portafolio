"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Button from "../atoms/Button";
import Chip from "../atoms/Chip";
import SpotlightCard from "../rb/SpotlightCard";

import es from "../../i18n/es";

const CYCLE_MS = 1800;

export default function ProjectCard({
  lang = "es",
  t = es.projects,
  slug,
  nombre,
  descripcion,
  imagen,
  screenshot,
  tecnologias,
  demoUrl,
  repoUrl,
  images,
  featured = false,
}) {
  const reduce = useReducedMotion();
  const shots =
    images && images.length > 0
      ? images
      : [{ src: screenshot || imagen, alt: `${t.screenshotAlt} ${nombre}` }];
  const total = shots.length;
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);

  const px = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const py = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const tx = useTransform(px, (v) => v * 10);
  const ty = useTransform(py, (v) => v * 6);
  const rotY = useTransform(px, (v) => v * 2);
  const rotX = useTransform(py, (v) => v * -2);

  useEffect(() => {
    if (!active || total < 2 || reduce) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % total), CYCLE_MS);
    return () => clearTimeout(id);
  }, [active, index, total, reduce]);

  const running = (i) => active && i === index && total > 1 && !reduce;
  const filled = (i) => (active ? (i <= index ? 1 : 0) : i === 0 ? 1 : 0);

  const start = () => setActive(true);
  const stop = () => {
    setActive(false);
    setIndex(0);
    px.set(0);
    py.set(0);
  };

  const handleMove = (e) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    py.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  return (
    <SpotlightCard
      className="group border border-hairline rounded-none overflow-hidden flex flex-col bg-surface-card/60 hover:border-accent focus-within:border-accent transition-colors duration-300 h-full"
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) stop();
      }}
    >
      <Link
        href={`/${lang}/proyectos/${slug}`}
        aria-label={`${nombre} — ${t.viewDetail}`}
        className="block overflow-hidden relative aspect-[1568/736] bg-surface-card [perspective:900px] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
        onMouseMove={handleMove}
      >
        <motion.div
          className="absolute inset-0"
          style={
            reduce
              ? undefined
              : { x: tx, y: ty, rotateX: rotX, rotateY: rotY, scale: 1.06 }
          }
        >
          {shots.map((shot, i) => (
            <img
              key={shot.src}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              alt={i === index ? shot.alt : ""}
              src={shot.src}
              loading="lazy"
            />
          ))}
        </motion.div>
        {total > 1 && (
          <div
            aria-hidden="true"
            className="absolute left-3 right-3 bottom-3 flex gap-1.5"
          >
            {shots.map((shot, i) => (
              <span
                key={shot.src}
                className="relative h-0.5 grow bg-ink/25 overflow-hidden"
              >
                <motion.span
                  key={running(i) ? `run-${index}` : "static"}
                  className="absolute inset-0 bg-accent origin-left"
                  initial={{ scaleX: running(i) ? 0 : filled(i) }}
                  animate={{ scaleX: running(i) ? 1 : filled(i) }}
                  transition={
                    running(i) && !reduce
                      ? { duration: CYCLE_MS / 1000, ease: "linear" }
                      : { duration: 0.2 }
                  }
                />
              </span>
            ))}
          </div>
        )}
      </Link>
      <div className={`flex flex-col gap-4 grow ${featured ? "p-6 lg:p-8" : "p-6"}`}>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-accent">
            <span className="group-hover:hidden group-focus-within:hidden">[+]</span>
            <span className="hidden group-hover:inline group-focus-within:inline">
              [→]
            </span>
          </span>
          <h3 className={`font-medium text-ink ${featured ? "text-2xl" : "text-xl"}`}>
            <Link
              href={`/${lang}/proyectos/${slug}`}
              className="hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {nombre}
            </Link>
          </h3>
          {featured && <span className="text-xs text-mute ml-auto">[{t.featured}]</span>}
        </div>
        <p className="text-sm text-body grow leading-relaxed">{descripcion}</p>
        <div className="flex flex-wrap gap-2">
          {tecnologias.map((tech) => (
            <motion.span
              key={tech}
              className="inline-flex"
              whileHover={reduce ? undefined : { y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Chip className="px-2 py-1 hover:bg-accent/5">{tech}</Chip>
            </motion.span>
          ))}
        </div>
        <div className="flex gap-3 pt-2 border-t border-hairline">
          {demoUrl && (
            <motion.div
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              <Button size="sm" href={demoUrl} target="_blank" rel="noreferrer">
                {t.viewDemo}
              </Button>
            </motion.div>
          )}
          {repoUrl && (
            <motion.div
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              <Button
                size="sm"
                variant="secondary"
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
              >
                {t.repository}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
