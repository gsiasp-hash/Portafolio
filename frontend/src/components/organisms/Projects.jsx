import SectionHeader from "../atoms/SectionHeader";
import ProjectCard from "../molecules/ProjectCard";
import { proyectos } from "../../data/proyectos";

export default function Projects() {
  return (
    <section id="proyectos" className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      <SectionHeader title="Proyectos" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proyectos.map((proyecto) => (
          <ProjectCard key={proyecto.nombre} {...proyecto} />
        ))}
      </div>
    </section>
  );
}
