export const proyectosEn = {
  "asistente-rag": {
    descripcion:
      "RAG-based customer support assistant: indexes knowledge PDFs and answers in a chat with streaming, conversational memory and vector search on pgvector.",
    resumen: [
      "Intelligent customer support system based on RAG (Retrieval-Augmented Generation): knowledge PDFs (FAQs, policies, manuals) are uploaded and a chat answers questions in real time grounded only in those documents, with no hallucinations. It includes a multi-tenant admin panel designed for public demos.",
      "Ingestion processes the PDFs with text extraction, smart chunking and semantic embeddings. The chat streams answers token by token (SSE), keeps conversational memory of the last 10 interactions in the session and refuses honestly: if the information is not in the documents, it says so instead of making things up.",
      "The architecture is multi-tenant without login: isolated anonymous sessions with automatic cleanup, hybrid vector search across global and private documents, and quota safeguards (per-session limits and daily counters) designed to live within the providers' free tiers.",
      "Stack: Next.js 16 (App Router) with strict TypeScript, Route Handlers as a same-origin API, Supabase (PostgreSQL + pgvector) as the vector database, Google Gemini embeddings (gemini-embedding-001) and Groq Cloud as the LLM. Models configurable through environment variables.",
    ],
  },
  pizzeria: {
    descripcion:
      "Full-stack pizza ordering app with catalog, cart and checkout, JWT authentication and a custom Express REST API.",
    resumen: [
      "Full-stack pizzeria project with a pizza catalog, shopping cart and JWT-based user authentication. The frontend consumes a custom REST API that manages users, pizzas and a simulated checkout, with route protection through Bearer tokens.",
      "Global state is handled with React Context (Cart, User, Pizzas) and routing is an SPA with React Router: Login, Register, Profile, Cart, Home and a 404 page. Notifications use react-hot-toast and icons come from lucide-react.",
      "The backend runs on Node.js + Express with a layered architecture (routes → controllers → models → middlewares), persistence through JSON files and passwords that are never stored in plain text: scrypt hashing, a random per-user salt and constant-time comparison.",
    ],
  },
  cuppon: {
    descripcion:
      "Platform to create and manage discount coupons, designed for small businesses that want to automate promotions.",
    resumen: [
      "Discount coupon landing page organized by categories (food, technology, personal care and more), with a dedicated page per category to browse the available promotions directly.",
      "Static multi-page site built with HTML5 and CSS3, focused on responsive layout and a clear visual hierarchy to highlight each offer and make the terms easy to read.",
    ],
  },
  inmobiliaria: {
    descripcion:
      "Real estate listing site with property search and detail pages for each property.",
    resumen: [
      "Real estate site that presents properties for sale and for rent, with dedicated pages per type of operation and individual pages for each property in the catalog.",
      "Static project built with HTML5, CSS3 and vanilla JavaScript, focused on a responsive layout and on the visual presentation of the property portfolio.",
    ],
  },
};
