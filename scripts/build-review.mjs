#!/usr/bin/env node
// Build the local contact sheet at /_review/ from the raw candidates in brand_assets/_generated-raw/.
// Each candidate is previewed at its slot's EXACT final size (cover-crop, centred, never upscaled) so
// what you pick is what ships. Nothing here is committed or deployed (_review/ is gitignored and in
// .vercelignore; the page itself is noindex).
//
//   node scripts/build-review.mjs        then open  http://localhost:3200/_review/

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RAW_DIR = path.join(ROOT, 'brand_assets', '_generated-raw');
const OUT_DIR = path.join(ROOT, '_review');
const PREVIEW_DIR = path.join(OUT_DIR, 'previews');
const spec = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'image-prompts.json'), 'utf8'));

fs.mkdirSync(PREVIEW_DIR, { recursive: true });
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const sections = [];
let total = 0;
for (const slot of spec.slots) {
  const raws = fs.existsSync(RAW_DIR)
    ? fs.readdirSync(RAW_DIR).filter((f) => f.startsWith(`${slot.slot}-v`) && f.endsWith('.png')).sort()
    : [];
  const cards = [];
  for (const file of raws) {
    const v = file.match(/-v(\d+)\.png$/)[1];
    const rawPath = path.join(RAW_DIR, file);
    const meta = await sharp(rawPath).metadata();
    const sidecarPath = rawPath.replace(/\.png$/, '.json');
    const sidecar = fs.existsSync(sidecarPath) ? JSON.parse(fs.readFileSync(sidecarPath, 'utf8')) : {};
    const upscaled = meta.width < slot.width || meta.height < slot.height;
    const previewName = `${slot.slot}-v${v}.jpg`;
    await sharp(rawPath)
      .resize(slot.width, slot.height, { fit: 'cover', position: 'centre', withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile(path.join(PREVIEW_DIR, previewName));
    total++;
    cards.push(`
        <figure class="card" data-slot="${esc(slot.slot)}" data-variant="v${v}">
          <a class="card__img" href="previews/${esc(previewName)}" target="_blank" rel="noopener" title="Open the ${slot.width}×${slot.height} preview">
            <img src="previews/${esc(previewName)}" width="${slot.width}" height="${slot.height}" loading="lazy" alt="" />
          </a>
          <figcaption class="card__cap">
            <button type="button" class="pick" aria-pressed="false">Pick <b>v${v}</b></button>
            <span class="meta">raw ${meta.width}×${meta.height} · ${(fs.statSync(rawPath).size / 1024 / 1024).toFixed(1)} MB${sidecar.model ? ` · ${esc(sidecar.model)} ${esc(sidecar.imageSize || '')}` : ''}${upscaled ? ' · <strong class="warn">smaller than the slot — would upscale</strong>' : ''}
              · <a href="/brand_assets/_generated-raw/${esc(file)}" target="_blank" rel="noopener">raw PNG</a></span>
          </figcaption>
        </figure>`);
  }
  sections.push(`
    <section class="slot" id="${esc(slot.slot)}">
      <header class="slot__head">
        <h2 class="slot__title">${esc(slot.slot)}</h2>
        <p class="slot__meta"><a href="${esc(slot.page)}" target="_blank" rel="noopener">${esc(slot.page)}</a> · ${esc(slot.section)} · ${slot.width}×${slot.height} (${esc(slot.aspectRatio)})</p>
        <details class="slot__prompt"><summary>Prompt</summary><p>${esc(slot.prompt)}</p><p class="alt"><b>Draft alt:</b> ${esc(slot.alt)}</p></details>
      </header>
      ${cards.length ? `<div class="grid">${cards.join('')}</div>` : '<p class="empty">No candidates generated yet for this slot.</p>'}
    </section>`);
}

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Image review — generated candidates</title>
  <link rel="stylesheet" href="/brand.css" />
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--color-bg-2); color: var(--color-ink); font: 17px/1.5 system-ui, -apple-system, Segoe UI, sans-serif; }
    a { color: var(--color-accent-deep); }
    .bar { position: sticky; top: 0; z-index: 5; background: var(--color-dark); color: var(--color-bg); padding: 14px 24px; display: flex; gap: 16px; align-items: center; flex-wrap: wrap; border-bottom: 3px solid transparent; border-image: var(--gradient-brand-x) 1; }
    .bar h1 { font-size: 18px; margin: 0; font-weight: 700; }
    .bar .picks { flex: 1 1 320px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 14px; color: var(--color-accent-bright); min-height: 1.5em; white-space: pre-wrap; }
    .bar button { background: var(--color-accent); color: #fff; border: 0; border-radius: 8px; padding: 10px 16px; font: inherit; font-weight: 700; cursor: pointer; }
    .bar button:hover { background: var(--color-accent-deep); }
    main { max-width: 1280px; margin: 0 auto; padding: 24px; }
    .intro { color: var(--color-muted); margin: 0 0 24px; }
    .slot { background: var(--color-bg); border: 1px solid var(--color-line); border-radius: 14px; padding: 22px 24px 24px; margin: 0 0 28px; }
    .slot__title { margin: 0 0 4px; font-size: 22px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
    .slot__meta { margin: 0 0 10px; color: var(--color-muted); font-size: 15px; }
    .slot__prompt { font-size: 15px; color: var(--color-muted); margin: 0 0 16px; }
    .slot__prompt summary { cursor: pointer; color: var(--color-accent-deep); font-weight: 600; }
    .slot__prompt p { margin: 8px 0 0; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); gap: 20px; }
    .card { margin: 0; border: 3px solid transparent; border-radius: 12px; padding: 6px; transition: border-color 0.15s; }
    .card.is-picked { border-color: var(--color-accent); background: rgba(var(--color-accent-rgb), 0.06); }
    .card__img { display: block; border-radius: 8px; overflow: hidden; background: var(--color-line); }
    .card__img img { display: block; width: 100%; height: auto; }
    .card__cap { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; padding: 10px 4px 2px; font-size: 14px; color: var(--color-muted); }
    .pick { background: var(--color-bg); color: var(--color-accent-deep); border: 2px solid var(--color-accent); border-radius: 8px; padding: 8px 14px; font: inherit; font-size: 15px; cursor: pointer; }
    .pick[aria-pressed="true"] { background: var(--color-accent); color: #fff; }
    .warn { color: #b42318; }
    .empty { color: var(--color-muted); font-style: italic; }
  </style>
</head>
<body>
  <div class="bar">
    <h1>Image review · ${total} candidate${total === 1 ? '' : 's'}</h1>
    <div class="picks" id="picks" aria-live="polite">(no picks yet — click “Pick” under a variant)</div>
    <button type="button" id="copy">Copy picks</button>
  </div>
  <main>
    <p class="intro">Each candidate is shown at its slot’s exact final crop (${spec.slots[0].width}×${spec.slots[0].height}, centre cover, no upscaling). Click an image for the full-size preview, or “raw PNG” for the untouched 4K output. One pick per slot; “Copy picks” puts a line per slot on the clipboard to paste back into the chat.</p>
    ${sections.join('\n')}
  </main>
  <script>
    const KEY = 'wcit-review-picks';
    let picks = {};
    try { picks = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch {}
    const render = () => {
      document.querySelectorAll('.card').forEach((c) => {
        const on = picks[c.dataset.slot] === c.dataset.variant;
        c.classList.toggle('is-picked', on);
        c.querySelector('.pick').setAttribute('aria-pressed', String(on));
      });
      const lines = Object.entries(picks).map(([s, v]) => s + ': ' + v);
      document.getElementById('picks').textContent = lines.length ? lines.join('\\n') : '(no picks yet — click “Pick” under a variant)';
    };
    document.querySelectorAll('.pick').forEach((btn) => btn.addEventListener('click', () => {
      const card = btn.closest('.card');
      picks[card.dataset.slot] = picks[card.dataset.slot] === card.dataset.variant ? undefined : card.dataset.variant;
      if (!picks[card.dataset.slot]) delete picks[card.dataset.slot];
      try { localStorage.setItem(KEY, JSON.stringify(picks)); } catch {}
      render();
    }));
    document.getElementById('copy').addEventListener('click', async () => {
      const text = Object.entries(picks).map(([s, v]) => s + ': ' + v).join('\\n');
      try { await navigator.clipboard.writeText(text); document.getElementById('copy').textContent = 'Copied'; setTimeout(() => (document.getElementById('copy').textContent = 'Copy picks'), 1200); } catch {}
    });
    render();
  </script>
</body>
</html>
`;
fs.writeFileSync(path.join(OUT_DIR, 'index.html'), html);
console.log(`_review/index.html · ${total} candidate(s) previewed at slot size → http://localhost:3200/_review/`);
