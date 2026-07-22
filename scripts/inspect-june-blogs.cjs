const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', '_june_blogs_extract', 'June blogs');
const files = fs.readdirSync(dir).filter(f => f.startsWith('Good to go'));

(async () => {
  for (const f of files) {
    const r = await mammoth.convertToHtml({ path: path.join(dir, f) });
    const html = r.value;
    const title = (html.match(/<h1>(.*?)<\/h1>/i) || [])[1];
    const metaTitle = (html.match(/Meta Title:\s*(.*?)<\/p>/i) || [])[1];
    const metaDesc = (html.match(/Meta Description:\s*(.*?)<\/p>/i) || [])[1];
    const kw = (html.match(/Focus Keywords:\s*(.*?)<\/p>/i) || [])[1];
    const author = (html.match(/Author:\s*(.*?)<\/p>/i) || [])[1];
    const plain = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log('===', f);
    console.log('H1:', title?.slice(0, 140));
    console.log('Meta Title:', metaTitle?.slice(0, 140));
    console.log('Meta Desc:', metaDesc?.slice(0, 180));
    console.log('Keywords:', kw?.slice(0, 140));
    console.log('Author:', author);
    console.log('HTML length:', html.length, 'words ~', plain.split(/\s+/).length);
    console.log('Preview:', plain.slice(0, 400));
    console.log('');
  }
})();
