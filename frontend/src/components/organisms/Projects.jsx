import SectionHeader from "../atoms/SectionHeader";
import FeaturedProjects from "../molecules/FeaturedProjects";
import ProjectIndex from "../molecules/ProjectIndex";
import { AnimatedSectionUp } from "../templates/AnimatedSection";
import { getProyectos } from "../../data/proyectos";
import { getGaleria } from "../../data/galeria";
import es from "../../i18n/es";

export default function Projects({ lang = "es", t = es.projects }) {
  const items = getProyectos(lang).map((proyecto) => ({
    ...proyecto,
    images: getGaleria(proyecto.slug, lang),
  }));
  const featured = items.filter((item) => item.destacado);
  const rest = items.filter((item) => !item.destacado);

  return (
    <section
      id="proyectos"
      className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto"
    >
      <AnimatedSectionUp>
        <SectionHeader title={t.title} scramble />
      </AnimatedSectionUp>
      <FeaturedProjects lang={lang} t={t} items={featured} />
      <ProjectIndex lang={lang} t={t} items={rest} />
    </section>
  );
}
