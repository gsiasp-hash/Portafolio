import Link from "next/link";
import Button from "../atoms/Button";
import Chip from "../atoms/Chip";

export default function ProjectCard({
  slug,
  nombre,
  descripcion,
  imagen,
  tecnologias,
  demoUrl,
  repoUrl,
}) {
  return (
    <article className="group border border-hairline rounded-none overflow-hidden flex flex-col bg-surface-card/60 hover:border-accent transition-colors duration-300">
      <Link href={`/proyectos/${slug}`} className="block">
        <img
          className="w-full h-44 object-cover"
          alt={`Captura del proyecto ${nombre}`}
          src={imagen}
          loading="lazy"
        />
      </Link>
      <div className="p-6 flex flex-col gap-4 grow">
        <div className="flex items-center gap-2">
          <span className="text-accent">
            <span className="group-hover:hidden">[+]</span>
            <span className="hidden group-hover:inline">[→]</span>
          </span>
          <h3 className="text-lg font-medium text-ink">
            <Link
              href={`/proyectos/${slug}`}
              className="hover:text-accent transition-colors"
            >
              {nombre}
            </Link>
          </h3>
        </div>
        <p className="text-sm text-body grow leading-relaxed">{descripcion}</p>
        <div className="flex flex-wrap gap-2">
          {tecnologias.map((tech) => (
            <Chip key={tech} className="px-2 py-1 hover:bg-accent/5">
              {tech}
            </Chip>
          ))}
        </div>
        <div className="flex gap-3 pt-2 border-t border-hairline">
          {demoUrl && (
            <Button size="sm" href={demoUrl} target="_blank" rel="noreferrer">
              Ver demo
            </Button>
          )}
          <Button
            size="sm"
            variant="secondary"
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
          >
            Código
          </Button>
        </div>
      </div>
    </article>
  );
}
