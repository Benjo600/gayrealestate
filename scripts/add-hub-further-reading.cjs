/**
 * Append a unique "Further reading" HTML block to key hub posts.
 * Marker: data-seo-hub="..." so we never double-append.
 */
const fs = require('fs');
const path = require('path');

const blogsPath = path.join(__dirname, '..', 'data', 'blogs.ts');
let src = fs.readFileSync(blogsPath, 'utf8');

const LINK = 'class="text-brand-600 hover:underline font-bold"';
const a = (href, text) => `<a href="${href}" ${LINK}>${text}</a>`;

const BLOCKS = {
  'best-places-to-live-in-connecticut-lgbtq': {
    marker: 'seo-hub-best-places',
    html: `
      <h2 data-seo-hub="seo-hub-best-places">Further Reading: Town Guides &amp; Market Data</h2>
      <p>Dig deeper into specific Connecticut markets and the numbers behind them:</p>
      <ul>
        <li>${a('/blog/middletown-ct-lgbtq-guide', 'Middletown CT LGBTQ guide')} — value alternative to West Hartford</li>
        <li>${a('/blog/norwalk-ct-lgbtq-guide', 'Norwalk CT LGBTQ guide')} — Fairfield County + Metro-North</li>
        <li>${a('/blog/stamford-ct-lgbtq-guide', 'Stamford CT LGBTQ guide')} — closest train to Grand Central</li>
        <li>${a('/blog/mystic-ct-shoreline-lgbtq-buyers', 'Mystic &amp; shoreline LGBTQ buyers guide')}</li>
        <li>${a('/blog/connecticut-property-taxes-by-town', 'Connecticut property taxes by town (2026 mill rates)')}</li>
        <li>${a('/blog/connecticut-lgbtq-real-estate-market-report-2026', 'Connecticut LGBTQ real estate market report 2026')}</li>
      </ul>
    `,
  },
  'lgbtq-first-time-home-buyer-guide-connecticut-edition': {
    marker: 'seo-hub-first-time',
    html: `
      <h2 data-seo-hub="seo-hub-first-time">Further Reading: Buying Process &amp; Costs</h2>
      <ul>
        <li>${a('/blog/how-to-buy-home-connecticut-lgbtq', 'How to buy a home in Connecticut as an LGBTQ buyer')}</li>
        <li>${a('/blog/connecticut-closing-costs', 'Connecticut closing costs 2026 breakdown')}</li>
        <li>${a('/blog/connecticut-property-taxes-by-town', 'Property taxes by town — mill rate guide')}</li>
        <li>${a('/blog/best-lgbtq-mortgage-lenders-connecticut', 'Best LGBTQ mortgage lenders in Connecticut')}</li>
        <li>${a('/blog/do-you-need-an-lgbtq-real-estate-attorney', 'Do you need an LGBTQ real estate attorney?')}</li>
      </ul>
    `,
  },
  'moving-to-connecticut-as-a-gay-couple': {
    marker: 'seo-hub-moving-couple',
    html: `
      <h2 data-seo-hub="seo-hub-moving-couple">Further Reading: Relocation Playbooks</h2>
      <ul>
        <li>${a('/blog/moving-nyc-to-connecticut-lgbtq', 'Moving from NYC to Connecticut — practical LGBTQ guide')}</li>
        <li>${a('/blog/connecticut-vs-massachusetts-lgbtq-buyers', 'Connecticut vs Massachusetts for LGBTQ buyers')}</li>
        <li>${a('/blog/lgbtq-affirming-healthcare-connecticut', 'LGBTQ+ affirming healthcare in Connecticut')}</li>
        <li>${a('/blog/lgbtq-organizations-connecticut-directory', 'LGBTQ organizations in Connecticut directory')}</li>
        <li>${a('/blog/best-places-to-live-in-connecticut-lgbtq', 'Best places to live in Connecticut for LGBTQ+ people')}</li>
      </ul>
    `,
  },
  'gay-realtor-connecticut-guide': {
    marker: 'seo-hub-realtor',
    html: `
      <h2 data-seo-hub="seo-hub-realtor">Further Reading: Working With Your Team</h2>
      <ul>
        <li>${a('/blog/how-to-buy-home-connecticut-lgbtq', 'How to buy a home in Connecticut as an LGBTQ buyer')}</li>
        <li>${a('/blog/selling-home-connecticut-lgbtq', 'Selling a home in Connecticut — costs &amp; timing')}</li>
        <li>${a('/blog/do-you-need-an-lgbtq-real-estate-attorney', 'When you need an LGBTQ real estate attorney')}</li>
        <li>${a('/blog/connecticut-closing-costs', 'What closing costs actually look like in CT')}</li>
      </ul>
    `,
  },
  'cheapest-gay-friendly-cities-in-connecticut': {
    marker: 'seo-hub-cheapest',
    html: `
      <h2 data-seo-hub="seo-hub-cheapest">Further Reading: Affordable Markets</h2>
      <ul>
        <li>${a('/blog/middletown-ct-lgbtq-guide', 'Middletown CT LGBTQ guide — strongest value play')}</li>
        <li>${a('/blog/connecticut-property-taxes-by-town', 'How mill rates change what you really pay')}</li>
        <li>${a('/blog/connecticut-lgbtq-real-estate-market-report-2026', '2026 LGBTQ market report with town-by-town data')}</li>
        <li>${a('/blog/how-to-buy-home-connecticut-lgbtq', 'Step-by-step CT homebuying for LGBTQ buyers')}</li>
      </ul>
    `,
  },
  'gay-areas-in-connecticut-neighborhood-by-neighborhood-guide': {
    marker: 'seo-hub-areas',
    html: `
      <h2 data-seo-hub="seo-hub-areas">Further Reading: City Deep Dives</h2>
      <ul>
        <li>${a('/blog/middletown-ct-lgbtq-guide', 'Middletown CT LGBTQ guide')}</li>
        <li>${a('/blog/norwalk-ct-lgbtq-guide', 'Norwalk CT LGBTQ guide (SoNo &amp; Rowayton)')}</li>
        <li>${a('/blog/stamford-ct-lgbtq-guide', 'Stamford CT LGBTQ guide')}</li>
        <li>${a('/blog/mystic-ct-shoreline-lgbtq-buyers', 'Mystic and Connecticut shoreline for LGBTQ buyers')}</li>
        <li>${a('/blog/best-lgbtq-neighborhoods-new-haven-ct', 'Best LGBTQ neighborhoods in New Haven')}</li>
      </ul>
    `,
  },
  '1-million-nyc-vs-connecticut-what-do-you-get': {
    marker: 'seo-hub-million',
    html: `
      <h2 data-seo-hub="seo-hub-million">Further Reading: NYC → CT Moves</h2>
      <ul>
        <li>${a('/blog/moving-nyc-to-connecticut-lgbtq', 'Moving from NYC to Connecticut as an LGBTQ buyer')}</li>
        <li>${a('/blog/stamford-ct-lgbtq-guide', 'Stamford — 55 minutes to Grand Central')}</li>
        <li>${a('/blog/norwalk-ct-lgbtq-guide', 'Norwalk — fastest-appreciating LGBTQ market')}</li>
        <li>${a('/blog/connecticut-vs-massachusetts-lgbtq-buyers', 'CT vs MA comparison for LGBTQ buyers')}</li>
      </ul>
    `,
  },
  'connecticut-is-1-in-the-us-for-lgbtq-real-estate-searches-here-s-why': {
    marker: 'seo-hub-searches',
    html: `
      <h2 data-seo-hub="seo-hub-searches">Further Reading: Market Intelligence</h2>
      <ul>
        <li>${a('/blog/connecticut-lgbtq-real-estate-market-report-2026', 'Full Connecticut LGBTQ real estate market report 2026')}</li>
        <li>${a('/blog/connecticut-property-taxes-by-town', '2026 mill rates for all 169 towns')}</li>
        <li>${a('/blog/connecticut-vs-massachusetts-lgbtq-buyers', 'Connecticut vs Massachusetts for LGBTQ buyers')}</li>
      </ul>
    `,
  },
  'connecticut-pride-month-2026-guide': {
    marker: 'seo-hub-pride',
    html: `
      <h2 data-seo-hub="seo-hub-pride">Further Reading: Community Resources</h2>
      <ul>
        <li>${a('/blog/lgbtq-organizations-connecticut-directory', 'Complete LGBTQ organizations directory for Connecticut')}</li>
        <li>${a('/blog/lgbtq-affirming-healthcare-connecticut', 'LGBTQ+ affirming healthcare before you move')}</li>
        <li>${a('/blog/best-places-to-live-in-connecticut-lgbtq', 'Best places to live for LGBTQ+ people in CT')}</li>
      </ul>
    `,
  },
  'same-sex-couples-buying-a-home-7-things-to-know-before-you-sign': {
    marker: 'seo-hub-samesex',
    html: `
      <h2 data-seo-hub="seo-hub-samesex">Further Reading: Legal &amp; Cost Details</h2>
      <ul>
        <li>${a('/blog/how-to-buy-home-connecticut-lgbtq', 'How to buy a home in Connecticut as an LGBTQ buyer')}</li>
        <li>${a('/blog/connecticut-closing-costs', 'Connecticut closing costs itemized')}</li>
        <li>${a('/blog/do-you-need-an-lgbtq-real-estate-attorney', 'Do you need an LGBTQ real estate attorney?')}</li>
        <li>${a('/blog/legal-protections-lgbtq-real-estate-connecticut', 'Legal protections for LGBTQ real estate in CT')}</li>
      </ul>
    `,
  },
  'legal-protections-lgbtq-real-estate-connecticut': {
    marker: 'seo-hub-legal',
    html: `
      <h2 data-seo-hub="seo-hub-legal">Further Reading</h2>
      <ul>
        <li>${a('/blog/selling-home-connecticut-lgbtq', 'Selling a home in Connecticut as an LGBTQ homeowner')}</li>
        <li>${a('/blog/how-to-buy-home-connecticut-lgbtq', 'Buying process guide for LGBTQ buyers')}</li>
        <li>${a('/blog/do-you-need-an-lgbtq-real-estate-attorney', 'When an LGBTQ-experienced attorney matters')}</li>
      </ul>
    `,
  },
  'why-west-hartford-is-lgbtq-friendly-connecticut': {
    marker: 'seo-hub-westhartford',
    html: `
      <h2 data-seo-hub="seo-hub-westhartford">Further Reading</h2>
      <ul>
        <li>${a('/blog/middletown-ct-lgbtq-guide', 'Middletown — more affordable LGBTQ-popular market')}</li>
        <li>${a('/blog/connecticut-property-taxes-by-town', 'Compare West Hartford mill rates to other towns')}</li>
        <li>${a('/blog/how-to-buy-home-connecticut-lgbtq', 'How to buy a home in Connecticut as an LGBTQ buyer')}</li>
      </ul>
    `,
  },
};

function findContentBounds(slug) {
  const token = `slug: "${slug}"`;
  const start = src.indexOf(token);
  if (start === -1) return null;

  // Restrict search to this object only (CRLF-safe)
  const rest = src.slice(start + token.length);
  const nextRel = rest.search(/\r?\n  \{\r?\n    id:/);
  const endObj = nextRel === -1 ? src.indexOf('];', start) : start + token.length + nextRel;

  const afterOpenSearch = src.indexOf('content: `', start);
  if (afterOpenSearch === -1 || afterOpenSearch > endObj) return null;
  const afterOpen = afterOpenSearch + 'content: `'.length;

  // content: ` .... `,
  const closeRe = /`,\r?\n    (faq|image|category|date|readTime|author|seoKeywords):/g;
  closeRe.lastIndex = afterOpen;
  const closeMatch = closeRe.exec(src);
  if (!closeMatch || closeMatch.index > endObj) return null;

  return {
    start,
    endObj,
    contentStart: afterOpenSearch,
    contentEnd: closeMatch.index,
  };
}

for (const [slug, { marker, html }] of Object.entries(BLOCKS)) {
  if (src.includes(`data-seo-hub="${marker}"`)) {
    console.log('exists', slug);
    continue;
  }
  const bounds = findContentBounds(slug);
  if (!bounds) {
    console.warn('bounds fail', slug);
    continue;
  }
  src = src.slice(0, bounds.contentEnd) + html + src.slice(bounds.contentEnd);
  console.log('added', slug);
}

fs.writeFileSync(blogsPath, src);
console.log('markers', (src.match(/data-seo-hub=/g) || []).length);
