/**
 * Repair corrupted title/excerpt/seoKeywords lines on June posts,
 * then re-apply clean values. Leaves content/HTML links intact.
 */
const fs = require('fs');
const path = require('path');

const blogsPath = path.join(__dirname, '..', 'data', 'blogs.ts');
let src = fs.readFileSync(blogsPath, 'utf8');

const CLEAN = {
  'connecticut-closing-costs': {
    title: 'Connecticut Closing Costs 2026: Full Itemized Breakdown',
    excerpt:
      'Connecticut closing costs run $8,000–$20,000 on a $400K home — plus property tax escrow that blindsides buyers. Full 2026 itemized breakdown.',
    seoKeywords:
      'Connecticut closing costs, CT home closing costs 2026, property tax escrow Connecticut, attorney closing CT, LGBTQ home buyer Connecticut costs',
  },
  'connecticut-lgbtq-real-estate-market-report-2026': {
    title: 'Connecticut LGBTQ Real Estate Market Report 2026',
    excerpt:
      'Connecticut ranks #1 in LGBTQ real estate search volume. 2026 town-by-town prices, days on market, appreciation rates, and buyer opportunities.',
    seoKeywords:
      'Connecticut LGBTQ real estate market 2026, LGBTQ home prices Connecticut, CT real estate trends 2026, gay friendly Connecticut housing market, Norwalk home appreciation',
  },
  'connecticut-property-taxes-by-town': {
    title: 'Connecticut Property Taxes by Town: 2026 Mill Rates',
    excerpt:
      'Property taxes on a $400K home range from $3,038 in Washington to $19,306 in Hartford. Complete 2026 mill rate guide for all 169 CT towns.',
    seoKeywords:
      'Connecticut property taxes by town, CT mill rates 2026, Connecticut mill rate table, property tax calculator Connecticut, lowest property tax towns CT',
  },
  'connecticut-vs-massachusetts-lgbtq-buyers': {
    title: 'Connecticut vs Massachusetts for LGBTQ Buyers 2026',
    excerpt:
      'CT vs MA for LGBTQ buyers: home prices, taxes, legal protections, NYC vs Boston access, and who wins for fully remote workers in 2026.',
    seoKeywords:
      'Connecticut vs Massachusetts LGBTQ, CT vs MA home prices, LGBTQ home buyers New England, best state for LGBTQ buyers 2026, Connecticut vs Massachusetts real estate',
  },
  'how-to-buy-home-connecticut-lgbtq': {
    title: 'How to Buy a Home in Connecticut as an LGBTQ Buyer',
    excerpt:
      'Step-by-step guide to buying a CT home as an LGBTQ buyer: CHFA programs, attorney closings, oil heat, mill rates, and what makes Connecticut different.',
    seoKeywords:
      'how to buy a home in Connecticut, LGBTQ home buyer Connecticut, CHFA Time To Own, attorney closing Connecticut, first time home buyer CT LGBTQ',
  },
  'lgbtq-organizations-connecticut-directory': {
    title: 'LGBTQ Organizations in Connecticut: 2026 Directory',
    excerpt:
      'Complete 2026 directory of 30+ LGBTQ organizations in Connecticut — statewide, regional, and town resources across all eight counties.',
    seoKeywords:
      'LGBTQ organizations Connecticut, LGBTQ community centers CT, PFLAG Connecticut, Triangle Community Center, Connecticut Pride events 2026',
  },
  'middletown-ct-lgbtq-guide': {
    title: 'Middletown CT LGBTQ Guide 2026: Market & Community',
    excerpt:
      'Middletown offers Wesleyan energy, a real downtown, and a $350K median — the most affordable established LGBTQ market in Connecticut. 2026 guide.',
    seoKeywords:
      'Middletown CT LGBTQ, Middletown Connecticut gay friendly, Wesleyan LGBTQ community, affordable LGBTQ towns Connecticut, Middletown home prices 2026',
  },
  'moving-nyc-to-connecticut-lgbtq': {
    title: 'Moving from NYC to Connecticut: LGBTQ Buyer Guide',
    excerpt:
      'Practical guide for LGBTQ buyers leaving NYC for Connecticut — what your money buys, which towns fit, Metro-North reality, and your first 30 days.',
    seoKeywords:
      'moving from NYC to Connecticut, LGBTQ relocation Connecticut, Metro-North commute CT, NYC to Connecticut home buying, gay couple moving to Connecticut',
  },
  'mystic-ct-shoreline-lgbtq-buyers': {
    title: 'Mystic CT LGBTQ Guide 2026: Shoreline Home Buying',
    excerpt:
      'Mystic, Stonington, Old Lyme, and the CT shoreline for LGBTQ buyers: flood insurance, septic systems, market data, and honest community life.',
    seoKeywords:
      'Mystic CT LGBTQ, Connecticut shoreline real estate, Stonington LGBTQ, flood insurance Connecticut home, LGBTQ coastal Connecticut',
  },
  'norwalk-ct-lgbtq-guide': {
    title: 'Norwalk CT LGBTQ Guide 2026: SoNo & Market Data',
    excerpt:
      "Norwalk is Connecticut's fastest-appreciating LGBTQ market (+12.8% YoY). SoNo, Rowayton, taxes, Metro-North commute, and Triangle Community Center.",
    seoKeywords:
      'Norwalk CT LGBTQ, South Norwalk LGBTQ, SoNo real estate, Triangle Community Center, Norwalk home prices 2026, Fairfield County LGBTQ',
  },
  'selling-home-connecticut-lgbtq': {
    title: 'Selling a Home in Connecticut 2026: Costs & Timing',
    excerpt:
      'CT sellers pay conveyance tax, commissions, and attorney fees — often $30K–$55K on a $500K sale. 2026 costs, timing, and LGBTQ seller considerations.',
    seoKeywords:
      'selling a home in Connecticut, Connecticut conveyance tax, CT seller closing costs, LGBTQ home seller Connecticut, how much to sell a house in CT',
  },
  'stamford-ct-lgbtq-guide': {
    title: 'Stamford CT LGBTQ Guide 2026: Market & Community',
    excerpt:
      "Stamford is Connecticut's most urban city and closest train to Grand Central (55 min). Honest 2026 guide to LGBTQ life, neighborhoods, and housing.",
    seoKeywords:
      'Stamford CT LGBTQ, is Stamford gay friendly, Stamford Connecticut real estate, Metro-North Stamford, LGBTQ Stamford neighborhoods 2026',
  },
};

for (const [slug, fields] of Object.entries(CLEAN)) {
  const token = `slug: "${slug}"`;
  const start = src.indexOf(token);
  if (start === -1) {
    console.warn('missing', slug);
    continue;
  }
  // End of object header = start of content: `
  const contentStart = src.indexOf('content: `', start);
  if (contentStart === -1 || contentStart - start > 5000) {
    console.warn('no content start', slug);
    continue;
  }
  const header = src.slice(start, contentStart);
  // Rebuild header: keep slug/id lines, rewrite title/excerpt/seoKeywords
  // Find id line before slug
  const idStart = src.lastIndexOf('\n  {\n', start);
  const preSlug = src.slice(idStart, start); // includes { and id

  const newHeader =
    `slug: "${slug}",\n` +
    `    title: ${JSON.stringify(fields.title)},\n` +
    `    excerpt: ${JSON.stringify(fields.excerpt)},\n` +
    `    seoKeywords: ${JSON.stringify(fields.seoKeywords)},\n` +
    `    `;

  // Replace from slug through just before content
  src = src.slice(0, start) + newHeader + src.slice(contentStart);
  console.log('repaired header', slug);
}

// Fix any ctpride.org leftovers
src = src.replace(/https:\/\/www\.ctpride\.org/g, 'https://www.ctpridecenter.org');

fs.writeFileSync(blogsPath, src);
console.log('wrote', blogsPath);

// Validate by transpile
const ts = require('typescript');
const result = ts.transpileModule(src, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  reportDiagnostics: true,
});
const diags = result.diagnostics || [];
console.log('diagnostics', diags.length);
for (const d of diags.slice(0, 10)) {
  const msg = ts.flattenDiagnosticMessageText(d.messageText, '\n');
  console.log(' ', msg, d.start);
}
