"use client";

import { useEffect, useState } from "react";

const CHAT_URL =
  "https://entrevista-ia-flax.vercel.app?embed=1";
const CHAT_HOME = "https://entrevista-ia-flax.vercel.app";
const TEASER_KEY = "chat_teaser_visto";
const TEASER_DELAY_MS = 2000;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);

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
          aria-label="Chat con el asistente IA de Guillermo"
          className="fixed bottom-16 right-4 sm:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-[380px] h-[min(560px,70vh)] border border-hairline bg-canvas flex flex-col overflow-hidden"
        >
          <iframe
            src={CHAT_URL}
            title="Asistente IA — Guillermo Sias"
            className="w-full h-full"
          />
        </div>
      )}

      {showTeaser && !open && (
        <div className="fixed bottom-16 right-4 sm:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-[280px] border border-hairline bg-surface-card p-3">
          <button
            type="button"
            onClick={marcarVisto}
            aria-label="Descartar mensaje"
            className="absolute top-1.5 right-2 font-mono text-xs text-mute hover:text-accent transition-colors cursor-pointer"
          >
            [x]
          </button>
          <p className="text-xs leading-relaxed text-body pr-5">
            Preguntale lo que quieras sobre mi experiencia — responde un
            asistente entrenado con mi CV.
          </p>
          <button
            type="button"
            onClick={abrir}
            className="mt-2 font-mono text-xs text-accent hover:underline cursor-pointer"
          >
            Habla con el asistente →
          </button>
        </div>
      )}

      <div className="fixed bottom-4 right-4 sm:right-6 z-[60] flex items-center gap-2">
        {open && (
          <a
            href={CHAT_HOME}
            target="_blank"
            rel="noreferrer"
            title="Abrir en pestaña nueva"
            className="font-mono text-xs text-mute hover:text-accent transition-colors duration-200"
          >
            ↗
          </a>
        )}
        <span className="relative inline-flex">
          {!open && (
            <span
              aria-hidden="true"
              className="motion-safe:absolute motion-safe:inset-0 motion-safe:animate-ping rounded-sm bg-accent opacity-60"
            />
          )}
          <button
            type="button"
            onClick={() => (open ? setOpen(false) : abrir())}
            aria-expanded={open}
            aria-label={open ? "Cerrar asistente" : "Hablar con el asistente"}
            className={`relative font-mono text-sm px-4 py-2.5 rounded-sm transition-colors duration-200 cursor-pointer select-none active:scale-[0.98] border ${
              open
                ? "bg-surface-card border-hairline text-body hover:text-accent hover:border-accent"
                : "bg-accent border-accent text-white hover:brightness-110"
            }`}
          >
            {open ? "[x]" : "Habla con el asistente"}
          </button>
        </span>
      </div>
    </>
  );
}
