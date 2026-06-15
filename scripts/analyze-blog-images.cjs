const fs = require('fs');
const content = fs.readFileSync('data/blogs.ts', 'utf8');

// Extract all blog blocks. A blog entry is roughly from "id: N," to the next "image: " or use regex for pairs
// Simpler robust way: find every occurrence of title: `...` and then the next image: "..." after it in the file.

const posts = [];
const titleRe = /title:\s*"([^"]+)"/g;
let titleMatch;
const titlePositions = [];
while ((titleMatch = titleRe.exec(content)) !== null) {
  titlePositions.push({ title: titleMatch[1], index: titleMatch.index });
}

// For each title, find the first image: "..." that appears after its position
titlePositions.forEach((tp, idx) => {
  const start = tp.index;
  const end = (idx + 1 < titlePositions.length) ? titlePositions[idx+1].index : content.length;
  const block = content.substring(start, end);
  const imgMatch = block.match(/image:\s*"([^"]+)"/);
  if (imgMatch) {
    posts.push({ title: tp.title, image: imgMatch[1] });
  }
});

const groups = {};
posts.forEach(p => {
  if (!groups[p.image]) groups[p.image] = [];
  groups[p.image].push(p.title);
});

console.log('Total posts parsed:', posts.length);
console.log('\n=== IMAGES USED BY MULTIPLE BLOGS (these are the "same image" ones) ===\n');
const dups = Object.entries(groups)
  .filter(([img, arr]) => arr.length > 1)
  .sort((a,b) => b[1].length - a[1].length);

if (dups.length === 0) {
  console.log('(No duplicates found or parsing missed some)');
} else {
  dups.forEach(([img, arr]) => {
    console.log('🖼️  ' + img + '  (' + arr.length + ' blogs share this exact image)');
    arr.forEach((t, i) => console.log('   ' + (i+1) + '. ' + t));
    console.log('');
  });
}

console.log('\n=== ALL IMAGES AND THEIR USAGE COUNT ===');
Object.keys(groups).sort().forEach(img => {
  console.log(img.padEnd(35) + ' : ' + groups[img].length + (groups[img].length > 1 ? '  << DUPE' : ''));
});
