"use client";

import { useState, useEffect } from "react";
import Button from "../atoms/Button";
import NavLink from "../atoms/NavLink";
import MobileMenu from "../molecules/MobileMenu";

const sectionIds = ["sobre-mi", "skills", "proyectos", "contacto"];

const links = [
  { label: "Sobre mi", href: "#sobre-mi", id: "sobre-mi" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Proyectos", href: "#proyectos", id: "proyectos" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

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
    <nav className="border-b border-hairline">
      <div className="max-w-6xl mx-auto flex justify-between items-center h-14 px-6">
        <div className="text-xs leading-none select-none">
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
            href="#contacto"
            className={active === "contacto" ? "font-medium" : ""}
          >
            Contacto
          </Button>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
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

      <MobileMenu
        open={open}
        links={links}
        activeId={active}
        onClose={() => setOpen(false)}
      />
    </nav>
  );
}