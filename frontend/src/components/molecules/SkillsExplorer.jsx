"use client";

import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import SkillGroup from "./SkillGroup";

export default function SkillsExplorer({ groups, allLabel, filterLabel }) {
  const [filter, setFilter] = useState("all");
  const visible = filter === "all" ? groups : groups.filter(({ id }) => id === filter);
  const tabs = [{ id: "all", titulo: allLabel }, ...groups];

  return (
    <MotionConfig reducedMotion="user">
      <div
        role="group"
        aria-label={filterLabel}
        className="flex flex-wrap gap-x-5 gap-y-3 mb-8 text-xs"
      >
        {tabs.map(({ id, titulo }) => {
          const selected = filter === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(id)}
              className={`relative pb-1 cursor-pointer transition-colors duration-200 ${
                selected ? "text-ink font-medium" : "text-mute hover:text-ink"
              }`}
            >
              [{titulo}]
              {selected && (
                <motion.span
                  layoutId="skills-filter-underline"
                  aria-hidden="true"
                  className="absolute left-0 right-0 bottom-0 h-0.5 bg-accent"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
            </button>
          );
        })}
      </div>
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {visible.map(({ id, titulo, items }, i) => (
            <motion.div
              key={id}
              layout
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.08, ease: "easeOut" }}
              className={filter !== "all" ? "md:col-span-2" : ""}
            >
              <SkillGroup titulo={titulo} items={items} className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  );
}
