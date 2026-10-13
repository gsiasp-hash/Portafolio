import SectionHeader from "../atoms/SectionHeader";
import ProjectCard from "../molecules/ProjectCard";
import { AnimatedSectionUp } from "../templates/AnimatedSection";
import { getProyectos } from "../../data/proyectos";
import es from "../../i18n/es";

export default function Projects({ lang = "es", t = es.projects }) {
  const proyectos = getProyectos(lang);
  return (
    <section
      id="proyectos"
      className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto"
    >
      <AnimatedSectionUp>
        <SectionHeader title={t.title} scramble />
      </AnimatedSectionUp>
      <AnimatedSectionUp className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {proyectos.map((proyecto) => (
          <ProjectCard key={proyecto.nombre} lang={lang} t={t} {...proyecto} />
        ))}
      </AnimatedSectionUp>
    </section>
  );
}
