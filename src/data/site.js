// ─────────────────────────────────────────────────────────────
// Global site info. Edit your name, tagline, links etc. here.
// ─────────────────────────────────────────────────────────────
const site = {
  name: "Samarth Mishra",
  // Roles cycle through the hero type-animation. Add/remove freely.
  roles: [
    "Full-Stack Developer",
    "GenAI Engineer",
    "AI Integration Specialist",
    "Next.js Developer",
  ],
  tagline:
    "I build full-stack products and ship AI features that actually go to production — from agentic Claude workflows to payment-grade e-commerce.",
  location: "India",
  email: "samarthmishra46@gmail.com",
  phone: "+91-9118625470",

  // Drop your CV file at public/Samarth_CV.pdf, or point this at any URL.
  resumeUrl: "/Samarth_CV.pdf",

  socials: {
    github: "https://github.com/samarthmishra46",
    linkedin: "https://linkedin.com/in/samarthmishra46",
    website: "https://samarthmishra.xyz",
  },

  // Navbar links. `/freelancing` is a real page; `#id` links scroll the homepage.
  navLinks: [
    { title: "About", path: "/#about" },
    { title: "Projects", path: "/#projects" },
    { title: "Services", path: "/freelancing" },
    { title: "Contact", path: "/#contact" },
  ],
};

export default site;
