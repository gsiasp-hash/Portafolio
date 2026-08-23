# AGENTS.md — Portafolio

Portafolio personal de Guillermo Sias (Full Stack Developer). Todo el código vive en `frontend/`.

## Stack

- Next.js 16 (App Router) + React 19 — JSX sin TypeScript
- Tailwind CSS v4 (plugin `@tailwindcss/postcss`)
- Framer Motion, GSAP + ScrollTrigger, OGL (partículas)
- Testing: Vitest + React Testing Library (jsdom) (`vitest.config.mjs` con `@vitejs/plugin-react`, solo para tests)
- Lint: ESLint + Prettier (hooks: Husky + lint-staged)
- Deploy: Vercel (framework Next.js, output autodetectado)

**Importante:** usar bundler **webpack** (`--webpack` en `dev` y `build`). Turbopack tiene un bug abierto con `@tailwindcss/postcss` en este setup (`FileSystemPath("") ... leaves the filesystem root` al compilar el CSS). No quitar el flag sin verificar un build verde.

## Comandos

Todos se ejecutan desde `frontend/`:

```bash
npm run dev        # servidor de desarrollo (next dev --webpack)
npm run build      # build producción (next build --webpack)
npm start          # sirve el build de producción
npm run test       # Vitest (run)
npm run test:watch
npm run lint       # ESLint
npm run format     # Prettier sobre src/**/*.{js,jsx}
```

Verificación obligatoria antes de dar una tarea por terminada: `npm run lint` + `npm run test` + `npm run build` en verde.

## Estructura

```
frontend/src/
├── app/                   # App Router: layout.jsx (metadata OG, Analytics) + page.jsx
├── components/            # Arquitectura Atomic Design
│   ├── atoms/           # Button, Chip, SectionHeader, NavLink
│   ├── molecules/       # ProjectCard, SkillGroup, InfoCard, ContactCard, MobileMenu
│   ├── organisms/       # Navbar, Hero, About, Skills, Projects, Contact, Footer, ScrollToTop
│   ├── templates/       # MainTemplate, AnimatedSection
│   └── rb/              # Componentes React Bits convertidos a .jsx (Particles, FadeContent)
├── sections/              # Home (compone organisms con AnimatedSection)
├── data/                  # proyectos.js, skills.js, contacto.js (email + enlaces)
├── css/style.css          # Tokens @theme + JetBrains Mono (@import Google Fonts) + base
└── test/                  # Tests de componentes
```

- `app/layout.jsx`: `<html lang="es">`, metadata OG/Twitter vía `export const metadata` (`metadataBase: guillermosias.dev`) y `<Analytics />` de Vercel. Envuelve todo en `MainTemplate`.
- `MainTemplate`: fondo `Particles` (fixed, z-0) + contenido `relative z-10` con Navbar y Footer.
- Secciones con transición `AnimatedSection` (GSAP/ScrollTrigger, una sola vez).
- `"use client"` solo donde hace falta: `rb/Particles`, `rb/FadeContent`, `organisms/Navbar`, `organisms/ScrollToTop`. Todo lo demás es Server Component.
- NO crear carpeta `pages/`: Next la interpretaría como Pages Router (ruta fantasma). Las vistas viven en `sections/`.

## Convenciones

- **Diseño:** seguir `frontend/DESIGN.md` y los tokens de `README.md` (`canvas`, `ink`, `body`, `accent`, etc.).
- **Color:** solo azul `#007aff` como acento vivo. Sin sombras, sin degradados.
- **Tipografía:** JetBrains Mono en toda la app.
- **Tema:** oscuro por defecto. El script inline de `layout.jsx` agrega `class="dark"` a `<html>` antes del primer paint salvo que `localStorage.theme === "light"`. Los tokens claros viven en `@theme`; los oscuros sobrescriben las mismas variables CSS dentro de `.dark` en `style.css` — así todas las utilidades (`text-ink`, `bg-canvas`, etc.) se invierten solas sin tocar componentes. Toggle: átomo `ThemeToggle` (en Navbar).
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
