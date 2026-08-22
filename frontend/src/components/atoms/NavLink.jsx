const styles = {
  desktop: {
    base: "transition-colors duration-200 pb-0.5",
    active: "text-ink font-medium border-b-2 border-accent",
    inactive: "text-mute hover:text-ink",
  },
  mobile: {
    base: "transition-colors duration-200",
    active: "text-accent font-medium",
    inactive: "text-mute hover:text-ink",
  },
};

export default function NavLink({
  href,
  active = false,
  variant = "desktop",
  onClick,
  children,
}) {
  const style = styles[variant];

  return (
    <a
      href={href}
      onClick={onClick}
      className={`${style.base} ${active ? style.active : style.inactive}`}
    >
      {children}
    </a>
  );
}
