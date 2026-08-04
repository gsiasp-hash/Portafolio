import { skills } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      <div className="border-b border-hairline pb-6 mb-10">
        <h2 className="text-xs font-bold text-ink uppercase tracking-wider">
          [+] Skills
        </h2>
      </div>
      <div className="flex flex-col gap-12">
        {skills.map(({ titulo, skills: items }) => (
          <div key={titulo} className="border-b border-hairline pb-8 last:border-0 last:pb-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-accent">●</span>
              <h3 className="text-xs font-medium text-mute uppercase tracking-wider">
                {titulo}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-medium text-body px-3 py-1.5 border border-accent/30 rounded-sm hover:border-accent text-accent transition-colors duration-200"
                >
                  [{skill}]
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}