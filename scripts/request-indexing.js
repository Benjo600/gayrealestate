import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

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

const CREDENTIALS_PATH = join(__dirname, '..', 'google-credentials.json');

async function run() {
  let credentials;
  try {
    credentials = JSON.parse(readFileSync(CREDENTIALS_PATH, 'utf8'));
  } catch {
    console.error(`\nCould not read credentials file at: ${CREDENTIALS_PATH}`);
    console.error('Download your service account JSON from Google Cloud Console and save it there.\n');
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const indexing = google.indexing({ version: 'v3', auth });

  const results = { success: [], failed: [] };

  console.log(`\nSubmitting ${URLS.length} URLs to Google Indexing API...\n`);

  for (let i = 0; i < URLS.length; i++) {
    const url = URLS[i];
    process.stdout.write(`[${i + 1}/${URLS.length}] ${url} ... `);

    try {
      await indexing.urlNotifications.publish({
        requestBody: { url, type: 'URL_UPDATED' },
      });
      console.log('OK');
      results.success.push(url);
    } catch (err) {
      const msg = err?.errors?.[0]?.message || err.message;
      console.log(`FAILED: ${msg}`);
      results.failed.push({ url, error: msg });
    }

    // Stay under the 200 req/day quota; small delay to avoid bursting
    if (i < URLS.length - 1) await new Promise(r => setTimeout(r, 200));
  }

  console.log('\n=============================================');
  console.log(`  Success: ${results.success.length} / ${URLS.length}`);
  console.log(`  Failed:  ${results.failed.length}`);
  if (results.failed.length > 0) {
    console.log('\n  Failed URLs:');
    results.failed.forEach(f => console.log(`    - ${f.url}\n      ${f.error}`));
  }
  console.log('=============================================\n');
}

run();
