"use client";

import { useEffect, useState } from "react";

export default function TerminalRole({
  roles,
  prompt = "stack",
  typeSpeed = 65,
  eraseSpeed = 35,
  hold = 1500,
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches),
      0
    );
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const word = roles[index];
    let timer;
    if (!erasing && length < word.length) {
      timer = setTimeout(() => setLength(length + 1), typeSpeed);
    } else if (!erasing) {
      timer = setTimeout(() => setErasing(true), hold);
    } else if (length > 0) {
      timer = setTimeout(() => setLength(length - 1), eraseSpeed);
    } else {
      timer = setTimeout(() => {
        setErasing(false);
        setIndex((index + 1) % roles.length);
      }, eraseSpeed);
    }
    return () => clearTimeout(timer);
  }, [reduced, roles, index, length, erasing, typeSpeed, eraseSpeed, hold]);

  const shown = reduced ? roles.join(" · ") : roles[index].slice(0, length);

  return (
    <p className={`font-medium text-body ${className}`}>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">
        <span className="text-mute">{prompt} $ </span>
        <span className="text-accent">{shown}</span>
        {!reduced && (
          <span className="inline-block w-[0.6ch] h-[1em] -mb-[0.15em] ml-0.5 bg-accent animate-[blink_1s_steps(1)_infinite]" />
        )}
      </span>
    </p>
  );
}
