import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "../../../../components/atoms/Button";
import Chip from "../../../../components/atoms/Chip";
import RouteFade from "../../../../components/templates/RouteFade";
import { proyectos, getProyectoPorSlug } from "../../../../data/proyectos";
import { getDictionary } from "../../../../i18n/dictionaries";
import { hasLocale, locales } from "../../../../i18n/config";

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
      canonical: `https://portfolio-cydert.vercel.app/${lang}/proyectos/${slug}`,
      languages: {
        es: `https://portfolio-cydert.vercel.app/es/proyectos/${slug}`,
        en: `https://portfolio-cydert.vercel.app/en/proyectos/${slug}`,
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

  return (
    <RouteFade>
      <section className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-3xl mx-auto">
        <Link
          href={`/${lang}#proyectos`}
          className="text-sm text-mute hover:text-accent transition-colors"
        >
          &larr; {t.back}
        </Link>

        <div className="mt-6 flex items-center gap-2">
          <span className="text-accent">[+]</span>
          <h1 className="text-3xl font-medium text-ink">{proyecto.nombre}</h1>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {proyecto.tecnologias.map((tech) => (
            <Chip key={tech} className="px-2 py-1">
              {tech}
            </Chip>
          ))}
        </div>

        <img
          className="w-full h-64 object-cover border border-hairline mt-6"
          alt={`${t.screenshotAlt} ${proyecto.nombre}`}
          src={proyecto.screenshot || proyecto.imagen}
        />

        <div className="mt-8 flex flex-col gap-4 border-t border-hairline pt-8">
          {proyecto.resumen.map((parrafo) => (
            <p key={parrafo.slice(0, 32)} className="text-body leading-relaxed">
              {parrafo}
            </p>
          ))}
        </div>

        <div className="mt-10 flex gap-3 border-t border-hairline pt-8">
          {proyecto.demoUrl && (
            <Button href={proyecto.demoUrl} target="_blank" rel="noreferrer">
              {t.viewDemo}
            </Button>
          )}
          <Button
            variant="secondary"
            href={proyecto.repoUrl}
            target="_blank"
            rel="noreferrer"
          >
            {t.code}
          </Button>
        </div>
      </section>
    </RouteFade>
  );
}
