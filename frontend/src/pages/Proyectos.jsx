import { proyectos } from "../data/proyectos";
import Proyecto from "../components/Proyecto";

export default function Proyectos() {
  return (
    <div id="proyectos" className="bg-[#020617] text-white py-10 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      <h2 className="text-3xl pb-6">//Proyectos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proyectos.map((proyecto) => (
          <Proyecto key={proyecto.nombre} {...proyecto} />
        ))}
      </div>
    </div>
  );
}
