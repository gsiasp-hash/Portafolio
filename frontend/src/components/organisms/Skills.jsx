import SectionHeader from "../atoms/SectionHeader";
import SkillsExplorer from "../molecules/SkillsExplorer";
import SkillsMarquee from "../molecules/SkillsMarquee";
import { AnimatedSectionUp } from "../templates/AnimatedSection";
import { skills } from "../../data/skills";
import es from "../../i18n/es";

export default function Skills({ t = es.skills }) {
  const traducir = (item) => (item.startsWith("@") ? t.items[item.slice(1)] : item);
  const groups = skills.map(({ id, skills: items }) => ({
    id,
    titulo: t.groups[id],
    items: items.map(traducir),
  }));
  const todas = [...new Set(groups.flatMap(({ items }) => items))];

  return (
    <section
      id="skills"
      className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto"
    >
      <AnimatedSectionUp>
        <SectionHeader title={t.title} className="mb-10" scramble />
      </AnimatedSectionUp>
      <SkillsMarquee items={todas} label={t.marqueeLabel} />
      <SkillsExplorer groups={groups} allLabel={t.all} filterLabel={t.filterLabel} />
    </section>
  );
}
