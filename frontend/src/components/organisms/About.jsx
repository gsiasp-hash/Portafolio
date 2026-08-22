import SectionHeader from "../atoms/SectionHeader";
import InfoCard from "../molecules/InfoCard";

export default function About() {
  return (
    <section id="sobre-mi" className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      <SectionHeader title="Sobre mi" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <p className="text-sm text-body leading-relaxed max-w-3xl">
            Soy Ingeniero en Sonido y Desarrollador Full Stack. Mi trayectoria
            en el ámbito técnico del audio me dotó de una sólida capacidad
            analítica y una metodología rigurosa para la resolución de
            problemas. Actualmente, diseño y desarrollo soluciones digitales
            utilizando el ecosistema de JavaScript (HTML5, CSS3, React y
            Node.js). Disfruto enormemente construyendo interfaces fluidas y
            conectándolas con arquitecturas estables. Vengo de un mundo donde el
            "en vivo" no da margen de error, por lo que sé mantener la cabeza
            fría bajo presión, aprender rápido sobre la marcha y aportar
            soluciones estructuradas a equipos que avancen a paso firme.
          </p>
        </div>
        <div className="space-y-4">
          <InfoCard
            label="10+ años"
            description="Experiencia técnica en audio y gestión"
          />
          <InfoCard
            label="Full Stack"
            description="JavaScript · React · Node.js · Tailwind"
          />
          <InfoCard
            label="Shopify"
            description="Tiendas personalizadas y apps"
          />
        </div>
      </div>
    </section>
  );
}
