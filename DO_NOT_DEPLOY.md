# ⛔ DO NOT DEPLOY THIS FOLDER

This `gayrealestate/` directory is a **stale nested copy** of the site.

## Deploy root is the parent repo

| | Parent `D:\realestate` (correct) | This folder (stale) |
|--|----------------------------------|---------------------|
| Blog posts | Full current set (38+) | Older subset |
| Sitemap | Generated from live `data/blogs.ts` | Out of date |
| `selling-home-connecticut-lgbtq` | Live post | May 301 → `/sellers-guide` |
| SEO edge injector | Current (JSON-LD + body injection) | Older / incomplete |

**Netlify base directory must be the repository root** (`D:\realestate` / repo root), **not** `gayrealestate/`.

If you need content from this tree (e.g. `competitor-research/`), copy it out — do not point production builds here.
