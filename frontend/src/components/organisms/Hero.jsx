import Button from "../atoms/Button";

export default function Hero() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="text-center md:text-left">
        <div className="w-16 h-px bg-accent mx-auto md:mx-0 mb-6" />

        <p className="text-mute text-xs mb-4 tracking-wider uppercase">
          Mi nombre es
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] font-bold leading-tight tracking-tighter text-ink">
          GUILLERMO <span className="text-accent">SIAS</span>
        </h1>

        <h2 className="text-sm font-medium mt-6 text-body max-w-xl mx-auto md:mx-0">
          Full Stack Developer · <span className="text-accent">JavaScript</span>{" "}
          · <span className="text-accent">React</span> ·{" "}
          <span className="text-accent">Node.js</span> ·{" "}
          <span className="text-accent">Tailwind</span> ·{" "}
          <span className="text-accent">Shopify</span> · Ingeniero en Sonido con
          10+ años en tecnología
        </h2>

        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
          <Button href="#proyectos">Ver Proyectos</Button>
          <Button variant="secondary" href="#contacto">
            Contactame
          </Button>
          <Button variant="ghost" href="/cv-guillermo-sias.pdf" download>
            Descargar CV
          </Button>
        </div>
      </div>
    </section>
  );
}
