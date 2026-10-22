"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import es from "../../i18n/es";
import { LOCALE_COOKIE, locales } from "../../i18n/config";
import { getProyectos } from "../../data/proyectos";
import { EMAIL, enlaces } from "../../data/contacto";
import { OPEN_PALETTE_EVENT } from "../atoms/PaletteHint";

const EXIT_MS = 120;
const EGG_MS = 1800;
const GROUPS = ["navigate", "projects", "actions", "links"];
const SECTIONS = ["about", "skills", "projects", "contact"];
const SECTION_IDS = {
  about: "sobre-mi",
  skills: "skills",
  projects: "proyectos",
  contact: "contacto",
};

const normalize = (text) =>
  text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();

function isSubsequence(needle, haystack) {
  let i = 0;
  for (let j = 0; j < haystack.length && i < needle.length; j++) {
    if (haystack[j] === needle[i]) i++;
  }
  return i === needle.length;
}

function score(item, query) {
  const label = normalize(item.label);
  const text = `${label} ${normalize(item.keywords || "")}`;
  let total = 0;
  for (const token of query.split(/\s+/)) {
    if (label.startsWith(token)) total += 3;
    else if (label.includes(token)) total += 2;
    else if (text.includes(token)) total += 1;
    else if (token.length > 2 && isSubsequence(token, label)) total += 0.5;
    else return -1;
  }
  return total;
}

function filterItems(items, rawQuery) {
  const query = normalize(rawQuery);
  if (!query) return items;
  return items
    .map((item, index) => ({ item, index, points: score(item, query) }))
    .filter((entry) => entry.points >= 0)
    .sort((a, b) => b.points - a.points || a.index - b.index)
    .map((entry) => entry.item);
}

const isEgg = (query) => /^sudo\s+hire(\s+guillermo)?$/.test(normalize(query));

const reducedMotion = () =>
  typeof window !== "undefined" &&
  Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);

const FOCUSABLE = "button, input, [href], [tabindex]:not([tabindex='-1'])";

export default function CommandPalette({ lang = "es", t = es.palette }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const [egg, setEgg] = useState(false);
  const [dark, setDark] = useState(false);
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const returnFocus = useRef(null);
  const [timers] = useState(() => new Set());

  const later = useCallback(
    (fn, ms) => {
      const id = setTimeout(fn, ms);
      timers.add(id);
      return id;
    },
    [timers]
  );

  const clearTimers = useCallback(() => {
    timers.forEach(clearTimeout);
    timers.clear();
  }, [timers]);

  const show = useCallback(() => {
    clearTimers();
    returnFocus.current = document.activeElement;
    setDark(document.documentElement.classList.contains("dark"));
    setQuery("");
    setActive(0);
    setCopied(false);
    setEgg(false);
    setClosing(false);
    setOpen(true);
  }, [clearTimers]);

  const hide = useCallback(() => {
    clearTimers();
    setEgg(false);
    if (reducedMotion()) {
      setOpen(false);
      return;
    }
    setClosing(true);
    later(() => {
      setOpen(false);
      setClosing(false);
    }, EXIT_MS);
  }, [clearTimers, later]);

  useEffect(() => {
    const onKey = (event) => {
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        if (open && !closing) hide();
        else show();
        return;
      }
      if (key === "/" && !open && !event.metaKey && !event.ctrlKey && !event.altKey) {
        const el = document.activeElement;
        const typing =
          el && (/^(input|textarea|select)$/i.test(el.tagName) || el.isContentEditable);
        if (typing) return;
        event.preventDefault();
        show();
      }
    };
    const onOpen = () => show();
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, [open, closing, show, hide]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    const target = returnFocus.current;
    return () => {
      document.body.style.overflow = previous;
      if (target && typeof target.focus === "function" && document.contains(target)) {
        target.focus();
      }
    };
  }, [open]);

  useEffect(() => clearTimers, [clearTimers]);

  const goSection = useCallback(
    (key) => {
      const id = SECTION_IDS[key];
      const el = pathname === `/${lang}` ? document.getElementById(id) : null;
      if (el) {
        el.scrollIntoView({
          behavior: reducedMotion() ? "auto" : "smooth",
          block: "start",
        });
        window.history.replaceState(null, "", `#${id}`);
      } else {
        router.push(`/${lang}#${id}`);
      }
    },
    [lang, pathname, router]
  );

  const toggleTheme = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      return;
    }
  }, []);

  const switchLanguage = useCallback(() => {
    const next = locales.find((locale) => locale !== lang);
    const segments = (pathname || `/${lang}`).split("/");
    segments[1] = next;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    router.push(segments.join("/") || `/${next}`);
  }, [lang, pathname, router]);

  const items = useMemo(() => {
    const i = t.items;
    const list = SECTIONS.map((key) => ({
      id: `nav-${key}`,
      group: "navigate",
      label: i[key],
      hint: `#${SECTION_IDS[key]}`,
      run: () => goSection(key),
    }));
    getProyectos(lang).forEach((p) =>
      list.push({
        id: `project-${p.slug}`,
        group: "projects",
        label: `${i.openProject} ${p.nombre}`,
        keywords: `${p.slug} ${(p.tecnologias || []).join(" ")}`,
        hint: `/${p.slug}`,
        run: () => router.push(`/${lang}/proyectos/${p.slug}`),
      })
    );
    list.push(
      {
        id: "action-theme",
        group: "actions",
        label: dark ? i.toLight : i.toDark,
        keywords: t.keywords.theme,
        hint: dark ? "[light]" : "[dark]",
        keepOpen: true,
        run: () => {
          toggleTheme();
          setDark((value) => !value);
        },
      },
      {
        id: "action-language",
        group: "actions",
        label: i.language,
        keywords: t.keywords.language,
        hint: i.languageHint,
        run: switchLanguage,
      },
      {
        id: "action-email",
        group: "actions",
        label: i.copyEmail,
        keywords: `${t.keywords.email} ${EMAIL}`,
        hint: copied ? i.copied : EMAIL,
        keepOpen: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(EMAIL);
          } catch {
            return;
          }
          setCopied(true);
          later(() => setCopied(false), 1800);
        },
      },
      {
        id: "action-chat",
        group: "actions",
        label: i.chat,
        keywords: t.keywords.chat,
        hint: "[chat]",
        run: () => window.dispatchEvent(new CustomEvent("open-chat")),
      }
    );
    enlaces
      .filter((e) => !e.copy)
      .forEach((e) =>
        list.push({
          id: `link-${e.label.toLowerCase()}`,
          group: "links",
          label: e.label === "GitHub" ? i.github : i.linkedin,
          keywords: `${e.label} ${e.value}`,
          hint: "↗",
          run: () => window.open(e.href, "_blank", "noopener,noreferrer"),
        })
      );
    return list;
  }, [t, lang, dark, copied, goSection, toggleTheme, switchLanguage, router, later]);

  const eggItem = useMemo(
    () => ({
      id: "egg",
      group: "actions",
      label: t.egg.command,
      hint: t.egg.hint,
      keepOpen: true,
      run: () => {
        setEgg(true);
        later(() => {
          hide();
          goSection("contact");
        }, EGG_MS);
      },
    }),
    [t, hide, goSection, later]
  );

  const results = useMemo(
    () => (isEgg(query) ? [eggItem] : filterItems(items, query)),
    [items, query, eggItem]
  );

  const current = Math.min(active, Math.max(results.length - 1, 0));
  const activeId = results[current] ? `palette-opt-${results[current].id}` : undefined;

  useEffect(() => {
    if (!activeId) return;
    document.getElementById(activeId)?.scrollIntoView?.({ block: "nearest" });
  }, [activeId]);

  const execute = (item) => {
    if (!item || egg) return;
    if (!item.keepOpen) hide();
    item.run();
  };

  const onInputKey = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (results.length) setActive((current + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (results.length) setActive((current - 1 + results.length) % results.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(Math.max(results.length - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      execute(results[current]);
    }
  };

  const onPanelKey = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      hide();
      return;
    }
    if (event.key === "Tab") {
      const nodes = panelRef.current?.querySelectorAll(FOCUSABLE);
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  if (!open) return null;

  const announce = copied
    ? t.announceCopied
    : results.length
      ? `${results.length} ${results.length === 1 ? t.announceResultOne : t.announceResults}`
      : t.announceNone;

  const grouped = GROUPS.map((group) => ({
    group,
    entries: results.filter((r) => r.group === group),
  })).filter((g) => g.entries.length);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[10vh] bg-canvas/70"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) hide();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.dialogLabel}
        onKeyDown={onPanelKey}
        className={`w-full max-w-xl border border-hairline-strong bg-canvas text-ink text-xs flex flex-col max-h-[70vh] ${
          closing
            ? "motion-safe:animate-[palette-out_120ms_ease-in_forwards]"
            : "motion-safe:animate-[palette-in_160ms_ease-out]"
        }`}
      >
        <div className="flex items-center gap-2 px-4 h-12 border-b border-hairline shrink-0">
          <span aria-hidden="true" className="text-accent select-none">
            &gt;
          </span>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-label={t.inputLabel}
            aria-expanded="true"
            aria-controls="palette-listbox"
            aria-autocomplete="list"
            aria-activedescendant={activeId}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            value={query}
            placeholder={t.placeholder}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            className="flex-1 min-w-0 bg-transparent outline-none text-ink placeholder:text-mute caret-accent"
          />
          <button
            type="button"
            onClick={hide}
            aria-label={t.close}
            className="text-mute hover:text-accent transition-colors duration-200 cursor-pointer select-none"
          >
            {t.closeHint}
          </button>
        </div>

        <div className="overflow-y-auto min-h-0 py-2">
          {egg ? (
            <div className="px-4 py-3 space-y-1">
              {t.egg.lines.map((line, index) => (
                <p
                  key={line}
                  style={{ animationDelay: `${index * 450}ms` }}
                  className="text-ink motion-safe:animate-[rise_300ms_ease-out_backwards]"
                >
                  <span className="text-accent">&gt;</span> {line}
                </p>
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-6">
              <p className="text-ink break-all">
                <span className="text-accent">&gt;</span> {t.notFound}{" "}
                <span className="text-accent">{query.trim()}</span>
              </p>
              <p className="text-mute mt-2">{t.notFoundHint}</p>
            </div>
          ) : (
            <div id="palette-listbox" role="listbox" aria-label={t.dialogLabel}>
              {grouped.map(({ group, entries }) => (
                <div key={group} role="group" aria-labelledby={`palette-group-${group}`}>
                  <div
                    id={`palette-group-${group}`}
                    role="presentation"
                    className="px-4 pt-2 pb-1 text-mute select-none"
                  >
                    [+] {t.groups[group]}
                  </div>
                  {entries.map((item) => {
                    const selected = results[current]?.id === item.id;
                    return (
                      <div
                        key={item.id}
                        id={`palette-opt-${item.id}`}
                        role="option"
                        aria-selected={selected}
                        onMouseMove={() => setActive(results.indexOf(item))}
                        onClick={() => execute(item)}
                        className={`flex items-center justify-between gap-4 px-4 py-2 cursor-pointer ${
                          selected ? "text-accent bg-surface-card" : "text-ink"
                        }`}
                      >
                        <span className="truncate">
                          <span
                            aria-hidden="true"
                            className={selected ? "" : "invisible"}
                          >
                            &gt;{" "}
                          </span>
                          {item.label}
                        </span>
                        {item.hint && (
                          <span
                            className={`shrink-0 hidden sm:inline ${
                              item.id === "action-email" && copied
                                ? "text-accent"
                                : "text-mute"
                            }`}
                          >
                            {item.hint}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 px-4 h-9 border-t border-hairline text-mute shrink-0 select-none">
          <span className="hidden sm:inline">{t.help}</span>
          <span className="sm:hidden">↑↓ ↵ esc</span>
          <span>
            {results.length} {results.length === 1 ? t.resultOne : t.results}
          </span>
        </div>

        <div role="status" aria-live="polite" className="sr-only">
          {announce}
        </div>
      </div>
    </div>
  );
}
