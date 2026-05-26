import { chromium } from 'playwright';
import 'dotenv/config';

const URLS = [
  'https://www.gayrealestatect.net/',
  'https://www.gayrealestatect.net/buyers-guide',
  'https://www.gayrealestatect.net/sellers-guide',
  'https://www.gayrealestatect.net/first-time-buyers',
  'https://www.gayrealestatect.net/relocation',
  'https://www.gayrealestatect.net/home-valuation',
  'https://www.gayrealestatect.net/mortgage-calculator',
  'https://www.gayrealestatect.net/reviews',
  'https://www.gayrealestatect.net/community',
  'https://www.gayrealestatect.net/marketing-your-home',
  'https://www.gayrealestatect.net/about',
  'https://www.gayrealestatect.net/blog',
  'https://www.gayrealestatect.net/blog/best-places-to-live-in-connecticut-lgbtq',
  'https://www.gayrealestatect.net/blog/why-west-hartford-is-lgbtq-friendly-connecticut',
  'https://www.gayrealestatect.net/blog/moving-to-connecticut-as-a-gay-couple',
  'https://www.gayrealestatect.net/blog/most-lgbtq-inclusive-school-districts-connecticut',
  'https://www.gayrealestatect.net/blog/1-million-nyc-vs-connecticut-what-do-you-get',
  'https://www.gayrealestatect.net/blog/lgbtq-events-connecticut-march-2026',
  'https://www.gayrealestatect.net/blog/litchfield-county-second-homes-lgbtq-buyers',
  'https://www.gayrealestatect.net/blog/litchfield-county-towns-for-weekenders',
  'https://www.gayrealestatect.net/blog/legal-protections-lgbtq-real-estate-connecticut',
  'https://www.gayrealestatect.net/blog/trans-moving-connecticut-guide',
  'https://www.gayrealestatect.net/blog/lgbtq-friendly-small-towns-connecticut',
  'https://www.gayrealestatect.net/blog/wooster-square-new-haven-lgbtq-neighborhood',
  'https://www.gayrealestatect.net/blog/chester-ct-lgbtq-family-guide',
  'https://www.gayrealestatect.net/blog/best-lgbtq-neighborhoods-new-haven-ct',
  'https://www.gayrealestatect.net/blog/gay-realtor-connecticut-guide',
  'https://www.gayrealestatect.net/blog/best-gay-friendly-places-to-retire-in-connecticut',
  'https://www.gayrealestatect.net/blog/cheapest-gay-friendly-cities-in-connecticut',
  'https://www.gayrealestatect.net/blog/connecticut-is-1-in-the-us-for-lgbtq-real-estate-searches-here-s-why',
  'https://www.gayrealestatect.net/blog/do-you-need-an-lgbtq-real-estate-attorney',
  'https://www.gayrealestatect.net/blog/gay-areas-in-connecticut-neighborhood-by-neighborhood-guide',
  'https://www.gayrealestatect.net/blog/gay-friendly-towns-in-connecticut-2026-ranked-guide',
  'https://www.gayrealestatect.net/blog/how-to-choose-a-gay-friendly-realtor-2026-guide',
  'https://www.gayrealestatect.net/blog/lgbtq-first-time-home-buyer-guide-connecticut-edition',
  'https://www.gayrealestatect.net/blog/lgbtq-housing-discrimination-statistics-2026',
  'https://www.gayrealestatect.net/blog/same-sex-couples-buying-a-home-7-things-to-know-before-you-sign',
  'https://www.gayrealestatect.net/blog/transgender-housing-rights-what-connecticut-law-says',
  'https://www.gayrealestatect.net/blog/best-lgbtq-mortgage-lenders-connecticut',
  'https://www.gayrealestatect.net/blog/best-places-to-live-for-gay-couples-new-england',
  'https://www.gayrealestatect.net/blog/lgbtq-down-payment-assistance-programs-connecticut',
  'https://www.gayrealestatect.net/blog/what-is-the-lgbtq-real-estate-alliance',
  'https://www.gayrealestatect.net/agent/arek',
  'https://www.gayrealestatect.net/agent/abby',
  'https://www.gayrealestatect.net/agent/travis',
  'https://www.gayrealestatect.net/agent/jake',
  'https://www.gayrealestatect.net/agent/carolyn',
];

// Resume from this index (0-based). Set to 0 to start from the beginning.
// After 18 URLs were indexed, set to 18 to skip them and process the remaining 17.
const START_INDEX = parseInt(process.env.START_INDEX || '18', 10);

const token = process.env.PLAYWRIGHT_MCP_EXTENSION_TOKEN;
if (!token) {
  console.error("Error: PLAYWRIGHT_MCP_EXTENSION_TOKEN environment variable not set.");
  process.exit(1);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  const urlsToProcess = URLS.slice(START_INDEX);
  console.log(`Resuming from URL #${START_INDEX + 1} — ${urlsToProcess.length} URLs remaining.`);
  console.log('Connecting to browser via Playwright MCP extension...');

  let browser;
  try {
    browser = await chromium.connectOverCDP(`ws://127.0.0.1:9222/?token=${token}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  } catch (err) {
    console.error("Failed to connect to browser. Make sure the Playwright MCP extension is running.");
    console.error(err);
    process.exit(1);
  }

  // Get the default context
  const contexts = browser.contexts();
  const context = contexts.length > 0 ? contexts[0] : await browser.newContext();
  const page = await context.newPage();

  console.log('Successfully connected. Navigating to Google Search Console...');

  const GSC_PROPERTY_URL = 'https://search.google.com/search-console?resource_id=https%3A%2F%2Fwww.gayrealestatect.net%2F';
  await page.goto(GSC_PROPERTY_URL, { waitUntil: 'domcontentloaded' });

  console.log('Waiting for Search Console to load...');
  await page.waitForSelector('input[aria-label*="Inspect any URL"]', { state: 'visible', timeout: 60000 });

  const results = { success: [], failed: [], skipped: [] };
  let quotaHit = false;

  for (let i = 0; i < urlsToProcess.length; i++) {
    const url = urlsToProcess[i];
    const globalIndex = START_INDEX + i + 1;
    console.log(`\n[${globalIndex}/${URLS.length}] Processing: ${url}`);

    try {
      // 1. Type the URL into the inspection search bar and press Enter
      const searchInput = page.locator('input[aria-label*="Inspect any URL"]');
      await searchInput.click();
      await searchInput.press('Control+A');
      await searchInput.press('Backspace');
      await searchInput.fill(url);
      await searchInput.press('Enter');

      console.log('  -> Requesting inspection, waiting for results to load...');

      // 2. Wait for "Request indexing" button (up to 90s)
      const requestIndexingBtn = page.locator('div[role="button"]:has-text("Request indexing")');
      try {
        await requestIndexingBtn.waitFor({ state: 'visible', timeout: 90000 });
      } catch {
        // Button not found — URL may not be crawlable or already queued
        console.log('  -> ⚠️ "Request indexing" button not found. URL may not be eligible or already queued. Skipping.');
        results.skipped.push(url);
        await page.goto(GSC_PROPERTY_URL, { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('input[aria-label*="Inspect any URL"]', { state: 'visible', timeout: 60000 });
        continue;
      }

      console.log('  -> Results loaded. Clicking "REQUEST INDEXING"...');
      await requestIndexingBtn.click();

      console.log('  -> Waiting for Google to process the request...');

      // 3. Wait for either success ("Got it") or quota/rate-limit dialog
      const gotItBtn = page.locator('div[role="button"]:has-text("Got it")');
      const quotaLocator = page.locator('text=/quota|too many|exceeded|limit/i');

      const outcome = await Promise.race([
        gotItBtn.waitFor({ state: 'visible', timeout: 120000 }).then(() => 'success'),
        quotaLocator.waitFor({ state: 'visible', timeout: 120000 }).then(() => 'quota'),
      ]).catch(() => 'timeout');

      if (outcome === 'success') {
        console.log('  -> ✅ Indexing requested. Dismissing dialog...');
        await gotItBtn.click();
        results.success.push(url);
      } else if (outcome === 'quota') {
        console.log(`\n⚠️  Quota/rate-limit hit at URL #${globalIndex}. Stopping.`);
        console.log(`    Re-run with START_INDEX=${globalIndex - 1} tomorrow to resume.`);
        quotaHit = true;
        results.failed.push({ url, error: 'quota exceeded' });
        break;
      } else {
        console.log('  -> ⏱ Timed out waiting for dialog. Skipping and recovering...');
        results.failed.push({ url, error: 'timeout waiting for dialog' });
        await page.goto(GSC_PROPERTY_URL, { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('input[aria-label*="Inspect any URL"]', { state: 'visible', timeout: 60000 });
        continue;
      }

      // Wait 8 seconds between requests to stay under GSC rate limits
      console.log('  -> Waiting 8 seconds before next URL...');
      await sleep(8000);

    } catch (err) {
      console.error(`  -> ❌ Failed to process URL: ${url}`);
      console.error(`     Error: ${err.message}`);
      results.failed.push({ url, error: err.message });

      await page.goto(GSC_PROPERTY_URL, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('input[aria-label*="Inspect any URL"]', { state: 'visible', timeout: 60000 });
    }
  }

  const nextIndex = START_INDEX + results.success.length + results.failed.length;

  console.log('\n=============================================');
  console.log('                 SUMMARY');
  console.log('=============================================');
  console.log(`Started at index:     ${START_INDEX}`);
  console.log(`✅ Success:           ${results.success.length}`);
  console.log(`⏭  Skipped:           ${results.skipped.length}`);
  console.log(`❌ Failed:            ${results.failed.length}`);
  console.log(`Remaining in list:    ${URLS.length - nextIndex}`);

  if (results.failed.length > 0) {
    console.log('\nFailed URLs:');
    results.failed.forEach(f => console.log(` - ${f.url} (${f.error})`));
  }

  if (quotaHit || URLS.length - nextIndex > 0) {
    console.log(`\n▶  To resume tomorrow, run:`);
    console.log(`   START_INDEX=${nextIndex} node scripts/gsc-index.js`);
  } else {
    console.log('\n🎉 All URLs processed!');
  }

  await page.close();
  await browser.disconnect();
  console.log('\nFinished and disconnected.');
}

run();
