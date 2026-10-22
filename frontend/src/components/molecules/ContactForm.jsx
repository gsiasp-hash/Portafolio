"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Button from "../atoms/Button";
import { EMAIL } from "../../data/contacto";
import es from "../../i18n/es";

const initialStatus = "idle";
const initialValues = { nombre: "", email: "", mensaje: "" };
const spinnerFrames = ["|", "/", "-", "\\"];

const validators = {
  nombre: (v) => v.trim().length >= 2,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  mensaje: (v) => v.trim().length >= 10,
};

function Spinner() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % spinnerFrames.length), 90);
    return () => clearInterval(id);
  }, []);
  return (
    <span aria-hidden="true" className="inline-block w-3 text-center">
      {spinnerFrames[frame]}
    </span>
  );
}

function Field({ id, label, error, valid, counter, children }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1 text-xs">
        <label
          htmlFor={id}
          className="text-mute transition-colors duration-200 group-focus-within:text-accent"
        >
          {label}
        </label>
        <span className="flex items-center gap-2">
          {counter}
          <AnimatePresence>
            {valid && (
              <motion.span
                key="valid"
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-accent"
              >
                ✓
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </div>
      <div className="relative">
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 bottom-0 h-0.5 bg-accent origin-left scale-x-0 transition-transform duration-300 ease-out group-focus-within:scale-x-100"
        />
      </div>
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            key="error"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-ink overflow-hidden"
          >
            <span className="block pt-1">
              <span className="text-accent">!</span> {error}
            </span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm({ t = es.contact.form }) {
  const [status, setStatus] = useState(initialStatus);
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});

  const valid = {
    nombre: validators.nombre(values.nombre),
    email: validators.email(values.email),
    mensaje: validators.mensaje(values.mensaje),
  };
  const errors = {
    nombre: touched.nombre && !valid.nombre ? t.invalidName : "",
    email: touched.email && !valid.email ? t.invalidEmail : "",
    mensaje: touched.mensaje && !valid.mensaje ? t.invalidMessage : "",
  };

  const resetStatus = () => {
    if (status !== initialStatus && status !== "sending") {
      setStatus(initialStatus);
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    resetStatus();
  };

  const onBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const firstInvalid = Object.keys(valid).find((name) => !valid[name]);
    if (firstInvalid) {
      setTouched({ nombre: true, email: true, mensaje: true });
      form.elements[firstInvalid]?.focus();
      return;
    }

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
      setValues(initialValues);
      setTouched({});
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  };

  const fieldClass = (name) =>
    `w-full bg-surface-card/60 border rounded-sm px-3 py-2 text-sm text-ink placeholder:text-mute focus:border-accent focus:outline-none transition-colors duration-200 ${
      errors[name] ? "border-ink" : "border-hairline"
    }`;

  const sending = status === "sending";

  return (
    <MotionConfig reducedMotion="user">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5 max-w-xl">
        <Field id="nombre" label={t.name} error={errors.nombre} valid={valid.nombre}>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            placeholder={t.namePlaceholder}
            value={values.nombre}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={Boolean(errors.nombre)}
            aria-describedby={errors.nombre ? "nombre-error" : undefined}
            className={fieldClass("nombre")}
          />
        </Field>

        <Field id="email" label={t.email} error={errors.email} valid={valid.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={120}
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            value={values.email}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldClass("email")}
          />
        </Field>

        <Field
          id="mensaje"
          label={t.message}
          error={errors.mensaje}
          valid={valid.mensaje}
          counter={
            <span aria-hidden="true" className="text-mute tabular-nums">
              {values.mensaje.length}/2000
            </span>
          }
        >
          <textarea
            id="mensaje"
            name="mensaje"
            required
            minLength={10}
            maxLength={2000}
            rows={5}
            placeholder={t.messagePlaceholder}
            value={values.mensaje}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={Boolean(errors.mensaje)}
            aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
            className={`${fieldClass("mensaje")} resize-y`}
          />
        </Field>

        <div hidden aria-hidden="true">
          <label htmlFor="empresa">empresa</label>
          <input id="empresa" name="empresa" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative overflow-hidden rounded-sm">
            <Button type="submit" disabled={sending}>
              {sending && <Spinner />}
              <motion.span
                key={sending ? "sending" : "send"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {sending ? t.sending : t.send}
              </motion.span>
            </Button>
            {sending && (
              <motion.span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-0.5 w-1/3 bg-accent"
                initial={{ x: "-100%" }}
                animate={{ x: "300%" }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>
          <AnimatePresence mode="wait">
            {status === "ok" && (
              <motion.p
                key="ok"
                role="status"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-accent"
              >
                {t.ok}
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                key="error"
                role="alert"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: [0, -8, 8, -5, 5, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="text-xs text-body"
              >
                {t.errorPrefix} <span className="text-accent">{EMAIL}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </form>
    </MotionConfig>
  );
}
