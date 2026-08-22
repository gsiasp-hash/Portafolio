import Button from "../atoms/Button";
import Chip from "../atoms/Chip";

export default function ProjectCard({
  nombre,
  descripcion,
  imagen,
  tecnologias,
  demoUrl,
  repoUrl,
}) {
  return (
    <article className="border border-hairline rounded-none overflow-hidden flex flex-col hover:border-accent transition-colors duration-300">
      <img
        className="w-full h-44 object-cover"
        alt={`Captura del proyecto ${nombre}`}
        src={imagen}
        loading="lazy"
      />
      <div className="p-6 flex flex-col gap-4 grow">
        <div className="flex items-center gap-2">
          <span className="text-accent">[+]</span>
          <h3 className="text-lg font-medium text-ink">{nombre}</h3>
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
