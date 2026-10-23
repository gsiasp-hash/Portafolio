import SectionHeader from "../atoms/SectionHeader";
import InfoCard from "../molecules/InfoCard";
import { AnimatedSectionUp } from "../templates/AnimatedSection";
import es from "../../i18n/es";

export default function Services({ t = es.services }) {
  return (
    <section
      id="servicios"
      className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto"
    >
      <SectionHeader title={t.title} scramble />
      <p className="text-sm text-body max-w-2xl mb-8">{t.intro}</p>
      <AnimatedSectionUp className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {t.items.map((item, i) => (
          <InfoCard key={item.label} index={i} {...item} />
        ))}
      </AnimatedSectionUp>
    </section>
  );
}
