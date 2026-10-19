import Link from "next/link";
import Button from "../atoms/Button";
import Chip from "../atoms/Chip";
import SpotlightCard from "../rb/SpotlightCard";

import es from "../../i18n/es";

export default function ProjectCard({
  lang = "es",
  t = es.projects,
  slug,
  nombre,
  descripcion,
  imagen,
  screenshot,
  tecnologias,
  demoUrl,
  repoUrl,
}) {
  const imageSrc = screenshot || imagen;

  return (
    <SpotlightCard className="group border border-hairline rounded-none overflow-hidden flex flex-col bg-surface-card/60 hover:border-accent transition-colors duration-300 h-full">
      <Link href={`/${lang}/proyectos/${slug}`} className="block overflow-hidden">
        <img
          className="w-full h-72 object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          alt={`${t.screenshotAlt} ${nombre}`}
          src={imageSrc}
          loading="lazy"
        />
      </Link>
      <div className="p-6 flex flex-col gap-4 grow">
        <div className="flex items-center gap-2">
          <span className="text-accent">
            <span className="group-hover:hidden">[+]</span>
            <span className="hidden group-hover:inline">[→]</span>
          </span>
          <h3 className="text-xl font-medium text-ink">
            <Link
              href={`/${lang}/proyectos/${slug}`}
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
              {t.viewDemo}
            </Button>
          )}
          {repoUrl && (
            <Button
              size="sm"
              variant="secondary"
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t.repository}
            </Button>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
