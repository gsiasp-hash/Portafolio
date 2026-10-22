import SectionHeader from "../atoms/SectionHeader";
import ProjectsGrid from "../molecules/ProjectsGrid";
import { AnimatedSectionUp } from "../templates/AnimatedSection";
import { getProyectos } from "../../data/proyectos";
import { getGaleria } from "../../data/galeria";
import es from "../../i18n/es";

export default function Projects({ lang = "es", t = es.projects }) {
  const items = getProyectos(lang).map((proyecto) => ({
    ...proyecto,
    images: getGaleria(proyecto.slug, lang),
  }));
  return (
    <section
      id="proyectos"
      className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto"
    >
      <AnimatedSectionUp>
        <SectionHeader title={t.title} scramble />
      </AnimatedSectionUp>
      <AnimatedSectionUp>
        <ProjectsGrid lang={lang} t={t} items={items} />
      </AnimatedSectionUp>
    </section>
  );
}
