#!/usr/bin/env node
// Generate candidate photos for the GENERIC placeholder slots listed in scripts/image-prompts.json
// with Google's Gemini image API (Nano Banana 2) and save the raw output, untouched, to
// brand_assets/_generated-raw/<slot>-v1.png, -v2.png, … (gitignored). Picking, cropping to the
// slot's exact size and the JPG export happen in a separate step — this script never touches
// anything that ships.
//
//   node scripts/generate-images.mjs                 # every slot, 2 variants each, 4K, Nano Banana 2.1
//   node scripts/generate-images.mjs --variants 3    # v1…v3 per slot (existing files are skipped)
//   node scripts/generate-images.mjs --only service-compression-therapy,service-specialty-wound-dressings
//   node scripts/generate-images.mjs --model gemini-3.1-flash-image   # Nano Banana 2 (previous generation)
//   node scripts/generate-images.mjs --size 2K --force               # regenerate even if the file exists
//   node scripts/generate-images.mjs --dry-run                       # print the plan, call nothing
//
// The API key is read from GEMINI_API_KEY in ./.env (or ./.claude/.env, or the environment).
// It is never printed.
//
// Model IDs verified against https://ai.google.dev/gemini-api/docs/image-generation (2026-10-18):
//   gemini-nano-banana-2.1   Nano Banana 2.1    1K / 2K / 4K   ← default ("recommended for all new
//                                                                 projects"; Juan's pick, 2026-10-18)
//   gemini-3.1-flash-image   Nano Banana 2      1K / 2K / 4K
//   gemini-3-pro-image       Nano Banana Pro    1K / 2K / 4K
// Config shape verified against the installed SDK (node_modules/@google/genai/dist/genai.d.ts):
//   GenerateContentConfig.imageConfig: { aspectRatio?: string; imageSize?: string }

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { GoogleGenAI } from '@google/genai';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PROMPTS_FILE = path.join(ROOT, 'scripts', 'image-prompts.json');
const RAW_DIR = path.join(ROOT, 'brand_assets', '_generated-raw');

const DEFAULT_MODEL = 'gemini-nano-banana-2.1';
const SIZES = ['512px', '1K', '2K', '4K'];

// ---------- CLI ----------
const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const v = args[i + 1];
  return v === undefined || v.startsWith('--') ? true : v;
};
const VARIANTS = Number(flag('variants', 2));
const SIZE = String(flag('size', '4K'));
const MODEL = String(flag('model', DEFAULT_MODEL));
const ONLY = flag('only', '') ? String(flag('only', '')).split(',').map((s) => s.trim()).filter(Boolean) : null;
const FORCE = flag('force', false) === true;
const DRY_RUN = flag('dry-run', false) === true;

if (!Number.isInteger(VARIANTS) || VARIANTS < 1 || VARIANTS > 8) fail('--variants must be an integer from 1 to 8');
if (!SIZES.includes(SIZE)) fail(`--size must be one of ${SIZES.join(', ')}`);

// ---------- key (never printed) ----------
for (const envFile of ['.env', '.claude/.env']) {
  const p = path.join(ROOT, envFile);
  if (!process.env.GEMINI_API_KEY && fs.existsSync(p)) {
    try { process.loadEnvFile(p); } catch { /* unreadable or malformed — fall through */ }
  }
}
const API_KEY = process.env.GEMINI_API_KEY;
if (!DRY_RUN && !API_KEY) fail('GEMINI_API_KEY is not set — add it to ./.env (gitignored) as GEMINI_API_KEY=…');

// ---------- plan ----------
const spec = JSON.parse(fs.readFileSync(PROMPTS_FILE, 'utf8'));
const slots = spec.slots.filter((s) => !ONLY || ONLY.includes(s.slot));
if (ONLY) {
  const missing = ONLY.filter((name) => !spec.slots.some((s) => s.slot === name));
  if (missing.length) fail(`--only names unknown slots: ${missing.join(', ')}`);
}
for (const s of slots) {
  if (!s.prompt.trim().endsWith(spec.style)) fail(`${s.slot}: prompt does not end with the shared style line`);
}

const jobs = [];
for (const s of slots) {
  for (let v = 1; v <= VARIANTS; v++) {
    const out = path.join(RAW_DIR, `${s.slot}-v${v}.png`);
    jobs.push({ slot: s, v, out, exists: fs.existsSync(out) });
  }
}
const todo = jobs.filter((j) => FORCE || !j.exists);

console.log(`model ${MODEL} · size ${SIZE} · ${slots.length} slot(s) × ${VARIANTS} variant(s) = ${jobs.length} image(s), ${todo.length} to generate${FORCE ? ' (forced)' : ''}`);
for (const j of jobs) console.log(`  ${j.exists && !FORCE ? 'skip ' : 'make '} ${path.relative(ROOT, j.out)}  (${j.slot.aspectRatio}, for ${j.slot.width}×${j.slot.height} on ${j.slot.page})`);
if (DRY_RUN) { console.log('dry run — nothing called.'); process.exit(0); }
if (!todo.length) { console.log('nothing to do.'); process.exit(0); }

// ---------- generate ----------
fs.mkdirSync(RAW_DIR, { recursive: true });
const ai = new GoogleGenAI({ apiKey: API_KEY });
let failures = 0;

for (const job of todo) {
  const { slot, v, out } = job;
  const t0 = Date.now();
  process.stdout.write(`→ ${slot.slot} v${v} … `);
  try {
    const png = await generateOne(slot.prompt, slot.aspectRatio);
    const meta = await sharp(png).metadata();
    fs.writeFileSync(out, png);
    fs.writeFileSync(out.replace(/\.png$/, '.json'), JSON.stringify({
      slot: slot.slot, variant: v, page: slot.page, model: MODEL, imageSize: SIZE,
      aspectRatio: slot.aspectRatio, width: meta.width, height: meta.height,
      target: { width: slot.width, height: slot.height }, generatedAt: new Date().toISOString(),
      prompt: slot.prompt,
    }, null, 2));
    console.log(`${meta.width}×${meta.height} · ${(png.length / 1024 / 1024).toFixed(1)} MB · ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  } catch (err) {
    failures++;
    console.log(`FAILED · ${scrub(err?.message || String(err))}`);
  }
}

console.log(failures ? `${failures} image(s) failed.` : 'done.');
process.exit(failures ? 1 : 0);

// ---------- helpers ----------
async function generateOne(prompt, aspectRatio) {
  const config = {
    responseModalities: ['TEXT', 'IMAGE'],
    imageConfig: { aspectRatio, imageSize: SIZE },
  };
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await ai.models.generateContent({ model: MODEL, contents: prompt, config });
      const parts = res?.candidates?.[0]?.content?.parts ?? [];
      const img = parts.find((p) => p.inlineData?.data);
      if (!img) {
        const why = res?.candidates?.[0]?.finishReason || res?.promptFeedback?.blockReason || 'no image part in response';
        const text = parts.map((p) => p.text).filter(Boolean).join(' ').slice(0, 200);
        throw new Error(`${why}${text ? ` — ${text}` : ''}`);
      }
      const buf = Buffer.from(img.inlineData.data, 'base64');
      // Always store PNG regardless of the MIME type the API chose, so the raw set is uniform and lossless.
      return img.inlineData.mimeType === 'image/png' ? buf : await sharp(buf).png().toBuffer();
    } catch (err) {
      lastErr = err;
      const msg = String(err?.message || err);
      // A free-tier key has a quota of ZERO for the image models — retrying can never help, and
      // neither can the next job. Stop the whole run with the real fix.
      if (/free_tier/i.test(msg) && /limit: 0\b/.test(msg)) {
        fail(`${MODEL} is not available on this key's FREE tier (quota limit: 0). Enable billing on the Google Cloud project behind this API key (Google AI Studio → API keys → the project's "Set up billing"), or use a key from a billed project, then re-run.`);
      }
      const transient = /429|503|RESOURCE_EXHAUSTED|UNAVAILABLE|overloaded|fetch failed|ECONNRESET|ETIMEDOUT/i.test(msg);
      if (!transient || attempt === 3) throw err;
      const wait = attempt * 15_000;
      process.stdout.write(`(retry ${attempt} in ${wait / 1000}s) `);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
  throw lastErr;
}

// Belt and braces: make sure an error message can never echo the key.
function scrub(msg) {
  return API_KEY ? msg.split(API_KEY).join('[REDACTED]') : msg;
}

function fail(msg) {
  console.error(`error: ${msg}`);
  process.exit(1);
}
