export default function InfoCard({ label, description, index }) {
  return (
    <div className="group relative p-4 pl-5 border border-hairline rounded-sm bg-surface-card/60 overflow-hidden transition-all duration-300 hover:border-accent hover:-translate-y-0.5 hover:translate-x-1">
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
      />
      <div className="flex items-center gap-2 mb-2">
        <span className="text-accent transition-transform duration-300 group-hover:scale-125">
          ●
        </span>
        <span className="text-xs font-medium text-ink">{label}</span>
        {index !== undefined && (
          <span
            aria-hidden="true"
            className="ml-auto text-[11px] text-mute opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
          >
            [0{index + 1}]
          </span>
        )}
      </div>
      <p className="text-xs text-mute transition-colors duration-300 group-hover:text-body">
        {description}
      </p>
    </div>
  );
}
