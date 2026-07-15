import Proyecto from "../components/Proyecto";

const proyectos = [
  {
    nombre: "Pizzeria",
    descripcion:
      "Aplicación web de pedidos de pizza a domicilio con catálogo, carrito de compra y flujo de checkout, desplegada en producción.",
    imagen: "https://opengraph.githubassets.com/1/gsiasp-hash/pizzeria",
    tecnologias: ["JavaScript", "HTML", "CSS"],
    demoUrl: "https://pizzeria-cydert.vercel.app",
    repoUrl: "https://github.com/gsiasp-hash/pizzeria",
  },
  {
    nombre: "Cuppon",
    descripcion:
      "Plataforma para crear y gestionar cupones de descuento, pensada para pequeños comercios que quieren automatizar promociones.",
    imagen: "https://opengraph.githubassets.com/1/gsiasp-hash/Cuppon",
    tecnologias: ["HTML", "CSS"],
    repoUrl: "https://github.com/gsiasp-hash/Cuppon",
  },
  {
    nombre: "Inmobiliaria",
    descripcion:
      "Sitio de listado de propiedades inmobiliarias con búsqueda de inmuebles y fichas de detalle por propiedad.",
    imagen: "https://opengraph.githubassets.com/1/gsiasp-hash/Inmobiliaria",
    tecnologias: ["HTML", "JavaScript", "CSS"],
    repoUrl: "https://github.com/gsiasp-hash/Inmobiliaria",
  },
];

export default function Proyectos() {
  return (
    <div id="proyectos" className="bg-[#020617] text-white py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <h2 className="text-3xl pb-6">//Proyectos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proyectos.map((proyecto) => (
          <Proyecto key={proyecto.nombre} {...proyecto} />
        ))}
      </div>
    </div>
  );
}
