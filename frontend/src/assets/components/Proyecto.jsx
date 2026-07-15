export default function Proyecto({ nombre, descripcion, imagen, tecnologias, demoUrl, repoUrl }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col hover:border-violet-500 transition-colors duration-300">
      <img
        className="w-full h-44 object-cover bg-slate-800"
        alt={`Captura del proyecto ${nombre}`}
        src={imagen}
        loading="lazy"
      />
      <div className="p-6 flex flex-col gap-3 grow">
        <h3 className="text-xl font-medium text-white">{nombre}</h3>
        <p className="text-sm text-gray-400 grow">{descripcion}</p>
        <div className="flex flex-wrap gap-2">
          {tecnologias.map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium text-violet-300 bg-violet-500/10 border border-violet-500/30 rounded-full px-2 py-1"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3 mt-2">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm bg-violet-500 hover:bg-violet-700 text-white py-2 px-4 rounded"
            >
              Ver demo
            </a>
          )}
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm bg-transparent border border-violet-950 hover:bg-violet-500 hover:text-white text-violet-400 py-2 px-4 rounded"
          >
            Código
          </a>
        </div>
      </div>
    </div>
  );
}
