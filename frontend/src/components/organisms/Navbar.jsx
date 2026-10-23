"use client";

import { useState, useEffect } from "react";
import Button from "../atoms/Button";
import NavLink from "../atoms/NavLink";
import MobileMenu from "../molecules/MobileMenu";
import ThemeToggle from "../atoms/ThemeToggle";
import LanguageToggle from "../atoms/LanguageToggle";
import PaletteHint from "../atoms/PaletteHint";
import es from "../../i18n/es";

const sectionIds = ["servicios", "sobre-mi", "skills", "proyectos", "contacto"];

export default function Navbar({ lang = "es", t = es.nav, themeT = es.theme, paletteT = es.palette }) {
  const links = [
    { label: t.services, href: `/${lang}#servicios`, id: "servicios" },
    { label: t.about, href: `/${lang}#sobre-mi`, id: "sobre-mi" },
    { label: t.skills, href: `/${lang}#skills`, id: "skills" },
    { label: t.projects, href: `/${lang}#proyectos`, id: "proyectos" },
  ];

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      data-compact={compact}
      className="sticky top-0 z-40 border-b border-hairline bg-canvas transition-colors duration-300 data-[compact=true]:border-ink/20"
    >
      <div
        className={`max-w-6xl mx-auto flex justify-between items-center px-6 transition-[height] duration-300 ease-out ${
          compact ? "h-11" : "h-14"
        }`}
      >
        <div
          className={`text-xs leading-none select-none origin-left transition-transform duration-300 ${
            compact ? "scale-90" : ""
          }`}
        >
          [ <span className="text-accent">GS</span> ]
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs">
          {links.map((link) => (
            <NavLink key={link.id} href={link.href} active={active === link.id}>
              {link.label}
            </NavLink>
          ))}
          <Button
            size="sm"
            href={`/${lang}#contacto`}
            className={active === "contacto" ? "font-medium" : ""}
          >
            {t.contact}
          </Button>
          <PaletteHint t={paletteT} />
          <LanguageToggle lang={lang} t={t} />
          <ThemeToggle t={themeT} />
        </div>

        <div className="md:hidden flex items-center gap-4">
          <PaletteHint compact t={paletteT} />
          <LanguageToggle lang={lang} t={t} />
          <ThemeToggle t={themeT} />
          <button
            className="flex flex-col gap-1.5 p-1 cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label={t.openMenu}
            aria-expanded={open}
          >
            <span
              className={`block h-0.5 w-6 bg-ink transition-all duration-300 ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-ink transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-ink transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <MobileMenu
        open={open}
        links={links}
        lang={lang}
        contactLabel={t.contact}
        activeId={active}
        onClose={() => setOpen(false)}
      />
    </nav>
  );
}
