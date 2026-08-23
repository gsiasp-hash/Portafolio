const variants = {
  primary: "bg-ink text-canvas hover:bg-ink-deep",
  secondary:
    "border border-accent text-accent hover:bg-accent hover:text-canvas",
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
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 ${sizes[size]} rounded-sm text-sm font-medium cursor-pointer transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
