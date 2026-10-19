import { proyectosEn } from "./proyectos.en";

export const proyectos = [
  {
    slug: "promusic-chat",
    nombre: "Chatbot IA Promusic",
    descripcion:
      "Chatbot comercial con IA integrado en la tienda Shopify de Promusic: responde consultas de catálogo, servicios y tienda en tiempo real, gestiona carrito y seguimiento de envío, y deriva a ventas cuando corresponde.",
    resumen: [
      "Chatbot de atención e impulso de ventas para la tienda Shopify de Promusic (promusic.cl), en producción real atendiendo clientes. Construido sobre el template oficial de Shopify para agentes de chat y extendido con lógica propia: responde preguntas de catálogo (uso, especificaciones, compatibilidad y accesorios), información de espacios y cursos de la Academia, horario, envíos, métodos de pago y garantías, todo leído en vivo desde la tienda real en vez de contenido estático.",
      "Permite agregar productos al carrito desde la conversación, ofrece venta cruzada basada en las recomendaciones reales de Shopify para cada producto, informa el estado de envío y entiende la jerga técnica de la industria del audio en Chile. Cuando la consulta requiere asesoría a medida o una cotización personalizada, deriva automáticamente al equipo comercial en vez de improvisar una recomendación.",
      "El comportamiento del bot sigue reglas explícitas: no asesora en profundidad, nunca expone información sensible de la empresa, se mantiene dentro del tópico tienda y nunca inventa precios, stock o plazos — si no tiene el dato, lo dice y ofrece el canal humano. El acceso a herramientas sensibles (carrito, checkout, datos de cliente) está bloqueado a nivel de código, no solo de instrucciones al modelo, y el proyecto pasó por una auditoría de seguridad completa (tokens de sesión, XSS, rate-limiting, verificación de webhooks).",
      "Stack: app de Shopify (React Router) con Claude como LLM, Prisma y PostgreSQL para sesiones, lectura en vivo del catálogo y páginas de la tienda vía Storefront/Admin API, y despliegue en un VPS propio gestionado con Coolify.",
    ],
    imagen: "/projects/promusic-chat.png",
    screenshot: "/projects/promusic-chat.png",
    tecnologias: ["Shopify", "Claude", "React Router", "Prisma", "PostgreSQL"],
    demoUrl: "https://www.promusic.cl",
  },
  {
    slug: "studio-fest",
    nombre: "Studio Fest — App de Registro",
    descripcion:
      "App de pre-inscripción, check-in de staff y vista pública para Studio Fest, el evento de Promusic con 4 espacios funcionando en simultáneo.",
    resumen: [
      "Aplicación a medida para Studio Fest, el evento de Promusic con 4 espacios funcionando en paralelo (Estudio, Live Stage, Showroom y Patio) repartidos en bloques horarios compartidos. Reemplaza una solución basada en PowerApps: los asistentes se preinscriben una sola vez eligiendo actividad por bloque, y el staff de cada espacio revisa y gestiona su lista de inscritos desde un panel propio protegido por PIN.",
      "El panel de staff permite marcar asistencia en tiempo real, agregar gente que llega sin reserva previa, buscar por nombre y ver estadísticas generales del evento. La parte pública muestra programa, expositores, ubicación y una vista \"en vivo\" de qué actividad está ocurriendo en cada espacio en cada momento, además de que cada asistente puede consultar su propia agenda por email.",
      "Los datos de inscripción viven en Microsoft Lists (SharePoint) y se exponen a la app a través de un flow de Power Automate que actúa como API HTTP, evitando registrar una app en Azure/Entra y la gestión de permisos que eso implicaría. Un snapshot en memoria, actualizado en segundo plano, mantiene la app rápida incluso cuando esa API externa responde lento.",
      "Stack: Next.js 16 (App Router) y TypeScript, Tailwind CSS v4, Power Automate como backend de datos, desplegado vía Docker en un VPS propio con Coolify.",
    ],
    imagen: "/projects/studio-fest.png",
    screenshot: "/projects/studio-fest.png",
    tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "Power Automate"],
    demoUrl: "https://studiofest.promusic.cl",
  },
  {
    slug: "asistente-rag",
    nombre: "Asistente RAG",
    descripcion:
      "Asistente de soporte al cliente basado en RAG: indexa PDFs de conocimiento y responde en un chat con streaming, memoria conversacional y búsqueda vectorial sobre pgvector.",
    resumen: [
      "Sistema de soporte al cliente inteligente basado en RAG (Retrieval-Augmented Generation): se cargan PDFs de conocimiento (FAQs, políticas, manuales) y un chat responde preguntas en tiempo real anclándose únicamente a esos documentos, sin alucinaciones. Incluye un panel de administración multi-tenant pensado para demostraciones públicas.",
      "La ingesta procesa los PDFs con extracción de texto, fragmentación inteligente y embeddings semánticos. El chat responde en streaming token a token (SSE), mantiene memoria conversacional de las últimas 10 interacciones de la sesión y practica el rechazo honesto: si la información no está en los documentos, lo dice en vez de inventar.",
      "La arquitectura es multi-tenant sin login: sesiones anónimas aisladas con limpieza automática, búsqueda vectorial híbrida entre documentos globales y privados, y blindajes de cuota (límites por sesión y contadores diarios) diseñados para vivir dentro de los free tiers de los proveedores.",
      "Stack: Next.js 16 (App Router) con TypeScript estricto, Route Handlers como API de mismo origen, Supabase (PostgreSQL + pgvector) como base vectorial, embeddings de Google Gemini (gemini-embedding-001) y Groq Cloud como LLM. Modelos configurables vía variables de entorno.",
    ],
    imagen: "https://opengraph.githubassets.com/1/gsiasp-hash/Asistente-clientes-RAG",
    screenshot: "/projects/asistente-rag.png",
    tecnologias: ["TypeScript", "Next.js", "React", "Supabase", "Groq"],
    demoUrl: "https://asistenterag.guillermosias.dev",
    repoUrl: "https://github.com/gsiasp-hash/Asistente-clientes-RAG",
  },
  {
    slug: "pizzeria",
    nombre: "Pizzeria",
    descripcion:
      "Aplicación full-stack de pedidos de pizza con catálogo, carrito y checkout, autenticación JWT y API REST propia en Express.",
    resumen: [
      "Proyecto full-stack de una pizzería con catálogo de pizzas, carrito de compras y autenticación de usuarios basada en JWT. El frontend consume una API REST propia que gestiona usuarios, pizzas y un checkout simulado, con protección de rutas mediante tokens Bearer.",
      "El estado global se maneja con React Context (Cart, User, Pizzas) y el enrutamiento es SPA con React Router: Login, Register, Profile, Cart, Home y página 404. Las notificaciones usan react-hot-toast y los íconos lucide-react.",
      "El backend corre en Node.js + Express con arquitectura por capas (routes → controllers → models → middlewares), persistencia mediante archivos JSON y contraseñas que nunca se guardan en texto plano: hash con scrypt, salt aleatoria por usuario y comparación en tiempo constante.",
    ],
    imagen: "https://opengraph.githubassets.com/1/gsiasp-hash/pizzeria",
    screenshot: "/projects/pizzeria.png",
    tecnologias: ["React", "Node.js", "Express", "Tailwind CSS", "JWT"],
    demoUrl: "https://pizzeria.guillermosias.dev",
    repoUrl: "https://github.com/gsiasp-hash/pizzeria",
  },
  {
    slug: "cuppon",
    nombre: "Cuppon",
    descripcion:
      "Plataforma para crear y gestionar cupones de descuento, pensada para pequeños comercios que quieren automatizar promociones.",
    resumen: [
      "Landing de cupones de descuento organizados por categorías (comida, tecnología, cuidado personal y más), con una página dedicada por categoría para navegar las promociones disponibles de forma directa.",
      "Sitio estático multipágina construido con HTML5 y CSS3, con foco en maquetación responsive y jerarquía visual clara para destacar cada oferta y facilitar la lectura de condiciones.",
    ],
    imagen: "https://opengraph.githubassets.com/1/gsiasp-hash/Cuppon",
    screenshot: "/projects/cuppon.png",
    tecnologias: ["HTML", "CSS"],
    demoUrl: "https://gsiasp-hash.github.io/Cuppon/",
    repoUrl: "https://github.com/gsiasp-hash/Cuppon",
  },
  {
    slug: "inmobiliaria",
    nombre: "Inmobiliaria",
    descripcion:
      "Sitio de listado de propiedades inmobiliarias con búsqueda de inmuebles y fichas de detalle por propiedad.",
    resumen: [
      "Sitio de bienes raíces que presenta propiedades en venta y en arriendo, con páginas dedicadas por tipo de operación y fichas individuales por inmueble dentro del catálogo.",
      "Proyecto estático construido con HTML5, CSS3 y JavaScript vanilla, centrado en un layout responsive y en la presentación visual del portafolio de propiedades.",
    ],
    imagen: "https://opengraph.githubassets.com/1/gsiasp-hash/Inmobiliaria",
    screenshot: "/projects/inmobiliaria.png",
    tecnologias: ["HTML", "JavaScript", "CSS"],
    demoUrl: "https://gsiasp-hash.github.io/Inmobiliaria/",
    repoUrl: "https://github.com/gsiasp-hash/Inmobiliaria",
  },
];

function localizar(proyecto, lang) {
  if (lang !== "en") return proyecto;
  return { ...proyecto, ...proyectosEn[proyecto.slug] };
}

export function getProyectos(lang = "es") {
  return proyectos.map((proyecto) => localizar(proyecto, lang));
}

export function getProyectoPorSlug(slug, lang = "es") {
  const proyecto = proyectos.find((p) => p.slug === slug);
  return proyecto && localizar(proyecto, lang);
}
