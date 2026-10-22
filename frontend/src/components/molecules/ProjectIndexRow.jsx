"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Chip from "../atoms/Chip";
import es from "../../i18n/es";

const linkClass =
  "text-xs text-mute hover:text-accent transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const rowClass = "flex w-full items-baseline gap-3 sm:gap-5 py-5 text-left";
const focusClass =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function ExternalLinks({ t, demoUrl, repoUrl, className = "" }) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <a href={demoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
        ↗ {t.viewDemo}
        <span className="sr-only"> ({t.indexExternal})</span>
      </a>
      {repoUrl && (
        <a href={repoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          ↗ {t.code}
          <span className="sr-only"> ({t.indexExternal})</span>
        </a>
      )}
    </div>
  );
}

export default function ProjectIndexRow({
  lang = "es",
  t = es.projects,
  item,
  position,
  touch,
  active,
  dimmed,
  open,
  onOpen,
  onActivate,
  onDeactivate,
  onAnchor,
}) {
  const reduce = useReducedMotion();
  const { slug, nombre, descripcion, tecnologias, demoUrl, repoUrl, images, screenshot } =
    item;
  const detail = `/${lang}/proyectos/${slug}`;
  const number = String(position + 1).padStart(2, "0");
  const panelId = `indice-${slug}`;
  const first = images?.[0] ?? { src: screenshot, alt: nombre };
  const lit = active || open;

  const head = (
    <>
      <span className="text-sm text-mute tabular-nums">[{number}]</span>
      <span
        className={`min-w-0 text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight transition-all duration-300 ${
          lit ? "text-accent translate-x-3" : "text-ink"
        }`}
      >
        {nombre}
      </span>
      <span
        aria-hidden="true"
        className="hidden sm:block flex-1 self-end mb-2 border-b border-dotted border-hairline-strong/50"
      />
      <span className="hidden md:block text-xs text-mute whitespace-nowrap">
        {tecnologias.slice(0, 3).join(" · ")}
      </span>
      <span
        aria-hidden="true"
        className={`ml-auto sm:ml-0 text-xl transition-all duration-300 ${
          lit ? "text-accent translate-x-1" : "text-mute"
        }`}
      >
        {touch ? (open ? "[-]" : "[+]") : "→"}
      </span>
    </>
  );

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: reduce ? 0 : (position % 6) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onPointerEnter={(e) => !touch && e.pointerType === "mouse" && onActivate(slug)}
      onPointerLeave={(e) => !touch && e.pointerType === "mouse" && onDeactivate(slug)}
      className="relative border-b border-hairline"
    >
      <div
        className={`transition-opacity duration-300 ${dimmed ? "opacity-40" : "opacity-100"}`}
      >
        {touch ? (
          <>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={`${t.indexToggle} ${nombre}`}
              onClick={() => onOpen(slug)}
              className={`${rowClass} cursor-pointer ${focusClass}`}
            >
              {head}
            </button>
            <div
              id={panelId}
              inert={!open}
              className={`grid transition-[grid-template-rows] ${
                reduce ? "duration-0" : "duration-500"
              } ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col gap-4 pb-6">
                  <img
                    src={first.src}
                    alt={first.alt ?? nombre}
                    width={1568}
                    height={736}
                    loading="lazy"
                    className="w-full aspect-[1568/736] object-cover border border-hairline"
                  />
                  <p className="text-sm text-body">{descripcion}</p>
                  <ul className="flex flex-wrap gap-2">
                    {tecnologias.map((tech) => (
                      <li key={tech}>
                        <Chip className="inline-block px-2 py-1">{tech}</Chip>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-4">
                    <ExternalLinks t={t} demoUrl={demoUrl} repoUrl={repoUrl} />
                    <Link href={detail} className={`${linkClass} text-accent`}>
                      {t.viewDetail} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link
              href={detail}
              onFocus={(e) => onAnchor(slug, e.currentTarget)}
              onBlur={() => onDeactivate(slug)}
              className={`${rowClass} after:absolute after:inset-0 after:content-[''] ${focusClass}`}
            >
              {head}
            </Link>
            <ExternalLinks
              t={t}
              demoUrl={demoUrl}
              repoUrl={repoUrl}
              className="relative z-10 pb-4 pl-10 sm:pl-12"
            />
          </>
        )}
      </div>
    </motion.li>
  );
}
