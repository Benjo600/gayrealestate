import fs from 'fs';
import xml2js from 'xml2js';

// Configuration
const HOST = 'www.gayrealestatect.net';
const KEY = 'a3d7b2c9e1f84a5b9c2d1e0f7a6b5c4d';
const SITEMAP_FILE = './public/sitemap.xml';
const INDEXNOW_URL = 'https://api.indexnow.org/indexnow';

async function indexBing() {
  console.log('\n🔵 GAYREALESTATECT.NET | Bing IndexNow Script');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (!fs.existsSync(SITEMAP_FILE)) {
    console.error(`❌ Error: Sitemap not found at ${SITEMAP_FILE}`);
    return;
  }

  // 1. Parse Sitemap
  console.log('📡 Parsing sitemap.xml...');
  const sitemapXml = fs.readFileSync(SITEMAP_FILE, 'utf8');
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(sitemapXml);

  const urls = result.urlset.url.map(entry => entry.loc[0]);
  console.log(`🔗 Found ${urls.length} URLs to submit to Bing/IndexNow.`);

  // 2. Submit URLs via POST
  try {
    console.log('🚀 Sending request to IndexNow...');
    const response = await fetch(INDEXNOW_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `https://${HOST}/${KEY}.txt`,
        urlList: urls
      })
    });

    if (response.ok) {
      console.log('✅ Success! Bing and other IndexNow engines have received the URLs.');
    } else {
      const errorText = await response.text();
      console.log(`⚠️ Received status ${response.status}: ${response.statusText}`);
      console.error(`   └─ Details: ${errorText}`);
    }
  } catch (error) {
    console.log('❌ FAIL');
    console.error(`   └─ Error: ${error.message}`);
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✨ Bing indexing requested. Check results in Bing Webmaster Tools.');
}

indexBing().catch(err => {
  console.error('\n💥 Fatal error:', err);
});
