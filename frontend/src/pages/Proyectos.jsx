import { proyectos } from "../data/proyectos";
import Proyecto from "../components/Proyecto";

export default function Proyectos() {
  return (
    <section id="proyectos" className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      <div className="border-b border-hairline pb-6 mb-8">
        <h2 className="text-xs font-bold text-ink uppercase tracking-wider">
          [+] Proyectos
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proyectos.map((proyecto) => (
          <Proyecto key={proyecto.nombre} {...proyecto} />
        ))}
      </div>
    </section>
  );
}