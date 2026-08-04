export default function Proyecto({ nombre, descripcion, imagen, tecnologias, demoUrl, repoUrl }) {
  return (
    <article className="border border-hairline rounded-none overflow-hidden flex flex-col hover:border-accent transition-colors duration-300">
      <img
        className="w-full h-44 object-cover"
        alt={`Captura del proyecto ${nombre}`}
        src={imagen}
        loading="lazy"
      />
      <div className="p-6 flex flex-col gap-4 grow">
        <div className="flex items-center gap-2">
          <span className="text-accent">[+]</span>
          <h3 className="text-lg font-medium text-ink">{nombre}</h3>
        </div>
        <p className="text-sm text-body grow leading-relaxed">{descripcion}</p>
        <div className="flex flex-wrap gap-2">
          {tecnologias.map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium text-accent px-2 py-1 border border-accent/30 rounded-sm hover:bg-accent/5 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3 pt-2 border-t border-hairline">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center bg-ink text-canvas hover:bg-ink-deep py-2 px-4 rounded-sm text-sm font-medium transition-colors duration-200"
            >
              Ver demo
            </a>
          )}
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center border border-accent text-accent hover:bg-accent hover:text-canvas py-2 px-4 rounded-sm text-sm font-medium transition-colors duration-200"
          >
            Código
          </a>
        </div>
      </div>
    </article>
  );
}