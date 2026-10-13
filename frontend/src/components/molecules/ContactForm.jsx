"use client";

import { useState } from "react";
import Button from "../atoms/Button";
import { EMAIL } from "../../data/contacto";
import es from "../../i18n/es";

const initialStatus = "idle";

export default function ContactForm({ t = es.contact.form }) {
  const [status, setStatus] = useState(initialStatus);

  const resetStatus = () => {
    if (status !== initialStatus && status !== "sending") {
      setStatus(initialStatus);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: data.get("nombre"),
          email: data.get("email"),
          mensaje: data.get("mensaje"),
          empresa: data.get("empresa"),
        }),
      });
      if (!res.ok) throw new Error("fallo el envio");
      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full bg-surface-card/60 border border-hairline rounded-sm px-3 py-2 text-sm text-ink placeholder:text-mute focus:border-accent focus:outline-none transition-colors duration-200";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-xl">
      <div>
        <label htmlFor="nombre" className="block text-xs text-mute mb-1">
          {t.name}
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          placeholder={t.namePlaceholder}
          onChange={resetStatus}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs text-mute mb-1">
          {t.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={120}
          autoComplete="email"
          placeholder={t.emailPlaceholder}
          onChange={resetStatus}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-xs text-mute mb-1">
          {t.message}
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          placeholder={t.messagePlaceholder}
          onChange={resetStatus}
          className={`${fieldClass} resize-y`}
        />
      </div>

      <div hidden aria-hidden="true">
        <label htmlFor="empresa">empresa</label>
        <input id="empresa" name="empresa" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? t.sending : t.send}
        </Button>
        {status === "ok" && (
          <p role="status" className="text-xs text-accent">
            {t.ok}
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="text-xs text-body">
            {t.errorPrefix} <span className="text-accent">{EMAIL}</span>
          </p>
        )}
      </div>
    </form>
  );
}
