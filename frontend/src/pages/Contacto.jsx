const EMAIL = "g.siasp@gmail.com";

function IconEmail(props) {
  return <span className="w-5 h-5 flex items-center justify-center text-accent" {...props}>[@]</span>;
}

function IconGitHub(props) {
  return <span className="w-5 h-5 flex items-center justify-center text-accent" {...props}>[gh]</span>;
}

function IconLinkedIn(props) {
  return <span className="w-5 h-5 flex items-center justify-center text-accent" {...props}>[in]</span>;
}

const enlaces = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, Icon: IconEmail },
  {
    label: "GitHub",
    value: "gsiasp-hash",
    href: "https://github.com/gsiasp-hash",
    Icon: IconGitHub,
  },
  {
    label: "LinkedIn",
    value: "guillermo-sias",
    href: "https://www.linkedin.com/in/guillermo-sias-762775180/",
    Icon: IconLinkedIn,
  },
];

function IconSend(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
      />
    </svg>
  );
}

export default function Contacto() {
  return (
    <section id="contacto" className="text-ink py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      <div className="border-b border-hairline pb-6 mb-8">
        <h2 className="text-xs font-bold text-ink uppercase tracking-wider">
          [+] Contacto
        </h2>
      </div>
      <p className="text-sm text-body mb-8 max-w-xl">
        ¿Tienes un proyecto en mente o una oportunidad? Escríbeme y te
        respondo a la brevedad.
      </p>

      <a
        href={`mailto:${EMAIL}?subject=Contacto desde portfolio&body=Hola Guillermo, `}
        className="inline-flex items-center gap-2 bg-ink text-canvas hover:bg-ink-deep py-3 px-6 rounded-sm text-sm font-medium transition-colors duration-200"
      >
        <IconSend className="w-4 h-4" />
        Enviar email
      </a>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
        {enlaces.map(({ label, value, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={label === "Email" ? undefined : "_blank"}
            rel={label === "Email" ? undefined : "noreferrer"}
            className="flex items-center gap-4 border border-accent/20 hover:border-accent rounded-sm p-4 transition-colors duration-200"
          >
            <Icon className="shrink-0" />
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-medium text-accent uppercase tracking-wider">{label}</span>
              <span className="text-sm font-medium text-ink truncate">{value}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}