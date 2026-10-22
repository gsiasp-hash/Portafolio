const variants = {
  primary: "bg-ink text-canvas hover:bg-ink-deep",
  secondary:
    "border border-accent text-accent hover:bg-accent hover:text-black",
  ghost:
    "border border-hairline-strong text-mute hover:text-ink hover:border-ink",
};

const sizes = {
  md: "py-3 px-8",
  sm: "py-2 px-4",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  className = "",
  arrow = false,
  children,
  ...props
}) {
  const classes = `group inline-flex items-center justify-center gap-2 ${sizes[size]} rounded-sm text-sm font-medium cursor-pointer transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1"
        >
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
}
