/**
 * Shared helper: parse public/sitemap.xml and return all <loc> URLs.
 * Keeps indexing scripts in sync with the build-generated sitemap (every live blog).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_SITEMAP = path.join(ROOT, 'public', 'sitemap.xml');

/**
 * @param {string} [sitemapPath]
 * @returns {string[]}
 */
function loadSitemapUrls(sitemapPath = DEFAULT_SITEMAP) {
  if (!fs.existsSync(sitemapPath)) {
    throw new Error(`Sitemap not found at ${sitemapPath}. Run npm run build (or node scripts/generate-sitemap.cjs) first.`);
  }
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) {
    throw new Error(`No <loc> URLs found in ${sitemapPath}`);
  }
  return urls;
}

/**
 * @param {string[]} urls
 * @returns {{ blogs: string[], other: string[] }}
 */
function splitBlogUrls(urls) {
  const blogs = urls.filter((u) => /\/blog\/.+/.test(u));
  const other = urls.filter((u) => !/\/blog\/.+/.test(u));
  return { blogs, other };
}

module.exports = { loadSitemapUrls, splitBlogUrls, DEFAULT_SITEMAP };
