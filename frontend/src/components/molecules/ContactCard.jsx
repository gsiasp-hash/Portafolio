"use client";

import { useEffect, useRef, useState } from "react";

export default function ContactCard({ href, copy = false, label, value }) {
  const [copiado, setCopiado] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const base =
    "flex items-center justify-between gap-3 p-4 border border-hairline rounded-sm bg-surface-card/60 hover:border-accent transition-colors duration-300";
  const inner = (
    <>
      <span className="flex flex-col overflow-hidden text-left">
        <span className="text-xs text-mute">{label}</span>
        <span className="text-sm text-accent truncate">{value}</span>
      </span>
      {copy ? (
        <span className="text-xs text-accent shrink-0" role="status">
          {copiado ? "[copiado]" : "[copiar]"}
        </span>
      ) : (
        <span className="text-accent shrink-0">↗</span>
      )}
    </>
  );

  if (!copy) {
    return (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noreferrer" : undefined}
        className={base}
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
      aria-label={`Copiar ${label}`}
      className={`${base} w-full cursor-pointer`}
    >
      {inner}
    </button>
  );
}
