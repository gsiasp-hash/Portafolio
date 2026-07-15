import { useState } from "react";

const EMAIL = "g.siasp@gmail.com";

const enlaces = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  {
    label: "GitHub",
    value: "gsiasp-hash",
    href: "https://github.com/gsiasp-hash",
  },
  {
    label: "LinkedIn",
    value: "guillermo-sias",
    href: "https://www.linkedin.com/in/guillermo-sias-762775180/",
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
    <div id="contacto" className="bg-[#020617] text-white py-10 px-4 md:mx-40">
      <h2 className="text-3xl pb-3">//Contacto</h2>
      <p className="text-sm text-gray-400 pb-6">
        ¿Tienes un proyecto en mente o una oportunidad? Escríbeme y te
        respondo a la brevedad.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

        <div className="flex flex-col gap-3">
          {enlaces.map((enlace) => (
            <a
              key={enlace.label}
              href={enlace.href}
              target={enlace.label === "Email" ? undefined : "_blank"}
              rel={enlace.label === "Email" ? undefined : "noreferrer"}
              className="flex items-center justify-between bg-slate-900 border border-slate-800 hover:border-violet-500 rounded-xl px-5 py-4 transition-colors duration-300"
            >
              <span className="text-sm text-gray-400">{enlace.label}</span>
              <span className="text-violet-300 font-medium">
                {enlace.value}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
