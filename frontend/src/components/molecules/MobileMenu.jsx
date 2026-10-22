"use client";

import { AnimatePresence, motion } from "framer-motion";
import Button from "../atoms/Button";
import NavLink from "../atoms/NavLink";

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function MobileMenu({
  open,
  links,
  lang = "es",
  contactLabel = "Contacto",
  activeId,
  onClose,
}) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="mobile-menu"
          className="md:hidden overflow-hidden border-t border-hairline"
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div
            variants={list}
            initial="hidden"
            animate="show"
            className="max-w-6xl mx-auto flex flex-col gap-3 text-xs px-6 py-4"
          >
            {links.map((link) => (
              <motion.div key={link.id} variants={item}>
                <NavLink
                  href={link.href}
                  variant="mobile"
                  active={activeId === link.id}
                  onClick={onClose}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
            <motion.div variants={item}>
              <Button
                size="sm"
                href={`/${lang}#contacto`}
                onClick={onClose}
                className="w-full"
              >
                {contactLabel}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
