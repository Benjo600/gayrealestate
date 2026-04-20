import fs from 'fs';
import { google } from 'googleapis';
import xml2js from 'xml2js';

// Configuration - using the exact path you provided
const KEY_FILE = './ai-research/freelance-493913-47e511ad45e1.json';
const SITEMAP_FILE = './public/sitemap.xml';

async function indexSite() {
  console.log('\n🚀 GAYREALESTATECT.NET | Google Indexing Script');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (!fs.existsSync(KEY_FILE)) {
    console.error(`❌ Error: JSON key file not found at ${KEY_FILE}`);
    return;
  }

  // 1. Authenticate
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const indexing = google.indexing({ version: 'v3', auth });

  // 2. Parse Sitemap
  console.log('📡 Parsing sitemap.xml...');
  const sitemapXml = fs.readFileSync(SITEMAP_FILE, 'utf8');
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(sitemapXml);

  const urls = result.urlset.url.map(entry => entry.loc[0]);
  console.log(`🔗 Found ${urls.length} URLs to index.`);

  // 3. Submit URLs
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    process.stdout.write(`[${String(i + 1).padStart(2, '0')}/${urls.length}] ${url.padEnd(60)} `);
    
    try {
      await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      console.log('✅ OK');
    } catch (error) {
      console.log('❌ FAIL');
      console.error(`   └─ Error: ${error.message}`);
      
      if (error.message.includes('quota') || error.code === 429) {
        console.error('\n⚠️ Quota exceeded! Google limited to 200 URLs/day per project.');
        break;
      }
      
      if (error.message.includes('permission') || error.code === 403) {
        console.error('\n⚠️ Permission denied! Did you add the service account email as an "Owner" in Google Search Console?');
        break;
      }
    }
    
    // Slight throttle
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✨ Indexing requests sent. Google usually crawls within 24 hours.');
}

indexSite().catch(err => {
  console.error('\n💥 Fatal error:', err);
});
