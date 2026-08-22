export default function SectionHeader({ title, className = "" }) {
  return (
    <div className={`border-b border-hairline pb-6 mb-8 ${className}`}>
      <h2 className="text-xs font-bold text-ink uppercase tracking-wider">
        [+] {title}
      </h2>
    </div>
  );
}
