/**
 * Rebuild llms.txt + llms-full.txt from live BLOG_POSTS,
 * fix healthcare unique image path if present,
 * inject cross-links from hub posts into new June content.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const blogsPath = path.join(ROOT, 'data', 'blogs.ts');
let blogs = fs.readFileSync(blogsPath, 'utf8');
const BASE = 'https://www.gayrealestatect.net';

function extractPosts(src) {
  const posts = [];
  const re = /slug: "([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) {
    const start = m.index;
    const next = src.indexOf('\n  {\n    id:', start + 10);
    const end = next === -1 ? src.indexOf('\n];', start) : next;
    const block = src.slice(start, end);
    const g = (k) => {
      const r = block.match(new RegExp(k + ':\\s*"([^"]*)"'));
      return r ? r[1] : '';
    };
    posts.push({
      slug: m[1],
      title: g('title'),
      excerpt: g('excerpt'),
      category: g('category'),
      date: g('date'),
      image: g('image'),
      blockStart: start,
      blockEnd: end,
    });
  }
  return posts;
}

const posts = extractPosts(blogs);
console.log('posts', posts.length);

// ─── 1) Healthcare unique image ─────────────────────────────────────────────
if (blogs.includes('slug: "lgbtq-affirming-healthcare-connecticut"')) {
  const imgPath = '/lgbtq-affirming-healthcare-ct-hero.jpg';
  blogs = blogs.replace(
    /(slug: "lgbtq-affirming-healthcare-connecticut"[\s\S]*?image: ")[^"]+(")/,
    `$1${imgPath}$2`
  );
  console.log('healthcare image ->', imgPath);
}

// ─── 2) Cross-link hub posts (first occurrence of phrases only) ─────────────
const LINK = 'class="text-brand-600 hover:underline font-bold"';

function linkFirstInBlock(src, slug, phrase, href) {
  const token = `slug: "${slug}"`;
  const start = src.indexOf(token);
  if (start === -1) return src;
  const next = src.indexOf('\n  {\n    id:', start + 10);
  const end = next === -1 ? src.indexOf('\n];', start) : next;
  let block = src.slice(start, end);

  // Only operate inside content template
  const cStart = block.indexOf('content: `');
  const cEnd = block.indexOf('`,\n    faq:') !== -1
    ? block.indexOf('`,\n    faq:')
    : block.indexOf('`,\n    image:');
  if (cStart === -1 || cEnd === -1) return src;
  let content = block.slice(cStart, cEnd);

  if (content.includes(`href="${href}"`)) {
    // already has this target somewhere — still try phrase if not linked
  }
  const already = new RegExp(
    `<a[^>]*>[^<]*${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^<]*</a>`,
    'i'
  );
  if (already.test(content)) {
    return src;
  }
  const idx = content.indexOf(phrase);
  if (idx === -1) return src;
  const before = content.slice(Math.max(0, idx - 30), idx);
  if (/<a[^>]*$/.test(before)) return src;
  content =
    content.slice(0, idx) +
    `<a href="${href}" ${LINK}>${phrase}</a>` +
    content.slice(idx + phrase.length);
  block = block.slice(0, cStart) + content + block.slice(cEnd);
  return src.slice(0, start) + block + src.slice(end);
}

const hubLinks = [
  // best places hub -> new town guides
  ['best-places-to-live-in-connecticut-lgbtq', 'Middletown', '/blog/middletown-ct-lgbtq-guide'],
  ['best-places-to-live-in-connecticut-lgbtq', 'Norwalk', '/blog/norwalk-ct-lgbtq-guide'],
  ['best-places-to-live-in-connecticut-lgbtq', 'Stamford', '/blog/stamford-ct-lgbtq-guide'],
  ['best-places-to-live-in-connecticut-lgbtq', 'property taxes', '/blog/connecticut-property-taxes-by-town'],
  // first-time buyer hub
  [
    'lgbtq-first-time-home-buyer-guide-connecticut-edition',
    'closing costs',
    '/blog/connecticut-closing-costs',
  ],
  [
    'lgbtq-first-time-home-buyer-guide-connecticut-edition',
    'how to buy',
    '/blog/how-to-buy-home-connecticut-lgbtq',
  ],
  [
    'lgbtq-first-time-home-buyer-guide-connecticut-edition',
    'property taxes',
    '/blog/connecticut-property-taxes-by-town',
  ],
  // moving as gay couple
  [
    'moving-to-connecticut-as-a-gay-couple',
    'NYC',
    '/blog/moving-nyc-to-connecticut-lgbtq',
  ],
  [
    'moving-to-connecticut-as-a-gay-couple',
    'affirming healthcare',
    '/blog/lgbtq-affirming-healthcare-connecticut',
  ],
  // gay realtor
  [
    'gay-realtor-connecticut-guide',
    'how to buy a home',
    '/blog/how-to-buy-home-connecticut-lgbtq',
  ],
  [
    'gay-realtor-connecticut-guide',
    'selling',
    '/blog/selling-home-connecticut-lgbtq',
  ],
  // cheapest cities
  [
    'cheapest-gay-friendly-cities-in-connecticut',
    'Middletown',
    '/blog/middletown-ct-lgbtq-guide',
  ],
  [
    'cheapest-gay-friendly-cities-in-connecticut',
    'property taxes',
    '/blog/connecticut-property-taxes-by-town',
  ],
  // market #1 post
  [
    'connecticut-is-1-in-the-us-for-lgbtq-real-estate-searches-here-s-why',
    'market',
    '/blog/connecticut-lgbtq-real-estate-market-report-2026',
  ],
  // neighborhoods guide
  [
    'gay-areas-in-connecticut-neighborhood-by-neighborhood-guide',
    'Norwalk',
    '/blog/norwalk-ct-lgbtq-guide',
  ],
  [
    'gay-areas-in-connecticut-neighborhood-by-neighborhood-guide',
    'Stamford',
    '/blog/stamford-ct-lgbtq-guide',
  ],
  [
    'gay-areas-in-connecticut-neighborhood-by-neighborhood-guide',
    'Middletown',
    '/blog/middletown-ct-lgbtq-guide',
  ],
  // NYC vs CT value
  [
    '1-million-nyc-vs-connecticut-what-do-you-get',
    'moving from NYC',
    '/blog/moving-nyc-to-connecticut-lgbtq',
  ],
  // pride month -> orgs
  [
    'connecticut-pride-month-2026-guide',
    'organizations',
    '/blog/lgbtq-organizations-connecticut-directory',
  ],
  // same-sex buying -> how to buy + closing
  [
    'same-sex-couples-buying-a-home-7-things-to-know-before-you-sign',
    'closing costs',
    '/blog/connecticut-closing-costs',
  ],
  [
    'same-sex-couples-buying-a-home-7-things-to-know-before-you-sign',
    'attorney',
    '/blog/do-you-need-an-lgbtq-real-estate-attorney',
  ],
];

let linkAdds = 0;
for (const [slug, phrase, href] of hubLinks) {
  const before = blogs;
  blogs = linkFirstInBlock(blogs, slug, phrase, href);
  if (blogs !== before) {
    linkAdds++;
    console.log('linked', slug, '->', phrase, href);
  } else {
    console.log('skip', slug, phrase);
  }
}
console.log('hub links added', linkAdds);

fs.writeFileSync(blogsPath, blogs);

// ─── 3) Rebuild llms.txt ────────────────────────────────────────────────────
const postsFresh = extractPosts(blogs);

const byCat = {
  'Neighborhood & Living': [],
  'Town Guides': [],
  'Moving & Relocation': [],
  'Buying & Finance': [],
  Selling: [],
  'Agents & Legal': [],
  'Community & Healthcare': [],
  'Market Data': [],
};

const catMap = (p) => {
  const c = (p.category || '').toUpperCase();
  const s = p.slug;
  if (
    s.includes('middletown') ||
    s.includes('norwalk') ||
    s.includes('stamford') ||
    s.includes('mystic') ||
    s.includes('chester') ||
    s.includes('west-hartford') ||
    s.includes('new-haven') ||
    s.includes('neighborhood')
  )
    return 'Town Guides';
  if (
    c.includes('RELOCAT') ||
    s.includes('moving') ||
    s.includes('trans-moving') ||
    s.includes('nyc')
  )
    return 'Moving & Relocation';
  if (c.includes('SELL')) return 'Selling';
  if (
    c.includes('FINANCE') ||
    c.includes('BUY') ||
    c.includes('MORTGAGE') ||
    s.includes('closing') ||
    s.includes('property-tax') ||
    s.includes('how-to-buy') ||
    s.includes('first-time') ||
    s.includes('mortgage')
  )
    return 'Buying & Finance';
  if (
    c.includes('LEGAL') ||
    s.includes('attorney') ||
    s.includes('realtor') ||
    s.includes('discrimination') ||
    s.includes('same-sex') ||
    s.includes('transgender-housing') ||
    s.includes('legal-protections')
  )
    return 'Agents & Legal';
  if (
    c.includes('COMMUNITY') ||
    c.includes('HEALTH') ||
    s.includes('pride') ||
    s.includes('organizations') ||
    s.includes('healthcare') ||
    s.includes('events')
  )
    return 'Community & Healthcare';
  if (
    c.includes('MARKET') ||
    s.includes('market-report') ||
    s.includes('vs-massachusetts') ||
    s.includes('searches') ||
    s.includes('1-million')
  )
    return 'Market Data';
  return 'Neighborhood & Living';
};

for (const p of postsFresh) {
  byCat[catMap(p)].push(p);
}

function listSection(title, items) {
  if (!items.length) return '';
  let out = `\n### ${title}\n`;
  for (const p of items) {
    out += `- ${p.title} — ${BASE}/blog/${p.slug}\n`;
  }
  return out;
}

const llms = `# GayRealEstateCT.net — Connecticut LGBTQ+ Real Estate Network

> The definitive one-stop resource for LGBTQ+ home buyers, sellers, and relocators in Connecticut. We connect clients with vetted, affirming real estate agents, mortgage lenders, and attorneys across the state.

## About
GayRealEstateCT.net connects the LGBTQ+ community with trusted, inclusive real estate professionals in Connecticut. Our team includes licensed agents, a Top 1% mortgage lender, and a real estate attorney — all with direct LGBTQ+ community expertise and credentials.

## Our Team

- **Arek Wtulich** — Licensed CT Realtor (William Raveis). Co-Founder, CT LGBTQ+ Real Estate Alliance. Specialises in first-time homebuyers and LGBTQ+ relocation across Hartford, Middlesex, New Haven and Tolland Counties. Profile: ${BASE}/agent/arek
- **Abby Dudarewicz** — Licensed CT Realtor (SERHANT. CT). Member of the Gagliardi Team. Focuses on Hartford, Tolland, and Middlesex Counties. Lives in Glastonbury with her wife and family. Profile: ${BASE}/agent/abby
- **Travis Lipinski** — Licensed CT Realtor (William Raveis Lifestyles Realty). Litchfield County specialist. Born and raised in Torrington. Over a decade of second-home property management experience. Profile: ${BASE}/agent/travis
- **Jake Earl** — VP, Mortgage Banker (Total Mortgage). Top 1% Lender Nationwide. #2 Lender at Total Mortgage in 2024. 15+ years experience. NMLS: 975556. Profile: ${BASE}/agent/jake
- **Carolyn Futtner** — Real Estate Attorney (MPF Law / Mancini, Provenzano & Futtner LLC). CT Bar since 2005. Hundreds of residential and commercial closings. Specialises in real estate, trusts & estates, and probate law. Profile: ${BASE}/agent/carolyn

## Core Services
- LGBTQ+ Real Estate Agent matching (Hartford, New Haven, Litchfield, Fairfield Counties)
- LGBTQ+-affirming mortgage lending (CHFA programmes, complex loan scenarios, domestic partner income)
- Real estate attorney services for closings, title structure, estate planning
- First-time homebuyer guidance (CHFA Time to Own down payment assistance)
- Relocation services from NYC, Boston, and major metros to Connecticut
- Second home and weekend retreat expertise (Litchfield County)
- Free home valuation
- Home marketing and seller representation

## Key Resources
- Buyers Guide: ${BASE}/buyers-guide
- Sellers Guide: ${BASE}/sellers-guide
- First-Time Buyers: ${BASE}/first-time-buyers
- Mortgage Calculator: ${BASE}/mortgage-calculator
- Relocation Services: ${BASE}/relocation
- Home Valuation: ${BASE}/home-valuation
- Community Hub: ${BASE}/community
- Client Reviews: ${BASE}/reviews
- Blog: ${BASE}/blog
- Contact: ${BASE}/contact

## Blog Posts (${postsFresh.length} Articles)
${listSection('Neighborhood & Living Guides', byCat['Neighborhood & Living'])}${listSection('Town Guides', byCat['Town Guides'])}${listSection('Moving & Relocation', byCat['Moving & Relocation'])}${listSection('Buying & Finance', byCat['Buying & Finance'])}${listSection('Selling', byCat['Selling'])}${listSection('Agents & Legal', byCat['Agents & Legal'])}${listSection('Community & Healthcare', byCat['Community & Healthcare'])}${listSection('Market Data', byCat['Market Data'])}
## Quick Facts
- Connecticut prohibited housing discrimination based on sexual orientation in 1991 — one of the first states in the US
- Gender identity housing protections have been in place since 1991
- Connecticut was the second state in the US to legalise same-sex marriage (2008)
- Connecticut ranks #1 nationally for per-capita LGBTQ real estate search volume (Google Trends, 2026)
- CHFA Time to Own programme offers forgivable down payment assistance for eligible first-time buyers
- Connecticut is an "attorney state" — a licensed attorney must be present at every real estate closing
- Top welcoming towns: West Hartford, New Haven (Wooster Square, East Rock, Westville), Middletown, Glastonbury, Hamden, Hartford (Parkville), Norwalk, Stamford, Mystic shoreline

## Contact & Links
- Website: ${BASE}
- Contact: ${BASE}/contact
- Reviews: ${BASE}/reviews
- Sitemap: ${BASE}/sitemap.xml
- Full context: ${BASE}/llms-full.txt
- Service area: All of Connecticut (Hartford, New Haven, Litchfield, Fairfield, Middlesex, Tolland, Windham Counties)
`;

fs.writeFileSync(path.join(ROOT, 'public', 'llms.txt'), llms);

// ─── 4) Rebuild llms-full.txt (keep team narrative, refresh blog index) ─────
const fullOld = fs.readFileSync(path.join(ROOT, 'public', 'llms-full.txt'), 'utf8');
// Keep everything before a blog index section if present, or append fresh catalog
const splitMarkers = [
  '## Complete Blog Catalog',
  '## Blog Posts',
  '## All Blog Articles',
];
let keep = fullOld;
for (const marker of splitMarkers) {
  const i = fullOld.indexOf(marker);
  if (i !== -1) {
    keep = fullOld.slice(0, i).trimEnd();
    break;
  }
}

// If old file still has obsolete "Blog Posts (30" style sections mid-file, strip from first "## Blog"
const blogIdx = keep.search(/\n## Blog Posts\b/);
if (blogIdx !== -1) keep = keep.slice(0, blogIdx).trimEnd();

let catalog = `\n\n## Complete Blog Catalog (${postsFresh.length} live articles)\n\n`;
catalog += `Every URL below is a live, indexable post on ${BASE}. Dead or redirected slugs have been removed.\n\n`;
for (const p of postsFresh.sort((a, b) => (a.date < b.date ? 1 : -1))) {
  catalog += `### ${p.title}\n`;
  catalog += `- **URL:** ${BASE}/blog/${p.slug}\n`;
  catalog += `- **Published:** ${p.date}\n`;
  catalog += `- **Category:** ${p.category}\n`;
  if (p.excerpt) catalog += `- **Summary:** ${p.excerpt}\n`;
  catalog += `\n`;
}

catalog += `---\n\n## Index Files\n- Concise AI index: ${BASE}/llms.txt\n- Sitemap: ${BASE}/sitemap.xml\n`;

fs.writeFileSync(path.join(ROOT, 'public', 'llms-full.txt'), keep + catalog);

console.log('llms.txt posts sections written for', postsFresh.length);
console.log('llms-full.txt catalog rebuilt');

// ─── 5) Validate no selling redirect ────────────────────────────────────────
const redirects = fs.readFileSync(path.join(ROOT, 'public', '_redirects'), 'utf8');
const edge = fs.readFileSync(
  path.join(ROOT, 'netlify', 'edge-functions', 'seo-injector.ts'),
  'utf8'
);
console.log(
  'selling redirect still present?',
  /selling-home-connecticut-lgbtq.*sellers-guide/.test(redirects) ||
    /"selling-home-connecticut-lgbtq"\s*:\s*"\/sellers-guide"/.test(edge)
);

// image uniqueness
const imgs = postsFresh.map((p) => {
  // re-extract image after healthcare fix
  const i = blogs.indexOf(`slug: "${p.slug}"`);
  const n = blogs.indexOf('\n  {\n    id:', i + 10);
  const b = blogs.slice(i, n > 0 ? n : i + 4000);
  const im = (b.match(/image: "([^"]+)"/) || [])[1];
  return im;
});
const dups = imgs.filter((x, i) => imgs.indexOf(x) !== i);
console.log('dup images after fix', [...new Set(dups)]);
