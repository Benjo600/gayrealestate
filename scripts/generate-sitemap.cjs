#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from the canonical data files so the sitemap can
 * never drift out of sync with the published content (every new blog post is
 * picked up automatically). Run automatically before each build.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BASE = 'https://www.gayrealestatect.net';

// Pages that should never appear in the sitemap (e.g. time-limited noindex pages).
const NOINDEX_SLUGS = new Set([]);

// Live posts live in blogs.ts (inline objects) plus julyBlogs2026.ts, which is
// spread into BLOG_POSTS at runtime. A regex over blogs.ts alone misses July
// posts because they only appear as `...JULY_2026_BLOGS` there.
const blogSources = [
  path.join(ROOT, 'data', 'blogs.ts'),
  path.join(ROOT, 'data', 'julyBlogs2026.ts'),
  path.join(ROOT, 'data', 'augustBlogs2026.ts'),
];
const agentsSrc = fs.readFileSync(path.join(ROOT, 'data', 'agents.ts'), 'utf8');

/** Extract { slug, date } pairs in document order from a TS data file. */
function extractPostsFromSource(src) {
  const slugMatches = [];
  const slugRe = /slug:\s*["']([^"']+)["']/g;
  let m;
  while ((m = slugRe.exec(src)) !== null) {
    slugMatches.push({ slug: m[1], index: m.index });
  }
  return slugMatches.map((cur, i) => {
    const end = i + 1 < slugMatches.length ? slugMatches[i + 1].index : src.length;
    const objText = src.slice(cur.index, end);
    const dateMatch = objText.match(/date:\s*["']([0-9]{4}-[0-9]{2}-[0-9]{2})["']/);
    return { slug: cur.slug, date: dateMatch ? dateMatch[1] : null };
  });
}

const posts = [];
const seenSlugs = new Set();
for (const file of blogSources) {
  if (!fs.existsSync(file)) continue;
  for (const post of extractPostsFromSource(fs.readFileSync(file, 'utf8'))) {
    if (seenSlugs.has(post.slug)) continue;
    seenSlugs.add(post.slug);
    posts.push(post);
  }
}

let m;

// Extract agent ids from `agents: Record<string, Agent> = { arek: { id: "arek", ... } }`.
const agentIds = [];
const agentRe = /id:\s*["']([a-z0-9-]+)["']/g;
while ((m = agentRe.exec(agentsSrc)) !== null) {
  if (!agentIds.includes(m[1])) agentIds.push(m[1]);
}

// NOTE: static/agent pages intentionally have no <lastmod>. Stamping them with
// the build date on every deploy teaches Google to distrust lastmod sitewide;
// blog posts carry their real publish date instead.

const staticPages = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/about', changefreq: 'monthly', priority: '0.8' },
  { loc: '/first-time-buyers', changefreq: 'monthly', priority: '0.8' },
  { loc: '/sellers-guide', changefreq: 'monthly', priority: '0.8' },
  { loc: '/buyers-guide', changefreq: 'monthly', priority: '0.8' },
  { loc: '/mortgage-calculator', changefreq: 'monthly', priority: '0.8' },
  { loc: '/relocation', changefreq: 'monthly', priority: '0.8' },
  { loc: '/home-valuation', changefreq: 'monthly', priority: '0.8' },
  { loc: '/marketing-your-home', changefreq: 'monthly', priority: '0.8' },
  { loc: '/reviews', changefreq: 'monthly', priority: '0.8' },
  { loc: '/community', changefreq: 'weekly', priority: '0.8' },
  { loc: '/sky-casper', changefreq: 'monthly', priority: '0.7' },
  { loc: '/contact', changefreq: 'yearly', priority: '0.7' },
  { loc: '/privacy-policy', changefreq: 'yearly', priority: '0.5' },
];

const urlBlock = ({ loc, lastmod, changefreq, priority }) =>
  `  <url>\n    <loc>${BASE}${loc}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

const parts = [];
parts.push('<?xml version="1.0" encoding="UTF-8"?>');
parts.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

parts.push('  <!-- Core Pages -->');
for (const p of staticPages) {
  parts.push(urlBlock(p));
}

parts.push('  <!-- Agents -->');
for (const id of agentIds) {
  parts.push(urlBlock({ loc: `/agent/${id}`, changefreq: 'monthly', priority: '0.9' }));
}

parts.push('  <!-- Blog Index -->');
parts.push(urlBlock({ loc: '/blog', changefreq: 'weekly', priority: '0.8' }));

parts.push('  <!-- Blog Posts -->');
let included = 0;
for (const post of posts) {
  if (NOINDEX_SLUGS.has(post.slug)) continue;
  parts.push(urlBlock({ loc: `/blog/${post.slug}`, lastmod: post.date || undefined, changefreq: 'monthly', priority: '0.9' }));
  included += 1;
}

parts.push('</urlset>');
parts.push('');

const out = parts.join('\n');
fs.writeFileSync(path.join(ROOT, 'public', 'sitemap.xml'), out);
console.log(
  `[sitemap] wrote public/sitemap.xml: ${staticPages.length} core, ${agentIds.length} agents, ${included} blog posts (+1 blog index).`
);

// ─── Edge SEO meta (slim) ───────────────────────────────────────────────────
// The edge seo-injector must NOT import data/blogs.ts (500KB+ of full HTML).
// That bundle routinely blows Netlify edge deploy limits / OOM. Emit a slim
// TypeScript module with only the fields the edge function needs for meta,
// JSON-LD, and noscript excerpts.
try {
  const esbuild = require('esbuild');
  const tmpDir = path.join(ROOT, 'node_modules', '.cache');
  fs.mkdirSync(tmpDir, { recursive: true });
  const tmpBlogs = path.join(tmpDir, 'blogs-for-edge.cjs');
  const tmpAgents = path.join(tmpDir, 'agents-for-edge.cjs');

  esbuild.buildSync({
    entryPoints: [path.join(ROOT, 'data', 'blogs.ts')],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    outfile: tmpBlogs,
    logLevel: 'silent',
  });
  esbuild.buildSync({
    entryPoints: [path.join(ROOT, 'data', 'agents.ts')],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    outfile: tmpAgents,
    logLevel: 'silent',
  });

  // Fresh require each run
  delete require.cache[require.resolve(tmpBlogs)];
  delete require.cache[require.resolve(tmpAgents)];
  const { BLOG_POSTS } = require(tmpBlogs);
  const { agents } = require(tmpAgents);

  const blogMeta = (BLOG_POSTS || []).map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    image: p.image,
    category: p.category,
    date: p.date,
    author: p.author,
    authorRole: p.authorRole,
    seoKeywords: p.seoKeywords || '',
    faq: Array.isArray(p.faq) ? p.faq : [],
  }));

  const agentMeta = {};
  for (const [id, a] of Object.entries(agents || {})) {
    agentMeta[id] = {
      id: a.id || id,
      name: a.name,
      title: a.title,
      tagline: a.tagline || '',
      image: a.image,
      bio: a.bio || '',
      specialties: Array.isArray(a.specialties) ? a.specialties : [],
    };
  }

  // Must live under an underscore directory so Netlify does not treat it as an
  // edge function entrypoint (only _dirs are shared modules; bare _file.ts is not).
  const edgeDir = path.join(ROOT, 'netlify', 'edge-functions', '_shared');
  fs.mkdirSync(edgeDir, { recursive: true });
  const edgeOut = path.join(edgeDir, 'content-meta.ts');
  // Remove legacy path that Netlify wrongly bundled as an edge function.
  const legacyEdge = path.join(ROOT, 'netlify', 'edge-functions', '_content-meta.ts');
  if (fs.existsSync(legacyEdge)) fs.unlinkSync(legacyEdge);
  const fileBody =
    `/** AUTO-GENERATED by scripts/generate-sitemap.cjs — do not edit by hand. */\n` +
    `export type EdgeBlogMeta = {\n` +
    `  slug: string;\n` +
    `  title: string;\n` +
    `  excerpt: string;\n` +
    `  image: string;\n` +
    `  category: string;\n` +
    `  date: string;\n` +
    `  author: string;\n` +
    `  authorRole: string;\n` +
    `  seoKeywords: string;\n` +
    `  faq: { question: string; answer: string }[];\n` +
    `};\n` +
    `export type EdgeAgentMeta = {\n` +
    `  id: string;\n` +
    `  name: string;\n` +
    `  title: string;\n` +
    `  tagline: string;\n` +
    `  image: string;\n` +
    `  bio: string;\n` +
    `  specialties: string[];\n` +
    `};\n` +
    `export const BLOG_META: EdgeBlogMeta[] = ${JSON.stringify(blogMeta, null, 2)};\n` +
    `export const AGENT_META: Record<string, EdgeAgentMeta> = ${JSON.stringify(agentMeta, null, 2)};\n`;

  fs.writeFileSync(edgeOut, fileBody);
  console.log(
    `[sitemap] wrote netlify/edge-functions/_shared/content-meta.ts (${blogMeta.length} blogs, ${Object.keys(agentMeta).length} agents).`
  );
} catch (e) {
  console.warn(`[sitemap] edge meta generation skipped: ${e && e.message ? e.message : e}`);
}
