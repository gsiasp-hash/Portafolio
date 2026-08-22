import Button from "../atoms/Button";
import NavLink from "../atoms/NavLink";

export default function MobileMenu({ open, links, activeId, onClose }) {
  return (
    <div
      className={`md:hidden overflow-hidden transition-all duration-300 border-hairline ${
        open ? "max-h-60 border-t" : "max-h-0"
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-3 text-xs px-6 py-4">
        {links.map((link) => (
          <NavLink
            key={link.id}
            href={link.href}
            variant="mobile"
            active={activeId === link.id}
            onClick={onClose}
          >
            {link.label}
          </NavLink>
        ))}
        <Button size="sm" href="#contacto" onClick={onClose} className="w-full">
          Contacto
        </Button>
      </div>
    </div>
  );
}
