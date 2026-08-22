import Button from "../atoms/Button";
import ContactCard from "../molecules/ContactCard";
import SectionHeader from "../atoms/SectionHeader";
import { EMAIL, enlaces } from "../../data/contacto";

export default function Contact() {
  return (
    <section id="contacto" className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      <SectionHeader title="Contacto" />
      <p className="text-sm text-body leading-relaxed max-w-3xl mb-8">
        ¿Tienes un proyecto en mente o una oportunidad? Escríbeme y te respondo
        a la brevedad.
      </p>
      <Button
        href={`mailto:${EMAIL}?subject=Contacto desde portfolio&body=Hola Guillermo, `}
      >
        Enviar email
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {enlaces.map(({ label, value, href }) => (
          <ContactCard
            key={label}
            href={href}
            external={label !== "Email"}
            label={label}
            value={value}
          />
        ))}
      </div>
    </section>
  );
}
