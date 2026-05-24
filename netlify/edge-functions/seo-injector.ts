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
  "best-gay-friendly-places-to-retire-in-connecticut": {
    title: "Best Gay-Friendly Places to Retire in Connecticut",
    description: "Planning LGBTQ+ retirement in Connecticut? Here's where to look — from active adult communities to quiet shoreline towns — with honest notes on healthcare, community, and cost.",
    image: `${BASE_DOMAIN}/lgbtq_small_towns_ct.png`,
  },
  "cheapest-gay-friendly-cities-in-connecticut": {
    title: "Cheapest Gay-Friendly Cities in Connecticut",
    description: "Budget-conscious LGBTQ+ buyer? Here are the most affordable gay-friendly cities in Connecticut — with real median prices and honest community assessments.",
    image: `${BASE_DOMAIN}/nyc_vs_ct_real_estate.png`,
  },
  "connecticut-is-1-in-the-us-for-lgbtq-real-estate-searches-here-s-why": {
    title: "Connecticut Is #1 in the US for LGBTQ Real Estate Searches - Here's Why",
    description: "Google Trends data shows Connecticut ranks #1 nationally for LGBTQ real estate search volume — including \"gay realtor CT\" and \"gay real estate agent Connecticut.\" Here's what's driving it.",
    image: `${BASE_DOMAIN}/ct_lgbtq_places.png`,
  },
  "do-you-need-an-lgbtq-real-estate-attorney": {
    title: "Do You Need an LGBTQ Real Estate Attorney?",
    description: "When does an LGBTQ+ buyer or seller need a specialized real estate attorney — and what does one actually do differently? A Connecticut attorney explains.",
    image: `${BASE_DOMAIN}/generational_wealth_real_estate.png`,
  },
  "gay-areas-in-connecticut-neighborhood-by-neighborhood-guide": {
    title: "Gay Areas in Connecticut: Neighborhood-by-Neighborhood Guide",
    description: "A real, specific guide to the most LGBTQ+ welcoming neighborhoods in Connecticut — from West Hartford's Blue Back Square to New Haven's Wooster Square and beyond.",
    image: `${BASE_DOMAIN}/inclusive_neighborhoods.png`,
  },
  "gay-friendly-towns-in-connecticut-2026-ranked-guide": {
    title: "Gay Friendly Towns in Connecticut: 2026 Ranked Guide",
    description: "Our 2026 ranking of the most LGBTQ-friendly towns in Connecticut — based on legal protections, community fabric, school district policies, and real estate value.",
    image: `${BASE_DOMAIN}/new_haven_neighborhoods.png`,
  },
  "how-to-choose-a-gay-friendly-realtor-2026-guide": {
    title: "How to Choose a Gay Realtor or LGBT Real Estate Agent (2026 Guide)",
    description: "Not every realtor understands LGBTQ+ buyers. Learn what questions to ask, what credentials matter, and how to find a truly affirming gay realtor or LGBT real estate agent in Connecticut.",
    image: `${BASE_DOMAIN}/gay_realtor_guide.png`,
  },
  "lgbtq-first-time-home-buyer-guide-connecticut-edition": {
    title: "LGBTQ+ First-Time Home Buyer Guide (Connecticut Edition)",
    description: "A complete guide for LGBTQ+ first-time home buyers in Connecticut — from pre-approval to closing, with CT programs, gay realtors, LGBT real estate agents, and legal protections.",
    image: `${BASE_DOMAIN}/lgbtq_first_time_buyer.png`,
  },
  "lgbtq-housing-discrimination-statistics-2026": {
    title: "LGBTQ Housing Discrimination Statistics 2026",
    description: "Current data on LGBTQ housing discrimination in the United States and Connecticut — plus what to do if you experience it and which protections apply to you.",
    image: `${BASE_DOMAIN}/inclusive_schools_ct.png`,
  },
  "same-sex-couples-buying-a-home-7-things-to-know-before-you-sign": {
    title: "Same-Sex Couples Buying a Home: 7 Things to Know Before You Sign",
    description: "Buying a home as a same-sex couple? Here are 7 critical legal, financial, and practical considerations before you close — from a Connecticut real estate attorney.",
    image: `${BASE_DOMAIN}/gay_couple_moving_ct.png`,
  },
  "transgender-housing-rights-what-connecticut-law-says": {
    title: "Transgender Housing Rights: What Connecticut Law Says",
    description: "A complete guide to transgender housing rights in Connecticut — including what state law prohibits, how to file a discrimination complaint, and practical tips for trans home buyers.",
    image: `${BASE_DOMAIN}/trans_moving_ct.png`,
  },
  "best-lgbtq-mortgage-lenders-connecticut": {
    title: "Best LGBTQ Mortgage Lenders in Connecticut",
    description: "Not all mortgage lenders are equally welcoming. Here's what to look for in an LGBTQ-affirming lender in Connecticut, and which questions to ask before you apply.",
    image: `${BASE_DOMAIN}/generational_wealth_real_estate.png`,
  },
  "best-places-to-live-for-gay-couples-new-england": {
    title: "Best Places to Live for Gay Couples in New England (2026)",
    description: "Comparing Connecticut, Massachusetts, Rhode Island, and Vermont for LGBTQ+ couples — with honest assessments of price, community, legal protections, and quality of life.",
    image: `${BASE_DOMAIN}/inclusive_neighborhoods.png`,
  },
  "lgbtq-down-payment-assistance-programs-connecticut": {
    title: "LGBTQ Down Payment Assistance Programs: Connecticut 2026",
    description: "A complete breakdown of down payment assistance programs available to LGBTQ+ buyers in Connecticut — including CHFA grants, national programs, and how to apply.",
    image: `${BASE_DOMAIN}/lgbtq_first_time_buyer.png`,
  },
  "what-is-the-lgbtq-real-estate-alliance": {
    title: "What Is the LGBTQ+ Real Estate Alliance?",
    description: "The LGBTQ+ Real Estate Alliance certifies gay realtors and LGBT real estate agents across the US. Here's what it does, why it matters, and how to find certified agents in Connecticut.",
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

  // Pass search engine crawlers through to Netlify's prerender service
  // (enabled in Site Settings → Build & Deploy → Prerendering in the Netlify dashboard)
  // so they receive fully rendered HTML instead of the SPA shell.
  const BOT_PATTERNS = [
    // Traditional search engines
    'Googlebot', 'bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider', 'Applebot',
    // Social media crawlers (Open Graph)
    'facebookexternalhit', 'Twitterbot', 'LinkedInBot', 'Pinterestbot',
    // AI answer engines (AEO)
    'GPTBot', 'ChatGPT-User', 'anthropic-ai', 'ClaudeBot', 'PerplexityBot',
    'Bytespider', 'YouBot', 'cohere-ai', 'AI2Bot', 'Diffbot',
  ];
  const ua = request.headers.get('user-agent') || '';
  if (BOT_PATTERNS.some(bot => ua.toLowerCase().includes(bot.toLowerCase()))) {
    return;
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

export const config = {
  path: "/*",
  excludedPath: ["/*.js", "/*.css", "/*.png", "/*.jpg", "/*.svg", "/*.webp", "/images/*", "/favicon.ico"],
};
