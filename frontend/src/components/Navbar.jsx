import { useState, useEffect } from "react";

const sectionIds = ["sobre-mi", "skills", "proyectos", "contacto"];

const links = [
  { label: "Sobre mi", href: "#sobre-mi", id: "sobre-mi" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Proyectos", href: "#proyectos", id: "proyectos" },
];

function Wordmark() {
  return (
    <div className="text-xs leading-none select-none">
      [ <span className="text-accent">GS</span> ]
    </div>
  );
}

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14">
        <a href="#sobre-mi" className="text-sm font-bold text-ink">
          <Wordmark />
        </a>

        <div className="hidden md:flex items-center gap-6 text-xs">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`transition-colors duration-200 pb-0.5 ${
                active === l.id
                  ? "text-ink font-medium border-b-2 border-accent"
                  : "text-mute hover:text-ink"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className={`transition-colors duration-200 py-2 px-4 rounded-sm border border-transparent ${
              active === "contacto"
                ? "font-medium text-canvas bg-ink"
                : "text-canvas bg-ink hover:bg-ink-deep"
            }`}
          >
            Contacto
          </a>
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

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 border-hairline ${
          open ? "max-h-60 border-t" : "max-h-0"
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col gap-3 text-xs px-6 py-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`transition-colors duration-200 ${
                active === l.id ? "text-accent font-medium" : "text-mute hover:text-ink"
              }`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="py-2 px-4 rounded-sm text-center text-canvas bg-ink"
            onClick={() => setOpen(false)}
          >
            Contacto
          </a>
        </div>
      </div>
    </nav>
  );
}