export default function Chip({ className = "", children, ...props }) {
  return (
    <span
      className={`text-xs font-medium text-accent border border-accent/30 rounded-sm transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
