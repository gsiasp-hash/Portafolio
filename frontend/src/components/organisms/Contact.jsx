import ContactCard from "../molecules/ContactCard";
import ContactForm from "../molecules/ContactForm";
import SectionHeader from "../atoms/SectionHeader";
import { enlaces } from "../../data/contacto";

export default function Contact() {
  return (
    <section id="contacto" className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      <SectionHeader title="Contacto" />
      <p className="text-sm text-body leading-relaxed max-w-3xl mb-8">
        ¿Tienes un proyecto en mente o una oportunidad? Déjame un mensaje y te
        respondo a la brevedad.
      </p>
      <ContactForm />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
        {enlaces.map(({ label, value, href, copy }) => (
          <ContactCard
            key={label}
            href={copy ? undefined : href}
            copy={copy}
            label={label}
            value={value}
          />
        ))}
      </div>
    </section>
  );
}
