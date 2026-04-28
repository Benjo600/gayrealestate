import type { Context } from "@netlify/edge-functions";

// Simplified data for SEO injection to keep edge function lightweight
// In a real-world scenario, you might fetch this from an API or a shared JSON file
const BLOG_DATA: Record<string, { title: string; description: string }> = {
  "best-places-to-live-in-connecticut-lgbtq": {
    title: "Best Places to Live in Connecticut for LGBTQ+ People (2026 Guide)",
    description: "Connecticut is more welcoming than you think — find your definitive guide to finding your people and your place."
  },
  "why-west-hartford-is-lgbtq-friendly-connecticut": {
    title: "Why West Hartford Is One of the Most LGBTQ+-Friendly Towns in Connecticut",
    description: "A deep dive into why West Hartford consistently tops the list for inclusive living."
  },
  "moving-to-connecticut-as-a-gay-couple": {
    title: "Moving to Connecticut as a Gay Couple: What No One Tells You",
    description: "Real-world advice for same-sex couples relocating to CT."
  },
  "most-lgbtq-inclusive-school-districts-connecticut": {
    title: "The Most LGBTQ+-Inclusive School Districts in Connecticut (2026)",
    description: "Essential research for LGBTQ+ families with children in CT."
  },
  "1-million-nyc-vs-connecticut-what-do-you-get": {
    title: "$1 Million in NYC vs. $1 Million in Connecticut",
    description: "The stark contrast in quality of life and space between NYC and CT real estate."
  },
  "lgbtq-events-connecticut-march-2026": {
    title: "LGBTQ+ Events in Connecticut – March 2026",
    description: "Your monthly guide to the best LGBTQ+ events, community gatherings, and Pride celebrations in CT."
  },
  "litchfield-county-second-homes-lgbtq-buyers": {
    title: "Litchfield County's Best-Kept Secret: Second Homes for LGBTQ+ Buyers",
    description: "Northwestern Connecticut's retreat for LGBTQ+ professionals and creatives."
  },
  "litchfield-county-towns-for-weekenders": {
    title: "Lake Waramaug, Washington, & Beyond: Litchfield County Guide",
    description: "Town-by-town guide to the hidden corners of LGBTQ+ friendly Litchfield County."
  },
  "legal-protections-lgbtq-real-estate-connecticut": {
    title: "Protecting Your Home & Relationship: LGBTQ+ Legal Guide",
    description: "What LGBTQ+ buyers need to know about title, deeds, and legal protections in CT."
  },
  "trans-moving-connecticut-guide": {
    title: "Trans Moving to Connecticut: What to Actually Know Before You Relocate",
    description: "Essential guide for trans individuals and families relocating to Connecticut."
  },
  "lgbtq-friendly-small-towns-connecticut": {
    title: "LGBTQ-Friendly Small Towns in Connecticut: An Honest Guide",
    description: "Beyond the cities — the small towns in CT that are genuinely welcoming to the LGBTQ+ community."
  },
  "wooster-square-new-haven-lgbtq-neighborhood": {
    title: "Wooster Square New Haven: Is It Still the Best LGBTQ Neighborhood?",
    description: "Deep dive into New Haven's most famous LGBTQ-concentrated neighborhood."
  },
  "chester-ct-lgbtq-family-guide": {
    title: "Chester, CT for LGBTQ Families: Is This Small Town Worth It?",
    description: "An artsy, welcoming small town in the CT River Valley for LGBTQ+ families."
  },
  "best-lgbtq-neighborhoods-new-haven-ct": {
    title: "Best LGBTQ Neighborhoods in New Haven, CT: A Real Breakdown",
    description: "Comparing East Rock, Wooster Square, and Westville for LGBTQ+ residents."
  },
  "gay-realtor-connecticut-guide": {
    title: "Gay Realtor in Connecticut: How to Find One That Actually Helps",
    description: "Why working with an agent who 'gets it' matters for LGBTQ+ home buyers in CT."
  }
};

const AGENT_DATA: Record<string, { title: string; description: string }> = {
  "arek": { title: "Arek Wtulich | LGBTQ+ Real Estate Agent in CT", description: "Expert real estate guidance from the co-founder of the CT LGBTQ+ Real Estate Alliance." },
  "abby": { title: "Abby Dudarewicz | Inclusive Realtor in Connecticut", description: "Helping LGBTQ+ families and individuals find their perfect home in CT." },
  "travis": { title: "Travis Lipinski | Litchfield County Real Estate Expert", description: "Specializing in second homes and weekend retreats in Litchfield County." },
  "jake": { title: "Jake Earl | LGBTQ+ Friendly Mortgage Expert", description: "Top 1% mortgage lender helping you navigate your CT home purchase." },
  "carolyn": { title: "Carolyn Futtner | LGBTQ+ Real Estate Attorney", description: "Protecting your home and your relationship with expert legal guidance in CT." }
};

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const path = url.pathname;

  // Only intercept page requests
  if (path.includes(".") && !path.endsWith(".html")) {
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

  // Blog Logic
  if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    if (BLOG_DATA[slug]) {
      title = `${BLOG_DATA[slug].title} | Gay Real Estate CT`;
      description = BLOG_DATA[slug].description;
    }
  } 
  // Agent Logic
  else if (path.startsWith("/agent/")) {
    const id = path.replace("/agent/", "");
    if (AGENT_DATA[id]) {
      title = `${AGENT_DATA[id].title} | Gay Real Estate CT`;
      description = AGENT_DATA[id].description;
    }
  }
  // Homepage
  else if (path === "/") {
    title = "GayRealEstateCT.net | LGBTQ+ Friendly Real Estate Agents in Connecticut";
    description = "Find trusted, LGBTQ+ friendly real estate agents, mortgage lenders, and attorneys in Connecticut. Your one-stop shop for inclusive home buying.";
  }
  // Core Informational Pages
  else if (path === "/first-time-buyers") {
    title = "First-Time Homebuyer Guide for LGBTQ+ Buyers in CT | GayRealEstateCT.net";
    description = "Everything LGBTQ+ first-time buyers need to know about purchasing a home in Connecticut.";
  }
  else if (path === "/buyers-guide") {
    title = "LGBTQ+ Buyers Guide Connecticut | GayRealEstateCT.net";
    description = "A complete step-by-step guide to buying a home in CT as an LGBTQ+ individual or couple.";
  }
  else if (path === "/sellers-guide") {
    title = "Home Sellers Guide CT | GayRealEstateCT.net";
    description = "How to sell your Connecticut home with confidence — tips from LGBTQ+ friendly agents.";
  }
  else if (path === "/mortgage-calculator") {
    title = "CT Mortgage Calculator | GayRealEstateCT.net";
    description = "Estimate your monthly mortgage payments for Connecticut homes.";
  }
  else if (path === "/relocation-services") {
    title = "LGBTQ+ Relocation Services in Connecticut | GayRealEstateCT.net";
    description = "Relocating to Connecticut? Our LGBTQ+ friendly team makes the move seamless.";
  }
  else if (path === "/home-valuation") {
    title = "Free Home Valuation in Connecticut | GayRealEstateCT.net";
    description = "Get a free estimate of your Connecticut home's current market value.";
  }
  else if (path === "/marketing-your-home") {
    title = "Marketing Your Home in CT | GayRealEstateCT.net";
    description = "How our LGBTQ+ friendly agents market your Connecticut home to get top dollar.";
  }
  else if (path === "/reviews") {
    title = "Client Reviews | GayRealEstateCT.net";
    description = "See what LGBTQ+ clients say about our Connecticut real estate services.";
  }
  else if (path === "/community") {
    title = "LGBTQ+ Community Events in Connecticut | GayRealEstateCT.net";
    description = "Stay connected with local LGBTQ+ events, meetups, and community happenings across CT.";
  }
  else if (path === "/privacy-policy") {
    title = "Privacy Policy | GayRealEstateCT.net";
    description = "Our privacy policy and data handling practices.";
  }
  else if (path === "/about") {
    title = "About Us | GayRealEstateCT.net";
    description = "Meet the team dedicated to inclusive real estate in Connecticut.";
  }

  // Inject Meta Tags
  text = text.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  text = text.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`);
  
  // Inject "Pre-rendered" content into the root div for crawlers
  // This solves the "Blank Page" issue using an SEO-safe accessible pattern
  const preRenderedContent = `
    <div id="root">
      <div class="sr-only">
        <h1>${title}</h1>
        <p>${description}</p>
      </div>
    </div>
  `;
  text = text.replace('<div id="root"></div>', preRenderedContent);

  // Add Open Graph and Canonical tags
  const ogTags = `
    <link rel="canonical" href="${request.url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${request.url}" />
  `;
  text = text.replace("</head>", `${ogTags}</head>`);

  return new Response(text, {
    headers: response.headers
  });
};

export const config = {
  path: "/*",
  excludedPath: ["/*.js", "/*.css", "/*.png", "/*.jpg", "/*.svg", "/*.webp"]
};
