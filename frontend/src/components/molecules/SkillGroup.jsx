import Chip from "../atoms/Chip";

export default function SkillGroup({ titulo, items }) {
  return (
    <div className="border-b border-hairline pb-8 last:border-0 last:pb-0">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-accent">●</span>
        <h3 className="text-xs font-medium text-mute uppercase tracking-wider">
          {titulo}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <Chip key={skill} className="px-3 py-1.5 hover:border-accent">
            [{skill}]
          </Chip>
        ))}
      </div>
    </div>
  );
}
