const fs = require('fs');
const s = fs.readFileSync('data/blogs.ts', 'utf8');
const posts = [];
const re = /slug: "([^"]+)"/g;
let m;
while ((m = re.exec(s))) {
  const start = m.index;
  const next = s.indexOf('\n  {\n    id:', start + 10);
  const end = next === -1 ? s.indexOf('\n];', start) : next;
  const block = s.slice(start, end);
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
  });
}
console.log(JSON.stringify(posts, null, 2));
console.log('COUNT', posts.length);
const imgs = posts.map((p) => p.image);
console.log(
  'DUP_IMAGES',
  [...new Set(imgs.filter((x, i) => imgs.indexOf(x) !== i))]
);
