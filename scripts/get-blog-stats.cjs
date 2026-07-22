const fs = require('fs');
const t = fs.readFileSync(require('path').join(__dirname, '..', 'data', 'blogs.ts'), 'utf8');
const ids = [...t.matchAll(/id:\s*(\d+)/g)].map(m => +m[1]);
const slugs = [...t.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);
console.log('max id', Math.max(...ids), 'count', ids.length);
console.log('all slugs:\n', slugs.join('\n'));
