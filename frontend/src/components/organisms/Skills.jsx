import SectionHeader from "../atoms/SectionHeader";
import SkillGroup from "../molecules/SkillGroup";
import { skills } from "../../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      <SectionHeader title="Skills" className="mb-10" />
      <div className="flex flex-col gap-12">
        {skills.map(({ titulo, skills: items }) => (
          <SkillGroup key={titulo} titulo={titulo} items={items} />
        ))}
      </div>
    </section>
  );
}
