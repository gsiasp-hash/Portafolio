import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "../../../../components/atoms/Button";
import Chip from "../../../../components/atoms/Chip";
import RouteFade from "../../../../components/templates/RouteFade";
import Gallery from "../../../../components/molecules/Gallery";
import Reveal from "../../../../components/molecules/Reveal";
import { proyectos, getProyectos, getProyectoPorSlug } from "../../../../data/proyectos";
import { getGaleria } from "../../../../data/galeria";
import { getDictionary } from "../../../../i18n/dictionaries";
import { hasLocale, locales } from "../../../../i18n/config";
import { SITE_URL } from "../../../../data/site";

export function generateStaticParams() {
  return locales.flatMap((lang) => proyectos.map(({ slug }) => ({ lang, slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const proyecto = getProyectoPorSlug(slug, lang);
  if (!proyecto) return {};
  const { meta } = getDictionary(lang);

  return {
    title: `${proyecto.nombre} | Guillermo Sias`,
    description: proyecto.descripcion,
    keywords: [...proyecto.tecnologias, meta.projectKeyword],
    openGraph: {
      title: `${proyecto.nombre} | Guillermo Sias`,
      description: proyecto.descripcion,
      type: "website",
      images: [{ url: proyecto.imagen }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${proyecto.nombre} | Guillermo Sias`,
      description: proyecto.descripcion,
      images: [proyecto.imagen],
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/proyectos/${slug}`,
      languages: {
        es: `${SITE_URL}/es/proyectos/${slug}`,
        en: `${SITE_URL}/en/proyectos/${slug}`,
      },
    },
  };
}

export default async function ProyectoPage({ params }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const proyecto = getProyectoPorSlug(slug, lang);
  if (!proyecto) notFound();
  const t = getDictionary(lang).projects;
  const todos = getProyectos(lang);
  const pos = todos.findIndex((p) => p.slug === slug);
  const anterior = todos[(pos - 1 + todos.length) % todos.length];
  const siguiente = todos[(pos + 1) % todos.length];
  const galeria = getGaleria(slug, lang);
  const images =
    galeria.length > 0
      ? galeria
      : [
          {
            src: proyecto.screenshot || proyecto.imagen,
            alt: `${t.screenshotAlt} ${proyecto.nombre}`,
            caption: proyecto.nombre,
          },
        ];

  return (
    <RouteFade>
      <section className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-5xl mx-auto">
        <Reveal>
          <Link
            href={`/${lang}#proyectos`}
            className="text-sm text-mute hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            &larr; {t.back}
          </Link>
        </Reveal>

        <Reveal delay={0.08} className="mt-6 flex items-center gap-3">
          <span className="text-accent text-3xl sm:text-4xl">[+]</span>
          <h1 className="text-3xl sm:text-4xl font-medium text-ink">{proyecto.nombre}</h1>
        </Reveal>

        <Reveal delay={0.16} className="flex flex-wrap gap-2 mt-4">
          {proyecto.tecnologias.map((tech) => (
            <Chip key={tech} className="px-2 py-1">
              {tech}
            </Chip>
          ))}
        </Reveal>

        <Reveal delay={0.24} className="mt-8">
          <Gallery images={images} t={t} />
        </Reveal>

        <Reveal
          delay={0.32}
          className="mt-10 grid gap-8 border-t border-hairline pt-8 lg:grid-cols-[1fr_auto]"
        >
          <div className="flex flex-col gap-4 max-w-3xl">
            {proyecto.resumen.map((parrafo) => (
              <p key={parrafo.slice(0, 32)} className="text-body leading-relaxed">
                {parrafo}
              </p>
            ))}
          </div>
          <div className="flex lg:flex-col gap-3 self-start flex-wrap">
            {proyecto.demoUrl && (
              <Button href={proyecto.demoUrl} target="_blank" rel="noreferrer">
                {t.viewDemo}
              </Button>
            )}
            {proyecto.repoUrl && (
              <Button
                variant="secondary"
                href={proyecto.repoUrl}
                target="_blank"
                rel="noreferrer"
              >
                {t.code}
              </Button>
            )}
          </div>
        </Reveal>

        {todos.length > 1 && (
          <nav
            aria-label={t.moreProjects}
            className="mt-16 grid gap-4 sm:grid-cols-2 border-t border-hairline pt-8"
          >
            <Link
              href={`/${lang}/proyectos/${anterior.slug}`}
              rel="prev"
              className="group border border-hairline p-4 hover:border-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span className="text-xs text-mute">&larr; {t.prevProject}</span>
              <span className="block mt-2 text-ink group-hover:text-accent transition-colors">
                {anterior.nombre}
              </span>
            </Link>
            <Link
              href={`/${lang}/proyectos/${siguiente.slug}`}
              rel="next"
              className="group border border-hairline p-4 sm:text-right hover:border-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span className="text-xs text-mute">{t.nextProject} &rarr;</span>
              <span className="block mt-2 text-ink group-hover:text-accent transition-colors">
                {siguiente.nombre}
              </span>
            </Link>
          </nav>
        )}
      </section>
    </RouteFade>
  );
}
