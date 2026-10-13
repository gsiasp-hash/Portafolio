import { proyectos } from "../data/proyectos";
import { locales } from "../i18n/config";

const BASE_URL = "https://portfolio-cydert.vercel.app";

const alternates = (path) => ({
  languages: Object.fromEntries(
    locales.map((lang) => [lang, `${BASE_URL}/${lang}${path}`])
  ),
});

export default function sitemap() {
  const home = locales.map((lang) => ({
    url: `${BASE_URL}/${lang}`,
    lastModified: new Date(),
    priority: 1,
    alternates: alternates(""),
  }));

  const projectPages = proyectos.flatMap((proyecto) =>
    locales.map((lang) => ({
      url: `${BASE_URL}/${lang}/proyectos/${proyecto.slug}`,
      lastModified: new Date(),
      priority: 0.8,
      alternates: alternates(`/proyectos/${proyecto.slug}`),
    }))
  );

  return [...home, ...projectPages];
}
