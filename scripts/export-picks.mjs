#!/usr/bin/env node
// Export the PICKED candidates from brand_assets/_generated-raw/ as the slot-named web files the
// pages reference: cover-cropped (centred) to the slot's exact dimensions, never upscaled,
// metadata stripped, progressive JPG under the content-photo budget.
//
//   node scripts/export-picks.mjs service-compression-therapy=v2 service-specialty-wound-dressings=v2
//
// Re-running overwrites the export from the raw file (never resaves an export). Wiring the file
// into the page and writing its alt text is a separate, reviewed step.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RAW_DIR = path.join(ROOT, 'brand_assets', '_generated-raw');
const OUT_DIR = path.join(ROOT, 'brand_assets');
const MAX_BYTES = 250 * 1024;
const spec = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'image-prompts.json'), 'utf8'));

const picks = process.argv.slice(2).map((a) => {
  const m = a.match(/^([a-z0-9-]+)=v(\d+)$/i);
  if (!m) { console.error(`error: expected <slot>=vN, got "${a}"`); process.exit(1); }
  return { slot: m[1], v: Number(m[2]) };
});
if (!picks.length) { console.error('error: no picks given (slot=vN …)'); process.exit(1); }

let failed = 0;
for (const { slot, v } of picks) {
  const s = spec.slots.find((x) => x.slot === slot);
  const raw = path.join(RAW_DIR, `${slot}-v${v}.png`);
  if (!s || !fs.existsSync(raw)) { console.error(`✗ ${slot} v${v}: ${!s ? 'unknown slot' : 'raw file missing'}`); failed++; continue; }
  const meta = await sharp(raw).metadata();
  if (meta.width < s.width || meta.height < s.height) { console.error(`✗ ${slot} v${v}: raw ${meta.width}×${meta.height} is smaller than the slot — would upscale`); failed++; continue; }

  const out = path.join(OUT_DIR, `${s.slot}.jpg`);
  let quality = 84, buf;
  do {
    buf = await sharp(raw)
      .resize(s.width, s.height, { fit: 'cover', position: 'centre', withoutEnlargement: true })
      .jpeg({ quality, progressive: true, mozjpeg: true })
      .toBuffer();   // sharp strips EXIF/ICC unless withMetadata() is asked for
    if (buf.length <= MAX_BYTES) break;
    quality -= 4;
  } while (quality >= 56);
  fs.writeFileSync(out, buf);
  const o = await sharp(buf).metadata();
  console.log(`✓ ${path.relative(ROOT, out)} ← v${v} · ${o.width}×${o.height} · ${(buf.length / 1024).toFixed(0)} KB · q${quality}${buf.length > MAX_BYTES ? ' · OVER BUDGET' : ''}`);
}
process.exit(failed ? 1 : 0);
