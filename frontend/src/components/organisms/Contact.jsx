import ContactCard from "../molecules/ContactCard";
import ContactForm from "../molecules/ContactForm";
import SectionHeader from "../atoms/SectionHeader";
import SpotlightCard from "../rb/SpotlightCard";
import { enlaces } from "../../data/contacto";
import es from "../../i18n/es";

export default function Contact({ t = es.contact }) {
  return (
    <section
      id="contacto"
      className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto"
    >
      <SectionHeader title={t.title} />
      <p className="text-sm text-body leading-relaxed max-w-3xl mb-8">{t.intro}</p>
      <ContactForm t={t.form} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
        {enlaces.map(({ label, value, href, copy }) => (
          <SpotlightCard key={label} className="rounded-sm">
            <ContactCard
              href={copy ? undefined : href}
              copy={copy}
              label={label}
              value={value}
              t={t}
            />
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
