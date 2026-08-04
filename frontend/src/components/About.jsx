export default function About() {
  return (
    <section id="sobre-mi" className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      <div className="border-b border-hairline pb-6 mb-8">
        <h2 className="text-xs font-bold text-ink uppercase tracking-wider">
          [+] Sobre mi
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <p className="text-sm text-body leading-relaxed max-w-3xl">
            Soy Ingeniero en Sonido y Desarrollador Full Stack. Mi
            trayectoria en el ámbito técnico del audio me dotó de una sólida
            capacidad analítica y una metodología rigurosa para la resolución de
            problemas. Actualmente, diseño y desarrollo soluciones digitales
            utilizando el ecosistema de JavaScript (HTML5, CSS3, React y Node.js).
            Disfruto enormemente construyendo interfaces fluidas y conectándolas
            con arquitecturas estables. Vengo de un mundo donde el "en vivo" no da
            margen de error, por lo que sé mantener la cabeza fría bajo presión,
            aprender rápido sobre la marcha y aportar soluciones estructuradas a
            equipos que avancen a paso firme.
          </p>
        </div>
        <div className="space-y-4">
          <div className="p-4 border border-hairline rounded-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-accent">●</span>
              <span className="text-xs font-medium text-ink">10+ años</span>
            </div>
            <p className="text-xs text-mute">Experiencia técnica en audio y gestión</p>
          </div>
          <div className="p-4 border border-hairline rounded-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-accent">●</span>
              <span className="text-xs font-medium text-ink">Full Stack</span>
            </div>
            <p className="text-xs text-mute">JavaScript · React · Node.js · Tailwind</p>
          </div>
          <div className="p-4 border border-hairline rounded-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-accent">●</span>
              <span className="text-xs font-medium text-ink">Shopify</span>
            </div>
            <p className="text-xs text-mute">Temas personalizados y apps</p>
          </div>
        </div>
      </div>
    </section>
  );
}