const fs = require('fs');
const s = fs.readFileSync('data/blogs.ts', 'utf8');

const news = [
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

function extract(slug) {
  const start = s.indexOf(`slug: "${slug}"`);
  if (start === -1) return null;
  const next = s.indexOf('\n  {\n    id:', start + 10);
  const end = next === -1 ? s.indexOf('\n];', start) : next;
  const block = s.slice(start, end);
  const g = (k) => {
    const r = block.match(new RegExp(k + ':\\s*"([^"]*)"'));
    return r ? r[1] : '';
  };
  const title = g('title');
  const excerpt = g('excerpt');
  const kw = g('seoKeywords');
  const contentMatch = block.match(/content:\s*`([\s\S]*?)`/);
  const content = contentMatch ? contentMatch[1] : '';
  const plain = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = plain.split(/\s+/).filter(Boolean).length;
  const h2 = (content.match(/<h2/gi) || []).length;
  const h3 = (content.match(/<h3/gi) || []).length;
  const tables = (content.match(/<table/gi) || []).length;
  const intLinks = (content.match(/href="\/blog\//g) || []).length;
  const extLinks = (content.match(/href="https?:\/\//g) || []).length;
  const faqCount = (block.match(/question:/g) || []).length;
  const hasLead = /lead-paragraph/.test(content);
  // title contains primary keyword?
  const primary = slug.split('-').slice(0, 3).join(' ');
  return {
    slug,
    title,
    titleLen: title.length,
    pageTitleLen: `${title} | Gay Real Estate CT`.length,
    excerptLen: excerpt.length,
    kw,
    kwLen: kw.length,
    words,
    h2,
    h3,
    tables,
    intLinks,
    extLinks,
    faqCount,
    hasLead,
    image: g('image'),
  };
}

const rows = news.map(extract).filter(Boolean);

console.log('\n=== JUNE BLOG SEO AUDIT ===\n');
for (const r of rows) {
  const flags = [];
  if (r.pageTitleLen > 60) flags.push(`title long (${r.pageTitleLen})`);
  if (r.pageTitleLen < 30) flags.push(`title short (${r.pageTitleLen})`);
  if (r.excerptLen > 160) flags.push(`meta desc long (${r.excerptLen})`);
  if (r.excerptLen < 120) flags.push(`meta desc short (${r.excerptLen})`);
  if (r.words < 800) flags.push(`thin content (${r.words}w)`);
  if (r.h2 < 4) flags.push(`few H2 (${r.h2})`);
  if (r.faqCount < 3) flags.push(`few FAQ (${r.faqCount})`);
  if (r.intLinks === 0) flags.push('NO internal links');
  if (!r.hasLead) flags.push('no lead para');
  // weak keywords if just title + slug
  if (r.kw.includes(r.title) && r.kw.split(',').length <= 3) flags.push('weak seoKeywords (auto)');
  console.log(`${r.slug}`);
  console.log(`  title (${r.titleLen} chars, page ${r.pageTitleLen}): ${r.title.slice(0, 80)}`);
  console.log(`  meta desc (${r.excerptLen}): ${r.kw ? '' : ''}`);
  console.log(`  words=${r.words} h2=${r.h2} h3=${r.h3} tables=${r.tables} faq=${r.faqCount} intLinks=${r.intLinks} extLinks=${r.extLinks}`);
  console.log(`  keywords: ${r.kw.slice(0, 120)}`);
  console.log(`  flags: ${flags.length ? flags.join('; ') : 'none'}`);
  console.log('');
}

const noInt = rows.filter((r) => r.intLinks === 0).length;
const weakKw = rows.filter((r) => r.kw.includes(r.title)).length;
const longTitle = rows.filter((r) => r.pageTitleLen > 60).length;
const longDesc = rows.filter((r) => r.excerptLen > 160).length;
const goodWords = rows.filter((r) => r.words >= 1000).length;
const goodFaq = rows.filter((r) => r.faqCount >= 5).length;

console.log('=== SUMMARY ===');
console.log(`Posts: ${rows.length}`);
console.log(`1000+ words: ${goodWords}/${rows.length}`);
console.log(`5+ FAQ: ${goodFaq}/${rows.length}`);
console.log(`Zero internal links: ${noInt}/${rows.length}`);
console.log(`Weak auto seoKeywords: ${weakKw}/${rows.length}`);
console.log(`Page title >60 chars: ${longTitle}/${rows.length}`);
console.log(`Meta desc >160 chars: ${longDesc}/${rows.length}`);
console.log(`Avg words: ${Math.round(rows.reduce((a, r) => a + r.words, 0) / rows.length)}`);
console.log(`Avg FAQ: ${(rows.reduce((a, r) => a + r.faqCount, 0) / rows.length).toFixed(1)}`);
console.log(`Avg H2: ${(rows.reduce((a, r) => a + r.h2, 0) / rows.length).toFixed(1)}`);
