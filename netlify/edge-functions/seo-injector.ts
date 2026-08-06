import type { Context } from "@netlify/edge-functions";
// Slim meta only — never import data/blogs.ts (full HTML bodies break Netlify edge deploys).
import { BLOG_META, AGENT_META } from "./_shared/content-meta.ts";

const BASE_DOMAIN = "https://www.gayrealestatect.net";
// The only host that should ever be indexed. Every other host that serves this
// app (the *.netlify.app subdomain and deploy-preview URLs) must be marked
// noindex so it can't compete with the real domain for canonical / ranking.
const PRODUCTION_HOST = "www.gayrealestatect.net";
const DEFAULT_IMAGE = `${BASE_DOMAIN}/hero-house.png`;
const DEFAULT_IMAGE_ALT = "GayRealEstateCT.net - LGBTQ+ Friendly Real Estate in Connecticut";

// Source-of-truth sets derived from the canonical data files so the edge
// function never drifts out of sync with the published content. (Previously a
// hardcoded BLOG_DATA map doubled as the "does this post exist?" gate, which
// silently 404'd every blog post that wasn't manually copied in here.)
const KNOWN_BLOG_SLUGS = new Set(BLOG_META.map((p) => p.slug));
const KNOWN_AGENT_IDS = new Set(Object.keys(AGENT_META));
const KNOWN_STATIC_PATHS = new Set([
  "/",
  "/about",
  "/first-time-buyers",
  "/mortgage-calculator",
  "/relocation",
  "/buyers-guide",
  "/home-valuation",
  "/sellers-guide",
  "/marketing-your-home",
  "/privacy-policy",
  "/reviews",
  "/community",
  "/sky-casper",
  "/blog",
  "/contact",
]);

// Maps blog author display names → agent profile ids (same as BlogPost.tsx).
const AUTHOR_AGENT_MAP: Record<string, string> = {
  "Arek Wtulich": "arek",
  "Abby Dudarewicz": "abby",
  "Travis Lipinski": "travis",
  "Jake Earl": "jake",
  "Carolyn Futtner": "carolyn",
};

// Curated, hand-tuned meta for the highest-value pages. Anything not listed
// here falls back to the data file (title + excerpt + image), so new posts get
// correct meta automatically.
const BLOG_DATA: Record<string, { title: string; description: string; image: string }> = {
  "best-places-to-live-in-connecticut-lgbtq": {
    title: "Best Places to Live in Connecticut for LGBTQ+ People: Cities, Towns & Neighborhoods",
    description: "Compare New Haven, West Hartford, Stamford, Norwalk, Middletown, the shoreline, and Litchfield County by lifestyle fit.",
    image: `${BASE_DOMAIN}/ct-lgbtq-places-hero.jpg`,
  },
  "why-west-hartford-is-lgbtq-friendly-connecticut": {
    title: "Why West Hartford Is One of the Most LGBTQ+-Friendly Towns in Connecticut",
    description: "A deep dive into why West Hartford consistently tops the list for inclusive living.",
    image: `${BASE_DOMAIN}/west-hartford-lgbtq-hero.jpg`,
  },
  "moving-to-connecticut-as-a-gay-couple": {
    title: "Moving to Connecticut as a Gay Couple: What No One Tells You",
    description: "Real-world advice for same-sex couples relocating to CT.",
    image: `${BASE_DOMAIN}/gay-couple-moving-ct-hero.jpg`,
  },
  "most-lgbtq-inclusive-school-districts-connecticut": {
    title: "The Most LGBTQ+-Inclusive School Districts in Connecticut (2026)",
    description: "Essential research for LGBTQ+ families with children in CT.",
    image: `${BASE_DOMAIN}/lgbtq-inclusive-schools-hero.jpg`,
  },
  "1-million-nyc-vs-connecticut-what-do-you-get": {
    title: "$1 Million in NYC vs. $1 Million in Connecticut",
    description: "The stark contrast in quality of life and space between NYC and CT real estate.",
    image: `${BASE_DOMAIN}/nyc-vs-ct-value-hero.jpg`,
  },
  "lgbtq-events-connecticut": {
    title: "LGBTQ+ Events in Connecticut: Evergreen Community Calendar",
    description: "Find reliable LGBTQ+ community resources across Connecticut year-round—organizations, Pride season, and how to plug in.",
    image: `${BASE_DOMAIN}/ct-pride-events-hero.jpg`,
  },
  "litchfield-county-second-homes-lgbtq-buyers": {
    title: "Litchfield County's Best-Kept Secret: Second Homes for LGBTQ+ Buyers",
    description: "Northwestern Connecticut's retreat for LGBTQ+ professionals and creatives.",
    image: `${BASE_DOMAIN}/inclusive-ct-neighborhoods-hero.jpg`,
  },
  "litchfield-county-towns-for-weekenders": {
    title: "Lake Waramaug, Washington, & Beyond: Litchfield County Guide",
    description: "Town-by-town guide to the hidden corners of LGBTQ+ friendly Litchfield County.",
    image: `${BASE_DOMAIN}/inclusive-ct-neighborhoods-hero.jpg`,
  },
  "legal-protections-lgbtq-real-estate-connecticut": {
    title: "Protecting Your Home & Relationship: LGBTQ+ Legal Guide",
    description: "What LGBTQ+ buyers need to know about title, deeds, and legal protections in CT.",
    image: `${BASE_DOMAIN}/generational-wealth-legal-hero.jpg`,
  },
  "trans-moving-connecticut-guide": {
    title: "Trans Moving to Connecticut: What to Actually Know Before You Relocate",
    description: "Essential guide for trans individuals and families relocating to Connecticut.",
    image: `${BASE_DOMAIN}/trans-inclusive-ct-hero.jpg`,
  },
  "lgbtq-friendly-small-towns-connecticut": {
    title: "LGBTQ-Friendly Small Towns in Connecticut: An Honest Guide",
    description: "Beyond the cities — the small towns in CT that are genuinely welcoming to the LGBTQ+ community.",
    image: `${BASE_DOMAIN}/lgbtq-small-towns-hero.jpg`,
  },
  "wooster-square-new-haven-lgbtq-neighborhood": {
    title: "Wooster Square New Haven: Is It Still the Best LGBTQ Neighborhood?",
    description: "Deep dive into New Haven's most famous LGBTQ-concentrated neighborhood.",
    image: `${BASE_DOMAIN}/new-haven-neighborhoods-hero.jpg`,
  },
  "chester-ct-lgbtq-family-guide": {
    title: "Chester, CT for LGBTQ Families: Is This Small Town Worth It?",
    description: "An artsy, welcoming small town in the CT River Valley for LGBTQ+ families.",
    image: `${BASE_DOMAIN}/ct-family-home-hero.jpg`,
  },
  "best-lgbtq-neighborhoods-new-haven-ct": {
    title: "Best LGBTQ Neighborhoods in New Haven, CT: A Real Breakdown",
    description: "Comparing East Rock, Wooster Square, and Westville for LGBTQ+ residents.",
    image: `${BASE_DOMAIN}/new-haven-neighborhoods-hero.jpg`,
  },
  "gay-realtor-connecticut-guide": {
    title: "Gay Realtor in Connecticut: How to Find One That Actually Helps",
    description: "Why working with an agent who 'gets it' matters for LGBTQ+ home buyers in CT.",
    image: `${BASE_DOMAIN}/gay-realtor-ct-hero.jpg`,
  },
};

const AGENT_DATA: Record<string, { title: string; description: string; image: string }> = {
  "arek": {
    title: "Arek Wtulich | LGBTQ+ Real Estate Agent in CT",
    description: "Expert, community-connected LGBTQ+ real estate guidance in Connecticut.",
    image: `${BASE_DOMAIN}/images/Arek_Alt_1.jpg`,
  },
  "abby": {
    title: "Abby Dudarewicz | Inclusive Realtor in Connecticut",
    description: "Helping LGBTQ+ families and individuals find their perfect home in CT.",
    image: `${BASE_DOMAIN}/images/abby.png`,
  },
  "travis": {
    title: "Travis Lipinski | Litchfield County Real Estate Expert",
    description: "Specializing in second homes and weekend retreats in Litchfield County.",
    image: `${BASE_DOMAIN}/Travis%20Lipinski%20headshot.jpg`,
  },
  "jake": {
    title: "Jake Earl | LGBTQ+ Friendly Mortgage Expert",
    description: "Top 1% mortgage lender helping you navigate your CT home purchase.",
    image: `${BASE_DOMAIN}/images/jake.jpg`,
  },
  "carolyn": {
    title: "Carolyn Futtner | LGBTQ+ Real Estate Attorney",
    description: "Protecting your home and your relationship with expert legal guidance in CT.",
    image: `${BASE_DOMAIN}/Carolyn%2BFuttner-1920w.webp`,
  },
};

const BLOG_REDIRECTS: Record<string, string> = {
  "lgbtq-home-buying-connecticut-guide": "/blog/best-places-to-live-in-connecticut-lgbtq",
  "west-hartford-lgbtq-neighborhood-guide": "/blog/why-west-hartford-is-lgbtq-friendly-connecticut",
  "connecticut-lgbtq-friendly-towns": "/blog/lgbtq-friendly-small-towns-connecticut",
  "gay-friendly-realtors-connecticut": "/blog/gay-realtor-connecticut-guide",
  "lgbtq-first-time-homebuyer-ct": "/first-time-buyers",
  "connecticut-mortgage-lgbtq-buyers": "/mortgage-calculator",
  "new-haven-lgbtq-real-estate": "/blog/best-lgbtq-neighborhoods-new-haven-ct",
  "lgbtq-relocation-connecticut": "/relocation",
  // NOTE: selling-home-connecticut-lgbtq is a live blog post — do not redirect
  // Removed posts — preserve link equity (mirrored in public/_redirects)
  "lgbtq-down-payment-assistance-programs-connecticut": "/first-time-buyers",
  "what-is-the-lgbtq-real-estate-alliance": "/blog/gay-realtor-connecticut-guide",
  "how-to-choose-a-gay-friendly-realtor-2026-guide": "/blog/gay-realtor-connecticut-guide",
  "litchfield-county-towns-for-weekenders": "/blog/litchfield-county-second-homes-lgbtq-buyers",
  "gay-friendly-towns-in-connecticut-2026-ranked-guide": "/blog/best-places-to-live-in-connecticut-lgbtq",
  "wooster-square-new-haven-lgbtq-neighborhood": "/blog/best-lgbtq-neighborhoods-new-haven-ct",
  // Consolidation merges (2026-08) — preserve link equity
  "selling-your-home-lgbtq-homeowner-connecticut": "/blog/selling-home-connecticut-lgbtq",
  "gay-areas-in-connecticut-neighborhood-by-neighborhood-guide": "/blog/best-places-to-live-in-connecticut-lgbtq",
  "lgbtq-events-connecticut-march-2026": "/blog/lgbtq-events-connecticut",
};

// Legacy non-blog paths that must 301 to their current location. Handled here
// (mirroring the public/_redirects rules) so they always emit a clean 301 and
// are never caught by the unknown-route 404 logic below.
const STATIC_REDIRECTS: Record<string, string> = {
  "/agents": "/about",
  "/agents.html": "/about",
  "/reviews.html": "/reviews",
  "/relocation-services": "/relocation",
  "/community-events": "/community",
};

const NOINDEX_PATHS = new Set<string>();

/** Escape a string for safe injection into an HTML attribute value. */
const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Ensure an image path is an absolute, URL-encoded URL. */
const toAbsoluteImage = (img: string): string => {
  if (img.startsWith("http")) return img;
  // encodeURI preserves "/" but escapes spaces and other unsafe chars.
  return `${BASE_DOMAIN}${encodeURI(img)}`;
};

const truncate = (s: string, max = 160): string =>
  s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s;

interface PageMeta {
  title: string;
  description: string;
  ogImage: string;
  ogImageAlt: string;
}

/** Resolve the SEO meta for a given path. */
function resolveMeta(path: string): PageMeta {
  let title = "GayRealEstateCT.net | LGBTQ+ Friendly Real Estate in Connecticut";
  let description = "Find trusted, LGBTQ+ friendly real estate agents, mortgage lenders, and attorneys in Connecticut.";
  let ogImage = DEFAULT_IMAGE;
  let ogImageAlt = DEFAULT_IMAGE_ALT;

  if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    // Prefer live BLOG_META so edge meta matches client excerpts/images.
    // BLOG_DATA is only a curated fallback if the post is missing from data.
    const post = BLOG_META.find((p) => p.slug === slug);
    if (post) {
      title = `${post.title} | Gay Real Estate CT`;
      description = truncate(post.excerpt);
      ogImage = toAbsoluteImage(post.image);
      ogImageAlt = post.title;
    } else {
      const curated = BLOG_DATA[slug];
      if (curated) {
        title = `${curated.title} | Gay Real Estate CT`;
        description = curated.description;
        ogImage = curated.image;
        ogImageAlt = curated.title;
      }
    }
  } else if (path.startsWith("/agent/")) {
    const id = path.replace("/agent/", "");
    const curated = AGENT_DATA[id];
    if (curated) {
      title = `${curated.title} | Gay Real Estate CT`;
      description = curated.description;
      ogImage = curated.image;
      ogImageAlt = curated.title;
    } else {
      const agent = AGENT_META[id];
      if (agent) {
        title = `${agent.name} | ${agent.title} | Gay Real Estate CT`;
        description = truncate(agent.tagline || agent.bio);
        ogImage = toAbsoluteImage(agent.image);
        ogImageAlt = `${agent.name} — ${agent.title}`;
      }
    }
  } else if (path === "/blog") {
    // Matches BlogIndex.tsx SEOHead
    title = "LGBTQ+ Real Estate Blog | GayRealEstateCT.net";
    description = "Expert guides, neighborhood spotlights, and market insights for LGBTQ+ home buyers and sellers in Connecticut. Browse our full library of in-depth articles.";
  } else if (path === "/") {
    // Matches HomePage.tsx SEOHead
    title = "GayRealEstateCT.net | LGBTQ+ Friendly Real Estate Agents in Connecticut";
    description = "Find trusted, LGBTQ+ friendly real estate agents, mortgage lenders, and attorneys in Connecticut. GayRealEstateCT.net — your one-stop shop for inclusive home buying and selling.";
  } else if (path === "/about") {
    // Matches AboutUs.tsx SEOHead (longer, client-facing title)
    title = "About GayRealEstateCT.net | LGBTQ+ Inclusive Real Estate in Connecticut";
    description = "Meet the LGBTQ+-led team connecting buyers and sellers with trusted, inclusive real estate agents, mortgage lenders, and attorneys across Connecticut.";
  } else if (path === "/first-time-buyers") {
    // Matches FirstTimeBuyers.tsx SEOHead
    title = "First-Time Home Buying Guide for LGBTQ+ Buyers in Connecticut | GayRealEstateCT.net";
    description = "Your comprehensive step-by-step guide to buying your first home in Connecticut as an LGBTQ+ buyer. Learn about financing, finding inclusive agents, legal protections, and protecting your investment.";
    ogImage = `${BASE_DOMAIN}/lgbtq_first_time_buyer.png`;
    ogImageAlt = "LGBTQ+ First-Time Home Buyer Guide for Connecticut";
  } else if (path === "/buyers-guide") {
    // Matches BuyersGuide.tsx SEOHead
    title = "Complete LGBTQ+ Buyer's Guide for Connecticut | GayRealEstateCT.net";
    description = "A 6-chapter masterclass covering financing, neighborhood selection, making winning offers, inspections, and legal protections for LGBTQ+ home buyers in Connecticut.";
  } else if (path === "/sellers-guide") {
    // Matches SellersGuide.tsx SEOHead
    title = "Connecticut Home Seller's Guide | GayRealEstateCT.net";
    description = "A 5-phase strategy for Connecticut home sellers — pricing, staging, premium marketing, offers, and closing. LGBTQ+-led agents who know how to get you top dollar.";
  } else if (path === "/mortgage-calculator") {
    // Matches MortgageCalculator.tsx SEOHead
    title = "Connecticut Mortgage Calculator | LGBTQ+ Home Buying | GayRealEstateCT.net";
    description = "Estimate your monthly mortgage payment for Connecticut homes. Includes principal, interest, taxes, insurance, PMI, and HOA. LGBTQ+-friendly mortgage guidance included.";
  } else if (path === "/relocation") {
    // Matches RelocationServices.tsx SEOHead
    title = "LGBTQ+ Relocation Services in Connecticut | GayRealEstateCT.net";
    description = "Relocating to Connecticut? Our LGBTQ+-led team provides full-service relocation support — neighborhood matching, community integration, vendor introductions, and remote closing support.";
  } else if (path === "/home-valuation") {
    // Matches HomeValuation.tsx SEOHead
    title = "Free Home Valuation in Connecticut | GayRealEstateCT.net";
    description = "Get a free, accurate home valuation from LGBTQ+-allied Connecticut real estate agents. Know what your home is worth with real local comps — no algorithms, no pressure.";
  } else if (path === "/marketing-your-home") {
    // Matches MarketingYourHome.tsx SEOHead
    title = "Marketing Your Home in Connecticut | GayRealEstateCT.net";
    description = "See how we market your Connecticut home to get top dollar — professional photography, MLS syndication, social media targeting, and LGBTQ+ buyer network outreach.";
  } else if (path === "/community") {
    // Matches CommunityEvents.tsx SEOHead
    title = "Community Hub | LGBTQ+ Events & Culture in Connecticut";
    description = "Explore Connecticut's best LGBTQ+ venues, legendary drag performances, and community events. Your guide to inclusive nightlife and culture in CT.";
    ogImage = `${BASE_DOMAIN}/images/events/community-hero.png`;
    ogImageAlt = "LGBTQ+ Community Events in Connecticut";
  } else if (path === "/sky-casper") {
    // Matches SkyCasperEvents.tsx SEOHead — keep in KNOWN_STATIC_PATHS
    title = "Sky Casper Events | Drag Brunches & LGBTQ+ Nightlife in CT";
    description =
      "Explore upcoming Sky Casper Entertainment events across Connecticut — drag brunches, queer nights, beach takeovers, and Pride season shows. Tickets via skycasper.com.";
    ogImage = `${BASE_DOMAIN}/images/events/sky-casper/ticket-queer-beach.jpg`;
    ogImageAlt = "Sky Casper Entertainment LGBTQ+ events in Connecticut";
  } else if (path === "/reviews") {
    // Matches Reviews.tsx SEOHead
    title = "Client Reviews | GayRealEstateCT.net — LGBTQ+ Real Estate Testimonials";
    description = "Read client reviews from LGBTQ+ buyers and sellers across Connecticut. See what clients say about Arek, Abby, Jake, and Carolyn.";
  } else if (path === "/privacy-policy") {
    // Matches PrivacyPolicy.tsx SEOHead
    title = "Privacy Policy & Data Protection | GayRealEstateCT.net";
    description = "Our premium commitment to your privacy. Learn how we protect your data with a specific focus on LGBTQ+ security and non-disclosure for the LGBTQ+ community in Connecticut.";
  } else if (path === "/contact") {
    // Matches ContactPage.tsx SEOHead
    title = "Contact Us | GayRealEstateCT.net — LGBTQ+ Real Estate Connecticut";
    description = "Get in touch with our LGBTQ+-led Connecticut real estate team. Connect with a trusted agent, mortgage lender, or attorney who understands your community.";
  }

  return { title, description, ogImage, ogImageAlt };
}

/** Strip any existing SEO tags from the shell so we never emit duplicates.
 * Also strips react-helmet-managed tags (marked data-rh) that survive in
 * prerendered HTML snapshots, so the edge-injected set is the only one.
 * Flexible matching: self-closing with or without space before />, or plain >.
 * Page-specific JSON-LD (BlogPosting / BreadcrumbList / FAQPage) is stripped
 * so edge-injected schema is not duplicated after hydration; sitewide
 * WebSite / RealEstateAgent blocks in index.html are left intact. */
function stripExistingTags(text: string): string {
  return text
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<meta\b[^>]*\bname=["']description["'][^>]*>/gi, "")
    .replace(/<meta\b[^>]*\bname=["']robots["'][^>]*>/gi, "")
    .replace(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi, "")
    .replace(/<meta\b[^>]*\bproperty=["']og:[^"']*["'][^>]*>/gi, "")
    .replace(/<meta\b[^>]*\bname=["']twitter:[^"']*["'][^>]*>/gi, "")
    .replace(/<script\b[^>]*\bdata-rh=["']true["'][^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<(?:meta|link)\b[^>]*\bdata-rh=["']true["'][^>]*>/gi, "")
    .replace(
      /<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>[\s\S]*?(?:BlogPosting|BreadcrumbList|FAQPage)[\s\S]*?<\/script>/gi,
      ""
    );
}

/** Server-side BlogPosting (+ FAQ) JSON-LD so crawlers get schema without JS. */
function buildBlogJsonLd(path: string): string {
  if (!path.startsWith("/blog/")) return "";
  const slug = path.replace("/blog/", "");
  const post = BLOG_META.find((p) => p.slug === slug);
  if (!post) return "";

  const canonicalUrl = `${BASE_DOMAIN}/blog/${post.slug}`;
  const image = toAbsoluteImage(post.image);
  const authorAgentId = AUTHOR_AGENT_MAP[post.author];
  // Prefer canonical agent.title from agent meta so job titles stay
  // consistent across posts (authorRole strings drift in blog data).
  const authorAgent = authorAgentId ? AGENT_META[authorAgentId] : undefined;
  const authorJobTitle = authorAgent?.title || post.authorRole;
  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": canonicalUrl,
    url: canonicalUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    headline: post.title,
    description: post.excerpt,
    image: { "@type": "ImageObject", url: image },
    inLanguage: "en-US",
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: authorJobTitle,
      ...(authorAgentId ? { url: `${BASE_DOMAIN}/agent/${authorAgentId}` } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: "GayRealEstateCT.net",
      url: BASE_DOMAIN,
      logo: { "@type": "ImageObject", url: `${BASE_DOMAIN}/logo.png` },
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_DOMAIN}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_DOMAIN}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
    ],
  };

  const graphs: Record<string, unknown>[] = [blogPosting, breadcrumb];

  if (post.faq && post.faq.length > 0) {
    graphs.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    });
  }

  // data-seo-edge marks server-injected schema so the client can detect it
  // (SPA may also inject Helmet JSON-LD after hydration — dual is intentional
  // for non-JS crawlers; client may skip re-emitting if it sees this attribute).
  return graphs
    .map(
      (g) =>
        `<script type="application/ld+json" data-seo-edge="true">${JSON.stringify(g).replace(/</g, "\\u003c")}</script>`
    )
    .join("\n");
}

/**
 * <noscript> fallback for crawlers that don't execute JavaScript.
 * Uses slim meta (title/excerpt/bio) — full HTML bodies are not bundled into
 * the edge function (that was blowing Netlify edge deploy size/memory limits).
 * Injected just before </body> only for the unrendered SPA shell.
 */
function buildNoscriptBody(path: string): string {
  if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    const post = BLOG_META.find((p) => p.slug === slug);
    if (!post) return "";
    const canonicalUrl = `${BASE_DOMAIN}/blog/${post.slug}`;
    return `<noscript><article><h1>${esc(post.title)}</h1><p><em>By ${esc(post.author)} — ${esc(post.date)}</em></p><p>${esc(post.excerpt)}</p><p><a href="${canonicalUrl}">${esc(post.title)}</a> — <a href="${BASE_DOMAIN}/blog">All articles</a> — GayRealEstateCT.net</p></article></noscript>`;
  }
  if (path.startsWith("/agent/")) {
    const agent = AGENT_META[path.replace("/agent/", "")];
    if (!agent) return "";
    const bioHtml = (agent.bio || "")
      .split(/\n+/)
      .filter((p: string) => p.trim())
      .map((p: string) => `<p>${esc(p)}</p>`)
      .join("");
    const specialties = (agent.specialties || []).map((s: string) => `<li>${esc(s)}</li>`).join("");
    return `<noscript><article><h1>${esc(agent.name)} — ${esc(agent.title)}</h1><p><em>${esc(agent.tagline || "")}</em></p>${bioHtml}${specialties ? `<ul>${specialties}</ul>` : ""}<p><a href="${BASE_DOMAIN}/contact">Contact ${esc(agent.name)}</a> — GayRealEstateCT.net</p></article></noscript>`;
  }
  return "";
}

/** Build the per-page meta tag block. */
function buildMetaTags(path: string, meta: PageMeta, noindex: boolean): string {
  const canonicalUrl = `${BASE_DOMAIN}${path}`;
  const ogType = path.startsWith("/blog/") ? "article" : "website";
  const robotsContent = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const title = esc(meta.title);
  const description = esc(meta.description);
  const ogImageAlt = esc(meta.ogImageAlt);
  // Homepage LCP is the first hero slide (see components/ui/shape-landing-hero.tsx)
  // — preload it only on "/" so other pages don't waste bandwidth on it.
  const lcpPreload =
    path === "/"
      ? `\n    <link rel="preload" as="image" href="/images/ct-highlights/anastasia-oDpiy4LNyIs-unsplash.jpg" fetchpriority="high" />`
      : "";
  const keywordsMeta = (() => {
    if (!path.startsWith("/blog/")) return "";
    const slug = path.replace("/blog/", "");
    const post = BLOG_META.find((p) => p.slug === slug);
    if (!post?.seoKeywords) return "";
    return `\n    <meta name="keywords" content="${esc(post.seoKeywords)}" />`;
  })();
  return `
    <title>${title}</title>
    <meta name="description" content="${description}" />${keywordsMeta}${lcpPreload}
    <meta name="robots" content="${robotsContent}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${meta.ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${ogImageAlt}" />
    <meta property="og:site_name" content="GayRealEstateCT.net" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@GayRealEstateCT" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${meta.ogImage}" />
    <meta name="twitter:image:alt" content="${ogImageAlt}" />
    ${buildBlogJsonLd(path)}
  `;
}

/**
 * Return a copy of the upstream headers safe to send with a transformed body.
 * Content-Length / Content-Encoding / ETag describe the *original* bytes; if we
 * forward them alongside a longer (meta-injected) body the response can be
 * truncated or rejected.
 */
function safeHeaders(source: Headers): Headers {
  const headers = new Headers(source);
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.delete("etag");
  return headers;
}

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  let path = url.pathname;

  // Anything not served from the canonical production host (e.g. the
  // *.netlify.app URL or a deploy preview) must never be indexed.
  const isProductionHost = url.hostname === PRODUCTION_HOST;

  // Normalize path: remove trailing slash for consistency
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  if (path.startsWith("/api/")) {
    return;
  }

  // 301 trailing-slash page URLs to their canonical non-slash form so search
  // engines never see two URLs (200) for the same page. Same-origin so deploy
  // previews keep working; asset paths never end in "/" so they're unaffected.
  if (url.pathname.length > 1 && url.pathname.endsWith("/") && !path.includes(".")) {
    return Response.redirect(`${url.origin}${path}${url.search}`, 301);
  }

  // Non-HTML assets (anything with a file extension that isn't .html) pass through.
  if (path.includes(".") && !path.endsWith(".html")) {
    return;
  }

  // 301 redirects for old blog slugs — must be handled here because edge functions
  // run before Netlify _redirects rules in the request pipeline.
  if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    if (slug && BLOG_REDIRECTS[slug]) {
      return Response.redirect(`${BASE_DOMAIN}${BLOG_REDIRECTS[slug]}`, 301);
    }
  }

  // 301 redirects for legacy non-blog paths (e.g. /agents -> /about).
  if (STATIC_REDIRECTS[path]) {
    return Response.redirect(`${BASE_DOMAIN}${STATIC_REDIRECTS[path]}`, 301);
  }

  // Determine whether this is a real route. Unknown routes must return a true
  // HTTP 404 (not a 200 "soft 404") so search engines drop them instead of
  // indexing a thin error page. We still serve the styled SPA shell so humans
  // see the nice 404 page.
  let isNotFound = false;
  if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    isNotFound = !KNOWN_BLOG_SLUGS.has(slug);
  } else if (path.startsWith("/agent/")) {
    const id = path.replace("/agent/", "");
    isNotFound = !KNOWN_AGENT_IDS.has(id);
  } else {
    isNotFound = !KNOWN_STATIC_PATHS.has(path);
  }

  if (isNotFound) {
    const response = await context.next();
    // Never rewrite a redirect into a 404. If the pipeline already produced a
    // 3xx (e.g. a _redirects rule), honor it as-is — returning a 404 that still
    // carries a Location header is what Google reports as a "Redirect error".
    if (response.status >= 300 && response.status < 400) {
      return response;
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("text/html")) {
      return response;
    }
    let text = await response.text();
    text = stripExistingTags(text);
    const meta: PageMeta = {
      title: "Page Not Found | GayRealEstateCT.net",
      description: "The page you are looking for could not be found.",
      ogImage: DEFAULT_IMAGE,
      ogImageAlt: DEFAULT_IMAGE_ALT,
    };
    text = text.replace("</head>", `${buildMetaTags(path, meta, true)}</head>`);
    const headers404 = safeHeaders(response.headers);
    if (!isProductionHost) headers404.set("X-Robots-Tag", "noindex, nofollow");
    return new Response(text, { status: 404, headers: headers404 });
  }

  // Known route. Inject per-page SEO meta for EVERY request — including search
  // and social crawlers. We no longer bypass bots to Netlify's (deprecated)
  // Prerendering service: doing so left non-JS crawlers (Bing, Facebook,
  // LinkedIn, Twitter/X) with the bare SPA shell — a generic title and no
  // description/canonical/OG tags. Injecting the tags here guarantees correct
  // metadata regardless of any dashboard setting, and Googlebot still renders
  // the JS body on top of it.
  const response = await context.next();
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    return response;
  }

  let text = await response.text();
  // Detect the unrendered SPA shell BEFORE stripping tags: a prerendered page
  // already contains its content in the DOM and needs no noscript fallback.
  const isUnrenderedShell = text.includes('<div id="root"></div>');
  text = stripExistingTags(text);
  const meta = resolveMeta(path);
  // Force noindex on non-production hosts so the *.netlify.app / preview copies
  // never get indexed alongside the real domain.
  const noindex = NOINDEX_PATHS.has(path) || !isProductionHost;
  text = text.replace("</head>", `${buildMetaTags(path, meta, noindex)}</head>`);
  if (isUnrenderedShell) {
    const noscriptBody = buildNoscriptBody(path);
    if (noscriptBody) {
      text = text.replace("</body>", `${noscriptBody}\n</body>`);
    }
  }

  const outHeaders = safeHeaders(response.headers);
  if (!isProductionHost) outHeaders.set("X-Robots-Tag", "noindex, nofollow");

  return new Response(text, {
    headers: outHeaders,
  });
};

export const config = {
  path: "/*",
  excludedPath: ["/*.js", "/*.css", "/*.png", "/*.jpg", "/*.svg", "/*.webp", "/images/*", "/favicon.ico", "/google*.html"],
};
