#!/usr/bin/env node
/**
 * Post-build prerendering: renders every route from the sitemap in headless
 * Chromium and snapshots the fully-rendered HTML into dist/prerendered/, then
 * maps each route to its snapshot via explicit 200 rewrites in dist/_redirects.
 *
 * Why: the site is a client-rendered SPA. Googlebot executes JS, but Bing,
 * DuckDuckGo, and most AI crawlers do not — without prerendering they see an
 * empty <div id="root">. The seo-injector edge function still runs on top of
 * these snapshots (it strips the snapshot's helmet tags and injects canonical
 * meta), so per-page titles/descriptions/canonicals stay single-sourced.
 *
 * FAIL-SAFE BY DESIGN: this script never fails the build. If Chromium can't
 * launch or a page doesn't render, the affected routes simply keep the
 * current SPA fallback behavior (dist/_redirects is only amended with routes
 * that rendered successfully, and dist/index.html is never modified).
 */
const fs = require('fs');
const path = require('path');
const http = require('http');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const OUT_DIR = path.join(DIST, 'prerendered');
const PORT = 45173;
const CONCURRENCY = 4;
const MIN_TEXT_LENGTH = 200; // reject snapshots that only captured a spinner

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon',
};

/** Minimal static server over dist/ with SPA fallback to index.html. */
function startServer() {
  const server = http.createServer((req, res) => {
    try {
      const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let filePath = path.join(DIST, urlPath);
      if (!filePath.startsWith(DIST)) { res.writeHead(403); res.end(); return; }
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(DIST, 'index.html');
      }
      res.writeHead(200, { 'content-type': MIME[path.extname(filePath)] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } catch {
      res.writeHead(500); res.end();
    }
  });
  return new Promise((resolve) => server.listen(PORT, '127.0.0.1', () => resolve(server)));
}

function routesFromSitemap() {
  const xml = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname)
    .map((p) => (p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p));
}

function snapshotRelPath(route) {
  return route === '/' ? 'home.html' : `${route.replace(/^\//, '')}.html`;
}

/** Strip helmet-managed tags: the edge function re-injects canonical meta. */
function postProcess(html) {
  return html
    .replace(/<script[^>]*\bdata-rh="true"[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/<(?:meta|link|style)[^>]*\bdata-rh="true"[^>]*\/?>/g, '');
}

async function launchChromium() {
  let playwright;
  try {
    playwright = require(path.join(ROOT, 'node_modules', 'playwright'));
  } catch {
    console.warn('[prerender] playwright not installed — skipping prerender.');
    return null;
  }
  const attempts = [
    () => playwright.chromium.launch({ headless: true }),
  ];
  // Environments that pre-install Chromium outside the default cache
  for (const base of ['/opt/pw-browsers']) {
    if (fs.existsSync(base)) {
      for (const entry of fs.readdirSync(base)) {
        const candidates = [
          path.join(base, entry),
          path.join(base, entry, 'chrome-linux', 'chrome'),
          path.join(base, entry, 'chrome-linux', 'headless_shell'),
        ];
        for (const exe of candidates) {
          if (fs.existsSync(exe) && fs.statSync(exe).isFile()) {
            attempts.push(() => playwright.chromium.launch({ headless: true, executablePath: exe }));
          }
        }
      }
    }
  }
  // Last resort (CI): download the browser, then retry the default launch.
  attempts.push(() => {
    execSync('npx playwright install chromium', { stdio: 'inherit', cwd: ROOT, timeout: 300000 });
    return playwright.chromium.launch({ headless: true });
  });

  for (const attempt of attempts) {
    try {
      return await attempt();
    } catch (e) {
      console.warn(`[prerender] launch attempt failed: ${String(e.message || e).split('\n')[0]}`);
    }
  }
  return null;
}

(async () => {
  if (process.env.SKIP_PRERENDER) {
    console.log('[prerender] SKIP_PRERENDER set — skipping.');
    return;
  }
  let server;
  let browser;
  try {
    const routes = routesFromSitemap();
    console.log(`[prerender] ${routes.length} routes from sitemap.`);
    server = await startServer();
    browser = await launchChromium();
    if (!browser) {
      console.warn('[prerender] no Chromium available — site keeps SPA behavior.');
      return;
    }

    const context = await browser.newContext({
      viewport: { width: 1366, height: 900 },
      userAgent: 'Mozilla/5.0 (prerender) AppleWebKit/537.36 Chrome/120 Safari/537.36',
    });
    // Block external requests: deterministic snapshots, no analytics hits.
    await context.route('**/*', (r) => {
      const u = r.request().url();
      if (u.startsWith(`http://127.0.0.1:${PORT}`)) r.continue();
      else r.abort();
    });

    const ok = [];
    const failed = [];
    const queue = [...routes];
    async function worker() {
      const page = await context.newPage();
      while (queue.length) {
        const route = queue.shift();
        try {
          await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'networkidle', timeout: 45000 });
          await page.waitForSelector('#root > *', { timeout: 15000 });
          await page.waitForTimeout(700); // let entry animations & lazy chunks settle
          const textLen = await page.evaluate(() => (document.getElementById('root')?.innerText || '').length);
          if (textLen < MIN_TEXT_LENGTH) throw new Error(`only ${textLen} chars rendered`);
          const html = postProcess(await page.content());
          const rel = snapshotRelPath(route);
          const outPath = path.join(OUT_DIR, rel);
          fs.mkdirSync(path.dirname(outPath), { recursive: true });
          fs.writeFileSync(outPath, html);
          ok.push(route);
        } catch (e) {
          failed.push(route);
          console.warn(`[prerender] FAILED ${route}: ${String(e.message || e).split('\n')[0]}`);
        }
      }
      await page.close();
    }
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));

    if (ok.length) {
      // Map each prerendered route to its snapshot. Inserted immediately before
      // the SPA fallback so legacy 301s above keep winning. "200!" on "/" is
      // required because a real file (index.html) exists at that path.
      const redirectsPath = path.join(DIST, '_redirects');
      const original = fs.readFileSync(redirectsPath, 'utf8');
      const rewrites = ok
        .sort()
        .map((route) =>
          route === '/'
            ? `/  /prerendered/home.html  200!`
            : `${route}  /prerendered/${snapshotRelPath(route)}  200`
        )
        .join('\n');
      const marker = '# SPA routing (must be last)';
      const block = `# Prerendered snapshots (generated by scripts/prerender.cjs)\n${rewrites}\n${marker}`;
      const updated = original.includes(marker)
        ? original.replace(marker, block)
        : `${original.trimEnd()}\n${block}\n`;
      fs.writeFileSync(redirectsPath, updated);
    }
    console.log(`[prerender] done: ${ok.length} ok, ${failed.length} failed (failed routes keep SPA fallback).`);
  } catch (e) {
    console.warn(`[prerender] aborted: ${String(e.message || e).split('\n')[0]} — site keeps SPA behavior.`);
  } finally {
    try { if (browser) await browser.close(); } catch { /* noop */ }
    try { if (server) server.close(); } catch { /* noop */ }
    process.exit(0); // NEVER fail the build over prerendering
  }
})();
