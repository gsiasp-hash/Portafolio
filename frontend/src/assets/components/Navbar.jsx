import { useState } from "react";
import "../css/style.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "//Sobre mi", href: "#sobre-mi" },
    { label: "//Skills", href: "#skills" },
    { label: "//Proyectos", href: "#proyectos" },
  ];

  return (
    <nav className="bg-[#020617] text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-sm">
          <span className="text-violet-500 font-bold">GS</span>.portfolio
        </h1>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-4 text-xs font-light items-center">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-violet-400 hover:text-gray-300">
              {l.label}
            </a>
          ))}
          <a href="#contacto" className="bg-violet-500 hover:bg-violet-700 text-white py-2 px-4 rounded">
            Contacto
          </a>
        </div>

        {/* Burger button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
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
            <a key={l.label} href={l.href} className="text-violet-400 hover:text-gray-300" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="bg-violet-500 hover:bg-violet-700 text-white py-2 px-4 rounded text-center"
            onClick={() => setOpen(false)}
          >
            Contacto
          </a>
        </div>
      </div>
    </nav>
  );
}
