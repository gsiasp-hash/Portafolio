const categorias = [
  {
    titulo: "Lenguajes",
    skills: ["HTML", "CSS", "JavaScript"],
  },
  {
    titulo: "Control de versiones",
    skills: ["Git", "GitHub"],
  },
  {
    titulo: "Frameworks y librerías",
    skills: ["React", "Bootstrap", "Tailwind"],
  },
  {
    titulo: "Especialidades",
    skills: ["Programación agéntica", "Consumo de APIs", "Deploys"],
  },
  {
    titulo: "Plataformas",
    skills: ["Shopify", "WordPress (Elementor)"],
  },
];

export default function Skills() {
  return (
    <div id="skills" className="bg-[#020617] text-white py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      <h2 className="text-3xl pb-10">//Skills</h2>
      <div className="flex flex-col gap-10">
        {categorias.map(({ titulo, skills }) => (
          <div key={titulo}>
            <h3 className="text-sm uppercase tracking-wider text-gray-400 pb-4">
              {titulo}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-sm font-medium text-violet-300 bg-violet-500/10 border border-violet-500/30 hover:border-violet-500 rounded-full px-5 py-2 transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
