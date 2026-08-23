export const proyectos = [
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
    tecnologias: ["TypeScript", "Next.js", "React", "Supabase", "Groq"],
    demoUrl: "https://asistente-rag-plum.vercel.app",
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
    tecnologias: ["React", "Node.js", "Express", "Tailwind CSS", "JWT"],
    demoUrl: "https://pizzeria-blush-kappa.vercel.app/",
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
    tecnologias: ["HTML", "JavaScript", "CSS"],
    demoUrl: "https://gsiasp-hash.github.io/Inmobiliaria/",
    repoUrl: "https://github.com/gsiasp-hash/Inmobiliaria",
  },
];

export function getProyectos() {
  return proyectos;
}

export function getProyectoPorSlug(slug) {
  return proyectos.find((proyecto) => proyecto.slug === slug);
}
