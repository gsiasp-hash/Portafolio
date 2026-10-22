function Row({ items, reverse = false, duration }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee overflow-hidden group/marquee">
      <div
        className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}
        style={{ "--marquee-duration": `${duration}s` }}
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            aria-hidden="true"
            data-label={`[${item}]`}
            className="mx-2 px-4 py-2 text-xs font-medium text-mute border border-hairline rounded-sm cursor-default transition-colors duration-200 hover:text-accent hover:border-accent before:content-[attr(data-label)]"
          />
        ))}
      </div>
    </div>
  );
}

export default function SkillsMarquee({ items, label }) {
  const mid = Math.ceil(items.length / 2);
  return (
    <div
      role="img"
      aria-label={`${label}: ${items.join(", ")}`}
      className="space-y-3 pb-6 border-b border-hairline"
    >
      <Row items={items.slice(0, mid)} duration={46} />
      <Row items={items.slice(mid)} reverse duration={52} />
    </div>
  );
}
