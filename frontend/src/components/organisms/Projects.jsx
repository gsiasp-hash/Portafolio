import SectionHeader from "../atoms/SectionHeader";
import ProjectCard from "../molecules/ProjectCard";
import { AnimatedSectionUp } from "../templates/AnimatedSection";
import { proyectos } from "../../data/proyectos";

export default function Projects() {
  return (
    <section
      id="proyectos"
      className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto"
    >
      <AnimatedSectionUp>
        <SectionHeader title="Proyectos" scramble />
      </AnimatedSectionUp>
      <AnimatedSectionUp className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {proyectos.map((proyecto) => (
          <ProjectCard key={proyecto.nombre} {...proyecto} />
        ))}
      </AnimatedSectionUp>
    </section>
  );
}
