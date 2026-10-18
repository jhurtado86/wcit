#!/usr/bin/env node
// Build brand_assets/og-image.jpg (1200×630) — the social share image used by og:image /
// twitter:image on every page and by the schema `image` fields. Composed from the brand itself:
// the dark wordmark at its NATIVE 440×155 (the logo is never upscaled), the brand gradient,
// and "McAllen · Mission" in the display face. No AI, no stock.
//
//   node scripts/build-og-image.mjs
//
// Rendered with the site's own tokens: brand.css + site.css are inlined from disk and the
// Google Fonts <link> is read from index.html, so a token or font change re-renders correctly.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'brand_assets', 'og-image.jpg');
const W = 1200, H = 630;
const MAX_BYTES = 250 * 1024;

const brandCss = fs.readFileSync(path.join(ROOT, 'brand.css'), 'utf8');
const siteCss = fs.readFileSync(path.join(ROOT, 'site.css'), 'utf8');
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const fontLinks = (indexHtml.match(/<link[^>]+fonts\.g(oogleapis|static)\.com[^>]*>/g) || []).join('\n');
if (!fontLinks) throw new Error('No Google Fonts <link> found in index.html');

const wordmark = fs.readFileSync(path.join(ROOT, 'brand_assets', 'wordmark-on-dark.png'));
const wmMeta = await sharp(wordmark).metadata();
const wordmarkUri = `data:image/png;base64,${wordmark.toString('base64')}`;

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
${fontLinks}
<style>${brandCss}</style>
<style>${siteCss}</style>
<style>
  html, body { margin: 0; padding: 0; background: var(--color-dark); }
  .og {
    position: relative; width: ${W}px; height: ${H}px; overflow: hidden; isolation: isolate;
    background:
      radial-gradient(ellipse 62% 70% at 88% 8%, rgba(var(--color-wave-blue-rgb), 0.42), transparent 60%),
      radial-gradient(ellipse 50% 55% at 4% 100%, rgba(var(--color-accent-bright-rgb), 0.22), transparent 60%),
      var(--color-dark);
    color: var(--color-bg);
  }
  /* The ribbon run across the top edge — the same 3px rule the link bar and panels carry, scaled for 1200px. */
  .og::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 8px; background: var(--gradient-brand-x); }
  .og__inner { position: absolute; left: 96px; top: 0; bottom: 0; display: flex; flex-direction: column; justify-content: center; gap: 0; }
  .og__logo { display: block; width: ${wmMeta.width}px; height: ${wmMeta.height}px; }  /* native pixels — never upscaled */
  .og__dash { width: 88px; height: 4px; border-radius: 2px; margin: 38px 0 26px; background: var(--gradient-brand-x); }
  .og__cities {
    margin: 0; font-family: var(--font-display); font-weight: 600; font-size: 52px; line-height: 1;
    letter-spacing: 0.01em; color: var(--color-accent-bright);
  }
  .og__cities .dot { color: var(--color-muted-light); padding: 0 0.28em; font-weight: 500; }
</style></head>
<body>
  <div class="og">
    <div class="og__inner">
      <img class="og__logo" src="${wordmarkUri}" alt="" />
      <div class="og__dash"></div>
      <p class="og__cities">McAllen<span class="dot">·</span>Mission</p>
    </div>
  </div>
</body></html>`;

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(async () => { await document.fonts.ready; });
  const loaded = await page.evaluate(() => document.fonts.check('600 52px "Sofia Sans Semi Condensed"'));
  if (!loaded) throw new Error('Display font did not load — check the Google Fonts link / network');
  const png = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: W, height: H } });

  // Progressive JPG, EXIF-free, under the content-photo budget; step quality down only if needed.
  let quality = 88, jpg;
  do {
    jpg = await sharp(png).jpeg({ quality, progressive: true, mozjpeg: true, chromaSubsampling: '4:4:4' }).toBuffer();
    if (jpg.length <= MAX_BYTES) break;
    quality -= 4;
  } while (quality >= 60);
  fs.writeFileSync(OUT, jpg);
  const m = await sharp(jpg).metadata();
  console.log(`${path.relative(ROOT, OUT)} · ${m.width}×${m.height} · ${(jpg.length / 1024).toFixed(0)} KB · quality ${quality}`);
} finally {
  await browser.close();
}
