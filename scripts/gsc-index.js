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
  'https://www.gayrealestatect.net/agent/arek',
  'https://www.gayrealestatect.net/agent/abby',
  'https://www.gayrealestatect.net/agent/travis',
  'https://www.gayrealestatect.net/agent/jake',
  'https://www.gayrealestatect.net/agent/carolyn',
];

const token = process.env.PLAYWRIGHT_MCP_EXTENSION_TOKEN;
if (!token) {
  console.error("Error: PLAYWRIGHT_MCP_EXTENSION_TOKEN environment variable not set.");
  process.exit(1);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  console.log('Connecting to browser via Playwright MCP extension...');
  
  let browser;
  try {
    // The MCP bridge extension typically uses a local proxy over ws://127.0.0.1:9222
    // with the token passed either in the query string or headers.
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
  // Wait for the main UI to render (the inspection search bar)
  await page.waitForSelector('input[aria-label*="Inspect any URL"]', { state: 'visible', timeout: 60000 });

  const results = { success: [], failed: [] };

  for (let i = 0; i < URLS.length; i++) {
    const url = URLS[i];
    console.log(`\n[${i + 1}/${URLS.length}] Processing: ${url}`);
    
    try {
      // 1. Type the URL into the inspection search bar and press Enter
      const searchInput = page.locator('input[aria-label*="Inspect any URL"]');
      await searchInput.click();
      
      // Select all text and delete it so we start fresh
      await searchInput.press('Control+A');
      await searchInput.press('Backspace');
      
      await searchInput.fill(url);
      await searchInput.press('Enter');
      
      console.log('  -> Requesting inspection, waiting for results to load...');

      // 2. Wait for results to load.
      // We look for the "Request indexing" button.
      const requestIndexingBtn = page.locator('div[role="button"]:has-text("Request indexing")');
      await requestIndexingBtn.waitFor({ state: 'visible', timeout: 90000 });
      
      console.log('  -> Results loaded. Clicking "REQUEST INDEXING"...');

      // 3. Click "REQUEST INDEXING"
      await requestIndexingBtn.click();

      // Wait for the indexing request dialog to process.
      console.log('  -> Waiting for Google to process indexing request (this may take a minute)...');
      
      const gotItBtn = page.locator('div[role="button"]:has-text("Got it")');
      await gotItBtn.waitFor({ state: 'visible', timeout: 120000 });
      
      console.log('  -> Indexing requested successfully. Dismissing dialog...');
      await gotItBtn.click();
      
      results.success.push(url);
      
      // Wait 5 seconds before next URL
      console.log('  -> Waiting 5 seconds before next URL...');
      await sleep(5000);

    } catch (err) {
      console.error(`  -> ❌ Failed to process URL: ${url}`);
      console.error(`     Error: ${err.message}`);
      results.failed.push({ url, error: err.message });
      
      // Attempt to recover by reloading the GSC page
      console.log('  -> Reloading GSC page to recover state for next URL...');
      await page.goto(GSC_PROPERTY_URL, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('input[aria-label*="Inspect any URL"]', { state: 'visible', timeout: 60000 });
    }
  }

  console.log('\n=============================================');
  console.log('                 SUMMARY');
  console.log('=============================================');
  console.log(`Total URLs processed: ${URLS.length}`);
  console.log(`✅ Success: ${results.success.length}`);
  console.log(`❌ Failed:  ${results.failed.length}`);
  
  if (results.failed.length > 0) {
    console.log('\nFailed URLs:');
    results.failed.forEach(f => console.log(` - ${f.url}`));
  }
  
  await page.close();
  await browser.disconnect();
  console.log('\nFinished and disconnected.');
}

run();
