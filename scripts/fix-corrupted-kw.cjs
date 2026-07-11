const fs = require('fs');
let s = fs.readFileSync('data/blogs.ts', 'utf8');

// Find any seoKeywords containing HTML
const bad = [...s.matchAll(/seoKeywords: "([^"]*)"/g)].filter((m) => m[1].includes('<'));
console.log(
  'corrupted keywords:',
  bad.map((m) => m[1].slice(0, 120))
);

// Fix organizations keywords specifically
s = s.replace(
  /slug: "lgbtq-organizations-connecticut-directory"([\s\S]*?)seoKeywords: "[^"]*"/,
  (full, mid) =>
    `slug: "lgbtq-organizations-connecticut-directory"${mid}seoKeywords: "LGBTQ organizations Connecticut, LGBTQ community centers CT, PFLAG Connecticut, Triangle Community Center, Connecticut Pride events 2026"`
);

// Strip any accidental anchors from seoKeywords fields
s = s.replace(/seoKeywords: "([^"]*)"/g, (_m, val) => {
  const clean = val.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return `seoKeywords: "${clean}"`;
});

// Also ensure titles/excerpts don't have HTML
for (const key of ['title', 'excerpt']) {
  s = s.replace(new RegExp(`${key}: "([^"]*)"`, 'g'), (full, val) => {
    if (!val.includes('<')) return full;
    const clean = val.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    console.log('cleaned', key, clean.slice(0, 80));
    return `${key}: "${clean}"`;
  });
}

fs.writeFileSync('data/blogs.ts', s);
console.log('fixed');

// re-check
const s2 = fs.readFileSync('data/blogs.ts', 'utf8');
const still = [...s2.matchAll(/seoKeywords: "([^"]*)"/g)].filter((m) => m[1].includes('<'));
console.log('still corrupted:', still.length);
const org = s2.match(
  /slug: "lgbtq-organizations-connecticut-directory"[\s\S]*?seoKeywords: "([^"]+)"/
);
console.log('org kw:', org && org[1]);
