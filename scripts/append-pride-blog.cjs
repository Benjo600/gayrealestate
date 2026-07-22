const fs = require('fs');
const path = require('path');

const blogsFilePath = path.join(__dirname, '..', 'data', 'blogs.ts');
const contentPath = path.join(__dirname, 'pride-guide-content.html');

let html = fs.readFileSync(contentPath, 'utf8').trim();
// Pretty-print: newline before block tags for readability in blogs.ts
html = html
  .replace(/<\/p>/g, '</p>\n')
  .replace(/<\/h2>/g, '</h2>\n')
  .replace(/<\/h3>/g, '</h3>\n')
  .replace(/<\/ul>/g, '</ul>\n')
  .replace(/<\/ol>/g, '</ol>\n')
  .replace(/<ul>/g, '\n      <ul>')
  .replace(/<ol>/g, '\n      <ol>')
  .replace(/<h2>/g, '\n      <h2>')
  .replace(/<h3>/g, '\n      <h3>')
  .trim();

const escapedContent = html.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
const indentedContent = escapedContent
  .split('\n')
  .map((line) => (line ? '      ' + line : line))
  .join('\n');

const postBlock = `  {
    id: 29,
    slug: "connecticut-pride-month-2026-guide",
    title: "Connecticut Pride Month 2026: The Ultimate Guide to LGBTQ+ Events Across Connecticut",
    excerpt: "Your chronological guide to Connecticut Pride Month 2026 — parades, festivals, film screenings, drag shows, and community events from Fairfield County to Mystic.",
    seoKeywords: "Connecticut Pride Month 2026, LGBTQ events Connecticut June, Hartford Pride 2026, Connecticut Pride festivals, gay events Connecticut",
    content: \`
${indentedContent}
    \`,
    faq: [
      { question: "When is Connecticut Pride Month 2026?", answer: "Connecticut Pride Month runs throughout June 2026, with major festivals, parades, and community events from early June through late June and into early July. Highlights include Middletown PrideFEST (June 6), Capital City Pride in Hartford (June 13), West Hartford Pride (June 27), and ongoing programming at Chez Est and Out Film CT." },
      { question: "What are the biggest Pride festivals in Connecticut in 2026?", answer: "The largest 2026 celebrations include Middletown PrideFEST, Capital City Pride Hartford, Fairfield County Pride in the Park, Mohegan Sun Pride Weekend, West Hartford Pride Festival, Greater Bridgeport Pride, and Mystic Pride – Love Out Loud." },
      { question: "When is Hartford Pride / Capital City Pride 2026?", answer: "Capital City Pride takes place June 13, 2026 in Hartford, featuring Pride on Pratt, Riverfront PrideFest, live music, performers, community organizations, and family-friendly activities. Pride weekend also includes the WüF Pre-Party on June 12 and official after-parties at Chez Est." },
      { question: "Is there a Pride event in West Hartford in 2026?", answer: "Yes. West Hartford Pride Festival is scheduled for June 27, 2026, with vendors, entertainment, family activities, community organizations, a Pride marketplace, and live performances. Details are at westhartfordpride.org." },
      { question: "When is the Connecticut LGBTQ Film Festival (Out Film CT) in 2026?", answer: "Out Film CT runs June 12–20, 2026 in Hartford, with opening night June 12, closing night June 20, and a Virtual Encore streaming week June 21–28. It is one of New England's longest-running LGBTQ+ film festivals." },
    ],
    image: "/lgbtq_events_ct.png",
    category: "COMMUNITY EVENTS",
    date: "2026-06-01",
    readTime: "5 MIN READ",
    author: "Arek Wtulich",
    authorRole: "Licensed CT Realtor & Co-Founder, CT LGBTQ+ Real Estate Alliance"
  }`;

let blogsContent = fs.readFileSync(blogsFilePath, 'utf8');
const lastBracketIndex = blogsContent.lastIndexOf('];');
if (lastBracketIndex === -1) {
  throw new Error('Could not find BLOG_POSTS closing bracket');
}

blogsContent =
  blogsContent.substring(0, lastBracketIndex) +
  ',\n' +
  postBlock +
  '\n' +
  blogsContent.substring(lastBracketIndex);

fs.writeFileSync(blogsFilePath, blogsContent, 'utf8');
console.log('Appended Pride guide post (id 29) to data/blogs.ts');
