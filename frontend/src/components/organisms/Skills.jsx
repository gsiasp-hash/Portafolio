import SectionHeader from "../atoms/SectionHeader";
import SkillGroup from "../molecules/SkillGroup";
import { AnimatedSectionUp } from "../templates/AnimatedSection";
import { skills } from "../../data/skills";

export default function Skills() {
  return (
    <section
      id="skills"
      className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto"
    >
      <AnimatedSectionUp>
        <SectionHeader title="Skills" className="mb-10" scramble />
      </AnimatedSectionUp>
      <AnimatedSectionUp className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map(({ titulo, skills: items }) => (
          <SkillGroup key={titulo} titulo={titulo} items={items} className="h-full" />
        ))}
      </AnimatedSectionUp>
    </section>
  );
}
