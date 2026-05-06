import type { Context } from "@netlify/edge-functions";

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

  // Return 404 for blog slugs that don't exist so Google removes them from index
  // instead of seeing a 200+noindex from the NotFound component.
  // Keep this list in sync with BLOG_DATA above.
  if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    if (slug && !BLOG_DATA[slug]) {
      return new Response("Not Found", { status: 404, headers: { "Content-Type": "text/plain" } });
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
  }

  // Remove existing meta tags to prevent duplicates.
  // NOTE: canonical is intentionally NOT removed or re-injected here.
  // react-helmet-async injects canonical client-side, and Googlebot executes JS.
  // A server-side canonical would create a duplicate that triggers the
  // "Duplicate, Google chose different canonical than user" GSC error.
  text = text.replace(/<title>.*?<\/title>/, "");
  text = text.replace(/<meta name="description" content=".*?" \/>/g, "");
  text = text.replace(/<meta property="og:type" content=".*?" \/>/g, "");
  text = text.replace(/<meta property="og:title" content=".*?" \/>/g, "");
  text = text.replace(/<meta property="og:description" content=".*?" \/>/g, "");
  text = text.replace(/<meta property="og:url" content=".*?" \/>/g, "");
  text = text.replace(/<meta property="og:image" content=".*?" \/>/g, "");
  text = text.replace(/<meta property="og:image:alt" content=".*?" \/>/g, "");
  text = text.replace(/<meta name="twitter:card" content=".*?" \/>/g, "");
  text = text.replace(/<meta name="twitter:title" content=".*?" \/>/g, "");
  text = text.replace(/<meta name="twitter:description" content=".*?" \/>/g, "");
  text = text.replace(/<meta name="twitter:image" content=".*?" \/>/g, "");
  text = text.replace(/<meta name="twitter:image:alt" content=".*?" \/>/g, "");

  const canonicalUrl = `${BASE_DOMAIN}${path}`;
  const ogType = path.startsWith("/blog/") ? "article" : "website";
  const metaTags = `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:alt" content="${ogImageAlt}" />
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

export const config = {
  path: "/*",
  excludedPath: ["/*.js", "/*.css", "/*.png", "/*.jpg", "/*.svg", "/*.webp", "/images/*", "/favicon.ico"],
};
