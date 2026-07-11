const fs = require('fs');
const s = fs.readFileSync('data/blogs.ts', 'utf8');
const slug = 'best-places-to-live-in-connecticut-lgbtq';
const start = s.indexOf(`slug: "${slug}"`);
const next = s.indexOf('\n  {\n    id:', start + 10);
const obj = s.slice(start, next);
console.log('obj len', obj.length);
console.log('content at', obj.indexOf('content: `'));
const faq = obj.indexOf('faq:');
const img = obj.indexOf('\n    image:');
console.log('faq', faq, 'image', img);
const pivot = faq > 0 ? faq : img;
console.log('around pivot:', JSON.stringify(obj.slice(pivot - 100, pivot + 30)));
// count backticks in content region
const c0 = obj.indexOf('content: `') + 'content: `'.length;
const region = obj.slice(c0, pivot);
console.log('region ends with', JSON.stringify(region.slice(-40)));
console.log('backticks in region', (region.match(/`/g) || []).length);
