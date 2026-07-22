/**
 * Competitor Blog Crawler
 * Uses Firecrawl API to scrape competitor sites and save content as markdown.
 * Run: node scripts/crawl-competitors.cjs [competitor-slug]
 * Run all: node scripts/crawl-competitors.cjs
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
const OUTPUT_BASE = path.join(__dirname, '..', 'competitor-research');
const PROGRESS_FILE = path.join(OUTPUT_BASE, 'progress.json');

function writeProgress(state) {
  fs.mkdirSync(OUTPUT_BASE, { recursive: true });
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(state, null, 2));
}

const COMPETITORS = [
  {
    slug: 'gayrealestate-com',
    name: 'GayRealEstate.com',
    blogUrl: 'https://www.gayrealestate.com/blog',
    landingUrls: [
      'https://www.gayrealestate.com/',
      'https://www.gayrealestate.com/usa/connecticut/',
    ],
    crawlPaths: ['/blog'],
  },
  {
    slug: 'naglrep-com',
    name: 'NAGLREP',
    blogUrl: 'https://naglrep.com/lgbt-real-estate-blog/',
    landingUrls: ['https://naglrep.com/'],
    crawlPaths: ['/blog', '/lgbt-real-estate-blog'],
  },
  {
    slug: 'realestatealliance-org',
    name: 'LGBTQ+ Real Estate Alliance',
    blogUrl: 'https://realestatealliance.org/blog',
    landingUrls: ['https://realestatealliance.org/'],
    crawlPaths: ['/blog', '/news', '/resources'],
  },
  {
    slug: 'lgbtqrealestatepros-com',
    name: 'LGBTQ Real Estate Pros',
    blogUrl: 'https://lgbtqrealestatepros.com/blog',
    landingUrls: ['https://lgbtqrealestatepros.com/'],
    crawlPaths: ['/blog', '/resources'],
  },
  {
    slug: 'gayrealestatect-net',
    name: 'GayRealEstateCT.net',
    blogUrl: 'https://www.gayrealestatect.net/blog',
    landingUrls: [
      'https://www.gayrealestatect.net/',
      'https://www.gayrealestatect.net/about',
    ],
    crawlPaths: ['/blog', '/resources'],
  },
  {
    slug: 'nicksellsnewengland-com',
    name: 'Nick Sells New England',
    blogUrl: 'https://nicksellsnewengland.com/blog',
    landingUrls: [
      'https://nicksellsnewengland.com/',
      'https://nicksellsnewengland.com/gay-realtor-connecticut',
    ],
    crawlPaths: ['/blog'],
  },
  {
    slug: 'lesbianrealestateagents-com',
    name: 'Lesbian Real Estate Agents',
    blogUrl: 'https://www.lesbianrealestateagents.com/blog/',
    landingUrls: ['https://www.lesbianrealestateagents.com/'],
    crawlPaths: ['/blog'],
  },
];

function apiRequest(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.firecrawl.dev',
      path: endpoint,
      method,
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
      },
    };

    const req = https.request(options, (res) => {
      let raw = '';
      res.on('data', (chunk) => (raw += chunk));
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); }
        catch { reject(new Error(`Bad JSON: ${raw.slice(0, 200)}`)); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function saveFile(folder, filename, content) {
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, filename), content, 'utf8');
}

async function scrapeUrl(url) {
  const result = await apiRequest('POST', '/v1/scrape', {
    url,
    formats: ['markdown'],
    onlyMainContent: true,
  });
  return result;
}

async function crawlSite(competitor, progress, competitorIndex, totalCompetitors) {
  progress.current = {
    slug: competitor.slug,
    name: competitor.name,
    step: 'landing-pages',
    pagesFound: 0,
    pagesSaved: 0,
    competitorIndex,
    totalCompetitors,
    startedAt: new Date().toISOString(),
  };
  writeProgress(progress);

  // 1. Scrape landing pages
  for (const url of competitor.landingUrls) {
    progress.current.step = `scraping: ${url}`;
    writeProgress(progress);
    try {
      const result = await scrapeUrl(url);
      if (result.success && result.data?.markdown) {
        const filename = slugify(result.data.metadata?.title || url) + '.md';
        const folder = path.join(OUTPUT_BASE, competitor.slug, 'landing-pages');
        const header = `# ${result.data.metadata?.title || url}\n> Source: ${url}\n> Scraped: ${new Date().toISOString()}\n\n`;
        saveFile(folder, filename, header + result.data.markdown);
        progress.current.pagesSaved++;
        writeProgress(progress);
      }
    } catch (err) {
      progress.current.lastError = err.message;
      writeProgress(progress);
    }
    await sleep(1500);
  }

  // 2. Crawl blog
  progress.current.step = 'starting-crawl';
  writeProgress(progress);

  try {
    const crawlJob = await apiRequest('POST', '/v1/crawl', {
      url: competitor.blogUrl,
      limit: 100,
      includePaths: competitor.crawlPaths,
      scrapeOptions: { formats: ['markdown'], onlyMainContent: true },
    });

    if (!crawlJob.id) {
      progress.current.step = 'crawl-failed';
      progress.current.lastError = JSON.stringify(crawlJob).slice(0, 200);
      writeProgress(progress);
      return;
    }

    progress.current.jobId = crawlJob.id;
    progress.current.step = 'crawling';
    writeProgress(progress);

    let done = false;
    let attempts = 0;
    while (!done && attempts < 60) {
      await sleep(5000);
      attempts++;
      const status = await apiRequest('GET', `/v1/crawl/${crawlJob.id}`, null);

      // Firecrawl returns completed/scraping/failed + partial data
      const pages = status.data || [];
      progress.current.pagesFound = status.total || pages.length;
      progress.current.pagesCrawled = status.completed || pages.length;
      progress.current.step = status.status === 'completed' ? 'saving' : `crawling (${attempts * 5}s)`;
      writeProgress(progress);

      if (status.status === 'completed') {
        done = true;
        for (const page of pages) {
          if (!page.markdown && !page.content) continue;
          const content = page.markdown || page.content;
          const title = page.metadata?.title || page.url || 'untitled';
          const url = page.url || '';
          const isBlog = competitor.crawlPaths.some(
            (p) => url.includes(p) && url.replace(competitor.blogUrl, '').length > 5
          );
          const folder = path.join(OUTPUT_BASE, competitor.slug, isBlog ? 'blogs' : 'landing-pages');
          const filename = slugify(title) + '.md';
          const header = `# ${title}\n> Source: ${url}\n> Scraped: ${new Date().toISOString()}\n\n`;
          saveFile(folder, filename, header + content);
          progress.current.pagesSaved++;
          writeProgress(progress);
        }

        const rawPath = path.join(OUTPUT_BASE, competitor.slug, 'raw', 'crawl-index.json');
        fs.mkdirSync(path.dirname(rawPath), { recursive: true });
        fs.writeFileSync(rawPath, JSON.stringify({ jobId: crawlJob.id, pages: pages.map(p => ({ url: p.url, title: p.metadata?.title })) }, null, 2));

      } else if (status.status === 'failed') {
        progress.current.step = 'failed';
        writeProgress(progress);
        done = true;
      }
    }
  } catch (err) {
    progress.current.step = 'error';
    progress.current.lastError = err.message;
    writeProgress(progress);
  }

  progress.done.push({ slug: competitor.slug, name: competitor.name, pagesSaved: progress.current.pagesSaved });
  writeProgress(progress);
}

async function main() {
  if (!FIRECRAWL_API_KEY) {
    console.error('ERROR: Set FIRECRAWL_API_KEY env variable first.');
    console.error('  Get a free key at: https://www.firecrawl.dev/');
    console.error('  Then run: $env:FIRECRAWL_API_KEY="fc-yourkey" (PowerShell)');
    process.exit(1);
  }

  const targetSlug = process.argv[2];
  const targets = targetSlug
    ? COMPETITORS.filter((c) => c.slug === targetSlug)
    : COMPETITORS;

  if (targets.length === 0) {
    console.error(`No competitor found with slug: ${targetSlug}`);
    console.error('Available slugs:', COMPETITORS.map((c) => c.slug).join(', '));
    process.exit(1);
  }

  console.log(`Crawling ${targets.length} competitor(s)...\n`);

  const progress = { started: new Date().toISOString(), total: targets.length, done: [], current: null };
  writeProgress(progress);

  for (let i = 0; i < targets.length; i++) {
    await crawlSite(targets[i], progress, i + 1, targets.length);
    await sleep(3000);
  }

  progress.current = null;
  progress.finished = new Date().toISOString();
  writeProgress(progress);
  console.log('\nDone! Files saved to competitor-research/');
}

main().catch(console.error);
