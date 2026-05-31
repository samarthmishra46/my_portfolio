// ─────────────────────────────────────────────────────────────
// FREELANCING SERVICES — add a service by appending an object.
//
//   { id, title, icon, summary, basePriceINR, priceLabel, deliverables[] }
//
// • `basePriceINR` is the India base price. The freelancing page detects the
//   visitor's country and, for non-India visitors, adds 20% then converts the
//   amount into their local currency at live rates (see src/lib/pricing.js).
// • `priceLabel` (e.g. "Starting at") prefixes the displayed price.
// ─────────────────────────────────────────────────────────────
const services = [
  {
    id: "frontend",
    title: "Frontend Development",
    icon: "🎨",
    summary:
      "Pixel-accurate, responsive React / Next.js interfaces with Tailwind — fast, accessible, and animation-ready.",
    basePriceINR: 15000,
    priceLabel: "Starting at",
    deliverables: [
      "Responsive React / Next.js UI",
      "Tailwind CSS design system",
      "Framer Motion animations",
      "SEO & performance pass",
    ],
  },
  {
    id: "fullstack",
    title: "Full-Stack Web App",
    icon: "🧩",
    summary:
      "End-to-end product builds: Next.js + MongoDB, auth, dashboards, REST APIs and payments — shipped to production.",
    basePriceINR: 45000,
    priceLabel: "Starting at",
    deliverables: [
      "Next.js + MongoDB backend",
      "Authentication & roles",
      "REST API routes",
      "Admin dashboard",
      "Production deployment",
    ],
  },
  {
    id: "ai-integration",
    title: "AI Integration & Agentic Workflows",
    icon: "🤖",
    summary:
      "Claude SDK integrations done right: tool-use with strict schemas, streaming protocols, RAG, and multi-turn agentic loops.",
    basePriceINR: 35000,
    priceLabel: "Starting at",
    deliverables: [
      "Claude / LLM integration",
      "Forced tool-use & JSON schemas",
      "Streaming (NDJSON / SSE)",
      "RAG / vector search",
      "Agentic multi-turn loops",
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce & Payments",
    icon: "🛒",
    summary:
      "Payment-grade storefronts: Razorpay with HMAC verification, logistics, coupons, and WhatsApp cart recovery.",
    basePriceINR: 30000,
    priceLabel: "Starting at",
    deliverables: [
      "Razorpay HMAC-verified checkout",
      "Delhivery shipping & tracking",
      "Coupon & discount engine",
      "WhatsApp (WATI) cart recovery",
      "Meta Pixel funnel tracking",
    ],
  },
  {
    id: "deployment",
    title: "Deployment & DevOps",
    icon: "🚀",
    summary:
      "Get it live and keep it healthy: Vercel/Docker deploys, environment setup, cron jobs and CI.",
    basePriceINR: 8000,
    priceLabel: "Starting at",
    deliverables: [
      "Vercel / Docker deployment",
      "Env & secrets setup",
      "Cron jobs & background tasks",
      "Custom domain & SSL",
      "Basic CI pipeline",
    ],
  },
];

export default services;
