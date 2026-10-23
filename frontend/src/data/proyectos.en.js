export const proyectosEn = {
  "promusic-academia": {
    descripcion:
      "Promusic needed its own place to show its courses and handle enrollment without relying on an external app. Solved with a custom page inside its own Shopify store: current courses, history and FAQ, while keeping the brand's cart and style.",
    resumen: [
      "Landing page for Promusic Academia, Promusic's technical training body for live audio, lighting, music production and the entertainment industry. It lives inside the brand's Shopify store (promusic.cl) and is designed so any visitor understands what is taught, when, and how to enroll.",
      "It showcases Shopify skills beyond the product catalog: a fully custom page integrated into the store theme that keeps the brand's navigation, cart and style while presenting editorial and service content, with no external apps or separate site.",
      "The page brings together in a single flow the current courses and sessions with date, price, seats and instructor, the catalog of past courses in expandable cards, a carousel with the academy's educational history and an accordion FAQ section.",
      "Each course is shown in an expandable card with its details and clear calls to action: enrollment, PDF syllabus or ticket purchase for live sessions. The design is responsive and blends with the navigation and style of the rest of the store.",
    ],
  },
  "promusic-chat": {
    descripcion:
      "Promusic's store kept getting the same catalog, shipping and hours questions, and lost sales whenever no one could answer in time. The fix: an AI chatbot built into the store that answers instantly with real, up-to-date information, helps add products to the cart, and hands off to a human salesperson when a question needs it.",
    resumen: [
      "Sales and support chatbot for Promusic's Shopify store (promusic.cl), live in production and handling real customers. Built on Shopify's official chat agent template and extended with custom logic: it answers catalog questions (usage, specs, compatibility and accessories), info about the brand's spaces and Academy courses, hours, shipping, payment methods and warranties, all read live from the real store instead of static content.",
      "It can add products to the cart from the conversation, offers cross-sell based on Shopify's real product recommendations, reports shipment status, and understands Chilean pro-audio industry jargon. When a question calls for tailored advice or a custom quote, it automatically hands off to the sales team instead of improvising a recommendation.",
      "The bot's behavior follows explicit rules: it never gives in-depth advice, never exposes sensitive company information, stays within the store topic, and never invents prices, stock or lead times — if it doesn't have the data, it says so and offers the human channel. Access to sensitive tools (cart, checkout, customer data) is blocked at the code level, not just through model instructions, and the project went through a full security audit (session tokens, XSS, rate-limiting, webhook verification).",
      "Stack: a Shopify app (React Router) with Claude as the LLM, Prisma and PostgreSQL for sessions, live reads of the catalog and store pages via the Storefront/Admin API, and deployment on a self-managed VPS running Coolify.",
    ],
  },
  "studio-fest": {
    descripcion:
      "Studio Fest is a Promusic event with 4 spaces running at the same time — figuring out who was where, in which time slot, had turned into chaos with a generic tool. It was replaced with a custom app: attendees register once, staff tracks each space's attendance in real time, and the public follows the live program.",
    resumen: [
      "Custom app for Studio Fest, Promusic's event with 4 spaces running in parallel (Estudio, Live Stage, Showroom and Patio) across shared time blocks. Replaces a PowerApps-based solution: attendees pre-register once, choosing an activity per block, and each space's staff reviews and manages its own list of registrants from a dedicated PIN-protected panel.",
      'The staff panel supports real-time check-in, adding walk-ins with no prior reservation, searching by name, and viewing overall event stats. The public side shows the program, exhibitors, location and a "live now" view of what\'s happening in each space at any given moment, plus a lookup so each attendee can find their own schedule by email.',
      "Registration data lives in Microsoft Lists (SharePoint) and is exposed to the app through a Power Automate flow acting as an HTTP API, avoiding an Azure/Entra app registration and the permission overhead that would require. An in-memory snapshot, refreshed in the background, keeps the app fast even when that external API responds slowly.",
      "Stack: Next.js 16 (App Router) and TypeScript, Tailwind CSS v4, Power Automate as the data backend, deployed via Docker on a self-managed VPS running Coolify.",
    ],
  },
  "asistente-rag": {
    descripcion:
      "Built for support teams who answer the same questions over and over: this assistant reads a company's real documents (manuals, policies, FAQs) and answers instantly based only on them — if it doesn't know something, it says so instead of making up an answer.",
    resumen: [
      "Intelligent customer support system based on RAG (Retrieval-Augmented Generation): knowledge PDFs (FAQs, policies, manuals) are uploaded and a chat answers questions in real time grounded only in those documents, with no hallucinations. It includes a multi-tenant admin panel designed for public demos.",
      "Ingestion processes the PDFs with text extraction, smart chunking and semantic embeddings. The chat streams answers token by token (SSE), keeps conversational memory of the last 10 interactions in the session and refuses honestly: if the information is not in the documents, it says so instead of making things up.",
      "The architecture is multi-tenant without login: isolated anonymous sessions with automatic cleanup, hybrid vector search across global and private documents, and quota safeguards (per-session limits and daily counters) designed to live within the providers' free tiers.",
      "Stack: Next.js 16 (App Router) with strict TypeScript, Route Handlers as a same-origin API, Supabase (PostgreSQL + pgvector) as the vector database, Google Gemini embeddings (gemini-embedding-001) and Groq Cloud as the LLM. Models configurable through environment variables.",
    ],
  },
  pizzeria: {
    descripcion:
      "A complete online pizza-ordering store: catalog, shopping cart and user accounts, built from scratch instead of on a generic template — including its own order system and secure login.",
    resumen: [
      "Full-stack pizzeria project with a pizza catalog, shopping cart and JWT-based user authentication. The frontend consumes a custom REST API that manages users, pizzas and a simulated checkout, with route protection through Bearer tokens.",
      "Global state is handled with React Context (Cart, User, Pizzas) and routing is an SPA with React Router: Login, Register, Profile, Cart, Home and a 404 page. Notifications use react-hot-toast and icons come from lucide-react.",
      "The backend runs on Node.js + Express with a layered architecture (routes → controllers → models → middlewares), persistence through JSON files and passwords that are never stored in plain text: scrypt hashing, a random per-user salt and constant-time comparison.",
    ],
  },
  cuppon: {
    descripcion:
      "Built for small businesses that handed out discounts by hand on social media: a platform to publish and organize discount coupons by category, all in one tidy place.",
    resumen: [
      "Discount coupon landing page organized by categories (food, technology, personal care and more), with a dedicated page per category to browse the available promotions directly.",
      "Static multi-page site built with HTML5 and CSS3, focused on responsive layout and a clear visual hierarchy to highlight each offer and make the terms easy to read.",
    ],
  },
};
