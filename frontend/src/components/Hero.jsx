export default function Hero() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="text-center md:text-left">
        {/* Subtle accent line */}
        <div className="w-16 h-px bg-accent mx-auto md:mx-0 mb-6" />
        
        <p className="text-mute text-xs mb-4 tracking-wider uppercase">Mi nombre es</p>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] font-bold leading-tight tracking-tighter text-ink">
          GUILLERMO <span className="text-accent">SIAS</span>
        </h1>
        
        <h2 className="text-sm font-medium mt-6 text-body max-w-xl mx-auto md:mx-0">
          Full Stack Developer · <span className="text-accent">JavaScript</span> · <span className="text-accent">React</span> · <span className="text-accent">Node.js</span> ·
          <span className="text-accent">Tailwind</span> · <span className="text-accent">Shopify</span> · Ingeniero en Sonido con 10+ años en tecnología
        </h2>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
          <a
            href="#proyectos"
            className="inline-flex items-center justify-center gap-2 bg-ink text-canvas hover:bg-ink-deep py-3 px-8 rounded-sm text-sm font-medium transition-colors duration-200"
          >
            Ver Proyectos
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center gap-2 border border-accent text-accent hover:bg-accent hover:text-canvas py-3 px-8 rounded-sm text-sm font-medium transition-colors duration-200"
          >
            Contactame
          </a>
          <a
            href="/cv-guillermo-sias.pdf"
            download
            className="inline-flex items-center justify-center gap-2 border border-hairline-strong text-mute hover:text-ink hover:border-ink py-3 px-8 rounded-sm text-sm font-medium transition-colors duration-200"
          >
            Descargar CV
          </a>
        </div>
      </div>
    </section>
  );
}