import Button from "../atoms/Button";
import ScrambleReveal from "../rb/ScrambleReveal";
import TerminalRole from "../rb/TerminalRole";
import CountUp from "../rb/CountUp";
import Magnetic from "../rb/Magnetic";
import AudioBars from "../rb/AudioBars";
import { enlaces } from "../../data/contacto";
import { proyectos } from "../../data/proyectos";
import es from "../../i18n/es";

export default function Hero({ t = es.hero }) {
  const sociales = enlaces.filter(({ label }) => label !== "Email");
  const stats = [
    { value: 10, suffix: "+", label: t.stats.years },
    { value: proyectos.length, suffix: "", label: t.stats.projects },
  ];

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-6">
      <div className="text-center md:text-left">
        <div className="w-16 h-px bg-accent mx-auto md:mx-0 mb-6 motion-safe:animate-[rise_0.7s_ease-out_both]" />

        <p
          className="text-mute text-xs mb-4 tracking-wider uppercase motion-safe:animate-[rise_0.7s_ease-out_both]"
          style={{ animationDelay: "100ms" }}
        >
          {t.intro}
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] font-bold leading-tight tracking-tighter text-ink">
          <ScrambleReveal text="GUILLERMO" delay={200} />{" "}
          <ScrambleReveal text="SIAS" delay={750} className="text-accent" />
        </h1>

        <div
          className="mt-6 motion-safe:animate-[rise_0.7s_ease-out_both]"
          style={{ animationDelay: "900ms" }}
        >
          <h2 className="text-lg font-medium text-ink">Full Stack Developer</h2>
          <TerminalRole
            roles={t.roles}
            prompt={t.prompt}
            className="mt-2 text-sm min-h-[1.5rem]"
          />
          <p className="mt-2 text-sm text-mute max-w-xl mx-auto md:mx-0">
            {t.roleSuffix}
          </p>
        </div>

        <div
          className="mt-10 flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start motion-safe:animate-[rise_0.7s_ease-out_both]"
          style={{ animationDelay: "1100ms" }}
        >
          <Magnetic>
            <Button href="#proyectos" arrow>
              {t.viewProjects}
            </Button>
          </Magnetic>
          <Magnetic>
            <Button variant="secondary" href="#contacto" arrow>
              {t.contactMe}
            </Button>
          </Magnetic>
        </div>

        <div
          className="mt-4 flex gap-2 justify-center md:justify-start motion-safe:animate-[rise_0.7s_ease-out_both]"
          style={{ animationDelay: "1250ms" }}
        >
          {sociales.map(({ label, href }) => (
            <Button
              key={label}
              size="sm"
              variant="ghost"
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              {label}
            </Button>
          ))}
        </div>

        <dl
          className="mt-10 flex gap-8 justify-center md:justify-start motion-safe:animate-[rise_0.7s_ease-out_both]"
          style={{ animationDelay: "1400ms" }}
        >
          {stats.map(({ value, suffix, label }) => (
            <div
              key={label}
              className="flex flex-col-reverse border-l border-hairline pl-3 text-left"
            >
              <dt className="text-xs text-mute">{label}</dt>
              <dd className="text-2xl font-bold text-accent">
                <CountUp to={value} suffix={suffix} delay={1500} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <AudioBars label={t.visualizerLabel} className="mt-12" />

      <a
        href="#sobre-mi"
        aria-label={t.scroll}
        className="group mt-4 flex flex-col items-center gap-2 text-mute hover:text-ink transition-colors"
      >
        <span className="text-[10px] uppercase tracking-widest">{t.scroll}</span>
        <span className="relative block w-px h-10 overflow-hidden bg-hairline">
          <span className="absolute inset-0 bg-accent motion-safe:animate-[scroll-cue_1.6s_ease-in-out_infinite]" />
        </span>
      </a>
    </section>
  );
}
