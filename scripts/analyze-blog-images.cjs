const fs = require('fs');
const content = fs.readFileSync('data/blogs.ts', 'utf8');

// Parse id, slug, title, image for each post
const posts = [];
const entryRegex = /\{\s*id:\s*(\d+),[\s\S]*?slug:\s*"([^"]+)",[\s\S]*?title:\s*"([^"]+)",[\s\S]*?image:\s*"([^"]+)"/g;
let match;
while ((match = entryRegex.exec(content)) !== null) {
  posts.push({
    id: match[1],
    slug: match[2],
    title: match[3],
    image: match[4]
  });
}

const groups = {};
posts.forEach(p => {
  if (!groups[p.image]) groups[p.image] = [];
  groups[p.image].push(p);
});

console.log('Total posts:', posts.length);
console.log('\n=== CURRENT IMAGE SHARING (need to make all unique) ===\n');
Object.entries(groups)
  .filter(([img, arr]) => arr.length > 1)
  .sort((a,b)=> b[1].length - a[1].length)
  .forEach(([img, arr]) => {
    console.log(img + ' (' + arr.length + ' posts)');
    arr.forEach(p => console.log('   - ' + p.slug + ' | ' + p.title.substring(0,70)));
    console.log('');
  });

console.log('\n=== FULL LIST (slug -> current image) ===');
posts.forEach(p => {
  console.log(p.slug.padEnd(55) + ' -> ' + p.image);
});
