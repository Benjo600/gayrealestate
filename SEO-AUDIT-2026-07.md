# SEO Bug Audit — GayRealEstateCT.net (July 2026)

Full-codebase audit of the deployed site (Vite React SPA + Netlify edge-function
meta injection). Live-URL checks were blocked by the analysis sandbox's network
policy, so every finding below is verified against the code that Netlify
deploys, with file/line references.

**What already works well** (no action needed): per-page titles/descriptions/
canonicals injected server-side by `netlify/edge-functions/seo-injector.ts` for
every crawler; true HTTP 404s for unknown routes; 301s for legacy slugs; noindex
on non-production hosts; auto-generated sitemap that can't drift from content;
BlogPosting/Breadcrumb/FAQ JSON-LD; clean robots.txt; Google & Bing
verification; GA4; llms.txt/llms-full.txt.

---

## Critical — directly suppressing traffic

### 1. Homepage hero slideshow ships 2.6–7.9 MB original images (Core Web Vitals failure)
`components/ui/shape-landing-hero.tsx:10-18` cycles through 8 raw Unsplash
originals in `public/images/ct-highlights/` — the largest are 7.9 MB, 7.8 MB,
5.0 MB — as full-viewport `<img>` elements. The first slide is the homepage LCP
element; on a 4G phone LCP will be well over 10 s, and the auto-advance
(`:40-44`) then streams ~30 MB more. Related weight problems:

- `public/` totals **77 MB**; `images/abby.png` is 2.0 MB, `hero-house.png`
  (also the sitewide OG image) is 896 KB, blog heroes run 400–480 KB.
- `netlify.toml` `[build.processing.images] compress = true` is Netlify's
  **deprecated post-processing** — it is a no-op today, so nothing optimizes
  these at serve time.
- No `srcset`/`sizes`, no WebP/AVIF for the heavy files, no `preload` of the
  first hero slide.

Failing LCP suppresses mobile rankings and converts paid/social clicks into
bounces. **Fix:** resize + convert hero/author images to WebP (~100–200 KB at
1920w), add `srcset`, preload slide 1, or serve through Netlify Image CDN
(`/.netlify/images?url=...`).

### 2. All body content is client-rendered — invisible to Bing, DuckDuckGo, and AI search
The edge function injects meta tags and (for blog posts only) a one-sentence
`<noscript>` teaser (`seo-injector.ts:356`), but the actual article/page copy
only exists after React runs. Googlebot renders JS; **Bingbot, DuckDuckGo,
Brave, and most AI crawlers (Perplexity, ChatGPT browsing) largely do not** —
they see an empty `<div id="root">`. The comment at `seo-injector.ts:501-507`
confirms Netlify's prerendering was dropped and nothing replaced the *body*
half of it. That zeroes out the entire non-Google search ecosystem (~10–15% of
US search) and AI-referral traffic the llms.txt files are courting.

**Fix:** prerender all 57 routes to static HTML at build time (e.g.
`vite-prerender-plugin`, react-snap style crawl, or a small Puppeteer step in
`npm run build` writing `dist/blog/<slug>/index.html`). The edge function can
keep handling meta/404/redirects on top.

### 3. `/blog` and `/contact` are orphaned pages (zero internal links)
- Header "Insights" → `/#resources` (`components/Header.tsx:26`)
- Footer "Blog & News" → `/#resources` (`components/Footer.tsx:122`)
- BlogPost "View All Articles" → `/#resources` (`components/pages/BlogPost.tsx:496`)
- Header contact item → `/#contact` (`components/Header.tsx:72`); Footer
  "Contact Support" → `/#contact` (`components/Footer.tsx:123`)

Nothing on the site links to `/blog` or `/contact`; both exist only in the
sitemap. Orphaned pages are crawled less, accumulate no PageRank, and rank
worse — and `/blog` is the hub that should be distributing authority across all
38 posts. **Fix:** point those three "resources" links at `/blog` and the
contact links at `/contact` (keep homepage anchors as secondary links if
desired).

---

## High

### 4. Homepage H1 has zero keyword/location relevance; Contact page has no H1
Homepage H1 renders "Find Your Place / With Pride"
(`shape-landing-hero.tsx:33-34`). The page competing for "gay realtor
Connecticut" / "LGBTQ real estate CT" has neither term in its H1.
`ContactPage.tsx` contains no `<h1>` at all. **Fix:** e.g. H1 "LGBTQ+ Real
Estate Agents in Connecticut" with "Find Your Place With Pride" as a styled
kicker/subtitle; add an H1 to Contact.

### 5. Self-serving aggregateRating schema on every page
`index.html:58-64` hardcodes `aggregateRating: 5.0, reviewCount: 250` inside
the sitewide `RealEstateAgent` JSON-LD. Google's review-snippet policy
explicitly ignores **self-serving reviews** for `LocalBusiness`/`Organization`
types — this markup can't produce stars and reads as spammy structured data
(manual-action risk). It also ships on all 57 pages because it's in the static
shell. **Fix:** remove `aggregateRating` from the org schema (keep per-review
markup on `/reviews` if reviews are displayed there, without self-serving
aggregate on the org itself).

### 6. Local-SEO schema is too thin to win the map/local pack
The `RealEstateAgent` schema has no `telephone`, no street `address`/locality,
no `geo`, no `priceRange`, no `openingHours`. Realtor queries ("gay realtor
near me", "lgbtq realtor hartford") are heavily local-pack driven. Also verify
a Google Business Profile exists and links to the site (not checkable from the
repo). **Fix:** complete the NAP fields in schema and mirror them in the
visible footer.

### 7. Duplicate, sometimes conflicting meta after hydration
The edge function injects title/description/canonical/OG server-side, then
`react-helmet-async` appends a second full set client-side. For the 15 curated
posts in `BLOG_DATA` (`seo-injector.ts:39-115`) the curated description differs
from the `post.excerpt` Helmet emits — so the DOM Google indexes contains two
different meta descriptions (plus duplicated canonicals/OG tags everywhere).
**Fix:** make the edge function the single source (use the data file, delete
the curated map or move it into `blogs.ts`), and/or key Helmet output to match
exactly.

### 8. 488 KB of blog HTML ships in the JS bundle on every page
`data/blogs.ts` (488 KB — every article's full HTML) is imported by
`components/Resources.tsx` (rendered on the eagerly-loaded HomePage) and by the
eagerly-imported `BlogPost`, so the whole corpus lands in the initial bundle
for all visitors. Compounds finding #1 (TBT/INP + slow first render = slower
indexing of rendered content). **Fix:** split content out of the listing data
(listing needs slug/title/image/excerpt only) and lazy-load post bodies; falls
away naturally if #2 moves to prerendered static pages.

---

## Medium

9. **Sitemap `lastmod` churn** — `scripts/generate-sitemap.cjs:41` stamps all
   static+agent URLs with the build date on every deploy. A lastmod that always
   changes trains Google to distrust the field sitewide (blog posts use real
   dates — good). Use real content-change dates or omit for static pages. Also
   `changefreq: yearly` + `priority: 0.9` on posts is contradictory (cosmetic).
10. **Stale time-boxed post** — `/blog/lgbtq-events-connecticut-march-2026`
    (March events) is still live in July. Move recurring events to a stable
    evergreen URL (e.g. `/blog/lgbtq-events-connecticut` refreshed monthly) and
    301 dated ones after they expire.
11. **Internal 301 hop** — one blog-content link points at redirected slug
    `/blog/how-to-choose-a-gay-friendly-realtor-2026-guide`; update to
    `/blog/gay-realtor-connecticut-guide`.
12. **`meta keywords` emitted** on blog pages (edge + Helmet). Ignored by every
    engine since ~2009 and a mild spam signal; remove.
13. **OG image is a 896 KB PNG** (`hero-house.png`). Social scrapers can time
    out or downgrade; serve a ≤300 KB 1200×630 JPG/WebP.
14. **Trailing-slash URLs return 200** with a canonical to the non-slash URL
    instead of 301 redirecting (edge normalizes only the canonical). Minor
    crawl-budget/duplicate-URL waste.
15. **Generic alt text + messy filenames** — hero slideshow `alt="CT Scenery"`
    for all 8 slides; deployed filenames with spaces ("Travis Lipinski
    headshot.jpg", "01. One-stop shop 2.jpg").

---

## Priority order (impact ÷ effort)

| # | Fix | Effort |
|---|-----|--------|
| 1 | Point nav/footer links at `/blog` and `/contact` (#3), fix the one 301-hop link (#11) | Minutes |
| 2 | Compress/convert hero + author images, preload first slide (#1, #13) | Hours |
| 3 | Keyworded homepage H1, add Contact H1 (#4) | Minutes |
| 4 | Remove self-serving aggregateRating; enrich local schema with NAP (#5, #6) | ~1 hr |
| 5 | Prerender routes to static HTML at build (#2) — biggest structural win | Days |
| 6 | Deduplicate edge/Helmet meta (#7), split blog bundle (#8) | Hours |
| 7 | Sitemap lastmod, stale events URL, meta keywords (#9, #10, #12) | ~1 hr |
