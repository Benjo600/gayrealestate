# Gay Real Estate CT

**[www.gayrealestatect.net](https://www.gayrealestatect.net)** — LGBTQ+ real estate platform for Connecticut.

A modern marketing site for inclusive home buying, selling, and relocation across Connecticut. Features agent profiles, buyer/seller resources, community events, client reviews, and a large SEO-focused blog for LGBTQ+ home seekers.

---

## Live site

| | |
|---|---|
| **Production** | [https://www.gayrealestatect.net](https://www.gayrealestatect.net) |
| **Repository** | [github.com/Benjo600/gayrealestate](https://github.com/Benjo600/gayrealestate) |
| **Hosting** | Netlify (SPA + edge SEO + serverless functions) |

---

## What this site includes

- **Agent & partner profiles** — CT realtors, mortgage lenders, and real estate attorneys who serve the LGBTQ+ community
- **Lead capture** — contact and enquiry forms with spam protection; notifications via Telegram
- **Buyer & seller tools** — first-time buyer guide, mortgage calculator, home valuation, relocation services, marketing guides
- **Community** — Connecticut LGBTQ+ events, venue directory, and partner spotlights (e.g. Sky Casper)
- **Blog & SEO** — 50+ long-form articles on neighborhoods, legal rights, mortgages, Pride, and relocation; sitemap, prerender, and Netlify edge meta/JSON-LD injection
- **Reviews** — client testimonials tied to agents

---

## Tech stack

| Layer | Stack |
|---|---|
| Frontend | React 18, TypeScript, Vite 6, React Router 7 |
| Styling | Tailwind CSS, Framer Motion, Lucide icons |
| SEO | `react-helmet-async`, Netlify Edge Functions, sitemap + prerender scripts |
| Backend | Netlify Functions (leads / Telegram), optional Gemini API |
| Deploy | Netlify (`main` branch → production) |

---

## Project structure

```
├── components/          # UI and page components
│   └── pages/           # Route-level pages (Home, Blog, Agent profiles, etc.)
├── data/                # Agents, blogs, events, reviews (content source of truth)
├── public/              # Static assets, robots.txt, llms.txt, hero images
├── netlify/
│   ├── edge-functions/  # SEO meta + JSON-LD injector
│   └── functions/       # Serverless (Telegram leads, etc.)
├── scripts/             # Sitemap generation, prerender, SEO tooling
├── blogs/               # Working drafts & research (not all shipped to production)
├── services/            # API / Telegram / Gemini helpers
└── App.tsx              # Route definitions
```

### Main routes

| Path | Page |
|---|---|
| `/` | Homepage |
| `/agent/:id` | Agent / partner profile (e.g. `/agent/arek`) |
| `/blog`, `/blog/:slug` | Blog index & posts |
| `/about` | Team |
| `/contact` | Contact |
| `/reviews` | Client reviews |
| `/community` | Community events |
| `/sky-casper` | Sky Casper partner events |
| `/first-time-buyers`, `/buyers-guide`, `/sellers-guide` | Guides |
| `/mortgage-calculator`, `/home-valuation`, `/relocation` | Tools |

---

## Getting started

### Prerequisites

- **Node.js 22+** (matches Netlify build)
- npm

### Install & run

```bash
npm install
npm run dev
```

App runs at **http://localhost:3000/**

### Environment variables

Create a `.env` (or `.env.local`) in the repo root for local secrets. Typical keys:

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | Optional AI features (Google Gemini) |
| Telegram / form secrets | Used by Netlify functions in production |

**Do not commit `.env` files.**

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Local Vite dev server |
| `npm run build` | Generate sitemap → Vite build → prerender routes |
| `npm run prerender` | Prerender only |
| `npm run preview` | Preview production build locally |

---

## Content editing

Most public content lives in TypeScript data files (not a CMS):

| File | Content |
|---|---|
| `data/agents.ts` | Agent bios, stats, Instagram, website links |
| `data/blogs.ts` + `data/julyBlogs2026.ts` | Blog posts & SEO fields |
| `data/events.ts` | Community venues / events |
| `data/skyCasperEvents.ts` | Sky Casper event cards |
| `data/reviews.ts` | Client reviews |

Blog drafts and SEO research under `blogs/` are working material; only posts wired into `data/` ship with the site.

---

## Deployment

- **Host:** Netlify  
- **Branch:** `main` deploys to production  
- **Build command:** `npm run build`  
- **Publish directory:** `dist`  
- **SPA fallback:** `public/_redirects` serves `/* → /index.html` (200) after legacy 301s  

Edge function `seo-injector` runs on all paths for crawler-friendly titles, descriptions, and structured data.

---

## Contributing / workflow

1. Create a feature branch from `main` for non-trivial work  
2. Keep production content changes reviewable (agent bios, new blogs, redirects)  
3. After blog slug changes, update sitemap generation and any redirects in `public/_redirects`  
4. Never commit secrets, `.env`, or large local-only report folders  

---

## License / ownership

Private client project for **Gay Real Estate CT**. All rights reserved unless otherwise agreed with the site owner.

---

## Contact

Site: [gayrealestatect.net](https://www.gayrealestatect.net)  
Issues & development: this GitHub repository
