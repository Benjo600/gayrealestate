# Why These Pages Are Not Indexed — Root-Cause Investigation (July 2026)

Investigation of the specific URLs Google Search Console reports as not indexed:

1. `https://www.gayrealestatect.net/agents`
2. `https://www.gayrealestatect.net/blog/west-hartford-lgbtq-neighborhood-guide`
3. `https://www.gayrealestatect.net/blog/selling-home-connecticut-lgbtq`
4. `https://www.gayrealestatect.net/agent/travis`

They split into two groups with completely different causes. Two are working
exactly as designed and need no fix. Two are real problems, and both trace to
the same underlying gap: **the site gives Google no freshness signal that would
trigger a re-crawl.**

---

## Group A — working as designed, no action needed

### `/agents` → 301 → `/about`
`public/_redirects:6` and `netlify/edge-functions/seo-injector.ts:178`.

### `/blog/west-hartford-lgbtq-neighborhood-guide` → 301 → `/blog/why-west-hartford-is-lgbtq-friendly-connecticut`
`public/_redirects:13` and `netlify/edge-functions/seo-injector.ts:157`, added in
`8c91bb5` specifically to clean up old slugs.

Both are deliberate, single-hop 301s to live, indexable targets. GSC files every
redirecting URL under **"Page with redirect"**, which sits inside the *Not
indexed* section of the Pages report. That is the correct and permanent
classification for a 301 — it is not an error, and it will never move to
"Indexed". These two are legacy URLs from the pre-React site (note the sibling
`/agents.html` rule) that Google still has on file.

**Action: none.** Chasing these would mean un-doing correct redirects.

---

## Group B — real problems

### `/blog/selling-home-connecticut-lgbtq` — a live post that was 301'd away for 66 days

This is a self-inflicted regression:

- **2026-05-06** (`8c91bb5`, "add 301 redirects for old blog slugs causing GSC
  noindex errors") added
  `/blog/selling-home-connecticut-lgbtq → /sellers-guide 301`. The slug was
  treated as a dead slug, but it is a **live post**
  ("Selling a Home in Connecticut 2026: Costs & Timing", 1,592 rendered words).
- **2026-07-11** (`9c4c217`, "unblock selling blog") removed the rule from both
  `public/_redirects` and the edge `BLOG_REDIRECTS` map.

For 66 days Google saw a 301 and recorded "Page with redirect". The page returns
200 again, but GSC keeps the old verdict until Google re-crawls *and*
reprocesses the URL.

**Why the re-crawl has not happened — this is the actual bug.**
`scripts/generate-sitemap.cjs:99` uses the post's **publish date** as `<lastmod>`:

```
<loc>https://www.gayrealestatect.net/blog/selling-home-connecticut-lgbtq</loc>
<lastmod>2026-06-23</lastmod>
```

`2026-06-23` falls *inside* the redirect window and is older than Google's last
crawl of the URL. Removing the redirect on 2026-07-11 changed no signal Google
can observe: the sitemap still advertises the page as last modified before the
crawl that saw the 301. There is nothing telling Google to look again.

Compounding it, the URL is **absent from both**
`scripts/gsc-index.js` and `scripts/request-indexing.js`, so it was never pushed
through the Indexing API either.

### `/agent/travis` — thin, and with no freshness signal at all

No blocker exists in code. Verified by rendering the built page at Googlebot's
mobile viewport:

- returns 200, `robots: index, follow`, correct self-referencing canonical
  (`https://www.gayrealestatect.net/agent/travis`)
- present in `AGENT_META`, the sitemap, and both indexing scripts
- has a `<noscript>` body fallback (`seo-injector.ts:436-446` covers `/agent/*`)
- 8 in-content inbound links — not orphaned
- 61% of its text is unique to the page, so it is not a duplicate

What is wrong is thinness and staleness:

- **310 rendered words total**, and the only substantial unique content is the
  bio. No listings, no reviews, no market or town-level content. That is well
  inside "Crawled – currently not indexed" territory for a profile page.
- **Agent URLs carry no `<lastmod>` at all.** `scripts/generate-sitemap.cjs:66-68`
  deliberately omits it for static and agent pages. The reasoning (don't stamp
  build dates on unchanged pages) is sound, but the result is that an agent page
  can never signal a genuine content update.
- `data/agents.ts` sets `image: "/Travis Lipinski headshot.jpg"` — with spaces.
  `SEOHead.tsx:27` concatenates without encoding, so the rendered tag is
  `og:image = "https://www.gayrealestatect.net/Travis Lipinski headshot.jpg"`,
  an invalid URL. (The edge function encodes it correctly at
  `seo-injector.ts:141`, but Helmet overwrites it after hydration.) Cosmetic for
  indexing, but it breaks social previews and reads as a quality defect.

---

## Secondary bug found: the indexing scripts submit dead URLs

`scripts/gsc-index.js` and `scripts/request-indexing.js` carry **hardcoded** URL
lists that have drifted from the sitemap:

| Script | Hardcoded URLs | Now 301 redirects | Live URLs missing |
|---|---|---|---|
| `gsc-index.js` | 47 | 4 | 29 |
| `request-indexing.js` | 32 | 2 | 42 |

The four stale entries — `litchfield-county-towns-for-weekenders`,
`wooster-square-new-haven-lgbtq-neighborhood`,
`gay-friendly-towns-in-connecticut-2026-ranked-guide`,
`how-to-choose-a-gay-friendly-realtor-2026-guide` — are all in the edge
`BLOG_REDIRECTS` map. Every run asks Google to index URLs that 301, which is
exactly how redirect URLs stay warm in the Pages report. Meanwhile 29–42 live
URLs, including `/blog/selling-home-connecticut-lgbtq`, are never submitted.

Both scripts should read `public/sitemap.xml` the way `scripts/index-site.js`
and `scripts/bing-index.js` already do, instead of keeping a manual list.

---

## Recommended fixes

1. **Give `/blog/selling-home-connecticut-lgbtq` a real freshness signal.**
   Support an optional `updated` field in the blog data and have
   `generate-sitemap.cjs` emit `<lastmod>` from `updated ?? date`. Set
   `updated: "2026-07-11"` (or later) on this post so the sitemap advertises a
   change newer than Google's last crawl.
2. **Request indexing manually in GSC** for that URL. With a 66-day redirect on
   record, the URL Inspection tool's "Request Indexing" is the fastest way to
   force reprocessing; the sitemap fix keeps it from regressing.
3. **Replace the hardcoded lists** in `gsc-index.js` and `request-indexing.js`
   with a sitemap read, so dead URLs stop being submitted and live ones stop
   being skipped.
4. **Thicken `/agent/travis`** — Litchfield County market commentary, recent
   transactions, client reviews, an FAQ. 310 words of bio will not sustain an
   index entry. Allow `lastmod` on agent pages driven by an explicit `updated`
   field, so future edits are visible to Google.
5. **Fix the unencoded image path** — either rename
   `public/Travis Lipinski headshot.jpg` to a hyphenated filename, or make
   `SEOHead.tsx:27` `encodeURI()` the path the way the edge function does.
6. **Leave `/agents` and `/blog/west-hartford-lgbtq-neighborhood-guide` alone.**
   "Page with redirect" is the correct terminal state for both.

---

## Note on scope

An earlier pass of this investigation ranked pages by internal-link risk and
predicted a different five (`/buyers-guide`, `/mortgage-calculator`,
`/marketing-your-home`, `/privacy-policy`, `/home-valuation`). Those findings
are still accurate as *risk* — the nav dropdown in
`components/ui/floating-navbar.tsx:117-161` renders "For Buyers"/"For Sellers"
as `<button>` with no `href` and only mounts the child links on hover, so no
crawlable navigation link points at any resource page, and the sitewide footer
link is all they have. That is worth fixing. But it is not what GSC is
reporting today, and it is not the cause of the four URLs above.
