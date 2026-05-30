import type { Context } from "@netlify/edge-functions";
import { BLOG_POSTS } from "../../data/blogs.ts";
import { agents } from "../../data/agents.ts";

const BASE_DOMAIN = "https://www.gayrealestatect.net";
const DEFAULT_IMAGE = `${BASE_DOMAIN}/hero-house.png`;
const DEFAULT_IMAGE_ALT = "GayRealEstateCT.net - LGBTQ+ Friendly Real Estate in Connecticut";

// Source-of-truth sets derived from the canonical data files so the edge
// function never drifts out of sync with the published content. (Previously a
// hardcoded BLOG_DATA map doubled as the "does this post exist?" gate, which
// silently 404'd every blog post that wasn't manually copied in here.)
const KNOWN_BLOG_SLUGS = new Set(BLOG_POSTS.map((p) => p.slug));
const KNOWN_AGENT_IDS = new Set(Object.keys(agents));
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
  "/blog",
  "/contact",
]);

// Curated, hand-tuned meta for the highest-value pages. Anything not listed
// here falls back to the data file (title + excerpt + image), so new posts get
// correct meta automatically.
const BLOG_DATA: Record<string, { title: string; description: string; image: string }> = {
  "best-places-to-live-in-connecticut-lgbtq": {
    title: "Best Places to Live in Connecticut for LGBTQ+ People (2026 Guide)",
    description: "Connecticut is more welcoming than you think — find your definitive guide to finding your people and your place.",
    image: `${BASE_DOMAIN}/ct_lgbtq_places.png`,
  },
  "why-west-hartford-is-lgbtq-friendly-connecticut": {
    title: "Why West Hartford Is One of the Most LGBTQ+-Friendly Towns in Connecticut",
    description: "A deep dive into why West Hartford consistently tops the list for inclusive living.",
    image: `${BASE_DOMAIN}/west_hartford_lgbtq.png`,
  },
  "moving-to-connecticut-as-a-gay-couple": {
    title: "Moving to Connecticut as a Gay Couple: What No One Tells You",
    description: "Real-world advice for same-sex couples relocating to CT.",
    image: `${BASE_DOMAIN}/gay_couple_moving_ct.png`,
  },
  "most-lgbtq-inclusive-school-districts-connecticut": {
    title: "The Most LGBTQ+-Inclusive School Districts in Connecticut (2026)",
    description: "Essential research for LGBTQ+ families with children in CT.",
    image: `${BASE_DOMAIN}/inclusive_schools_ct.png`,
  },
  "1-million-nyc-vs-connecticut-what-do-you-get": {
    title: "$1 Million in NYC vs. $1 Million in Connecticut",
    description: "The stark contrast in quality of life and space between NYC and CT real estate.",
    image: `${BASE_DOMAIN}/nyc_vs_ct_real_estate.png`,
  },
  "lgbtq-events-connecticut-march-2026": {
    title: "LGBTQ+ Events in Connecticut – March 2026",
    description: "Your monthly guide to the best LGBTQ+ events, community gatherings, and Pride celebrations in CT.",
    image: `${BASE_DOMAIN}/lgbtq_events_ct.png`,
  },
  "litchfield-county-second-homes-lgbtq-buyers": {
    title: "Litchfield County's Best-Kept Secret: Second Homes for LGBTQ+ Buyers",
    description: "Northwestern Connecticut's retreat for LGBTQ+ professionals and creatives.",
    image: `${BASE_DOMAIN}/lgbtq_first_time_buyer.png`,
  },
  "litchfield-county-towns-for-weekenders": {
    title: "Lake Waramaug, Washington, & Beyond: Litchfield County Guide",
    description: "Town-by-town guide to the hidden corners of LGBTQ+ friendly Litchfield County.",
    image: `${BASE_DOMAIN}/inclusive_neighborhoods.png`,
  },
  "legal-protections-lgbtq-real-estate-connecticut": {
    title: "Protecting Your Home & Relationship: LGBTQ+ Legal Guide",
    description: "What LGBTQ+ buyers need to know about title, deeds, and legal protections in CT.",
    image: `${BASE_DOMAIN}/generational_wealth_real_estate.png`,
  },
  "trans-moving-connecticut-guide": {
    title: "Trans Moving to Connecticut: What to Actually Know Before You Relocate",
    description: "Essential guide for trans individuals and families relocating to Connecticut.",
    image: `${BASE_DOMAIN}/trans_moving_ct.png`,
  },
  "lgbtq-friendly-small-towns-connecticut": {
    title: "LGBTQ-Friendly Small Towns in Connecticut: An Honest Guide",
    description: "Beyond the cities — the small towns in CT that are genuinely welcoming to the LGBTQ+ community.",
    image: `${BASE_DOMAIN}/lgbtq_small_towns_ct.png`,
  },
  "wooster-square-new-haven-lgbtq-neighborhood": {
    title: "Wooster Square New Haven: Is It Still the Best LGBTQ Neighborhood?",
    description: "Deep dive into New Haven's most famous LGBTQ-concentrated neighborhood.",
    image: `${BASE_DOMAIN}/new_haven_wooster.png`,
  },
  "chester-ct-lgbtq-family-guide": {
    title: "Chester, CT for LGBTQ Families: Is This Small Town Worth It?",
    description: "An artsy, welcoming small town in the CT River Valley for LGBTQ+ families.",
    image: `${BASE_DOMAIN}/chester_ct_family.png`,
  },
  "best-lgbtq-neighborhoods-new-haven-ct": {
    title: "Best LGBTQ Neighborhoods in New Haven, CT: A Real Breakdown",
    description: "Comparing East Rock, Wooster Square, and Westville for LGBTQ+ residents.",
    image: `${BASE_DOMAIN}/new_haven_neighborhoods.png`,
  },
  "gay-realtor-connecticut-guide": {
    title: "Gay Realtor in Connecticut: How to Find One That Actually Helps",
    description: "Why working with an agent who 'gets it' matters for LGBTQ+ home buyers in CT.",
    image: `${BASE_DOMAIN}/gay_realtor_guide.png`,
  },
};

const AGENT_DATA: Record<string, { title: string; description: string; image: string }> = {
  "arek": {
    title: "Arek Wtulich | LGBTQ+ Real Estate Agent in CT",
    description: "Expert real estate guidance from the co-founder of the CT LGBTQ+ Real Estate Alliance.",
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
  "selling-home-connecticut-lgbtq": "/sellers-guide",
};

const NOINDEX_PATHS = new Set(["/blog/lgbtq-events-connecticut-march-2026"]);

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
    const curated = BLOG_DATA[slug];
    if (curated) {
      title = `${curated.title} | Gay Real Estate CT`;
      description = curated.description;
      ogImage = curated.image;
      ogImageAlt = curated.title;
    } else {
      const post = BLOG_POSTS.find((p) => p.slug === slug);
      if (post) {
        title = `${post.title} | Gay Real Estate CT`;
        description = truncate(post.excerpt);
        ogImage = toAbsoluteImage(post.image);
        ogImageAlt = post.title;
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
      const agent = agents[id];
      if (agent) {
        title = `${agent.name} | ${agent.title} | Gay Real Estate CT`;
        description = truncate(agent.tagline || agent.bio);
        ogImage = toAbsoluteImage(agent.image);
        ogImageAlt = `${agent.name} — ${agent.title}`;
      }
    }
  } else if (path === "/blog") {
    title = "LGBTQ+ Real Estate Blog | GayRealEstateCT.net";
    description = "Expert guides, neighborhood spotlights, and market insights for LGBTQ+ home buyers and sellers in Connecticut.";
  } else if (path === "/") {
    title = "GayRealEstateCT.net | LGBTQ+ Friendly Real Estate Agents in Connecticut";
    description = "Find trusted, LGBTQ+ friendly real estate agents, mortgage lenders, and attorneys in Connecticut. Your one-stop shop for inclusive home buying.";
  } else if (path === "/about") {
    title = "About Us | GayRealEstateCT.net";
    description = "Meet the team dedicated to inclusive real estate in Connecticut.";
  } else if (path === "/first-time-buyers") {
    title = "First-Time Homebuyer Guide for LGBTQ+ Buyers in CT | GayRealEstateCT.net";
    description = "Everything LGBTQ+ first-time buyers need to know about purchasing a home in Connecticut.";
    ogImage = `${BASE_DOMAIN}/lgbtq_first_time_buyer.png`;
    ogImageAlt = "LGBTQ+ First-Time Home Buyer Guide for Connecticut";
  } else if (path === "/buyers-guide") {
    title = "LGBTQ+ Buyer's Guide | GayRealEstateCT.net";
    description = "Complete Connecticut buyer's guide for LGBTQ+ home buyers.";
  } else if (path === "/sellers-guide") {
    title = "Connecticut Seller's Guide | GayRealEstateCT.net";
    description = "Complete guide to selling your Connecticut home — pricing, staging, marketing, and closing.";
  } else if (path === "/mortgage-calculator") {
    title = "Connecticut Mortgage Calculator | LGBTQ+ Home Buying | GayRealEstateCT.net";
    description = "Estimate your monthly mortgage payment for Connecticut homes. Includes principal, interest, taxes, insurance, PMI, and HOA.";
  } else if (path === "/relocation") {
    title = "LGBTQ+ Relocation Services in Connecticut | GayRealEstateCT.net";
    description = "Relocating to Connecticut? Our LGBTQ+-led team provides full-service relocation support — neighborhood matching, community integration, and remote closing support.";
  } else if (path === "/home-valuation") {
    title = "Free Home Valuation in Connecticut | GayRealEstateCT.net";
    description = "Get a free, accurate home valuation from LGBTQ+-allied Connecticut real estate agents. No algorithms, no pressure.";
  } else if (path === "/marketing-your-home") {
    title = "Marketing Your Home in Connecticut | GayRealEstateCT.net";
    description = "See how we market your Connecticut home to get top dollar — professional photography, MLS syndication, and LGBTQ+ buyer network outreach.";
  } else if (path === "/community") {
    title = "Community Hub | Premium LGBTQ+ Events & Culture in CT";
    description = "Join the vibrant heart of Connecticut's LGBTQ+ community. Explore legendary venues, iconic drag performances, and exclusive local events.";
    ogImage = `${BASE_DOMAIN}/images/events/community-hero.png`;
    ogImageAlt = "LGBTQ+ Community Events in Connecticut";
  } else if (path === "/reviews") {
    title = "Client Reviews | GayRealEstateCT.net";
    description = "See what LGBTQ+ clients say about our Connecticut real estate services.";
  } else if (path === "/privacy-policy") {
    title = "Privacy Policy & Data Protection | GayRealEstateCT.net";
    description = "Our commitment to your privacy. Learn how we protect your data with a focus on LGBTQ+ security and non-disclosure.";
  } else if (path === "/contact") {
    title = "Contact Us | GayRealEstateCT.net — LGBTQ+ Real Estate Connecticut";
    description = "Get in touch with our LGBTQ+-led Connecticut real estate team. Connect with a trusted agent, mortgage lender, or attorney who understands your community.";
  }

  return { title, description, ogImage, ogImageAlt };
}

/** Strip any existing SEO tags from the shell so we never emit duplicates. */
function stripExistingTags(text: string): string {
  return text
    .replace(/<title>.*?<\/title>/, "")
    .replace(/<meta name="description" content=".*?" \/>/g, "")
    .replace(/<meta name="robots" content=".*?" \/>/g, "")
    .replace(/<link rel="canonical" href=".*?" \/>/g, "")
    .replace(/<meta property="og:[^"]*" content=".*?" \/>/g, "")
    .replace(/<meta name="twitter:[^"]*" content=".*?" \/>/g, "");
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
  return `
    <title>${title}</title>
    <meta name="description" content="${description}" />
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

  // Normalize path: remove trailing slash for consistency
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  if (path.startsWith("/api/")) {
    return;
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
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("text/html")) {
      return new Response(response.body, { status: 404, headers: safeHeaders(response.headers) });
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
    return new Response(text, { status: 404, headers: safeHeaders(response.headers) });
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
  text = stripExistingTags(text);
  const meta = resolveMeta(path);
  const noindex = NOINDEX_PATHS.has(path);
  text = text.replace("</head>", `${buildMetaTags(path, meta, noindex)}</head>`);

  return new Response(text, {
    headers: safeHeaders(response.headers),
  });
};

export const config = {
  path: "/*",
  excludedPath: ["/*.js", "/*.css", "/*.png", "/*.jpg", "/*.svg", "/*.webp", "/images/*", "/favicon.ico"],
};
