const fs = require('fs');
const s = fs.readFileSync('data/blogs.ts', 'utf8');
const slugs = [
  'connecticut-closing-costs',
  'connecticut-lgbtq-real-estate-market-report-2026',
  'connecticut-property-taxes-by-town',
  'connecticut-vs-massachusetts-lgbtq-buyers',
  'how-to-buy-home-connecticut-lgbtq',
  'lgbtq-organizations-connecticut-directory',
  'middletown-ct-lgbtq-guide',
  'moving-nyc-to-connecticut-lgbtq',
  'mystic-ct-shoreline-lgbtq-buyers',
  'norwalk-ct-lgbtq-guide',
  'selling-home-connecticut-lgbtq',
  'stamford-ct-lgbtq-guide',
];
for (const slug of slugs) {
  const start = s.indexOf(`slug: "${slug}"`);
  const next = s.indexOf('\n  {\n    id:', start + 10);
  const end = next === -1 ? s.length : next;
  const block = s.slice(start, end);
  const intL = (block.match(/href="\/blog\//g) || []).length;
  const extL = (block.match(/href="https?:\/\//g) || []).length;
  const title = (block.match(/title: "([^"]+)"/) || [])[1];
  const excerpt = (block.match(/excerpt: "([^"]+)"/) || [])[1] || '';
  const kw = (block.match(/seoKeywords: "([^"]+)"/) || [])[1] || '';
  console.log(
    `${slug}\n  title(${title.length}): ${title}\n  desc(${excerpt.length}) int=${intL} ext=${extL}\n  kw: ${kw.slice(0, 90)}...`
  );
}
