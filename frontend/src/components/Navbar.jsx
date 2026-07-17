import { useState, useEffect } from "react";

const sectionIds = ["sobre-mi", "skills", "proyectos", "contacto"];

const links = [
  { label: "//Sobre mi", href: "#sobre-mi", id: "sobre-mi" },
  { label: "//Skills", href: "#skills", id: "skills" },
  { label: "//Proyectos", href: "#proyectos", id: "proyectos" },
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
    <nav className="bg-[#020617] text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-sm">
          <span className="text-violet-500 font-bold">GS</span>.portfolio
        </h1>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-4 text-xs font-light items-center">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`transition-colors duration-200 ${
                active === l.id ? "text-white font-medium" : "text-violet-400 hover:text-gray-300"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className={`py-2 px-4 rounded transition-colors duration-200 ${
              active === "contacto"
                ? "bg-violet-700 text-white"
                : "bg-violet-500 hover:bg-violet-700 text-white"
            }`}
          >
            Contacto
          </a>
        </div>

        {/* Burger button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <span className={`block h-0.5 w-6 bg-violet-400 transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-violet-400 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-violet-400 transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-60 mt-4" : "max-h-0"}`}>
        <div className="flex flex-col gap-3 text-xs font-light pb-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`transition-colors duration-200 ${
                active === l.id ? "text-white font-medium" : "text-violet-400 hover:text-gray-300"
              }`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className={`py-2 px-4 rounded text-center transition-colors duration-200 ${
              active === "contacto"
                ? "bg-violet-700 text-white"
                : "bg-violet-500 hover:bg-violet-700 text-white"
            }`}
            onClick={() => setOpen(false)}
          >
            Contacto
          </a>
        </div>
      </div>
    </nav>
  );
}
