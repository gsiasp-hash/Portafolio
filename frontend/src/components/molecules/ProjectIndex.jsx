import Link from "next/link";

export default function ProjectIndex({ lang = "es", items }) {
  return (
    <ul className="mt-24">
      {items.map(({ slug, nombre }) => (
        <li key={slug}>
          <Link href={`/${lang}/proyectos/${slug}`}>{nombre}</Link>
        </li>
      ))}
    </ul>
  );
}
