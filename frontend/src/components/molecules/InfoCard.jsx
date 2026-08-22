export default function InfoCard({ label, description }) {
  return (
    <div className="p-4 border border-hairline rounded-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-accent">●</span>
        <span className="text-xs font-medium text-ink">{label}</span>
      </div>
      <p className="text-xs text-mute">{description}</p>
    </div>
  );
}
