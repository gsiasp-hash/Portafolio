"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import es from "../../i18n/es";

const CHAT_URL = "https://entrevista-ia-flax.vercel.app?embed=1";
const CHAT_HOME = "https://entrevista-ia-flax.vercel.app";
const TEASER_KEY = "chat_teaser_visto";
const TEASER_DELAY_MS = 2000;

function suscribir(callback) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function leerPrimeraVisita() {
  try {
    return localStorage.getItem(TEASER_KEY) !== "1";
  } catch {
    return true;
  }
}

export default function ChatWidget({ t = es.chat }) {
  const [open, setOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const pulsar = useSyncExternalStore(suscribir, leerPrimeraVisita, () => true);

  useEffect(() => {
    let visto;
    try {
      visto = localStorage.getItem(TEASER_KEY) === "1";
    } catch {
      visto = false;
    }
    if (visto) return;
    const timer = setTimeout(() => setShowTeaser(true), TEASER_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const marcarVisto = () => {
    setShowTeaser(false);
    try {
      localStorage.setItem(TEASER_KEY, "1");
    } catch {
      return;
    }
  };

  const abrir = () => {
    setOpen(true);
    marcarVisto();
  };

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label={t.dialogLabel}
          className="fixed bottom-16 right-4 sm:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-[380px] h-[min(560px,70vh)] border border-hairline bg-canvas flex flex-col overflow-hidden"
        >
          <iframe src={CHAT_URL} title={t.iframeTitle} className="w-full h-full" />
        </div>
      )}

      {showTeaser && !open && (
        <div className="fixed bottom-16 right-4 sm:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-[280px] border border-hairline bg-surface-card p-3">
          <button
            type="button"
            onClick={marcarVisto}
            aria-label={t.dismiss}
            className="absolute top-1.5 right-2 font-mono text-xs text-mute hover:text-accent transition-colors cursor-pointer"
          >
            [x]
          </button>
          <p className="text-xs leading-relaxed text-body pr-5">{t.teaser}</p>
          <button
            type="button"
            onClick={abrir}
            className="mt-2 font-mono text-xs text-accent hover:underline cursor-pointer"
          >
            {t.cta}
          </button>
        </div>
      )}

      <div className="fixed bottom-4 right-4 sm:right-6 z-[60] flex items-center gap-2">
        {open && (
          <a
            href={CHAT_HOME}
            target="_blank"
            rel="noreferrer"
            title={t.openNewTab}
            className="font-mono text-xs text-mute hover:text-accent transition-colors duration-200"
          >
            ↗
          </a>
        )}
        <span className="relative inline-flex">
          {!open && pulsar && (
            <span
              aria-hidden="true"
              className="motion-safe:absolute motion-safe:inset-0 motion-safe:animate-ping rounded-sm bg-accent opacity-60"
            />
          )}
          <button
            type="button"
            onClick={() => (open ? setOpen(false) : abrir())}
            aria-expanded={open}
            aria-label={open ? t.close : t.open}
            className={`relative font-mono text-sm px-4 py-2.5 rounded-sm transition-colors duration-200 cursor-pointer select-none active:scale-[0.98] border ${
              open
                ? "bg-surface-card border-hairline text-body hover:text-accent hover:border-accent"
                : "bg-accent border-accent text-white hover:brightness-110"
            }`}
          >
            {open ? "[x]" : t.fab}
          </button>
        </span>
      </div>
    </>
  );
}
