import type { Context } from "@netlify/edge-functions";
import { SSR_BLOG_POSTS, SSR_AGENTS } from "./_ssr-data.ts";

const BASE_DOMAIN = "https://www.gayrealestatect.net";
const DEFAULT_IMAGE = `${BASE_DOMAIN}/hero-house.png`;
const DEFAULT_IMAGE_ALT = "GayRealEstateCT.net - LGBTQ+ Friendly Real Estate in Connecticut";

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

  if (path.includes(".") && !path.endsWith(".html")) {
    return;
  }

  // 301 redirects for old blog slugs — must be handled here because edge functions
  // run before Netlify _redirects rules in the request pipeline.
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

  if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    if (slug && BLOG_REDIRECTS[slug]) {
      return Response.redirect(`${BASE_DOMAIN}${BLOG_REDIRECTS[slug]}`, 301);
    }
    // Return 404 for any other unknown blog slug so Google deindexes it
    // instead of seeing a 200+noindex from the NotFound component.
    if (slug && !BLOG_DATA[slug]) {
      return new Response("Not Found", { status: 404, headers: { "Content-Type": "text/plain" } });
    }
  }

  const BOT_PATTERNS = ["Googlebot", "bingbot", "Slurp", "DuckDuckBot", "Baiduspider", "facebookexternalhit", "Twitterbot", "LinkedInBot", "Pinterestbot", "Applebot"];
  const ua = request.headers.get("user-agent") || "";
  const isBot = BOT_PATTERNS.some(bot => ua.toLowerCase().includes(bot.toLowerCase()));

  if (isBot) {
    if (path.startsWith("/blog/")) {
      const slug = path.replace("/blog/", "");
      const post = SSR_BLOG_POSTS[slug];
      if (post) {
        const meta = BLOG_DATA[slug];
        return buildBlogSsrResponse(post, `${BASE_DOMAIN}${path}`, meta?.description ?? post.title);
      }
    }
    if (path.startsWith("/agent/")) {
      const id = path.replace("/agent/", "");
      const agent = SSR_AGENTS[id];
      if (agent) {
        const meta = AGENT_DATA[id];
        return buildAgentSsrResponse(agent, `${BASE_DOMAIN}${path}`, meta?.description ?? agent.title);
      }
    }
  }

  const response = await context.next();
  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("text/html")) {
    return response;
  }

  let text = await response.text();

  let title = "GayRealEstateCT.net | LGBTQ+ Friendly Real Estate in Connecticut";
  let description = "Find trusted, LGBTQ+ friendly real estate agents, mortgage lenders, and attorneys in Connecticut.";
  let ogImage = DEFAULT_IMAGE;
  let ogImageAlt = DEFAULT_IMAGE_ALT;

  if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    const blog = BLOG_DATA[slug];
    if (blog) {
      title = `${blog.title} | Gay Real Estate CT`;
      description = blog.description;
      ogImage = blog.image;
      ogImageAlt = blog.title;
    }
  } else if (path.startsWith("/agent/")) {
    const id = path.replace("/agent/", "");
    const agent = AGENT_DATA[id];
    if (agent) {
      title = `${agent.title} | Gay Real Estate CT`;
      description = agent.description;
      ogImage = agent.image;
      ogImageAlt = agent.title;
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

  // Remove existing meta tags to prevent duplicates before re-injecting.
  text = text.replace(/<title>.*?<\/title>/, "");
  text = text.replace(/<meta name="description" content=".*?" \/>/g, "");
  text = text.replace(/<meta name="robots" content=".*?" \/>/g, "");
  text = text.replace(/<link rel="canonical" href=".*?" \/>/g, "");
  text = text.replace(/<meta property="og:locale" content=".*?" \/>/g, "");
  text = text.replace(/<meta property="og:type" content=".*?" \/>/g, "");
  text = text.replace(/<meta property="og:title" content=".*?" \/>/g, "");
  text = text.replace(/<meta property="og:description" content=".*?" \/>/g, "");
  text = text.replace(/<meta property="og:url" content=".*?" \/>/g, "");
  text = text.replace(/<meta property="og:image" content=".*?" \/>/g, "");
  text = text.replace(/<meta property="og:image:width" content=".*?" \/>/g, "");
  text = text.replace(/<meta property="og:image:height" content=".*?" \/>/g, "");
  text = text.replace(/<meta property="og:image:alt" content=".*?" \/>/g, "");
  text = text.replace(/<meta property="og:site_name" content=".*?" \/>/g, "");
  text = text.replace(/<meta name="twitter:card" content=".*?" \/>/g, "");
  text = text.replace(/<meta name="twitter:title" content=".*?" \/>/g, "");
  text = text.replace(/<meta name="twitter:description" content=".*?" \/>/g, "");
  text = text.replace(/<meta name="twitter:image" content=".*?" \/>/g, "");
  text = text.replace(/<meta name="twitter:image:alt" content=".*?" \/>/g, "");

  const NOINDEX_PATHS = new Set(["/blog/lgbtq-events-connecticut-march-2026"]);
  const canonicalUrl = `${BASE_DOMAIN}${path}`;
  const ogType = path.startsWith("/blog/") ? "article" : "website";
  const robotsContent = NOINDEX_PATHS.has(path)
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const metaTags = `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="${robotsContent}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${ogImageAlt}" />
    <meta property="og:site_name" content="GayRealEstateCT.net" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@GayRealEstateCT" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${ogImage}" />
    <meta name="twitter:image:alt" content="${ogImageAlt}" />
  `;
  text = text.replace("</head>", `${metaTags}</head>`);

  return new Response(text, {
    headers: response.headers,
  });
};

const SSR_STYLES = `
  *{box-sizing:border-box}
  body{font-family:Georgia,serif;max-width:820px;margin:0 auto;padding:1.5rem 1.25rem;color:#1a1a1a;background:#fff;line-height:1.7}
  nav{font-family:sans-serif;font-size:.9rem;margin-bottom:1.5rem}
  nav a{color:#7c3aed;text-decoration:none}
  h1{font-size:1.9rem;line-height:1.25;margin:0 0 .5rem;color:#111}
  h2{font-size:1.3rem;margin:2rem 0 .5rem;color:#222}
  h3{font-size:1.1rem;margin:1.5rem 0 .4rem;color:#333}
  p{margin:0 0 1rem}
  ul,ol{padding-left:1.4rem;margin:0 0 1rem}
  li{margin-bottom:.4rem}
  strong{color:#111}
  a{color:#7c3aed}
  .meta{font-family:sans-serif;font-size:.85rem;color:#666;margin-bottom:1.5rem}
  .hero-img{width:100%;height:auto;border-radius:8px;margin-bottom:1.5rem}
  .lead-paragraph{font-size:1.1rem;font-weight:500;color:#333}
  .cta{background:#f3e8ff;border-left:4px solid #7c3aed;padding:1rem 1.25rem;margin:2rem 0;border-radius:0 6px 6px 0;font-family:sans-serif}
  .cta a{color:#7c3aed;font-weight:600}
  .tag{display:inline-block;background:#f3e8ff;color:#5b006b;font-size:.75rem;font-weight:600;padding:.2rem .6rem;border-radius:99px;margin:.2rem .2rem 0 0;font-family:sans-serif}
  .stat-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.75rem;margin:1rem 0}
  .stat{background:#f8f4ff;border:1px solid #e9d5ff;border-radius:8px;padding:.75rem;font-family:sans-serif}
  .stat-label{font-size:.7rem;text-transform:uppercase;letter-spacing:.05em;color:#7c3aed;font-weight:700}
  .stat-value{font-size:.9rem;font-weight:600;color:#1a1a1a;margin-top:.2rem}
  footer{margin-top:2.5rem;padding-top:1.5rem;border-top:1px solid #e5e7eb;font-family:sans-serif;font-size:.875rem;color:#555}
  footer a{color:#7c3aed;text-decoration:none;font-weight:600}
`;

function ssrHead(title: string, description: string, canonicalUrl: string, ogImage: string, type: "article" | "website" = "website", jsonLd?: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${escHtml(title)}</title>
<meta name="description" content="${escHtml(description)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<link rel="canonical" href="${canonicalUrl}">
<meta property="og:locale" content="en_US">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${escHtml(title)}">
<meta property="og:description" content="${escHtml(description)}">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="GayRealEstateCT.net">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@GayRealEstateCT">
<meta name="twitter:title" content="${escHtml(title)}">
<meta name="twitter:description" content="${escHtml(description)}">
<meta name="twitter:image" content="${ogImage}">
${jsonLd ? `<script type="application/ld+json">${jsonLd}</script>` : ""}
<style>${SSR_STYLES}</style>
</head>
<body>`;
}

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function buildBlogSsrResponse(post: import("./_ssr-data.ts").SsrBlogPost, canonicalUrl: string, description: string): Response {
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "author": { "@type": "Person", "name": post.author },
    "datePublished": post.date,
    "image": post.image,
    "publisher": { "@type": "Organization", "name": "GayRealEstateCT.net", "url": BASE_DOMAIN },
  });

  const html = ssrHead(`${post.title} | Gay Real Estate CT`, description, canonicalUrl, post.image, "article", jsonLd)
    + `<nav><a href="/">← GayRealEstateCT.net</a></nav>
<article>
<img class="hero-img" src="${post.image}" alt="${escHtml(post.title)}" width="820" height="430" loading="eager">
<h1>${escHtml(post.title)}</h1>
<div class="meta">${escHtml(post.author)} &nbsp;·&nbsp; ${formatDate(post.date)} &nbsp;·&nbsp; ${escHtml(post.readTime)}</div>
${post.content}
</article>
<div class="cta">
  <strong>Ready to find your LGBTQ+-welcoming home in Connecticut?</strong><br>
  <a href="/">Connect with our team →</a>
</div>
<footer>
  <p><a href="/">GayRealEstateCT.net</a> &nbsp;·&nbsp; LGBTQ+ Friendly Real Estate in Connecticut</p>
  <p><a href="/blog">← Back to Blog</a></p>
</footer>
</body></html>`;

  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}

function buildAgentSsrResponse(agent: import("./_ssr-data.ts").SsrAgent, canonicalUrl: string, description: string): Response {
  const credHtml = agent.credentials.map(c => `<li>${escHtml(c.label)}</li>`).join("\n");
  const specHtml = agent.specialties.map(s => `<span class="tag">${escHtml(s)}</span>`).join(" ");
  const statsHtml = agent.stats.map(s =>
    `<div class="stat"><div class="stat-label">${escHtml(s.label)}</div><div class="stat-value">${escHtml(s.value)}</div></div>`
  ).join("\n");
  const bioHtml = agent.bio.split("\n\n").map(p => `<p>${escHtml(p)}</p>`).join("\n");

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": agent.name,
    "jobTitle": agent.title,
    "image": agent.image,
    "url": canonicalUrl,
    "worksFor": { "@type": "Organization", "name": "GayRealEstateCT.net" },
  });

  const html = ssrHead(`${agent.name} | Gay Real Estate CT`, description, canonicalUrl, agent.image, "website", jsonLd)
    + `<nav><a href="/">← GayRealEstateCT.net</a></nav>
<article>
<img class="hero-img" src="${agent.image}" alt="${escHtml(agent.name)}" width="820" height="500" loading="eager">
<h1>${escHtml(agent.name)}</h1>
<p class="meta">${escHtml(agent.title)}</p>
<div class="stat-row">${statsHtml}</div>
<h2>About</h2>
${bioHtml}
<h2>Specialties</h2>
<p>${specHtml}</p>
<h2>Credentials</h2>
<ul>${credHtml}</ul>
${agent.bookingLink ? `<div class="cta"><strong>Ready to get started?</strong><br><a href="${agent.bookingLink}">Book a consultation with ${escHtml(agent.name)} →</a></div>` : `<div class="cta"><strong>Have questions?</strong><br><a href="/contact">Contact our team →</a></div>`}
</article>
<footer>
  <p><a href="/">GayRealEstateCT.net</a> &nbsp;·&nbsp; LGBTQ+ Friendly Real Estate in Connecticut</p>
  <p><a href="/about">← Meet the full team</a></p>
</footer>
</body></html>`;

  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}

export const config = {
  path: "/*",
  excludedPath: ["/*.js", "/*.css", "/*.png", "/*.jpg", "/*.svg", "/*.webp", "/images/*", "/favicon.ico"],
};
