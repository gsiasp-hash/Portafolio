import { proyectos } from "../data/proyectos";

const BASE_URL = "https://portfolio-cydert.vercel.app";

export default function sitemap() {
  const home = {
    url: BASE_URL,
    lastModified: new Date(),
    priority: 1,
  };

  const projectPages = proyectos.map((proyecto) => ({
    url: `${BASE_URL}/proyectos/${proyecto.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [home, ...projectPages];
}
