# Portafolio personal — Guillermo Sias

Full Stack Developer · Ingeniero en Sonido

**Stack:** React 19 · Tailwind CSS v4 · Vite · Framer Motion · GSAP · OGL  
**Testing:** Vitest + React Testing Library

---

## Sistema de diseño

| Token | Valor | Uso |
|-------|-------|-----|
| `canvas` | `#fdfcfc` | Fondo base (crema cálida) |
| `ink` | `#201d1d` | Texto principal, bordes, botones primarios |
| `ink-deep` | `#0f0000` | Estado pressed de botones primarios |
| `body` | `#424245` | Texto de párrafo |
| `mute` | `#646262` | Texto secundario, metadatos |
| `ash` | `#9a9898` | Texto deshabilitado |
| `surface-soft` | `#f8f7f7` | Fondos de tarjetas suaves |
| `surface-card` | `#f1eeee` | Fondos de tarjetas elevadas |
| `hairline` | `rgba(15,0,0,0.12)` | Divisores 1px |
| `hairline-strong` | `#646262` | Divisores enfatizados |
| `accent` | `#007aff` | **Único color de acento** (azul Apple) |
| `accent-hover` | `#0056b3` | Hover en enlaces/botones acento |
| `accent-active` | `#004085` | Active en enlaces/botones acento |

**Tipografía:** JetBrains Mono (pesos 400/500/700) — sustituto de Berkeley Mono según DESIGN.md  
**Radio:** `4px` en interactivos, `0px` en contenedores  
**Espaciado:** Secciones a `96px` (`spacing.section`), ritmo interno `16px`  
**Sin sombras, sin degradados, sin colores extra** — solo azul `#007aff` como acento vivo.

---

## Integración React Bits

Este proyecto usa **componentes oficiales de [React Bits](https://reactbits.dev)** (repo: `DavidHDev/react-bits`) convertidos de TypeScript (`.tsx`) a JavaScript (`.jsx`) — **sin inventar lógica ni GLSL**.

### Componentes usados

| Componente | Origen | Dependencia | Propósito |
|------------|--------|-------------|-----------|
| `Particles` | `src/ts-tailwind/Backgrounds/Particles/` | `ogl` | Fondo de partículas WebGL azules en toda la página |
| `FadeContent` | `src/ts-tailwind/Animations/FadeContent/` | `gsap` + `ScrollTrigger` | Transiciones fade-in al hacer scroll |

### Ubicación en el código

```
src/
├── components/
│   ├── rb/                    # Componentes React Bits (wrappers)
│   │   ├── Particles.jsx      # Fondo de partículas (config: azul disperso)
│   │   └── FadeContent.jsx    # Transición GSAP/ScrollTrigger
│   ├── AnimatedSection.jsx    # Wrapper que usa FadeContent internamente
│   ├── Hero.jsx               # Hero simplificado (sin TUI/consola)
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Proyecto.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ScrollToTop.jsx        # Sigue usando Framer Motion
├── pages/
│   ├── Home.jsx               # Orquesta secciones con AnimatedSection
│   ├── Skills.jsx
│   ├── Proyectos.jsx
│   └── Contacto.jsx
├── App.jsx                    # Monta Particles fixed + Navbar + Home + Footer
└── css/style.css              # Tokens @theme + JetBrains Mono + base
```

### Particles (fondo)

- **Archivo:** `src/components/rb/Particles.jsx`
- **Configuración (azul, disperso para no dificultar la lectura):**
  ```js
  particleCount: 400
  particleSpread: 22
  particleBaseSize: 110
  cameraDistance: 22
  cameraFov: 55
  speed: 0.12
  particleColors: ['#007aff', '#4da6ff', '#80c0ff', '#b3d4ff']
  alphaParticles: true
  ```
- **Montaje:** En `App.jsx` como capa `fixed inset-0 pointer-events-none z-0`; todo el contenido va en un wrapper `relative z-10`.
- **Stacking:** canvas WebGL en `z-index: 0`, contenido en `z-10` (ver `App.jsx`).
- **Visibilidad:** Las secciones **no** tienen `bg-canvas` (fondo crema opaco); el `body` es transparente y el canvas WebGL (alpha: true) se superpone detrás de todo.
- **⚠️ Importante:** el componente debe llamar `container.appendChild(gl.canvas)` tras crear el `Renderer` — sin eso el canvas nunca entra al DOM y no se ve nada.

### FadeContent (transiciones)

- **Archivo:** `src/components/rb/FadeContent.jsx`
- **Uso:** `AnimatedSection.jsx` lo envuelve manteniendo la misma API (`children`, `className`).
- **Configuración:**
  ```js
  duration: 800
  ease: 'power2.out'
  threshold: 0.15
  blur: true
  ```
- **ScrollTrigger:** Se activa cuando el elemento entra al viewport (una sola vez, `once: true`).

---

## Estructura de la página

```
App.jsx
├── Particles (fixed full-screen background, z-0)
├── Navbar (sticky, hairline bottom, links + CTA "Contacto")
├── Home.jsx
│   ├── Hero (nombre, subtitle tech stack, 3 CTAs)
│   ├── AnimatedSection → About
│   ├── AnimatedSection → Skills
│   ├── AnimatedSection → Proyectos
│   ├── AnimatedSection → Contacto
│   └── ScrollToTop
└── Footer (hairline top, links acento azul)
```

---

## Scripts

```bash
npm run dev       # Servidor de desarrollo (Vite)
npm run build     # Build producción
npm run preview   # Preview del build
npm run test      # Tests (Vitest)
npm run test:watch
npm run lint      # ESLint
npm run format    # Prettier
```

---

## Tests

- `src/test/Hero.test.jsx` — nombre, subtitle, CTAs
- `src/test/About.test.jsx` — título `[+] Sobre mi`, bio
- `src/test/Skills.test.jsx` — título `[+] Skills`, categorías, skills individuales

```bash
npm test        # 8 tests pasando
npm run lint    # 0 errores
npm run build   # Build exitoso
```

---

## Decisiones de diseño clave

1. **Solo azul (`#007aff`)** como color vivo — nada de violeta, verde, naranja, rojo.
2. **Sin consola/TUI** en el Hero — el foco es la persona, no el efecto.
3. **Fondo Particles** azul disperso (`particleSpread: 22`, `cameraDistance: 22`) para "dar vida" sin dificultar la lectura.
4. **Transiciones GSAP/ScrollTrigger** — más suaves y performantes que el fade manual anterior.
5. **JetBrains Mono** en todo — identidad monolítica tipo manpage/README.
6. **Documentación en este README** — sin información sensible (no emails privados, no tokens, no claves).

---

## Créditos

- **React Bits** — Componentes `Particles` y `FadeContent` (MIT, DavidHDev/react-bits)
- **DESIGN.md** — Sistema de diseño base (OpenCode/Anomaly)
- **JetBrains Mono** — Google Fonts (SIL Open Font License)