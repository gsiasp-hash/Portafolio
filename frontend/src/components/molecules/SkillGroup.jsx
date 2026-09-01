import Chip from "../atoms/Chip";
import SpotlightCard from "../rb/SpotlightCard";
import GlareHover from "../rb/GlareHover";

export default function SkillGroup({ titulo, items, className = "" }) {
  return (
    <SpotlightCard
      className={`border border-hairline rounded-none p-6 transition-colors duration-300 ${className}`}
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="text-accent">●</span>
        <h3 className="text-xs font-medium text-mute uppercase tracking-wider">
          {titulo}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <GlareHover key={skill} className="rounded-sm" borderRadius="0.375rem">
            <Chip className="px-3 py-1.5 hover:border-accent">[{skill}]</Chip>
          </GlareHover>
        ))}
      </div>
    </SpotlightCard>
  );
}
