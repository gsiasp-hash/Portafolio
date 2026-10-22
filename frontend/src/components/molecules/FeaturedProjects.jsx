import Link from "next/link";

export default function FeaturedProjects({ lang = "es", items }) {
  return (
    <div className="flex flex-col gap-24">
      {items.map(({ slug, nombre }) => (
        <Link key={slug} href={`/${lang}/proyectos/${slug}`}>
          {nombre}
        </Link>
      ))}
    </div>
  );
}
