import { enlaces } from "../../data/contacto";
import { AnimatedSectionUp } from "../templates/AnimatedSection";
import es from "../../i18n/es";

export default function Footer({ t = es.footer }) {
  return (
    <footer className="border-t border-hairline pt-10 pb-8 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto overflow-hidden">
      <AnimatedSectionUp stagger={0.12} distance={32}>
        <p
          aria-hidden="true"
          className="select-none font-bold leading-none tracking-tight text-ink/10 text-[clamp(3rem,14vw,9rem)] whitespace-nowrap transition-colors duration-500 hover:text-accent/30"
        >
          {t.tagline}
        </p>
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs text-mute">
            [ <span className="text-accent">GS</span> ] 2026 · {t.tagline}
          </p>
          <nav aria-label={t.linksLabel} className="flex items-center gap-6 text-xs">
            {enlaces.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={label === "Email" ? undefined : "_blank"}
                rel={label === "Email" ? undefined : "noreferrer"}
                className="group relative text-accent hover:text-accent-hover transition-colors"
              >
                {label}
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 -bottom-0.5 h-px bg-accent origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>
        </div>
      </AnimatedSectionUp>
    </footer>
  );
}
