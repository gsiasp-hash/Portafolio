import { enlaces } from "../../data/contacto";
import es from "../../i18n/es";

export default function Footer({ t = es.footer }) {
  return (
    <footer className="border-t border-hairline py-8 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-xs text-mute">
          [ <span className="text-accent">GS</span> ] 2026 · {t.tagline}
        </p>
        <div className="flex items-center gap-6 text-xs">
          {enlaces.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={label === "Email" ? undefined : "_blank"}
              rel={label === "Email" ? undefined : "noreferrer"}
              className="text-accent hover:text-accent-hover transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
