const fs = require('fs');
const path = require('path');
const { Document, Paragraph, TextRun, HeadingLevel, Packer } = require('docx');

const blogsDir = path.join(__dirname, '..', 'rewritten');
const outputDir = path.join(__dirname, '..', 'June blogs', 'word-docs');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

function parseMd(text) {
  const lines = text.split('\n');
  const children = [];

  for (const line of lines) {
    if (line.startsWith('# ')) {
      children.push(new Paragraph({ text: line.slice(2).trim(), heading: HeadingLevel.HEADING_1 }));
    } else if (line.startsWith('## ')) {
      children.push(new Paragraph({ text: line.slice(3).trim(), heading: HeadingLevel.HEADING_2 }));
    } else if (line.startsWith('### ')) {
      children.push(new Paragraph({ text: line.slice(4).trim(), heading: HeadingLevel.HEADING_3 }));
    } else if (line.startsWith('#### ')) {
      children.push(new Paragraph({ text: line.slice(5).trim(), heading: HeadingLevel.HEADING_4 }));
    } else if (line.match(/^[-*] /)) {
      const content = line.slice(2).trim();
      children.push(new Paragraph({
        bullet: { level: 0 },
        children: [new TextRun(stripInline(content))],
      }));
    } else if (line.trim() === '') {
      children.push(new Paragraph({ text: '' }));
    } else {
      children.push(new Paragraph({ children: parseInline(line) }));
    }
  }

  return children;
}

function stripInline(text) {
  return text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').replace(/`(.+?)`/g, '$1').replace(/\[(.+?)\]\(.+?\)/g, '$1');
}

function parseInline(text) {
  const runs = [];
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[(.+?)\]\(.+?\)|([^*`[\]]+)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match[1]) runs.push(new TextRun({ text: match[1], bold: true }));
    else if (match[2]) runs.push(new TextRun({ text: match[2], italics: true }));
    else if (match[3]) runs.push(new TextRun({ text: match[3], font: 'Courier New' }));
    else if (match[4]) runs.push(new TextRun({ text: match[4] }));
    else if (match[5]) runs.push(new TextRun({ text: match[5] }));
  }
  return runs.length ? runs : [new TextRun('')];
}

async function convert(mdFile) {
  const text = fs.readFileSync(mdFile, 'utf8');
  const children = parseMd(text);
  const doc = new Document({ sections: [{ children }] });
  const buffer = await Packer.toBuffer(doc);
  const outName = path.basename(mdFile, '.md').replace(/-v2$/, '') + '.docx';
  const outPath = path.join(outputDir, outName);
  fs.writeFileSync(outPath, buffer);
  console.log('✓', outName);
}

(async () => {
  const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));
  for (const f of files) {
    await convert(path.join(blogsDir, f));
  }
  console.log(`\nDone — ${files.length} files written to June blogs/word-docs/`);
})();
