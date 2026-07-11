/**
 * SEO hardening for June Good-to-go posts (ids 31–42):
 * - Shorter SERP titles
 * - Meta descriptions ≤160 chars
 * - Real focus-keyword lists
 * - Internal links to related CT guides
 * - Authoritative external links
 */
const fs = require('fs');
const path = require('path');

const blogsPath = path.join(__dirname, '..', 'data', 'blogs.ts');
let src = fs.readFileSync(blogsPath, 'utf8');

const LINK =
  'class="text-brand-600 hover:underline font-bold"';
const EXT =
  'target="_blank" rel="noopener noreferrer" class="text-brand-600 hover:underline font-bold"';

function a(href, text, external = false) {
  if (external) return `<a href="${href}" ${EXT}>${text}</a>`;
  return `<a href="${href}" ${LINK}>${text}</a>`;
}

/** Replace first occurrence of plain phrase with linked version if not already linked nearby */
function linkPhrase(html, phrase, href, external = false) {
  // Skip if this exact phrase is already inside an anchor
  const already = new RegExp(
    `<a[^>]*>[^<]*${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^<]*</a>`,
    'i'
  );
  if (already.test(html)) return html;

  const idx = html.indexOf(phrase);
  if (idx === -1) {
    // try case-insensitive soft match for first word boundary phrase
    const re = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    const m = html.match(re);
    if (!m) return html;
    // Don't wrap if already inside a tag attribute
    const pos = m.index;
    const before = html.slice(Math.max(0, pos - 40), pos);
    if (/<a[^>]*$/.test(before) || /href=["'][^"']*$/.test(before)) return html;
    return html.slice(0, pos) + a(href, m[0], external) + html.slice(pos + m[0].length);
  }

  const before = html.slice(Math.max(0, idx - 40), idx);
  if (/<a[^>]*$/.test(before) || /href=["'][^"']*$/.test(before)) return html;
  return html.slice(0, idx) + a(href, phrase, external) + html.slice(idx + phrase.length);
}

function multiLink(html, pairs) {
  let out = html;
  for (const [phrase, href, external] of pairs) {
    out = linkPhrase(out, phrase, href, !!external);
  }
  return out;
}

/** Update scalar fields for a post identified by slug */
function updatePostFields(slug, fields) {
  const slugToken = `slug: "${slug}"`;
  const start = src.indexOf(slugToken);
  if (start === -1) {
    console.warn('Missing slug', slug);
    return;
  }
  // Find end of this object: next "\n  {\n    id:" or final "\n];"
  const nextObj = src.indexOf('\n  {\n    id:', start + slugToken.length);
  const endArr = src.indexOf('\n];', start);
  const end = nextObj === -1 ? endArr : Math.min(nextObj, endArr);
  let block = src.slice(start, end);

  for (const [key, value] of Object.entries(fields)) {
    if (key === 'content') continue;
    const re = new RegExp(`(${key}:\\s*")((?:\\\\.|[^"\\\\])*)(")`);
    if (!re.test(block)) {
      console.warn(`  field ${key} not found on ${slug}`);
      continue;
    }
    const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    block = block.replace(re, `$1${escaped}$3`);
  }

  if (fields.contentTransform) {
    const cRe = /(content:\s*`)([\s\S]*?)(`\s*,)/;
    const m = block.match(cRe);
    if (!m) {
      console.warn('  content not found', slug);
    } else {
      let content = m[2];
      content = fields.contentTransform(content);
      // re-escape for template literal safety
      // content already in TS template — $ and ` must stay escaped if present
      block = block.replace(cRe, (_, a, _c, c) => a + content + c);
    }
  }

  src = src.slice(0, start) + block + src.slice(end);
  console.log('Updated', slug);
}

// ─── Per-post SEO configs ───────────────────────────────────────────────────

const POSTS = [
  {
    slug: 'connecticut-closing-costs',
    title: 'Connecticut Closing Costs 2026: Full Itemized Breakdown',
    excerpt:
      'Connecticut closing costs run $8,000–$20,000 on a $400K home — plus property tax escrow that blindsides buyers. Full 2026 itemized breakdown.',
    seoKeywords:
      'Connecticut closing costs, CT home closing costs 2026, property tax escrow Connecticut, attorney closing CT, LGBTQ home buyer Connecticut costs',
    contentTransform: (c) =>
      multiLink(c, [
        ['West Hartford', '/blog/why-west-hartford-is-lgbtq-friendly-connecticut'],
        ['property tax', '/blog/connecticut-property-taxes-by-town'],
        ['first-time buyers', '/blog/lgbtq-first-time-home-buyer-guide-connecticut-edition'],
        ['CHFA', 'https://www.chfa.org', true],
        ['how to buy a home in Connecticut', '/blog/how-to-buy-home-connecticut-lgbtq'],
        ['real estate attorney', '/blog/do-you-need-an-lgbtq-real-estate-attorney'],
      ]),
  },
  {
    slug: 'connecticut-lgbtq-real-estate-market-report-2026',
    title: 'Connecticut LGBTQ Real Estate Market Report 2026',
    excerpt:
      'Connecticut ranks #1 in LGBTQ real estate search volume. 2026 town-by-town prices, days on market, appreciation rates, and buyer opportunities.',
    seoKeywords:
      'Connecticut LGBTQ real estate market 2026, LGBTQ home prices Connecticut, CT real estate trends 2026, gay friendly Connecticut housing market, Norwalk home appreciation',
    contentTransform: (c) =>
      multiLink(c, [
        ['West Hartford', '/blog/why-west-hartford-is-lgbtq-friendly-connecticut'],
        ['best places to live', '/blog/best-places-to-live-in-connecticut-lgbtq'],
        ['New Haven', '/blog/best-lgbtq-neighborhoods-new-haven-ct'],
        ['Norwalk', '/blog/norwalk-ct-lgbtq-guide'],
        ['Middletown', '/blog/middletown-ct-lgbtq-guide'],
        ['first-time buyer', '/blog/lgbtq-first-time-home-buyer-guide-connecticut-edition'],
        ['CHFA', 'https://www.chfa.org', true],
      ]),
  },
  {
    slug: 'connecticut-property-taxes-by-town',
    title: 'Connecticut Property Taxes by Town: 2026 Mill Rates',
    excerpt:
      'Property taxes on a $400K home range from $3,038 in Washington to $19,306 in Hartford. Complete 2026 mill rate guide for all 169 CT towns.',
    seoKeywords:
      'Connecticut property taxes by town, CT mill rates 2026, Connecticut mill rate table, property tax calculator Connecticut, lowest property tax towns CT',
    contentTransform: (c) =>
      multiLink(c, [
        ['West Hartford', '/blog/why-west-hartford-is-lgbtq-friendly-connecticut'],
        ['closing costs', '/blog/connecticut-closing-costs'],
        ['best places to live in Connecticut', '/blog/best-places-to-live-in-connecticut-lgbtq'],
        ['Litchfield County', '/blog/litchfield-county-second-homes-lgbtq-buyers'],
        ['Office of Policy and Management', 'https://portal.ct.gov/opm', true],
        ['CT.gov', 'https://portal.ct.gov', true],
      ]),
  },
  {
    slug: 'connecticut-vs-massachusetts-lgbtq-buyers',
    title: 'Connecticut vs Massachusetts for LGBTQ Buyers 2026',
    excerpt:
      'CT vs MA for LGBTQ buyers: home prices, taxes, legal protections, NYC vs Boston access, and who wins for fully remote workers in 2026.',
    seoKeywords:
      'Connecticut vs Massachusetts LGBTQ, CT vs MA home prices, LGBTQ home buyers New England, best state for LGBTQ buyers 2026, Connecticut vs Massachusetts real estate',
    contentTransform: (c) =>
      multiLink(c, [
        ['West Hartford', '/blog/why-west-hartford-is-lgbtq-friendly-connecticut'],
        ['moving from NYC to Connecticut', '/blog/moving-nyc-to-connecticut-lgbtq'],
        ['CHFA', 'https://www.chfa.org', true],
        ['best places to live for gay couples', '/blog/best-places-to-live-for-gay-couples-new-england'],
        ['New Haven', '/blog/best-lgbtq-neighborhoods-new-haven-ct'],
        ['legal protections', '/blog/legal-protections-lgbtq-real-estate-connecticut'],
      ]),
  },
  {
    slug: 'how-to-buy-home-connecticut-lgbtq',
    title: 'How to Buy a Home in Connecticut as an LGBTQ Buyer',
    excerpt:
      'Step-by-step guide to buying a CT home as an LGBTQ buyer: CHFA programs, attorney closings, oil heat, mill rates, and what makes Connecticut different.',
    seoKeywords:
      'how to buy a home in Connecticut, LGBTQ home buyer Connecticut, CHFA Time To Own, attorney closing Connecticut, first time home buyer CT LGBTQ',
    contentTransform: (c) =>
      multiLink(c, [
        ['CHFA', 'https://www.chfa.org', true],
        ['closing costs', '/blog/connecticut-closing-costs'],
        ['property taxes', '/blog/connecticut-property-taxes-by-town'],
        ['first-time home buyer', '/blog/lgbtq-first-time-home-buyer-guide-connecticut-edition'],
        ['gay realtor', '/blog/gay-realtor-connecticut-guide'],
        ['real estate attorney', '/blog/do-you-need-an-lgbtq-real-estate-attorney'],
        ['same-sex couple', '/blog/same-sex-couples-buying-a-home-7-things-to-know-before-you-sign'],
        ['mortgage lenders', '/blog/best-lgbtq-mortgage-lenders-connecticut'],
      ]),
  },
  {
    slug: 'lgbtq-organizations-connecticut-directory',
    title: 'LGBTQ Organizations in Connecticut: 2026 Directory',
    excerpt:
      'Complete 2026 directory of 30+ LGBTQ organizations in Connecticut — statewide, regional, and town resources across all eight counties.',
    seoKeywords:
      'LGBTQ organizations Connecticut, LGBTQ community centers CT, PFLAG Connecticut, Triangle Community Center, Connecticut Pride events 2026',
    contentTransform: (c) =>
      multiLink(c, [
        ['West Hartford', '/blog/why-west-hartford-is-lgbtq-friendly-connecticut'],
        ['New Haven', '/blog/best-lgbtq-neighborhoods-new-haven-ct'],
        ['Pride Month', '/blog/connecticut-pride-month-2026-guide'],
        ['Norwalk', '/blog/norwalk-ct-lgbtq-guide'],
        ['Middletown', '/blog/middletown-ct-lgbtq-guide'],
        ['best places to live', '/blog/best-places-to-live-in-connecticut-lgbtq'],
        ['affirming healthcare', '/blog/lgbtq-affirming-healthcare-connecticut'],
      ]),
  },
  {
    slug: 'middletown-ct-lgbtq-guide',
    title: 'Middletown CT LGBTQ Guide 2026: Market & Community',
    excerpt:
      'Middletown offers Wesleyan energy, a real downtown, and a $350K median — the most affordable established LGBTQ market in Connecticut. 2026 guide.',
    seoKeywords:
      'Middletown CT LGBTQ, Middletown Connecticut gay friendly, Wesleyan LGBTQ community, affordable LGBTQ towns Connecticut, Middletown home prices 2026',
    contentTransform: (c) =>
      multiLink(c, [
        ['West Hartford', '/blog/why-west-hartford-is-lgbtq-friendly-connecticut'],
        ['best places to live', '/blog/best-places-to-live-in-connecticut-lgbtq'],
        ['cheapest gay-friendly', '/blog/cheapest-gay-friendly-cities-in-connecticut'],
        ['property taxes', '/blog/connecticut-property-taxes-by-town'],
        ['Pride', '/blog/connecticut-pride-month-2026-guide'],
        ['New Haven', '/blog/best-lgbtq-neighborhoods-new-haven-ct'],
      ]),
  },
  {
    slug: 'moving-nyc-to-connecticut-lgbtq',
    title: 'Moving from NYC to Connecticut: LGBTQ Buyer Guide',
    excerpt:
      'Practical guide for LGBTQ buyers leaving NYC for Connecticut — what your money buys, which towns fit, Metro-North reality, and your first 30 days.',
    seoKeywords:
      'moving from NYC to Connecticut, LGBTQ relocation Connecticut, Metro-North commute CT, NYC to Connecticut home buying, gay couple moving to Connecticut',
    contentTransform: (c) =>
      multiLink(c, [
        ['West Hartford', '/blog/why-west-hartford-is-lgbtq-friendly-connecticut'],
        ['Stamford', '/blog/stamford-ct-lgbtq-guide'],
        ['Norwalk', '/blog/norwalk-ct-lgbtq-guide'],
        ['what your money buys', '/blog/1-million-nyc-vs-connecticut-what-do-you-get'],
        ['moving to Connecticut as a gay couple', '/blog/moving-to-connecticut-as-a-gay-couple'],
        ['New Haven', '/blog/best-lgbtq-neighborhoods-new-haven-ct'],
        ['best places to live', '/blog/best-places-to-live-in-connecticut-lgbtq'],
        ['Metro-North', 'https://new.mta.info/agency/metro-north-railroad', true],
      ]),
  },
  {
    slug: 'mystic-ct-shoreline-lgbtq-buyers',
    title: 'Mystic CT LGBTQ Guide 2026: Shoreline Home Buying',
    excerpt:
      'Mystic, Stonington, Old Lyme, and the CT shoreline for LGBTQ buyers: flood insurance, septic systems, market data, and honest community life.',
    seoKeywords:
      'Mystic CT LGBTQ, Connecticut shoreline real estate, Stonington LGBTQ, flood insurance Connecticut home, LGBTQ coastal Connecticut',
    contentTransform: (c) =>
      multiLink(c, [
        ['New Haven', '/blog/best-lgbtq-neighborhoods-new-haven-ct'],
        ['small towns', '/blog/lgbtq-friendly-small-towns-connecticut'],
        ['property taxes', '/blog/connecticut-property-taxes-by-town'],
        ['best places to live', '/blog/best-places-to-live-in-connecticut-lgbtq'],
        ['flood insurance', 'https://www.floodsmart.gov', true],
        ['FEMA', 'https://www.fema.gov/flood-insurance', true],
      ]),
  },
  {
    slug: 'norwalk-ct-lgbtq-guide',
    title: 'Norwalk CT LGBTQ Guide 2026: SoNo & Market Data',
    excerpt:
      "Norwalk is Connecticut's fastest-appreciating LGBTQ market (+12.8% YoY). SoNo, Rowayton, taxes, Metro-North commute, and Triangle Community Center.",
    seoKeywords:
      'Norwalk CT LGBTQ, South Norwalk LGBTQ, SoNo real estate, Triangle Community Center, Norwalk home prices 2026, Fairfield County LGBTQ',
    contentTransform: (c) =>
      multiLink(c, [
        ['Stamford', '/blog/stamford-ct-lgbtq-guide'],
        ['moving from NYC', '/blog/moving-nyc-to-connecticut-lgbtq'],
        ['market report', '/blog/connecticut-lgbtq-real-estate-market-report-2026'],
        ['property taxes', '/blog/connecticut-property-taxes-by-town'],
        ['best places to live', '/blog/best-places-to-live-in-connecticut-lgbtq'],
        ['Triangle Community Center', 'https://www.ctpridecenter.org', true],
      ]),
  },
  {
    slug: 'selling-home-connecticut-lgbtq',
    title: 'Selling a Home in Connecticut 2026: Costs & Timing',
    excerpt:
      'CT sellers pay conveyance tax, commissions, and attorney fees — often $30K–$55K on a $500K sale. 2026 costs, timing, and LGBTQ seller considerations.',
    seoKeywords:
      'selling a home in Connecticut, Connecticut conveyance tax, CT seller closing costs, LGBTQ home seller Connecticut, how much to sell a house in CT',
    contentTransform: (c) =>
      multiLink(c, [
        ['gay realtor', '/blog/gay-realtor-connecticut-guide'],
        ['real estate attorney', '/blog/do-you-need-an-lgbtq-real-estate-attorney'],
        ['market report', '/blog/connecticut-lgbtq-real-estate-market-report-2026'],
        ['legal protections', '/blog/legal-protections-lgbtq-real-estate-connecticut'],
        ['property taxes', '/blog/connecticut-property-taxes-by-town'],
        ['conveyance tax', 'https://portal.ct.gov/drs', true],
      ]),
  },
  {
    slug: 'stamford-ct-lgbtq-guide',
    title: 'Stamford CT LGBTQ Guide 2026: Market & Community',
    excerpt:
      "Stamford is Connecticut's most urban city and closest train to Grand Central (55 min). Honest 2026 guide to LGBTQ life, neighborhoods, and housing.",
    seoKeywords:
      'Stamford CT LGBTQ, is Stamford gay friendly, Stamford Connecticut real estate, Metro-North Stamford, LGBTQ Stamford neighborhoods 2026',
    contentTransform: (c) =>
      multiLink(c, [
        ['Norwalk', '/blog/norwalk-ct-lgbtq-guide'],
        ['moving from NYC', '/blog/moving-nyc-to-connecticut-lgbtq'],
        ['West Hartford', '/blog/why-west-hartford-is-lgbtq-friendly-connecticut'],
        ['New Haven', '/blog/best-lgbtq-neighborhoods-new-haven-ct'],
        ['property taxes', '/blog/connecticut-property-taxes-by-town'],
        ['best places to live', '/blog/best-places-to-live-in-connecticut-lgbtq'],
        ['Metro-North', 'https://new.mta.info/agency/metro-north-railroad', true],
      ]),
  },
];

for (const post of POSTS) {
  updatePostFields(post.slug, post);
}

// Normalize author role for Arek Garbowicz (no separate agent page — keep honest attribution)
src = src.replace(
  /author: "Arek Garbowicz",\n    authorRole: "[^"]*"/g,
  'author: "Arek Garbowicz",\n    authorRole: "Licensed CT Realtor | CT LGBTQ+ Real Estate Alliance"'
);

fs.writeFileSync(blogsPath, src, 'utf8');
console.log('\nDone. Wrote', blogsPath);
