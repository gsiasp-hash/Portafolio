import SectionHeader from "../atoms/SectionHeader";
import InfoCard from "../molecules/InfoCard";
import RevealText from "../molecules/RevealText";
import StatCounter from "../molecules/StatCounter";
import Timeline from "../molecules/Timeline";
import { AnimatedSectionUp } from "../templates/AnimatedSection";
import { skills } from "../../data/skills";
import { proyectos } from "../../data/proyectos";
import es from "../../i18n/es";

const YEARS = 10;
const technologies = new Set(skills.flatMap(({ skills: items }) => items)).size;

export default function About({ t = es.about }) {
  const stats = [
    { value: YEARS, suffix: "+", label: t.stats.years },
    { value: technologies, suffix: "", label: t.stats.tech },
    { value: proyectos.length, suffix: "", label: t.stats.projects },
  ];

  return (
    <section
      id="sobre-mi"
      className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto"
    >
      <SectionHeader title={t.title} />
      <div className="grid grid-cols-1 sm:grid-cols-3 border border-hairline mb-12">
        {stats.map((stat, i) => (
          <StatCounter
            key={stat.label}
            {...stat}
            className={i > 0 ? "border-t sm:border-t-0 sm:border-l" : ""}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <RevealText
          text={t.bio}
          className="md:col-span-2 text-sm text-body leading-relaxed max-w-3xl"
        />
        <AnimatedSectionUp className="space-y-4">
          {t.cards.map((card, i) => (
            <InfoCard key={card.label} index={i} {...card} />
          ))}
        </AnimatedSectionUp>
      </div>
      <Timeline title={t.timelineTitle} steps={t.timeline} />
    </section>
  );
}
