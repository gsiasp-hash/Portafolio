import ScrambledText from "../rb/ScrambledText";

export default function SectionHeader({ title, className = "", scramble = false }) {
  return (
    <div className={`border-b border-hairline pb-6 mb-8 ${className}`}>
      <h2 className="text-xs font-bold text-ink uppercase tracking-wider">
        [+]
        {scramble ? <ScrambledText className="ml-1">{title}</ScrambledText> : ` ${title}`}
      </h2>
    </div>
  );
}
