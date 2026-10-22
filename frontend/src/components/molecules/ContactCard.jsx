"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import es from "../../i18n/es";

export default function ContactCard({
  href,
  copy = false,
  label,
  value,
  t = es.contact,
}) {
  const [copiado, setCopiado] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const base =
    "group flex items-center justify-between gap-3 p-4 border rounded-sm bg-surface-card/60 hover:border-accent active:scale-[0.99] transition-all duration-300";
  const estado = copiado ? "border-accent" : "border-hairline";
  const inner = (
    <>
      <span className="flex flex-col overflow-hidden text-left">
        <span className="text-xs text-mute">{label}</span>
        <span className="text-sm text-accent truncate transition-transform duration-300 group-hover:translate-x-1">
          {value}
        </span>
      </span>
      {copy ? (
        <span className="text-xs text-accent shrink-0 overflow-hidden" role="status">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copiado ? "copied" : "copy"}
              className="inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {copiado ? t.copied : t.copy}
            </motion.span>
          </AnimatePresence>
        </span>
      ) : (
        <span className="text-accent shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
          ↗
        </span>
      )}
    </>
  );

  if (!copy) {
    return (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noreferrer" : undefined}
        className={`${base} border-hairline`}
      >
        {inner}
      </a>
    );
  }

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiado(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopiado(false), 2000);
    } catch {
      setCopiado(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copiar}
      aria-label={`${t.copyLabel} ${label}`}
      className={`${base} ${estado} w-full cursor-pointer`}
    >
      {inner}
    </button>
  );
}
