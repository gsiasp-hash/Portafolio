import SectionHeader from "../atoms/SectionHeader";
import SkillGroup from "../molecules/SkillGroup";
import { AnimatedSectionUp } from "../templates/AnimatedSection";
import { skills } from "../../data/skills";
import es from "../../i18n/es";

export default function Skills({ t = es.skills }) {
  const traducir = (item) => (item.startsWith("@") ? t.items[item.slice(1)] : item);
  return (
    <section
      id="skills"
      className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto"
    >
      <AnimatedSectionUp>
        <SectionHeader title={t.title} className="mb-10" scramble />
      </AnimatedSectionUp>
      <AnimatedSectionUp className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map(({ id, skills: items }) => (
          <SkillGroup
            key={id}
            titulo={t.groups[id]}
            items={items.map(traducir)}
            className="h-full"
          />
        ))}
      </AnimatedSectionUp>
    </section>
  );
}
