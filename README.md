# Samarth Mishra — Portfolio

A Next.js + Tailwind portfolio with a **data-driven** content layer, a dedicated
**Freelancing** page with **geo-localized pricing**, and a password-protected
**admin dashboard** for contact messages and service requests (stored in MongoDB).

## Setup

1. Install deps: `npm install`
2. Copy env: `cp .env.example .env.local` and fill in the values (see below).
3. Run: `npm run dev` → open http://localhost:3000

### Environment variables (`.env.local`)

| Variable        | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| `MONGODB_URI`   | MongoDB connection string (contacts + requests)      |
| `MONGODB_DB`    | _(optional)_ overrides the DB name from the URI      |
| `ADMIN_USER`    | Admin dashboard username                              |
| `ADMIN_PASS`    | Admin dashboard password                             |
| `ADMIN_SECRET`  | Long random string used to sign the admin cookie     |

## Editing content (no component code needed)

All content lives in [`src/data/`](src/data/). Each file is a plain array/object:

- **Add a project** → append an object to [`src/data/projects.js`](src/data/projects.js).
  Set `gitUrl`/`liveUrl` to `"#"` to hide those buttons. `tags` create the filter chips.
- **Add a freelancing service** → append to [`src/data/services.js`](src/data/services.js)
  with a `basePriceINR`. Pricing localizes automatically.
- Skills, experience, education, achievements, and your name/links/tagline each
  have their own file (`skills.js`, `experience.js`, `education.js`,
  `achievements.js`, `site.js`).

Drop your résumé at `public/Samarth_CV.pdf` (or change `resumeUrl` in `site.js`).

## How geo-pricing works

Base prices are in **INR**. The `/api/pricing` route detects the visitor's
country (Vercel geo header, falling back to `ipwho.is`) and, for **non-India**
visitors, **adds 20%** then converts INR → their local currency at live rates
(`open.er-api.com`). Any lookup failure falls back safely to INR.
See [`src/lib/pricing.js`](src/lib/pricing.js) and
[`src/app/api/pricing/route.js`](src/app/api/pricing/route.js).

## Admin dashboard

Visit `/admin`. If not logged in you're redirected to `/admin/login`. Sign in
with `ADMIN_USER` / `ADMIN_PASS` to see two tabs — **Contacts** and **Service
Requests** — newest first. The route is not linked anywhere public.

## License

[MIT](https://opensource.org/licenses/MIT).
