"use client";

import { motion } from "framer-motion";

const styles = {
  desktop: {
    base: "relative transition-colors duration-200 pb-0.5",
    active: "text-ink font-medium",
    inactive: "text-mute hover:text-ink",
  },
  mobile: {
    base: "relative block transition-all duration-200",
    active: "text-accent font-medium pl-3",
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
      aria-current={active ? "location" : undefined}
      className={`${style.base} ${active ? style.active : style.inactive}`}
    >
      {children}
      {active && variant === "desktop" && (
        <motion.span
          layoutId="nav-underline"
          aria-hidden="true"
          className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-accent"
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
        />
      )}
      {active && variant === "mobile" && (
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent"
        />
      )}
    </a>
  );
}
