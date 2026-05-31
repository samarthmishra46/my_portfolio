// ─────────────────────────────────────────────────────────────
// PROJECTS — add a new project by appending one object to this array.
//
//   { id, title, period, blurb, description, stack[], tags[],
//     image, gitUrl, liveUrl }
//
// • `tags` drive the filter buttons (the "All" tag is added automatically).
// • Set `gitUrl` / `liveUrl` to "#" (or leave empty) to hide that button.
// • `image` paths live under /public.
// ─────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: "Examina",
    period: "Jan 2026 – Present",
    blurb: "AI exam-prep platform with a live lip-synced avatar tutor.",
    description:
      "Upload a PDF and Claude generates a course roadmap via forced tool use (strict JSON schema). Students watch an AI tutor draw on Excalidraw with a HeyGen lip-synced avatar over WebRTC — first content in ~3s. Engineered a streaming NDJSON protocol (12 command types) with a two-loop CommandScheduler pairing draws + narration in real time, every line Zod-validated.",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Claude Sonnet/Haiku",
      "HeyGen LiveAvatar",
      "Excalidraw",
      "MongoDB",
    ],
    tags: ["AI", "Web"],
    image: "/images/projects/1.png",
    gitUrl: "#",
    liveUrl: "#",
  },
  {
    id: 2,
    title: "ARA Store",
    period: "Jul – Dec 2025",
    blurb: "Production D2C storefront with payments, logistics & recovery.",
    description:
      "A 4,700+ LOC production storefront: Razorpay with HMAC-SHA256 verification and a server-recomputed 5% prepaid discount to block client-side tampering. WhatsApp abandoned-cart recovery via Vercel Cron + TTL-indexed MongoDB drafts and one-tap WATI resume. End-to-end Delhivery logistics (auto-AWB on payment), a 5-stage tracking stepper, a coupon engine, and a 7-event Meta Pixel funnel.",
    stack: [
      "Next.js 16",
      "React 19",
      "Razorpay",
      "Delhivery",
      "WATI",
      "MongoDB",
      "Vercel",
    ],
    tags: ["Web", "E-commerce"],
    image: "/images/projects/2.png",
    gitUrl: "#",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "Yuvichaar Funnels Platform",
    period: "Mar – Jun 2025",
    blurb: "Token-gated e-signature + payments and resumable uploads.",
    description:
      "Token-gated e-signature + payment flow: signed Razorpay HMAC-SHA256 verification, a pdf-lib signed PDF generated server-side and emailed via Resend with an idempotency guard against duplicate sends. Resumable large-file uploads over the TUS protocol straight to Bunny Stream, with a 24-hour SHA-256 auth signature keeping the API key off the client and HLS playback with a custom hover-preview hook.",
    stack: [
      "Next.js 16",
      "React 19",
      "MongoDB",
      "Razorpay",
      "Claude SDK",
      "Bunny CDN",
    ],
    tags: ["Web", "AI"],
    image: "/images/projects/3.png",
    gitUrl: "#",
    liveUrl: "#",
  },
  {
    id: 4,
    title: "NSS MMMUT Website",
    period: "Sep 2024 – Jan 2025",
    blurb: "Official site for 500+ volunteers with donations.",
    description:
      "The official site for the 500+ volunteers of NSS MMMUT. Processed ₹70,000+ in donations through Razorpay and improved request-resolution efficiency by 30%.",
    stack: ["React", "TailwindCSS", "Supabase", "Razorpay"],
    tags: ["Web"],
    image: "/images/projects/4.png",
    gitUrl: "#",
    liveUrl: "#",
  },
];

export default projects;
