"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Button from "../atoms/Button";
import Chip from "../atoms/Chip";
import Lightbox from "./Lightbox";

import es from "../../i18n/es";
import Image from "next/image";

const SCREEN_PER_SHOT = 60;
const DESKTOP = "(min-width: 1024px)";

const pad = (n) => String(n).padStart(2, "0");

const hostOf = (url) => {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
};

const resolveImages = (item, t) => {
  if (item.images?.length) return item.images;
  const src = item.screenshot || item.imagen;
  return src ? [{ src, alt: `${t.screenshotAlt} ${item.nombre}`, caption: "" }] : [];
};

const isDesktop = () =>
  typeof window !== "undefined" && window.matchMedia?.(DESKTOP).matches === true;

function BrowserFrame({ url, children }) {
  return (
    <div className="border border-hairline-strong bg-surface-card">
      <div className="flex items-center gap-3 border-b border-hairline px-3 py-1.5 text-xs text-mute">
        <span aria-hidden="true" className="tracking-widest">
          [ ] [ ] [ ]
        </span>
        <span className="truncate border border-hairline px-2 py-0.5 rounded-sm grow">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

export default function CaseStudy({
  lang = "es",
  t = es.projects,
  item,
  number = 1,
  total = 1,
}) {
  const { slug, nombre, descripcion, tecnologias = [], demoUrl, repoUrl } = item;
  const images = resolveImages(item, t);
  const count = images.length;
  const multi = count > 1;
  const reduce = useReducedMotion();
  const articleRef = useRef(null);
  const trackRef = useRef(null);
  const revealed = useInView(articleRef, { once: true, amount: 0.15 });
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [14, -14]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!multi || !isDesktop()) return;
    setActive(Math.min(count - 1, Math.max(0, Math.floor(p * count))));
  });

  const goTo = (i) => {
    setActive(i);
    const el = trackRef.current;
    if (!el || !isDesktop()) return;
    const range = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + ((i + 0.5) / count) * range,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const show = reduce || revealed;
  const reveal = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: show ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  const current = images[active];
  const titleId = `case-${slug}`;
  const trackStyle = { "--case-h": `${100 + (count - 1) * SCREEN_PER_SHOT}vh` };

  return (
    <article
      ref={articleRef}
      aria-labelledby={titleId}
      data-case={slug}
      className="relative"
    >
      <div ref={trackRef} style={trackStyle} className="lg:h-(--case-h)">
        <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center lg:py-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 w-full items-center">
            <div className="lg:col-span-5 flex flex-col gap-5 min-w-0">
              <motion.p
                {...reveal(0)}
                className="flex items-baseline gap-4 text-sm text-mute"
              >
                <span
                  aria-hidden="true"
                  className="text-7xl sm:text-8xl lg:text-9xl font-bold leading-none tracking-tighter text-transparent"
                  style={{ WebkitTextStroke: "1px var(--color-ink)" }}
                >
                  [{pad(number)}]
                </span>
                <span>
                  {t.caseLabel} {pad(number)}/{pad(total)}
                </span>
              </motion.p>
              <motion.h3
                {...reveal(0.1)}
                id={titleId}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight"
              >
                {nombre}
              </motion.h3>
              <motion.p
                {...reveal(0.2)}
                className="text-body leading-relaxed max-w-prose"
              >
                {descripcion}
              </motion.p>
              <motion.ul
                {...reveal(0.3)}
                aria-label="stack"
                className="flex flex-wrap gap-2"
              >
                {tecnologias.map((tech) => (
                  <li key={tech}>
                    <Chip className="inline-block px-2 py-1">{tech}</Chip>
                  </li>
                ))}
              </motion.ul>
              <motion.div {...reveal(0.4)} className="flex flex-wrap gap-3 pt-2">
                <Button href={demoUrl} target="_blank" rel="noopener noreferrer" arrow>
                  {t.viewDemo}
                </Button>
                <Link
                  href={`/${lang}/proyectos/${slug}`}
                  className="inline-flex items-center justify-center gap-2 py-3 px-8 rounded-sm text-sm font-medium border border-hairline-strong text-mute hover:text-ink hover:border-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {t.viewDetail}
                </Link>
                {repoUrl && (
                  <Button
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                  >
                    {t.repository}
                  </Button>
                )}
              </motion.div>
              {multi && (
                <p className="hidden lg:block text-xs text-mute pt-4">
                  <span aria-hidden="true">↓ </span>
                  {t.caseHint}
                </p>
              )}
            </div>

            {current && (
              <motion.div
                {...reveal(0.25)}
                className="lg:col-span-7 flex flex-col gap-4 min-w-0"
              >
                <motion.div style={{ y: parallax }} className="hidden lg:block">
                  <BrowserFrame url={hostOf(demoUrl)}>
                    <button
                      type="button"
                      aria-label={t.openLightbox}
                      onClick={() => setOpen(true)}
                      className="relative block w-full aspect-[1568/736] overflow-hidden cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
                    >
                      {images.map((img, i) => (
                        <Image
                          key={img.src}
                          src={img.src}
                          alt={img.alt}
                          width={1568}
                          height={736}
                          sizes="(min-width: 1024px) 720px, 100vw"
                          loading={i === 0 ? "eager" : "lazy"}
                          draggable={false}
                          aria-hidden={i !== active}
                          className={`absolute inset-0 w-full h-full object-cover object-top select-none transition-[opacity,transform] duration-500 ease-out ${
                            i === active
                              ? "opacity-100 translate-x-0"
                              : i < active
                                ? "opacity-0 -translate-x-6"
                                : "opacity-0 translate-x-6"
                          }`}
                        />
                      ))}
                    </button>
                  </BrowserFrame>
                </motion.div>

                <div
                  className="lg:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6"
                  role="group"
                  aria-label={t.caseProgress}
                >
                  {images.map((img, i) => (
                    <figure
                      key={img.src}
                      className="snap-center shrink-0 w-[88%] sm:w-[70%] flex flex-col gap-2"
                    >
                      <BrowserFrame url={hostOf(demoUrl)}>
                        <button
                          type="button"
                          aria-label={t.openLightbox}
                          onClick={() => {
                            setActive(i);
                            setOpen(true);
                          }}
                          className="block w-full aspect-[1568/736] cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            width={1568}
                            height={736}
                            sizes="100vw"
                            loading={i === 0 ? "eager" : "lazy"}
                            draggable={false}
                            className="w-full h-full object-cover object-top"
                          />
                        </button>
                      </BrowserFrame>
                      <figcaption className="text-xs text-body leading-relaxed">
                        <span className="text-accent">
                          {pad(i + 1)}/{pad(count)}
                        </span>{" "}
                        {img.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>

                <div className="hidden lg:flex items-start justify-between gap-6">
                  <p className="text-sm text-body leading-relaxed min-h-10">
                    {current.caption}
                  </p>
                  {multi && (
                    <ol
                      aria-label={t.caseProgress}
                      className="flex items-center gap-2 shrink-0"
                    >
                      <li
                        aria-hidden="true"
                        className="text-sm font-medium text-accent mr-2"
                      >
                        {pad(active + 1)}/{pad(count)}
                      </li>
                      {images.map((img, i) => (
                        <li key={img.src}>
                          <button
                            type="button"
                            aria-label={`${t.goToShot} ${i + 1}`}
                            aria-current={i === active ? "true" : undefined}
                            onClick={() => goTo(i)}
                            className="group block py-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                          >
                            <span
                              className={`block h-0.5 w-8 transition-colors ${
                                i === active
                                  ? "bg-accent"
                                  : "bg-hairline-strong/40 group-hover:bg-hairline-strong"
                              }`}
                            />
                          </button>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {open && current && (
        <Lightbox
          images={images}
          index={active}
          onIndexChange={setActive}
          onClose={() => setOpen(false)}
          t={t}
        />
      )}
    </article>
  );
}
