import type { Context } from "@netlify/edge-functions";

// Enhanced data for SEO injection
const BLOG_DATA: Record<string, { title: string; description: string; content?: string }> = {
  "best-places-to-live-in-connecticut-lgbtq": {
    title: "Best Places to Live in Connecticut for LGBTQ+ People (2026 Guide)",
    description: "Connecticut is more welcoming than you think — find your definitive guide to finding your people and your place.",
    content: "Comprehensive guide to the most inclusive cities and towns in Connecticut, including West Hartford, New Haven, and Northampton-style havens."
  },
  "why-west-hartford-is-lgbtq-friendly-connecticut": {
    title: "Why West Hartford Is One of the Most LGBTQ+-Friendly Towns in Connecticut",
    description: "A deep dive into why West Hartford consistently tops the list for inclusive living.",
    content: "Analysis of West Hartford's inclusive policies, community centers, and why it's a top choice for LGBTQ+ families."
  },
  "moving-to-connecticut-as-a-gay-couple": {
    title: "Moving to Connecticut as a Gay Couple: What No One Tells You",
    description: "Real-world advice for same-sex couples relocating to CT.",
    content: "Practical advice on neighborhoods, legal considerations, and community building for gay couples moving to the Nutmeg State."
  },
  "most-lgbtq-inclusive-school-districts-connecticut": {
    title: "The Most LGBTQ+-Inclusive School Districts in Connecticut (2026)",
    description: "Essential research for LGBTQ+ families with children in CT.",
    content: "Ranking of CT school districts based on inclusive curriculum, GSAs, and non-discrimination policies."
  },
  "1-million-nyc-vs-connecticut-what-do-you-get": {
    title: "$1 Million in NYC vs. $1 Million in Connecticut",
    description: "The stark contrast in quality of life and space between NYC and CT real estate.",
    content: "Comparing real estate value: A tiny apartment in Brooklyn vs. a luxury estate in Litchfield County or Farmington Valley."
  },
  "lgbtq-events-connecticut-march-2026": {
    title: "LGBTQ+ Events in Connecticut – March 2026",
    description: "Your monthly guide to the best LGBTQ+ events, community gatherings, and Pride celebrations in CT.",
    content: "Calendar of events for March 2026 including meetups in New Haven, Hartford, and local Pride planning sessions."
  },
  "litchfield-county-second-homes-lgbtq-buyers": {
    title: "Litchfield County's Best-Kept Secret: Second Homes for LGBTQ+ Buyers",
    description: "Northwestern Connecticut's retreat for LGBTQ+ professionals and creatives.",
    content: "Why Litchfield County is the preferred weekend escape for NYC-based LGBTQ+ professionals."
  },
  "litchfield-county-towns-for-weekenders": {
    title: "Lake Waramaug, Washington, & Beyond: Litchfield County Guide",
    description: "Town-by-town guide to the hidden corners of LGBTQ+ friendly Litchfield County.",
    content: "Exploring Washington, Roxbury, and Kent — the most welcoming small towns in Northwestern CT."
  },
  "legal-protections-lgbtq-real-estate-connecticut": {
    title: "Protecting Your Home & Relationship: LGBTQ+ Legal Guide",
    description: "What LGBTQ+ buyers need to know about title, deeds, and legal protections in CT.",
    content: "Expert legal advice on joint tenancy, survivorship rights, and domestic partnership considerations in CT property law."
  },
  "trans-moving-connecticut-guide": {
    title: "Trans Moving to Connecticut: What to Actually Know Before You Relocate",
    description: "Essential guide for trans individuals and families relocating to Connecticut.",
    content: "Specific resources for trans residents, including healthcare access, legal document changes, and supportive communities."
  },
  "lgbtq-friendly-small-towns-connecticut": {
    title: "LGBTQ-Friendly Small Towns in Connecticut: An Honest Guide",
    description: "Beyond the cities — the small towns in CT that are genuinely welcoming to the LGBTQ+ community.",
    content: "Detailed reviews of Chester, Collinsville, and Guilford for LGBTQ+ residents seeking a small-town vibe."
  },
  "wooster-square-new-haven-lgbtq-neighborhood": {
    title: "Wooster Square New Haven: Is It Still the Best LGBTQ Neighborhood?",
    description: "Deep dive into New Haven's most famous LGBTQ-concentrated neighborhood.",
    content: "The history and current state of Wooster Square as an LGBTQ+ hub in New Haven."
  },
  "chester-ct-lgbtq-family-guide": {
    title: "Chester, CT for LGBTQ Families: Is This Small Town Worth It?",
    description: "An artsy, welcoming small town in the CT River Valley for LGBTQ+ families.",
    content: "Why Chester's artsy community and inclusive atmosphere make it a hidden gem for LGBTQ+ families."
  },
  "best-lgbtq-neighborhoods-new-haven-ct": {
    title: "Best LGBTQ Neighborhoods in New Haven, CT: A Real Breakdown",
    description: "Comparing East Rock, Wooster Square, and Westville for LGBTQ+ residents.",
    content: "Neighborhood comparison guide for LGBTQ+ home buyers in New Haven."
  },
  "gay-realtor-connecticut-guide": {
    title: "Gay Realtor in Connecticut: How to Find One That Actually Helps",
    description: "Why working with an agent who 'gets it' matters for LGBTQ+ home buyers in CT.",
    content: "The importance of representation in real estate and how to vet an agent for LGBTQ+ cultural competency."
  }
};

const AGENT_DATA: Record<string, { title: string; description: string; bio: string; specialties: string[] }> = {
  "arek": { 
    title: "Arek Wtulich | LGBTQ+ Real Estate Agent in CT", 
    description: "Expert real estate guidance from the co-founder of the CT LGBTQ+ Real Estate Alliance.",
    bio: "Arek Wtulich is a full-time, licensed CT Realtor who proudly serves the LGBTQ+ community and allies. Since 2020, Arek has helped buyers and sellers across the state with optimism and clear communication.",
    specialties: ["First-Time Homebuyers", "LGBTQ+ Relocation", "Listing Specialist", "Multi-family Homes"]
  },
  "abby": { 
    title: "Abby Dudarewicz | Inclusive Realtor in Connecticut", 
    description: "Helping LGBTQ+ families and individuals find their perfect home in CT.",
    bio: "Abby Dudarewicz is a Connecticut Realtor with SERHANT. CT. She is passionate about helping LGBTQ+ buyers, sellers, and families feel informed and confident.",
    specialties: ["Residential Sales", "Buyer Representation", "LGBTQ+ Families", "Hartford & Tolland Counties"]
  },
  "travis": { 
    title: "Travis Lipinski | Litchfield County Real Estate Expert", 
    description: "Specializing in second homes and weekend retreats in Litchfield County.",
    bio: "Travis Lipinski is a Litchfield County expert with over a decade of experience in property management and real estate sales in Northwestern CT.",
    specialties: ["Residential and Commercial RE", "Airbnb host", "Leases", "Second Home Properties"]
  },
  "jake": { 
    title: "Jake Earl | LGBTQ+ Friendly Mortgage Expert", 
    description: "Top 1% mortgage lender helping you navigate your CT home purchase.",
    bio: "Jake Earl is a Top 1% Mortgage Lender nationwide with over 15 years of experience turning complex finances into approvals for CT home buyers.",
    specialties: ["Complex Loan Scenarios", "First-Time Homebuyers", "High-Achieving Professionals", "Tailored Mortgage Solutions"]
  },
  "carolyn": { 
    title: "Carolyn Futtner | LGBTQ+ Real Estate Attorney", 
    description: "Protecting your home and your relationship with expert legal guidance in CT.",
    bio: "Carolyn Futtner is a highly experienced real estate attorney specializing in closings, trusts, and estates to protect LGBTQ+ families.",
    specialties: ["Real Estate Transactions", "Wills", "Trusts & Estates", "Probate & Business Planning"]
  }
};

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  let path = url.pathname;
  
  // Normalize path: remove trailing slash for consistency
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

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
  const BASE_DOMAIN = "https://www.gayrealestatect.net";
  
  let title = "GayRealEstateCT.net | LGBTQ+ Friendly Real Estate in Connecticut";
  let description = "Find trusted, LGBTQ+ friendly real estate agents, mortgage lenders, and attorneys in Connecticut.";
  let pageContent = "Your one-stop shop for inclusive home buying, selling, and relocation in CT.";

  // Blog Logic
  if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    if (BLOG_DATA[slug]) {
      title = `${BLOG_DATA[slug].title} | Gay Real Estate CT`;
      description = BLOG_DATA[slug].description;
      pageContent = BLOG_DATA[slug].content || description;
    }
  } 
  // Agent Logic
  else if (path.startsWith("/agent/")) {
    const id = path.replace("/agent/", "");
    if (AGENT_DATA[id]) {
      title = `${AGENT_DATA[id].title} | Gay Real Estate CT`;
      description = AGENT_DATA[id].description;
      pageContent = `${AGENT_DATA[id].bio} Specializing in: ${AGENT_DATA[id].specialties.join(", ")}.`;
    }
  }
  // Core Informational Pages
  else if (path === "/") {
    title = "GayRealEstateCT.net | LGBTQ+ Friendly Real Estate Agents in Connecticut";
    description = "Find trusted, LGBTQ+ friendly real estate agents, mortgage lenders, and attorneys in Connecticut. Your one-stop shop for inclusive home buying.";
  }
  else if (path === "/about") {
    title = "About Us | GayRealEstateCT.net";
    description = "Meet the team dedicated to inclusive real estate in Connecticut.";
    pageContent = "We connect the LGBTQ+ community with trusted, inclusive real estate professionals across the Nutmeg State.";
  }
  else if (path === "/first-time-buyers") {
    title = "First-Time Homebuyer Guide for LGBTQ+ Buyers in CT | GayRealEstateCT.net";
    description = "Everything LGBTQ+ first-time buyers need to know about purchasing a home in Connecticut.";
  }
  else if (path === "/reviews") {
    title = "Client Reviews | GayRealEstateCT.net";
    description = "See what LGBTQ+ clients say about our Connecticut real estate services.";
  }

  // 1. Remove existing meta/canonical to prevent duplicates
  text = text.replace(/<title>.*?<\/title>/, "");
  text = text.replace(/<meta name="description" content=".*?" \/>/g, "");
  text = text.replace(/<link rel="canonical" href=".*?" \/>/g, "");
  text = text.replace(/<meta property="og:title" content=".*?" \/>/g, "");
  text = text.replace(/<meta property="og:description" content=".*?" \/>/g, "");
  text = text.replace(/<meta property="og:url" content=".*?" \/>/g, "");

  // 2. Inject New Meta Tags (Forcing www)
  const canonicalUrl = `${BASE_DOMAIN}${path}`;
  const metaTags = `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:type" content="${path.startsWith("/blog/") ? "article" : "website"}" />
  `;
  text = text.replace("</head>", `${metaTags}</head>`);
  
  // 3. Inject Rich Page Content into the root div for crawlers
  // Using a more robust regex for the replacement
  const richHtml = `
    <div id="root">
      <div class="sr-only" style="display:none;">
        <h1>${title}</h1>
        <p>${description}</p>
        <div>${pageContent}</div>
      </div>
    </div>
  `;
  
  // Replace the empty root div regardless of whitespace
  text = text.replace(/<div id="root">\s*<\/div>/, richHtml);

  return new Response(text, {
    headers: response.headers
  });
};

export const config = {
  path: "/*",
  excludedPath: ["/*.js", "/*.css", "/*.png", "/*.jpg", "/*.svg", "/*.webp", "/images/*", "/favicon.ico"]
};
