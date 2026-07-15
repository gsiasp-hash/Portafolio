import { useState } from "react";

const EMAIL = "g.siasp@gmail.com";

function IconEmail(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  );
}

function IconGitHub(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function IconLinkedIn(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.558V9h3.556v11.452z" />
    </svg>
  );
}

const enlaces = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, Icon: IconEmail },
  {
    label: "GitHub",
    value: "gsiasp-hash",
    href: "https://github.com/gsiasp-hash",
    Icon: IconGitHub,
  },
  {
    label: "LinkedIn",
    value: "guillermo-sias",
    href: "https://www.linkedin.com/in/guillermo-sias-762775180/",
    Icon: IconLinkedIn,
  },
];

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const asunto = encodeURIComponent(
      `Contacto desde portfolio - ${form.nombre}`
    );
    const cuerpo = encodeURIComponent(
      `Nombre: ${form.nombre}\nEmail: ${form.email}\n\n${form.mensaje}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${asunto}&body=${cuerpo}`;
  };

  return (
    <div id="contacto" className="bg-[#020617] text-white py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <h2 className="text-3xl pb-3">//Contacto</h2>
      <p className="text-sm text-gray-400 pb-6">
        ¿Tienes un proyecto en mente o una oportunidad? Escríbeme y te
        respondo a la brevedad.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="nombre" className="text-xs text-gray-400">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            value={form.nombre}
            onChange={handleChange}
            className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
            placeholder="Tu nombre"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-xs text-gray-400">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
            placeholder="tu@email.com"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="mensaje" className="text-xs text-gray-400">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            required
            rows={5}
            value={form.mensaje}
            onChange={handleChange}
            className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 resize-none"
            placeholder="Cuéntame en qué puedo ayudarte"
          />
        </div>

        <button
          type="submit"
          className="bg-violet-500 hover:bg-violet-700 text-white py-2 px-4 rounded text-sm cursor-pointer self-start"
        >
          Enviar mensaje
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {enlaces.map(({ label, value, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={label === "Email" ? undefined : "_blank"}
            rel={label === "Email" ? undefined : "noreferrer"}
            className="flex items-center gap-3 bg-slate-900 border border-slate-800 hover:border-violet-500 rounded-xl px-5 py-4 transition-colors duration-300"
          >
            <Icon className="w-6 h-6 text-violet-400 shrink-0" />
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs text-gray-400">{label}</span>
              <span className="text-violet-300 font-medium truncate">
                {value}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
