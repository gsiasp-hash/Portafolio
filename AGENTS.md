# AGENTS.md — Portafolio

Portafolio personal de Guillermo Sias (Full Stack Developer). Todo el código vive en `frontend/`.

## Stack

- React 19 + Vite 8
- Tailwind CSS v4 (plugin `@tailwindcss/vite`)
- Framer Motion, GSAP + ScrollTrigger, OGL (partículas)
- Testing: Vitest + React Testing Library (jsdom)
- Lint: ESLint + Prettier (hooks: Husky + lint-staged)
- Deploy: Vercel (`vercel.json`, SPA rewrites)

## Comandos

Todos se ejecutan desde `frontend/`:

```bash
npm run dev        # servidor de desarrollo
npm run build      # build producción → dist/
npm run preview    # preview del build
npm run test       # Vitest (run)
npm run test:watch
npm run lint       # ESLint
npm run format     # Prettier sobre src/**/*.{js,jsx}
```

Verificación obligatoria antes de dar una tarea por terminada: `npm run lint` + `npm run test` + `npm run build` en verde.

## Estructura

```
frontend/src/
├── components/          # Arquitectura Atomic Design
│   ├── atoms/           # Button, Chip, SectionHeader, NavLink
│   ├── molecules/       # ProjectCard, SkillGroup, InfoCard, ContactCard, MobileMenu
│   ├── organisms/       # Navbar, Hero, About, Skills, Projects, Contact, Footer, ScrollToTop
│   ├── templates/       # MainTemplate, AnimatedSection
│   └── rb/              # Componentes React Bits convertidos a .jsx (Particles, FadeContent)
├── pages/               # Home (compone organisms con AnimatedSection)
├── data/                # proyectos.js, skills.js, contacto.js (email + enlaces)
├── css/style.css        # Tokens @theme + JetBrains Mono + base
└── test/                # Tests de componentes
```

- `App.jsx`: monta `MainTemplate` con `Home` dentro.
- `MainTemplate`: fondo `Particles` (fixed, z-0) + contenido `relative z-10` con Navbar y Footer.
- Secciones con transición `AnimatedSection` (GSAP/ScrollTrigger, una sola vez).
- `index.html`: OG/Twitter meta (dominio `guillermosias.dev`).

## Convenciones

- **Diseño:** seguir `frontend/DESIGN.md` y los tokens de `README.md` (`canvas`, `ink`, `body`, `accent`, etc.).
- **Color:** solo azul `#007aff` como acento vivo. Sin sombras, sin degradados.
- **Tipografía:** JetBrains Mono en toda la app.
- **Radio:** `4px` en interactivos, `0px` en contenedores.
- **Componentes React Bits:** están convertidos de TSX a JSX **sin modificar lógica ni GLSL**; si se necesitan otros, convertir igual que `rb/` y documentar.
- **Estilo de código:** archivos `.jsx`/`.js`, sin comentarios salvo que se pidan, seguir estilo de los vecinos.
- **No** tocar `package-lock.json` salvo instalaciones reales (vía `npm i <paquete>`).

## Seguridad e información sensible

- **Nunca** incluir tokens, claves, contraseñas, `.env`, ni archivos `*.local` en código, commits ni documentación.
- Antes de cada commit: revisar `git status` y `git diff`, y confirmar que no se stagean secretos.
- El único dato personal publicado de forma intencional es el email de contacto `g.siasp@gmail.com` (aparece en `Contacto.jsx`, `Footer.jsx` y el placeholder del form). No reutilizarlo para otros usos.
- No exponer datos del autor distintos de los que ya están en el sitio (bio, redes públicas en `Contacto.jsx`).
- Si aparece un secreto, no committearlo: reportar y rotarlo.

## CI

`.github/workflows/ci.yml` corre lint, test y build sobre `frontend/` en cada push/PR a `main` (Node 20). Mantener esos tres checks verdes.
