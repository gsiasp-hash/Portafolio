"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ProjectCard from "./ProjectCard";

import es from "../../i18n/es";

const SPANS = { 1: "", 2: "lg:col-span-2", 3: "lg:col-span-3" };

export default function ProjectsGrid({ lang = "es", t = es.projects, items }) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState(null);

  const techs = useMemo(() => {
    const count = new Map();
    items.forEach((p) =>
      p.tecnologias.forEach((tech) => count.set(tech, (count.get(tech) ?? 0) + 1))
    );
    return [...count].filter(([, n]) => n > 1).map(([tech]) => tech);
  }, [items]);

  const visible = filter ? items.filter((p) => p.tecnologias.includes(filter)) : items;
  const used = visible.length + 1;
  const extra = (3 - (used % 3)) % 3;

  const spanFor = (i) => {
    const base = i === 0 ? 2 : 1;
    return SPANS[Math.min(base + (i === visible.length - 1 ? extra : 0), 3)];
  };

  const pill = (active) =>
    `px-3 py-1.5 text-xs rounded-sm border cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
      active
        ? "border-accent text-accent bg-accent/10"
        : "border-hairline text-mute hover:text-ink hover:border-hairline-strong"
    }`;

  return (
    <>
      <div role="group" aria-label={t.filterLabel} className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          aria-pressed={filter === null}
          onClick={() => setFilter(null)}
          className={pill(filter === null)}
        >
          {t.filterAll} ({items.length})
        </button>
        {techs.map((tech) => (
          <button
            key={tech}
            type="button"
            aria-pressed={filter === tech}
            onClick={() => setFilter(filter === tech ? null : tech)}
            className={pill(filter === tech)}
          >
            {tech}
          </button>
        ))}
      </div>
      <motion.div
        layout={!reduce}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((proyecto, i) => (
            <motion.div
              key={proyecto.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`${i === 0 ? "md:col-span-2" : ""} ${spanFor(i)}`}
            >
              <ProjectCard lang={lang} t={t} featured={i === 0} {...proyecto} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
