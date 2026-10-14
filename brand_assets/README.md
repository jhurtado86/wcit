# brand_assets/ — required client assets

Drop the real client files here using the **exact filenames** below. Until a file exists,
the template ships that slot on `https://placehold.co/WxH` at the final dimensions, so the
site is never broken — it just shows a placeholder. Replacing a placeholder is a
find-and-replace of the `placehold.co/WxH` URL with the root-relative `/brand_assets/…`
path; **alt text is already written in final form and must not change on swap.**

All paths are root-relative (`/brand_assets/…`).

**Originals vs. exports.** The client's source files (headshots, interiors, the exterior,
stock/procedure photos) live untouched in `originals/`, which is gitignored. Only the
web-ready exports in this folder are committed: cropped to the slot's exact ratio,
EXIF-stripped, progressive JPG under 250 KB (backgrounds under 350 KB), named by slot
(`team-<name>.jpg`, `location-<city>-exterior.jpg`, `service-<slug>.jpg`, …).
To re-export, re-run the crop from the original — never resave an export.

## Named background slots — dedicated files ONLY (never a content/gallery photo)

| File | Ratio | Dimensions | Used by |
|---|---|---|---|
| `hero-background.jpg` | 16:9 | 1376×768 as supplied (soft gradient art — scales clean) | `.hero__bg` on every page — set ONCE in `site.css`; pages carry an empty `<div class="hero__bg">` |
| `cta-background.jpg` | 16:9 | 1376×768 as supplied | `.final-cta__bg` on every page with a final CTA — set ONCE in `site.css` |

> These two slots are marked `<!-- OFF-LIMITS: … -->` in the HTML. A client content photo
> or gallery image is **never** promoted into either one. They are also the ONLY images
> that repeat across pages — every content photo is placed in exactly one slot site-wide
> (a provider headshot may additionally fill a portrait slot that is specifically theirs,
> e.g. Dr. Abanto on the HBOT page).

## Social / Open Graph

| File | Ratio | Dimensions | Used by |
|---|---|---|---|
| `og-image.jpg` | 1.91:1 | 1200×630 | `og:image` + `twitter:image` on every indexable page |

## Content photos — uniform container (`.photo-frame`)

Every content photo uses the shared `.photo-frame` class (one ratio site-wide). Export at
these sizes:

| Type | Ratio | Dimensions | Notes |
|---|---|---|---|
| Content photo (standard) | 4:3 | 1200×900 | Service/city/about body photos |
| Owner / people portrait | 3:4 | 900×1200 | `.photo-frame--portrait`, top-anchored (`about.html` owner slot) |

### Photo-tier counts (how many content photos per page)

| Page | Content photos |
|---|---|
| Flagship service (`service-one.html`) | 5 |
| Standard service (`service-two`…`six`) | 2 each |
| City page (`areas/city-*.html`) | 1 each |
| `about.html` | 2 body + 1 owner portrait (3:4) |

## Optional (per client, not shipped by default)
- Logo(s), favicon, and any gallery-module photos (gallery stays blocked until real photos exist).
