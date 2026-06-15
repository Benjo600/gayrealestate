const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const batchDir = path.join(__dirname, '..', 'April Batch-20260523T131500Z-3-001', 'April Batch');
const blogsFilePath = path.join(__dirname, '..', 'data', 'blogs.ts');

const dates = [
  '2026-04-02',
  '2026-04-05',
  '2026-04-08',
  '2026-04-11',
  '2026-04-14',
  '2026-04-17',
  '2026-04-20',
  '2026-04-22',
  '2026-04-24',
  '2026-04-26',
  '2026-04-28'
];

function getImage(filename) {
  const fn = filename.toLowerCase();
  if (fn.includes('retire')) return '/lgbtq-small-towns-hero.jpg';
  if (fn.includes('cheapest')) return '/nyc-vs-ct-value-hero.jpg';
  if (fn.includes('search')) return '/ct-lgbtq-places-hero.jpg';
  if (fn.includes('attorney')) return '/generational-wealth-ct-hero.jpg';
  if (fn.includes('areas')) return '/inclusive-ct-neighborhoods-hero.jpg';
  if (fn.includes('towns')) return '/new-haven-neighborhoods-hero.jpg';
  if (fn.includes('realtor')) return '/gay-realtor-ct-hero.jpg';
  if (fn.includes('first-time') || fn.includes('buyer')) return '/lgbtq-first-time-buyer-hero.jpg';
  if (fn.includes('discrimination')) return '/lgbtq-inclusive-schools-hero.jpg';
  if (fn.includes('couples') || fn.includes('same-sex')) return '/gay-couple-moving-ct-hero.jpg';
  if (fn.includes('transgender') || fn.includes('rights')) return '/trans-inclusive-ct-hero.jpg';
  return '/ct-lgbtq-places-hero.jpg';
}

function getCategory(filename) {
  const fn = filename.toLowerCase();
  if (fn.includes('retire')) return 'RETIREMENT GUIDE';
  if (fn.includes('cheapest')) return 'MARKET COMPARISON';
  if (fn.includes('search')) return 'MARKET TRENDS';
  if (fn.includes('attorney')) return 'LEGAL GUIDE';
  if (fn.includes('areas')) return 'NEIGHBORHOOD GUIDE';
  if (fn.includes('towns')) return 'LOCAL SPOTLIGHT';
  if (fn.includes('realtor')) return 'EXPERT ADVICE';
  if (fn.includes('first-time') || fn.includes('buyer')) return 'FIRST-TIME BUYERS';
  if (fn.includes('discrimination')) return 'EXPERT ADVICE';
  if (fn.includes('couples') || fn.includes('same-sex')) return 'LEGAL GUIDE';
  if (fn.includes('transgender') || fn.includes('rights')) return 'LEGAL GUIDE';
  return 'LGBTQ+ LIVING GUIDE';
}

function getSlug(filename) {
  return filename
    .replace(/\.docx$/, '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function decodeHtml(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–');
}

async function run() {
  const files = fs.readdirSync(batchDir).filter(f => f.endsWith('.docx'));
  console.log(`Processing ${files.length} April Batch docx files...`);

  // We want to assign consecutive IDs starting at 16
  let nextId = 16;
  const newBlogPosts = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(batchDir, file);
    
    const result = await mammoth.convertToHtml({path: filePath});
    const html = result.value;

    // Parse metadata
    const metaTitleMatch = html.match(/Meta Title:\s*(.*?)<\/p>/i);
    const metaDescMatch = html.match(/Meta Description:\s*(.*?)<\/p>/i);
    const keywordsMatch = html.match(/Focus Keywords:\s*(.*?)<\/p>/i);
    const authorMatch = html.match(/Author:\s*(.*?)<\/p>/i);
    const titleMatch = html.match(/<h1>(.*?)<\/h1>/i);

    if (!titleMatch) {
      console.warn(`[WARN] Skipping ${file} due to missing <h1> tag.`);
      continue;
    }

    const title = decodeHtml(titleMatch[1].trim());
    const slug = getSlug(file);
    const excerpt = metaDescMatch ? decodeHtml(metaDescMatch[1].trim()) : '';
    const seoKeywords = keywordsMatch ? decodeHtml(keywordsMatch[1].trim()) : '';
    
    let authorName = 'Arek Wtulich';
    let authorRole = 'Licensed CT Realtor & Co-Founder, CT LGBTQ+ Real Estate Alliance';
    
    if (authorMatch) {
      const fullAuthorStr = decodeHtml(authorMatch[1].trim());
      const parts = fullAuthorStr.split(/\s*[—–-]\s*/);
      if (parts.length > 0) {
        authorName = parts[0].trim();
      }
      if (parts.length > 1) {
        authorRole = parts.slice(1).join(' — ').trim();
      }
    }

    // Main content: everything after </h1>
    const h1CloseIndex = html.indexOf('</h1>');
    let mainContent = html.substring(h1CloseIndex + 5).trim();

    // Remove any trailing empty paragraphs or spacing
    mainContent = mainContent.replace(/(?:<p>&nbsp;<\/p>|<p><\/p>)+$/, '').trim();

    // Clean html entities inside content
    mainContent = decodeHtml(mainContent);

    // Calculate read time (rough estimate: words / 200)
    const words = mainContent.replace(/<[^>]+>/g, '').split(/\s+/).length;
    const readTime = `${Math.max(3, Math.ceil(words / 200))} MIN READ`;

    const date = dates[i % dates.length];
    const image = getImage(file);
    const category = getCategory(file);

    newBlogPosts.push({
      id: nextId++,
      slug,
      title,
      excerpt,
      seoKeywords,
      content: mainContent,
      image,
      category,
      date,
      readTime,
      author: authorName,
      authorRole
    });

    console.log(`Parsed: "${title}" (ID: ${nextId - 1})`);
  }

  // Read the existing blogs file
  let blogsContent = fs.readFileSync(blogsFilePath, 'utf8');

  // We want to insert the new posts into the BLOG_POSTS array.
  // The array starts with "export const BLOG_POSTS: BlogPost[] = ["
  // And ends with "];" at the very end of the file.
  const lastBracketIndex = blogsContent.lastIndexOf('];');
  if (lastBracketIndex === -1) {
    throw new Error('Could not find the closing square bracket of BLOG_POSTS array in blogs.ts');
  }

  // Format the new posts nicely
  let formattedPosts = ',\n';
  newBlogPosts.forEach((post, index) => {
    // Escaping backticks in content for TS template literals
    const escapedContent = post.content.replace(/`/g, '\\`').replace(/\$/g, '\\$');
    
    formattedPosts += `  {\n`;
    formattedPosts += `    id: ${post.id},\n`;
    formattedPosts += `    slug: "${post.slug}",\n`;
    formattedPosts += `    title: "${post.title.replace(/"/g, '\\"')}",\n`;
    formattedPosts += `    excerpt: "${post.excerpt.replace(/"/g, '\\"')}",\n`;
    if (post.seoKeywords) {
      formattedPosts += `    seoKeywords: "${post.seoKeywords.replace(/"/g, '\\"')}",\n`;
    }
    formattedPosts += `    content: \`\n${escapedContent}\n    \`,\n`;
    formattedPosts += `    image: "${post.image}",\n`;
    formattedPosts += `    category: "${post.category}",\n`;
    formattedPosts += `    date: "${post.date}",\n`;
    formattedPosts += `    readTime: "${post.readTime}",\n`;
    formattedPosts += `    author: "${post.author}",\n`;
    formattedPosts += `    authorRole: "${post.authorRole}"\n`;
    formattedPosts += `  }${index < newBlogPosts.length - 1 ? ',\n' : ''}`;
  });

  const updatedBlogsContent = 
    blogsContent.substring(0, lastBracketIndex) + 
    formattedPosts + 
    '\n' + 
    blogsContent.substring(lastBracketIndex);

  fs.writeFileSync(blogsFilePath, updatedBlogsContent, 'utf8');
  console.log(`\n🎉 Successfully appended ${newBlogPosts.length} new blogs to data/blogs.ts!`);
}

run().catch(console.error);
