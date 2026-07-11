/**
 * Import "Good to go" June blog batch into data/blogs.ts
 * - Parses SEO meta, body HTML, FAQ blocks
 * - Converts markdown-style pipe tables to real HTML tables
 * - Assigns unique hero images per slug
 */
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const batchDir = path.join(__dirname, '..', '_june_blogs_new', 'June blogs');
const blogsFilePath = path.join(__dirname, '..', 'data', 'blogs.ts');
const START_ID = 31;

const AUTHOR_ROLES = {
  'Arek Wtulich': 'Licensed CT Realtor & Co-Founder, CT LGBTQ+ Real Estate Alliance',
  'Arek Garbowicz': 'Licensed CT Realtor | CT LGBTQ+ Real Estate Alliance',
  'Abby Dudarewicz': 'Licensed CT Realtor & LGBTQ+ Community Advocate',
  'Travis Lipinski': 'Licensed CT Realtor | Litchfield County Specialist',
  'Jake Earl': 'VP, Mortgage Banker | Total Mortgage',
  'Carolyn Futtner': 'Real Estate Attorney | Founding Partner, MPF Law',
};

const CATEGORY_MAP = {
  'Finance & Mortgages': 'FINANCE & MORTGAGES',
  'Market Reports': 'MARKET REPORTS',
  'Buying Process': 'BUYING GUIDE',
  'Community & Resources': 'COMMUNITY RESOURCES',
  'Neighborhood Guides': 'NEIGHBORHOOD GUIDE',
  'Relocating to Connecticut': 'RELOCATION GUIDE',
  Selling: 'SELLING GUIDE',
};

const IMAGE_BY_SLUG = {
  'connecticut-closing-costs': '/connecticut-closing-costs-hero.jpg',
  'connecticut-lgbtq-real-estate-market-report-2026': '/ct-lgbtq-market-report-2026-hero.jpg',
  'connecticut-property-taxes-by-town': '/connecticut-property-taxes-hero.jpg',
  'connecticut-vs-massachusetts-lgbtq-buyers': '/ct-vs-ma-lgbtq-buyers-hero.jpg',
  'how-to-buy-home-connecticut-lgbtq': '/how-to-buy-home-ct-lgbtq-hero.jpg',
  'lgbtq-organizations-connecticut-directory': '/lgbtq-orgs-ct-directory-hero.jpg',
  'middletown-ct-lgbtq-guide': '/middletown-ct-lgbtq-hero.jpg',
  'moving-nyc-to-connecticut-lgbtq': '/moving-nyc-to-ct-lgbtq-hero.jpg',
  'mystic-ct-shoreline-lgbtq-buyers': '/mystic-ct-shoreline-lgbtq-hero.jpg',
  'norwalk-ct-lgbtq-guide': '/norwalk-ct-lgbtq-hero.jpg',
  'selling-home-connecticut-lgbtq': '/selling-home-ct-lgbtq-hero.jpg',
  'stamford-ct-lgbtq-guide': '/stamford-ct-lgbtq-hero.jpg',
};

// Stagger publish dates through June 2026
const DATES = [
  '2026-06-03',
  '2026-06-05',
  '2026-06-07',
  '2026-06-09',
  '2026-06-11',
  '2026-06-13',
  '2026-06-15',
  '2026-06-17',
  '2026-06-19',
  '2026-06-21',
  '2026-06-23',
  '2026-06-25',
];

function decodeHtml(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&nbsp;/g, ' ');
}

function stripTags(s) {
  return s.replace(/<[^>]+>/g, '').trim();
}

/** Convert sequences of <p>|...|</p> markdown tables into HTML tables */
function convertMarkdownTables(html) {
  return html.replace(/(?:<p>\|[\s\S]*?<\/p>)+/g, (block) => {
    const rows = [...block.matchAll(/<p>(\|[\s\S]*?)<\/p>/g)].map((m) => m[1].trim());
    if (rows.length < 2) return block;

    const parseRow = (row) =>
      row
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((c) => c.trim());

    const isSep = (cells) =>
      cells.length > 0 &&
      cells.every((c) => /^:?-{2,}:?$/.test(c.replace(/\s/g, '')) || c === '');

    const parsed = rows.map(parseRow).filter((cells) => !isSep(cells) && cells.some(Boolean));
    if (parsed.length < 1) return block;

    const header = parsed[0];
    const body = parsed.slice(1);
    let table = '<table class="blog-table"><thead><tr>';
    for (const h of header) table += `<th>${h}</th>`;
    table += '</tr></thead><tbody>';
    for (const row of body) {
      table += '<tr>';
      for (let c = 0; c < header.length; c++) table += `<td>${row[c] ?? ''}</td>`;
      table += '</tr>';
    }
    table += '</tbody></table>';
    return table;
  });
}

function extractMeta(html) {
  const pick = (label) => {
    const re = new RegExp(
      `<p><strong>${label}:</strong>\\s*(.*?)</p>|<p>${label}:\\s*(.*?)</p>`,
      'i'
    );
    const m = html.match(re);
    return m ? decodeHtml((m[1] || m[2] || '').trim()) : '';
  };

  return {
    seoTitle: pick('SEO Title'),
    metaDescription: pick('Meta Description'),
    slug: pick('Slug'),
    category: pick('Category'),
    author: pick('Author'),
    focusKeywords: pick('Focus Keywords'),
  };
}

function removeMetaBlocks(html) {
  return html
    .replace(/<p><strong>SEO Title:<\/strong>[\s\S]*?<\/p>/gi, '')
    .replace(/<p><strong>Meta Description:<\/strong>[\s\S]*?<\/p>/gi, '')
    .replace(/<p><strong>Slug:<\/strong>[\s\S]*?<\/p>/gi, '')
    .replace(/<p><strong>Category:<\/strong>[\s\S]*?<\/p>/gi, '')
    .replace(/<p><strong>Author:<\/strong>[\s\S]*?<\/p>/gi, '')
    .replace(/<p><strong>Focus Keywords:<\/strong>[\s\S]*?<\/p>/gi, '')
    .replace(/<p>SEO Title:[\s\S]*?<\/p>/gi, '')
    .replace(/<p>Meta Description:[\s\S]*?<\/p>/gi, '')
    .replace(/<p>Slug:[\s\S]*?<\/p>/gi, '')
    .replace(/<p>Category:[\s\S]*?<\/p>/gi, '')
    .replace(/<p>Author:[\s\S]*?<\/p>/gi, '')
    .replace(/<p>---<\/p>/g, '')
    .replace(/(?:<p>\s*<\/p>\s*)+/g, '');
}

function splitFaq(html) {
  const faqMatch = html.match(
    /<h2[^>]*>\s*Frequently Asked Questions\s*<\/h2>|<p><strong>Frequently Asked Questions<\/strong><\/p>|<p>Frequently Asked Questions<\/p>/i
  );
  if (!faqMatch) {
    return { body: html, faq: [] };
  }

  const idx = html.indexOf(faqMatch[0]);
  const body = html.slice(0, idx).trim();
  const faqHtml = html.slice(idx + faqMatch[0].length).trim();

  // After FAQ there may be a closing CTA section (h2 + paragraphs) — keep in body
  let faqOnly = faqHtml;
  let afterFaq = '';
  const nextH2 = faqHtml.search(/<h2[\s>]/i);
  if (nextH2 !== -1) {
    faqOnly = faqHtml.slice(0, nextH2);
    afterFaq = faqHtml.slice(nextH2);
  }

  // Parse alternating question/answer paragraphs (skip empty, skip pipe-only leftovers)
  const paras = [...faqOnly.matchAll(/<p>([\s\S]*?)<\/p>/gi)].map((m) =>
    decodeHtml(stripTags(m[1])).trim()
  ).filter((t) => t && t !== '---' && !t.startsWith('|'));

  const faq = [];
  for (let i = 0; i + 1 < paras.length; i += 2) {
    const question = paras[i];
    const answer = paras[i + 1];
    // Heuristic: questions often end with ?
    if (question && answer) {
      faq.push({ question, answer });
    }
  }

  return { body: body + (afterFaq ? afterFaq : ''), faq };
}

function addLeadParagraph(html) {
  // First real content <p> after optional whitespace
  return html.replace(/<p>(?!class=)/, '<p class="lead-paragraph">');
}

function styleInternalLinks(html) {
  // Light touch: existing <a> tags get brand class if missing
  return html.replace(/<a href="(\/blog\/[^"]+)"(?![^>]*class=)/g, '<a href="$1" class="text-brand-600 hover:underline font-bold"');
}

function escapeTsString(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, ' ');
}

function formatFaq(faq) {
  if (!faq.length) return '';
  let s = '    faq: [\n';
  faq.forEach((item, i) => {
    s += `      { question: "${escapeTsString(item.question)}", answer: "${escapeTsString(item.answer)}" }`;
    s += i < faq.length - 1 ? ',\n' : '\n';
  });
  s += '    ],\n';
  return s;
}

async function processFile(file, index, nextId) {
  const filePath = path.join(batchDir, file);
  const result = await mammoth.convertToHtml({ path: filePath });
  let html = result.value;

  const titleMatch = html.match(/<h1>(.*?)<\/h1>/i);
  if (!titleMatch) {
    console.warn(`[WARN] No H1 in ${file}`);
    return null;
  }

  const title = decodeHtml(titleMatch[1].trim());
  const meta = extractMeta(html);

  const h1Close = html.indexOf('</h1>');
  let main = html.substring(h1Close + 5).trim();
  main = removeMetaBlocks(main);
  main = convertMarkdownTables(main);
  main = decodeHtml(main);

  const { body, faq } = splitFaq(main);
  let content = body.trim();
  content = addLeadParagraph(content);
  content = styleInternalLinks(content);
  // Clean trailing empties
  content = content.replace(/(?:<p>\s*<\/p>\s*)+$/g, '').trim();

  const slug = meta.slug || file.replace(/^Good to go\s+/i, '').replace(/\.docx$/i, '');
  const excerpt = meta.metaDescription || stripTags(content).slice(0, 200);
  const seoKeywords =
    meta.focusKeywords ||
    [title, slug.replace(/-/g, ' '), 'Connecticut LGBTQ real estate'].join(', ').slice(0, 200);

  const authorName = meta.author || 'Arek Wtulich';
  const authorRole =
    AUTHOR_ROLES[authorName] || 'Licensed CT Realtor & CT LGBTQ+ Real Estate Alliance';

  const categoryRaw = meta.category || 'LGBTQ+ LIVING GUIDE';
  const category = CATEGORY_MAP[categoryRaw] || categoryRaw.toUpperCase();

  const words = stripTags(content).split(/\s+/).filter(Boolean).length;
  const readTime = `${Math.max(4, Math.ceil(words / 200))} MIN READ`;

  const image = IMAGE_BY_SLUG[slug] || `/${slug}-hero.jpg`;
  const date = DATES[index] || '2026-06-15';

  return {
    id: nextId,
    slug,
    title,
    excerpt,
    seoKeywords,
    content,
    faq,
    image,
    category,
    date,
    readTime,
    author: authorName,
    authorRole,
    words,
  };
}

async function run() {
  const files = fs
    .readdirSync(batchDir)
    .filter((f) => f.startsWith('Good to go') && f.endsWith('.docx'))
    .sort();

  console.log(`Found ${files.length} Good-to-go files`);

  // Existing slugs
  const existing = fs.readFileSync(blogsFilePath, 'utf8');
  const existingSlugs = new Set([...existing.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));

  let nextId = START_ID;
  const posts = [];

  for (let i = 0; i < files.length; i++) {
    const post = await processFile(files[i], i, nextId);
    if (!post) continue;
    if (existingSlugs.has(post.slug)) {
      console.warn(`[SKIP] slug already exists: ${post.slug}`);
      continue;
    }
    console.log(
      `OK id=${post.id} ${post.slug} | ${post.words} words | FAQ ${post.faq.length} | ${post.author} | ${post.image}`
    );
    posts.push(post);
    nextId++;
  }

  if (!posts.length) {
    console.log('No new posts to append.');
    return;
  }

  let blogsContent = existing;
  const lastBracketIndex = blogsContent.lastIndexOf('];');
  if (lastBracketIndex === -1) throw new Error('Could not find BLOG_POSTS closing ];');

  let formatted = ',\n';
  posts.forEach((post, index) => {
    const escapedContent = post.content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
    formatted += `  {\n`;
    formatted += `    id: ${post.id},\n`;
    formatted += `    slug: "${post.slug}",\n`;
    formatted += `    title: "${escapeTsString(post.title)}",\n`;
    formatted += `    excerpt: "${escapeTsString(post.excerpt)}",\n`;
    if (post.seoKeywords) {
      formatted += `    seoKeywords: "${escapeTsString(post.seoKeywords)}",\n`;
    }
    formatted += `    content: \`\n      ${escapedContent}\n    \`,\n`;
    formatted += formatFaq(post.faq);
    formatted += `    image: "${post.image}",\n`;
    formatted += `    category: "${escapeTsString(post.category)}",\n`;
    formatted += `    date: "${post.date}",\n`;
    formatted += `    readTime: "${post.readTime}",\n`;
    formatted += `    author: "${escapeTsString(post.author)}",\n`;
    formatted += `    authorRole: "${escapeTsString(post.authorRole)}"\n`;
    formatted += `  }${index < posts.length - 1 ? ',\n' : ''}`;
  });

  const updated =
    blogsContent.substring(0, lastBracketIndex) + formatted + '\n' + blogsContent.substring(lastBracketIndex);

  fs.writeFileSync(blogsFilePath, updated, 'utf8');
  console.log(`\nAppended ${posts.length} blogs to data/blogs.ts (ids ${posts[0].id}–${posts[posts.length - 1].id})`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
