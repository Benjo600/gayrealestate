# Why 5 Pages Are Still Not Indexed — Root-Cause Investigation (July 2026)

Follow-up to `SEO-AUDIT-2026-07.md`. The earlier audit's discovery fixes (footer
links, 301s, sitemap generation, edge meta) all landed and verify clean. Five
pages remain unindexed. This document identifies which five, and why.

**Method:** the site was built (`npm run build`) and all 72 sitemap routes were
rendered in headless Chromium at Googlebot's mobile viewport (412×892,
Googlebot smartphone UA). Rendered word counts and the real DOM link graph were
measured from the rendered output, not inferred from source. GSC itself was not
reachable from the analysis environment, so the five pages below are derived
from the code; every number is reproducible from the build.

---

## The five pages

Ranked by contextual (non-boilerplate) inbound links — the only links Google
weighs for discovery and indexing priority:

| Page | In-content inbound links | Rendered words (mobile) | Rendered words (desktop) |
|---|---|---|---|
| `/buyers-guide` | **0** | 317 | 742 |
| `/mortgage-calculator` | **0** | 272 | 297 |
| `/marketing-your-home` | **0** | 633 | 633 |
| `/privacy-policy` | **0** | 331 | 331 |
| `/home-valuation` | **1** (from `/marketing-your-home`, itself orphaned) | 391 | 391 |

Every other route clears the bar: `/relocation` has 1 contextual link from an
indexed blog post, `/sellers-guide` has 2, `/first-time-buyers` has 6,
`/contact` has 24, `/blog` has 56. No blog post has zero.

These five are not blocked. All five emit `robots: index, follow`, a correct
self-referencing canonical, a single `<h1>`, and valid JSON-LD. The problem is
that Google can barely reach them and finds little when it does.

---

## Root cause 1 — the main navigation contains no crawlable link to any resource page

`components/ui/floating-navbar.tsx:117-161`

"For Buyers" and "For Sellers" render as `<button>` elements — **no `href`**.
Their child links are inside `{hoveredDropdown === navItem.name && (...)}`,
so the `<Link>`s to `/mortgage-calculator`, `/buyers-guide`, `/home-valuation`,
`/marketing-your-home`, `/relocation`, `/sellers-guide` and `/first-time-buyers`
**do not exist in the DOM until a mouse hovers**. Crawlers do not hover.

`components/Header.tsx:124-201` — the mobile menu is wrapped in
`{isMobileMenuOpen && ...}`, so its copies of those same links are also absent
until a user taps the burger button.

`components/Header.tsx:103` — the desktop navbar is inside `hidden md:block`,
which computes to `display: none` at Googlebot's mobile viewport.

Verified against the rendered homepage DOM: for each of the seven resource
pages there is **exactly one `<a>` on the entire page, and it is in the
footer**. The two nav items that should point at them are `<button>` elements
with no destination.

## Root cause 2 — a sitewide footer link is the only thing pointing at them

Because of cause 1, the footer (`components/Footer.tsx:57-141`) is the sole
inbound link for all seven resource pages. Footer links are identical on all 72
pages, so Google classifies them as boilerplate and discounts them heavily for
ranking and crawl scheduling. Two of the seven are rescued by in-content links
from blog posts (`/relocation`, `/sellers-guide`); `/first-time-buyers` has six.
The five above have none — for indexing purposes they are orphans.

`/home-valuation` is the compounding case: its only two in-content links are
from `/marketing-your-home` (`components/pages/MarketingYourHome.tsx:128,209`),
which is itself in this list, and one blog post. Link equity from an unindexed
page is worth nothing.

## Root cause 3 — thin rendered content, and `/buyers-guide` is thinner on mobile than on desktop

`components/pages/BuyersGuide.tsx:240-253` filters chapters on mobile:

```js
const isVisibleMobile = expandedChapter === i;
className={cn(isVisibleMobile ? "block" : "hidden md:block", ...)}
```

Five of the six chapters carry `hidden` (`display: none`) below the `md`
breakpoint. Google indexes mobile-first, so it sees **317 words instead of 742
— 57% of the page's content is invisible to the version that gets indexed**.
The other four pages are genuinely thin as authored (272–633 words), and
`/mortgage-calculator` is mostly an interactive widget whose numbers are
computed at runtime and contribute nothing indexable.

Thin + orphaned is precisely the profile Google files under
"Crawled – currently not indexed."

## Root cause 4 — prerendering is off, so all of this depends on the render queue

`netlify.toml:17` sets `SKIP_PRERENDER = "true"`, and
`scripts/prerender.cjs:129` honours it and exits immediately. Every page ships
as an empty `<div id="root"></div>` plus a 1.36 MB JS bundle.

The edge function `netlify/edge-functions/seo-injector.ts` injects correct meta
for all routes, and its `buildNoscriptBody()` (`:428-448`) writes a `<noscript>`
text fallback — but **only for `/blog/*` and `/agent/*`**. Static pages get no
body fallback at all. So for these five pages, without JavaScript there is
literally nothing on the page but meta tags.

This does not block Googlebot, which renders JS — but rendering is a deferred,
budgeted queue, and pages with no contextual inbound links sit at the back of
it. It does block Bingbot, DuckDuckGo, and AI crawlers outright.

---

## Why the earlier fixes did not resolve these

`SEO-AUDIT-2026-07.md` finding #3 correctly identified `/blog` and `/contact` as
orphans and fixed them by adding footer links. That worked for those two because
they also picked up in-content links (56 and 24 respectively). The same footer
fix was applied to the resource pages, but a footer link alone was never going
to be enough — and the navigation dropdown, which is where those pages are
supposed to be linked from, has never emitted a crawlable link.

---

## Recommended fixes, in order of impact

1. **Make the nav dropdowns crawlable.** Render the dropdown `<Link>`s
   unconditionally and hide them with CSS (`opacity`/`pointer-events`) instead
   of unmounting them, and give "For Buyers"/"For Sellers" a real `href`
   (`/buyers-guide`, `/sellers-guide`) instead of `<button>`. Same for the
   mobile menu.
2. **Add in-content links to all five.** From `/first-time-buyers` and buyer
   blog posts → `/mortgage-calculator` and `/buyers-guide`; from
   `/sellers-guide` and seller posts → `/home-valuation` and
   `/marketing-your-home`. Two or three contextual links each is enough.
3. **Stop hiding `/buyers-guide` chapters on mobile.** Keep the accordion for
   interaction, but render all six chapters in the DOM at every breakpoint.
4. **Thicken `/mortgage-calculator` and `/home-valuation`** with real editorial
   copy — CT-specific rates, property-tax context, an FAQ block. 272 words
   around a calculator widget will not sustain an index entry.
5. **Re-enable prerendering** (`SKIP_PRERENDER=false`). `scripts/prerender.cjs`
   is fail-safe by design and already handles the Chromium-availability
   problem that caused it to be disabled. Failing that, extend
   `buildNoscriptBody()` to cover static routes.
6. `/privacy-policy` is low-value by nature — consider dropping it from the
   sitemap rather than chasing an index entry for it.
