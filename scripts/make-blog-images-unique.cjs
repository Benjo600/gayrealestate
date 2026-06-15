const fs = require('fs');

// Clean final unique mapping using 25 distinct existing hero files
const uniqueImages = {
  "best-places-to-live-in-connecticut-lgbtq": "/ct-lgbtq-places-hero.jpg",
  "why-west-hartford-is-lgbtq-friendly-connecticut": "/west-hartford-lgbtq-hero.jpg",
  "moving-to-connecticut-as-a-gay-couple": "/gay-couple-moving-ct-hero.jpg",
  "most-lgbtq-inclusive-school-districts-connecticut": "/lgbtq-inclusive-schools-hero.jpg",
  "1-million-nyc-vs-connecticut-what-do-you-get": "/nyc-ct-value-comparison-hero.jpg",
  "lgbtq-events-connecticut-march-2026": "/ct-pride-events-hero.jpg",
  "litchfield-county-second-homes-lgbtq-buyers": "/lgbtq-first-time-buyer-hero.jpg",
  "legal-protections-lgbtq-real-estate-connecticut": "/generational-wealth-legal-hero.jpg",
  "trans-moving-connecticut-guide": "/trans-housing-rights-hero.jpg",
  "lgbtq-friendly-small-towns-connecticut": "/lgbtq-small-towns-hero.jpg",
  "chester-ct-lgbtq-family-guide": "/ct-family-home-hero.jpg",
  "best-lgbtq-neighborhoods-new-haven-ct": "/new-haven-neighborhoods-hero.jpg",
  "gay-realtor-connecticut-guide": "/gay-realtor-ct-hero.jpg",
  "best-gay-friendly-places-to-retire-in-connecticut": "/best-retire-small-towns-hero.jpg",
  "cheapest-gay-friendly-cities-in-connecticut": "/nyc-vs-ct-value-hero.jpg",
  "connecticut-is-1-in-the-us-for-lgbtq-real-estate-searches-here-s-why": "/generational-wealth-ct-hero.jpg",
  "do-you-need-an-lgbtq-real-estate-attorney": "/lgbtq-mortgage-lenders-hero.jpg",
  "gay-areas-in-connecticut-neighborhood-by-neighborhood-guide": "/ct-neighborhoods-guide-hero.jpg",
  "lgbtq-first-time-home-buyer-guide-connecticut-edition": "/lgbtq-first-time-buyer-guide-hero.jpg",
  "lgbtq-housing-discrimination-statistics-2026": "/inclusive-ct-neighborhoods-hero.jpg",
  "same-sex-couples-buying-a-home-7-things-to-know-before-you-sign": "/same-sex-couples-buying-hero.jpg",
  "transgender-housing-rights-what-connecticut-law-says": "/trans-inclusive-ct-hero.jpg",
  "best-lgbtq-mortgage-lenders-connecticut": "/lgbtq-wealth-planning-hero.jpg",
  "best-places-to-live-for-gay-couples-new-england": "/best-gay-couples-new-england-hero.jpg",
  "connecticut-pride-month-2026-guide": "/connecticut-pride-month-hero.jpg"
};

function forceUnique(filePath) {
  let c = fs.readFileSync(filePath, 'utf8');
  let count = 0;
  for (const [slug, newImg] of Object.entries(uniqueImages)) {
    // Find position of this slug
    const slugPos = c.indexOf(`slug: "${slug}"`);
    if (slugPos === -1) continue;

    // From this position, find the first image: "..." that appears
    const rest = c.substring(slugPos);
    const match = rest.match(/image:\s*"([^"]+)"/);
    if (!match) continue;

    const oldImg = match[1];
    if (oldImg === newImg) continue;

    // Replace only the first occurrence after the slug (safe because we slice conceptually)
    const fullOld = `image: "${oldImg}"`;
    // Do a single replace starting search after slugPos to be extra safe
    const before = c.substring(0, slugPos);
    const after = c.substring(slugPos).replace(fullOld, `image: "${newImg}"`);
    c = before + after;
    count++;
  }
  fs.writeFileSync(filePath, c);
  return count;
}

const c1 = forceUnique('data/blogs.ts');
const c2 = forceUnique('gayrealestate/data/blogs.ts');

console.log('Root data changes:', c1);
console.log('gayrealestate data changes:', c2);
console.log('All blogs should now have unique images.');
