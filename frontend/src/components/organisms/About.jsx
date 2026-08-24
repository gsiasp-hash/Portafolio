import SectionHeader from "../atoms/SectionHeader";
import InfoCard from "../molecules/InfoCard";

export default function About() {
  return (
    <section id="sobre-mi" className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      <SectionHeader title="Sobre mi" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <p className="text-sm text-body leading-relaxed max-w-3xl">
            Soy Ingeniero en Sonido y Desarrollador Front End titulado por
            Desafío Latam, cursando actualmente la mención Full Stack. Vengo de
            más de 10 años en producción audiovisual y liderazgo técnico, un
            mundo donde el "en vivo" no da margen de error: eso me dotó de una
            sólida capacidad analítica, metodología rigurosa para resolver
            problemas y cabeza fría bajo presión. Hoy diseño y desarrollo
            soluciones digitales con JavaScript y TypeScript (React, Next.js y
            Node.js), con experiencia real desplegada en producción con IA
            generativa: un asistente de soporte basado en RAG y este portafolio
            conversacional, donde puedes preguntarle directamente a una IA
            sobre mi perfil.
          </p>
        </div>
        <div className="space-y-4">
          <InfoCard
            label="10+ años"
            description="Liderazgo técnico en audio y producción en vivo"
          />
          <InfoCard
            label="Titulado Front End"
            description="Desafío Latam · cursando mención Full Stack"
          />
          <InfoCard
            label="IA Generativa"
            description="Asistente RAG desplegado en producción"
          />
        </div>
      </div>
    </section>
  );
}
