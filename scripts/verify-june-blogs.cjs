const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const s = fs.readFileSync('data/blogs.ts', 'utf8');
const result = ts.transpileModule(s, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
});
console.log('transpile ok, out length', result.outputText.length);

const slugs = [...s.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const images = [...s.matchAll(/image:\s*"([^"]+)"/g)].map((m) => m[1]);
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

console.log('total slugs', slugs.length);
for (const slug of news) {
  const ok = slugs.includes(slug);
  const imgMatch = s.match(new RegExp(`slug: "${slug}"[\\s\\S]*?image: "([^"]+)"`));
  const img = imgMatch ? imgMatch[1] : null;
  const exists = img && fs.existsSync(path.join('public', img.replace(/^\//, '')));
  console.log(ok ? 'OK' : 'MISSING', slug, '->', img, exists ? 'file ok' : 'FILE MISSING');
}

const missing = images.filter((img) => !fs.existsSync(path.join('public', img.replace(/^\//, ''))));
const dups = images.filter((x, i) => images.indexOf(x) !== i);
console.log('all images', images.length, 'unique', new Set(images).size);
console.log('missing files', missing);
console.log('duplicate image paths', [...new Set(dups)]);
console.log('blog-table count', (s.match(/blog-table/g) || []).length);
console.log('pipe leftover', (s.match(/<p>\|/g) || []).length);
