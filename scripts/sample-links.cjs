const fs = require('fs');
const s = fs.readFileSync('data/blogs.ts', 'utf8');
const i = s.indexOf('slug: "how-to-buy-home-connecticut-lgbtq"');
const b = s.slice(i, i + 12000);
const links = [...b.matchAll(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].slice(0, 10);
console.log(links.map((m) => `${m[2]} -> ${m[1]}`).join('\n'));
console.log('Garbowicz map in BlogPost:', fs.readFileSync('components/pages/BlogPost.tsx', 'utf8').includes("Arek Garbowicz"));
console.log('triangle url:', (s.match(/ctpride[a-z.]+/g) || []).join(', '));
