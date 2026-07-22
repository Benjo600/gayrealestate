const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const docxPath = path.join(__dirname, '..', 'Connecticut Pride Month 2026 Guide.docx');
const outPath = path.join(__dirname, '..', 'scripts', 'pride-guide-content.html');

function stripAnchors(html) {
  return html.replace(/<a id="[^"]*"><\/a>/g, '');
}

function stripH1(html) {
  return html.replace(/<h1>.*?<\/h1>/i, '').trim();
}

function styleWebsiteLinks(html) {
  return html.replace(
    /<p>Website:\s*(https?:\/\/[^\s<]+)<\/p>/gi,
    (_, url) => {
      const href = url.trim();
      let label;
      try {
        label = new URL(href).hostname.replace(/^www\./, '');
      } catch {
        label = href;
      }
      return `<p>Website: <a href="${href}" target="_blank" rel="noopener noreferrer" class="text-brand-600 hover:underline">${label}</a></p>`;
    }
  );
}

function addLeadParagraph(html) {
  return html.replace(/^(<p)(>)/, '$1 class="lead-paragraph"$2');
}

function addClosingSection(html) {
  const closing = `
      <h2>New to Connecticut? Connect With the Community</h2>
      <p>Many people discover Connecticut through Pride — and stay because the community feels like home. If you're exploring a move after festival season, our guide to the <a href="/blog/best-places-to-live-in-connecticut-lgbtq" class="text-brand-600 hover:underline font-bold">best places to live in Connecticut for LGBTQ+ people</a> is the place to start. <a href="/blog/why-west-hartford-is-lgbtq-friendly-connecticut" class="text-brand-600 hover:underline font-bold">West Hartford</a> hosts one of the state's fastest-growing Pride celebrations, and our <a href="/blog/moving-to-connecticut-as-a-gay-couple" class="text-brand-600 hover:underline font-bold">guide to moving to Connecticut as a gay couple</a> covers the practical steps when you're ready to make it official.</p>
      <p>Want introductions to neighborhoods and community networks beyond the festival calendar? That's part of what we do when you work with our team.</p>`;
  return html.trimEnd() + closing;
}

async function run() {
  const result = await mammoth.convertToHtml({ path: docxPath });
  let html = result.value;
  html = stripAnchors(html);
  html = stripH1(html);
  html = styleWebsiteLinks(html);
  html = addLeadParagraph(html);
  html = addClosingSection(html);
  fs.writeFileSync(outPath, html, 'utf8');

  const words = html.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length;
  const readTime = `${Math.max(3, Math.ceil(words / 200))} MIN READ`;
  console.log(`Words: ${words}, readTime: ${readTime}`);
  console.log(`Written: ${outPath}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
