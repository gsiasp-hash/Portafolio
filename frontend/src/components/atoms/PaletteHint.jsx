"use client";

import { useSyncExternalStore } from "react";
import es from "../../i18n/es";

export const OPEN_PALETTE_EVENT = "open-palette";

const noop = () => () => {};
const isMac = () =>
  /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent || "");

export default function PaletteHint({ className = "", compact = false, t = es.palette }) {
  const mac = useSyncExternalStore(noop, isMac, () => false);
  const keys = mac ? "[⌘K]" : "[ctrl+k]";

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT))}
      aria-label={t.openLabel}
      aria-keyshortcuts={mac ? "Meta+K" : "Control+K"}
      className={`text-xs text-mute hover:text-accent transition-colors duration-200 cursor-pointer select-none ${className}`}
    >
      {compact ? "[>_]" : keys}
    </button>
  );
}
