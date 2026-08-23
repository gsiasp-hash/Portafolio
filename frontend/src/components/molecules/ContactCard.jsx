export default function ContactCard({ href, external = false, label, value }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flex items-center justify-between gap-3 p-4 border border-hairline rounded-sm bg-surface-card/60 hover:border-accent transition-colors duration-300"
    >
      <div className="flex flex-col overflow-hidden">
        <span className="text-xs text-mute">{label}</span>
        <span className="text-sm text-accent truncate">{value}</span>
      </div>
      <span className="text-accent shrink-0">↗</span>
    </a>
  );
}
