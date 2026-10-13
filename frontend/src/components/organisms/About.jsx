import SectionHeader from "../atoms/SectionHeader";
import InfoCard from "../molecules/InfoCard";
import es from "../../i18n/es";

export default function About({ t = es.about }) {
  return (
    <section
      id="sobre-mi"
      className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto"
    >
      <SectionHeader title={t.title} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <p className="text-sm text-body leading-relaxed max-w-3xl">{t.bio}</p>
        </div>
        <div className="space-y-4">
          {t.cards.map((card) => (
            <InfoCard key={card.label} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
