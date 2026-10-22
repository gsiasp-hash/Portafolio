import CaseStudy from "./CaseStudy";
import es from "../../i18n/es";

export default function FeaturedProjects({ lang = "es", t = es.projects, items }) {
  if (!items?.length) return null;

  return (
    <div
      role="region"
      aria-label={t.caseSectionLabel}
      className="flex flex-col gap-16 lg:gap-0"
    >
      {items.map((item, i) => (
        <CaseStudy
          key={item.slug}
          lang={lang}
          t={t}
          item={item}
          number={i + 1}
          total={items.length}
        />
      ))}
    </div>
  );
}
