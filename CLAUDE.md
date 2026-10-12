# CLAUDE.md — Wound Care Institute of Texas (WCIT)

This is the **Wound Care Institute of Texas (WCIT)** website, a Nexor AI full rebuild. It is a
**wound care medical practice** — serious, clinical, credential-forward (like STVI, NOT like the
Thrive wellness build). Build CLEAN from the base template; do NOT clone-and-strip another
client's repo. Reuse the proven STVI design *patterns* (clean nav, hero treatment, section
rhythm, condition/service-page template, bilingual method, anti-generic guardrails) by following
the rules below — Code builds them fresh for this client's brand and content.

Trade: **Outpatient wound care / chronic non-healing wound treatment.**

⚠️ **TWO-AUDIENCE SITE (the defining structural feature).** WCIT is a **referral-driven**
practice. It serves BOTH:
1. **Patients / families** — people with chronic wounds looking for care (→ GHL lead capture)
2. **Referring providers** — hospitals, nursing homes, other physicians sending wound patients
   (→ LeadingReach referral platform, kept)
The nav, CTAs, and architecture must serve both audiences distinctly. "Refer a Patient" is as
prominent as "Request an Appointment."

Do not invent client facts; confirm or flag `[NEEDS INPUT]`.

**STATUS: LOCKED.** All `[DECIDE]` items resolved (see DECISIONS log). Remaining
`[NEEDS INPUT]` items are asset/integration backfill only — they never block structure.

---

## Build approach notes (read first)

- **Full rebuild**, built CLEAN from the nexor-template base (not cloned from STVI/Thrive).
- **Bilingual EN + /es/ mirror** — full Spanish mirror, same method as STVI (translate copy,
  freeze structure/schema facts, reciprocal hreflang, translated slugs, Español toggle).
- **Two locations** (McAllen + Mission) — schema and a Locations treatment handle both.
- **Two audiences** (patients + referring providers) — dual CTA pattern throughout.
- **Keep LeadingReach** for provider referrals + patient appointment requests (their existing
  HIPAA-grade referral pipeline — load-bearing, do not replace). **Add GHL** for patient-direct
  lead capture + follow-up. CTA routing is locked in "CTA routing" below.
- **No pricing** (medical practice) — route to consultation/referral.
- Reuse STVI's gated screenshot discipline on the key template pages only.

---

## Resolved token reference

| Token | Resolved value |
|---|---|
| Business name | Wound Care Institute of Texas, PLLC (short: WCIT) |
| Trade | Outpatient wound care — chronic/non-healing wounds |
| Locations | **McAllen** (primary) + **Mission** |
| McAllen address | 2101 S. M Street, Suite A, McAllen, TX 78503 |
| Mission address | 900 Plaza Drive, Suite 5, Mission, TX 78572 |
| Phone | (956) 317-4044 · alt (956) 317-4043 |
| Fax | (956) 800-4275 |
| Email | wcit@wound-institute.com |
| Hours (both locations) | Mon–Fri 8:00 AM – 5:00 PM; Sat–Sun Closed |
| Office Manager | Anita Maria Rodriguez (authorized official on record; not necessarily published) |
| NPI | 1275142622 (reference only — **do not publish a founding/established year**; see Business Identity) |
| Domain | wound-institute.com — canonical host **https://www.wound-institute.com** (www primary on Vercel) |
| Socials | Facebook, YouTube, Instagram (all active) — **URLs not yet confirmed `[NEEDS INPUT]`.** Footer social links and schema `sameAs` are omitted until the real URLs are supplied; never guess them |

---

## Brand color system — LOCKED (measured from the WCIT wordmark)

Palette measured from the wordmark (`brand_assets/wordmark.png`): a blue ribbon "W"
(`#4688C7` → `#5996C6`), a cyan ribbon (`#B1E0EB` → `#5CC6D2`) with cyan "WO₂UND" text
(`#6EC6D8`), and slate text (`#718192`). The brand's signature is a **blue–cyan gradient on
dark/near-black** — a clean, modern medical-tech feel.
⚠️ This must read DISTINCT from the sibling medical builds: STVI (navy/red/gold) and Thrive
(navy/teal, wellness). WCIT leans into the **darker, gradient, medical-tech aesthetic**.

Tokens live in `brand.css` (single source of truth) and keep the **template's token roles** —
pages consume them through `var(--color-*)` and the Tailwind `theme.extend` map; never hardcode
per page. Role mapping to remember: the button/CTA blue is `--color-accent` (white label), the
cyan is `--color-accent-bright` (on dark only), and `--color-primary` == `--color-dark`.

| Token | Hex | Role | Contrast basis |
|---|---|---|---|
| `--color-dark` (canonical) = `--color-primary` | `#0A0E1A` | THE dark-section background (signature). **Locked design decision** — not a logo measurement | white text 19.25:1 |
| `--color-primary-mid` | `#11182C` | First dark-elevation step | accent-bright 8.79:1 |
| `--color-dark-3` | `#17203B` | Second dark-elevation step | accent-bright 8.01:1 |
| `--color-accent` | `#306FAB` | Brand blue — button/CTA fill (white label), links, icons, eyebrows on light. Logo blue hue, deepened | white label 5.27:1 · on bg-2 4.86:1 |
| `--color-accent-deep` | `#265887` | Hover/pressed; on-light text fallback | 7.43:1 on white · 6.85:1 on bg-2 |
| `--color-accent-bright` | `#5CC6D2` | Logo cyan — EVERY accent use on a dark background | 9.59:1 on `--color-dark` |
| `--color-wave-blue` | `#4688C7` | Raw logo blue — gradient + large graphics ONLY | 3.75:1 on white — never small text, never under a white label |
| `--gradient-brand` | `#B1E0EB` → `#5CC6D2` → `#4688C7` | The signature ribbon gradient | decorative |
| `--color-ink` | `#202B37` | Headings/body — wordmark slate hue, darkened | 14.36:1 on white |
| `--color-muted` | `#5B6B7A` | Secondary text on light | 5.48:1 on white · 5.06:1 on bg-2 |
| `--color-muted-light` | `#9AA8B6` | Muted text on dark | 7.93:1 on `--color-dark` |
| `--color-line` | `#CBD6DF` | Borders, hairlines, chrome | non-text |
| `--color-bg` | `#FFFFFF` | Content backgrounds | — |
| `--color-bg-2` | `#F3F6F9` | Light section tint | — |
| `--color-rating` | `#F59E0B` | Functional star gold — unused until reviews are confirmed | — |

**Supporting tokens (also in `brand.css`):**

| Token | Value | Role |
|---|---|---|
| `--color-wave-light` | `#B1E0EB` | Light end of the cyan ribbon — gradient stop ONLY, never text or fills |
| `--gradient-brand-x` | same three stops at `90deg` | The ribbon run left-to-right: the 3px hairlines (`.hairline-brand`, link-bar and action-bar rules, panel top rules) and the eyebrow dash |
| `--color-bg-rgb` | `255, 255, 255` | `rgba()` tinting of white on dark — dividers, contact-row rules, footer hairlines |
| `--color-*-rgb` | channel triplets for every color token | Tinted shadows and translucent surfaces — never a flat grey shadow |
| `--nav-height` · `--nav-links-height` | `96px` · `56px` | Desktop brand bar and link row heights (sticky offsets derive from these) |
| `--nav-height-mobile` · `--nav-logo-height-mobile` | `72px` · `48px` | Brand bar and wordmark height below the 1280px desktop breakpoint |
| `--nav-logo-height` · `--footer-logo-height` | `72px` · `72px` | Wordmark ceiling (see Logo rules) — never raise |
| `--action-bar-height` | `76px` | Mobile sticky Call / Refer / Request bar; `body.site` reserves this as bottom padding |

Pages never hardcode header geometry — header, menu panel, sticky offsets, and the action bar all
read these tokens.

**FROZEN rules:**
- Blue–cyan gradient is the brand signature — use `--gradient-brand` intentionally (the "W"
  ribbon, section accents), not as flat fills everywhere.
- Dark/near-black sections are a signature — use them for depth and contrast.
- **Cyan is an on-dark color.** `--color-accent-bright` is ~2:1 on white — never cyan text,
  dividers, or button fills on a light background. On light, accents use `--color-accent` /
  `--color-accent-deep`.
- **Accent-on-dark:** every accent use on `--color-dark` (heading spans, eyebrows, step numbers,
  check strokes, footer tagline) uses `--color-accent-bright`, never raw `--color-accent`.
- The raw logo slate (`#718192`, 3.99:1 on white) is never body text — use `--color-ink` /
  `--color-muted`.
- Recolor contrast check (passes): accent-deep vs bg 7.43 · accent-bright vs dark 9.59 · muted
  vs bg-2 5.06. Fix the token, never the page.
- No default Tailwind blue/indigo — drive everything from these tokens.

---

## Logo — horizontal wordmark ONLY (no circle badge)

The client does NOT use a circle badge. The horizontal wordmark ("WO₂UND CARE / INSTITUTE OF
TEXAS" under the ribbon "W" — the O₂ is an oxygen reference tying to hyperbaric O₂ therapy) is
the only logo, and `wordmark.png` is the **production logo** — no other source exists.

| File in `brand_assets/` | What it is | Use |
|---|---|---|
| `wordmark.png` | 440×155 transparent PNG, original from the live site | Logo on light backgrounds |
| `wordmark-on-dark.png` | Same file, slate text → white; cyan/blue untouched. Nexor-made variant — `[NEEDS INPUT — client approval]` | Logo on dark nav / footer / dark sections |
| `w-mark.png` | 173×59 ribbon "W" cropped from the wordmark, native pixels | Mobile mark |
| `favicon.ico` · `favicon-16.png` · `favicon-32.png` · `favicon-48.png` | Ribbon "W" on transparent | Favicon |
| `apple-touch-icon.png` | 180×180, ribbon "W" on solid white (iOS renders transparency as black) | Apple touch icon |

**FROZEN rules:**
- The source is only 155px tall — the logo **never renders above ~72px tall** anywhere (nav,
  footer, mobile). `--nav-logo-height` and `--footer-logo-height` in `brand.css` are both
  `72px`; never raise them. **No upscaling anywhere.**
- Light background → `wordmark.png`. Dark background → `wordmark-on-dark.png`. Never put
  `wordmark.png` on dark (the slate half goes dim).
- Never use the old site's white-box `favicon.jpg`.
- **512px icon: not produced** — the ribbon is 173px wide in the source, so 512 would need
  upscaling. Make it from the SVG redraw once that is approved.
- **SVG redraw (not a blocker):** after the homepage gate, propose an SVG redraw of the
  wordmark for Juan's approval (crisp footer/print use, and the 512px icon).

---

## Typography + shared design system — LOCKED (Gate 1)

### Font pairing
Google Fonts, loaded per page with the `<link>` in `index.html`; declared as `--font-display` /
`--font-body` in `site.css` and mirrored in the Tailwind `fontFamily` map (`font-display`,
`font-body`).

| Role | Face | Weights loaded | Why |
|---|---|---|---|
| Display — `--font-display` | **Sofia Sans Semi Condensed** | 500–800 | Condensed echo of the wordmark lettering; fits long Spanish headings |
| Body — `--font-body` | **Atkinson Hyperlegible Next** | 400–800 + italic | Drawn for low-vision readers (older-patient UX); body never below 18px (19px desktop) |

### Plain-zero rule — FROZEN
**Any numeral containing a 0 in visible copy** renders with a **plain (unslashed) zero** —
every phone, fax, hours string and address, and prose numerals such as "100% oxygen",
"20 to 40 sessions", the © year. Atkinson Hyperlegible Next ships only a slashed zero — its
GSUB carries `ccmp frac locl pnum tnum` and no `zero`/`ss##` alternate (`zero.tf` is a
composite of the same slashed glyph), so there is nothing to switch on. Those strings are
therefore set in the display face, whose zero is plain:
- `.num` — display family, `1.04em` (levels the two cap heights), `0.01em` tracking; **weight
  inherits**, so bold contexts (call link, contact rows, facts, buttons) stay bold.
- `.num--text` — the same, plus weight 600. Use it alone for any numeral inside regular
  running text (addresses, footer hours, the © year, a fax in a sentence, "100% oxygen").
- Wrap the **whole numeric phrase** ("8:00 AM – 5:00 PM", "20 to 40 sessions"), not single
  digits, on the `<dd>`/`<address>`/`<span>` that holds it. A numeral with no 0 ("911",
  "2 weeks") may stay in the body face, but wrap it too when it sits beside a wrapped one so a
  sentence never mixes faces twice. Display-face headings (ruler ticks, "20 nursing
  facilities") are already plain.

### `site.css` + `site.js` — the shared design system
Every page links `/brand.css` then `/site.css`, and loads `/site.js` with `defer`. Build pages
from these classes; add a component here when two pages need it, never per page.
- **`site.css`** owns: type scale and `.display-1/2/3`, `.heading-3/4`, `.lede`, `.prose`,
  `.eyebrow`, `.grad-text` (dark only); spacing/radius/tinted-shadow/motion tokens; `.btn`
  (primary = blue fill/white label, secondary = outline, `.btn--compact`, `.btn--block`);
  the header (sticky brand bar + link bar + Services dropdown + mobile menu panel + mobile
  action bar); `.section` / `.section--tint` / `.section--dark` / `.grain`; the hero and final
  CTA slots with overlay + vignette; the week ruler, index list, flagship + ledger, roster,
  mission, referral desk, location cards, paths, footer; the overview-page pieces
  (`.jump-list` in the hero panel; `.entry` anchored sections with `scroll-margin-top` so
  deep links clear the sticky header, stacked in `.entry-stack` or paired in `.entry-duo`);
  focus rings; reduced-motion rules.
  Class selectors only (Tailwind preflight never overrides them). No hex outside `brand.css`.
- **`site.js`** owns: the smart header (brand bar always sticks; link row tucks on scroll
  down, returns on scroll up or keyboard focus); the Services dropdown (click, hover, keyboard,
  Esc, outside-click); the mobile menu (focus trap, Esc, closes on resize to desktop); and the
  `.fade-up` → `.visible` reveal that `screenshot.mjs` forces visible.
- Desktop breakpoint is **1280px** for the header, the hero split, and the five-column footer.
  The footer's Contact column is `max-content` so the email never breaks at the `@`.

### Service page template — LOCKED at Gate 2 (model: `/services/hyperbaric-oxygen-therapy/`)
The HBOT page is the template; the other six service pages clone its order, CTA pattern,
schema and breadcrumb. Per page: title leads with the service name (never the homepage's
"McAllen Wound Care Clinic" phrase), <60 chars; meta <160 with city + CTA; canonical +
reciprocal hreflang to the ES twin; Español toggle → the twin; Services link-bar button
carries `.is-active`; the page's own dropdown, menu-sub and footer links carry
`aria-current="page"`.

**No "WCIT" in patient-facing copy** — headings, panel titles, titles, OG/Twitter, schema
`name`. Patients do not know the acronym. Service-page titles therefore carry **no brand
suffix** (the full name would push them past 60 chars); the brand reaches the SERP through
`og:site_name` and the `WebSite` schema name. "WCIT" stays only in `alternateName`, code
comments and this file.

| # | Section | Status | Surface | Component(s) |
|---|---|---|---|---|
| 1 | Hero: breadcrumb (`.crumbs`) · eyebrow · H1 (service name; add "in McAllen and Mission" when it fits ~3 lines, else the lede names the cities) · plain-language lede · Request an Appointment + Call · hours/supervision line · **at-a-glance panel** (`.glance` + `.contact-rows`, title "[Service] at a glance") ending in the provider path (Refer through LeadingReach) | **REQUIRED** | dark, `hero--service` | `hero__bg` placeholder 1920×1080 |
| 2 | What it is — plain-language prose | **REQUIRED** | white | `.split` |
| 2a | The visual inside "what it is" — each service gets its own fitting diagram, or none. **Never reuse the oxygen scale** (`.o2-scale` is HBOT's alone) | FLEXIBLE | — | per page |
| 3 | What to expect — numbered steps + the service photo (1200×900) + a call callout | **REQUIRED** | tint | `.steps`, `.split--start` + `.split__sticky`, `.callout` |
| 4 | Conditions it treats — typographic index, every row linked to a locked `/conditions/` anchor; sibling-service links in the aside | **REQUIRED** | white | `.index-layout`, `.index-list` |
| 5 | Who it's for — how we decide + side effects + **cost/insurance routed to `/contact/`** | **REQUIRED** | dark | prose |
| 5a | Contraindication / "closer look" paired lists | FLEXIBLE — only where clinically relevant | — | `.pair`, `.dash-list` |
| 6 | Team tie-in — credential-accurate paragraph naming the relevant expertise (exact wording from the Providers section) | **REQUIRED** | white | prose; flagship adds the 3:4 portrait (`.split--portrait`) |
| 7 | FAQ — native `<details>`, **min 6** Q&As, mirrored word for word in the FAQPage schema | **REQUIRED** | tint | `.faq` |
| 8 | Other services — the six siblings | **REQUIRED** | white | `.ledger.ledger--light` |
| 9 | Final CTA — Patients (Request + Call) / Referring providers (Refer a Patient + fax) | **REQUIRED** | dark `final-cta` | `.paths` |

**Order is fixed** for every service page (1 → 9). **Length by tier (content-only = words
inside `<main>`, header/menu/footer excluded):** HBOT ~1,300 / 5 photos (hero slot, session
photo, portrait, + 2 reserved); Total Contact Casting ~1,300 (it carries the diabetic-foot-
ulcer intent); the other five ~1,000 / 2 photos (hero slot + the step-section photo).
**Tightening rules (Gate 3):** team tie-in is 2–3 sentences + the "Meet our team" link;
the "Other services" ledger is names + arrows only (`.ledger--compact`, no descriptions);
"What it is" and "Who it's for" use short paragraphs and lists of 3–5 items; FAQ stays ≥6
(collapsed, so it adds no visual length) and its FAQPage schema must match word for word after
every edit; cut repetition across sections — every paragraph answers a patient question.

**Team tie-in rule (LOCKED):** team-level, credential-accurate framing only — the two-ABWM
sentence ("Two of our clinicians are certified by the American Board of Wound Management:
Dr. José R. Sobrevilla, MD, CWSP, and Cesar Martinez, RN, CWS") + "physicians and nurse
practitioners who bring wound care and critical care experience." **No per-service clinician
attributions** (the bios describe prior roles, not WCIT service-line assignments). Dr. Abanto
is named on HBOT only, where his hyperbaric credential is stated. Names return to a service
page only if the client confirms (client question d).

Rules: no two consecutive sections share a surface or a skeleton; only sections 3, 4, 7, 8
(and 5a) are lists (genuinely parallel content); every outcome statement is "may help" /
"promotes healing"; cost and insurance always route to `/contact/`; every frequency,
course-length or clinical claim is added to the clinical-review list under Active Blockers
before the page is screenshotted. Schema per page: `MedicalWebPage` (`about` → the
procedure, `mentions` → the MedicalConditions it links, `provider` → the clinic `@id`,
`breadcrumb`) + `["MedicalTherapy","MedicalProcedure"]` (`MedicalProcedure` alone for
debridement) + `BreadcrumbList` + `FAQPage`.

---

## Integration placeholders

### CTA routing — LOCKED
| CTA | Audience | Destination |
|---|---|---|
| **Request an Appointment** (header, hero, final CTA) | Patients/families | `/contact/` (internal) — GHL patient form is the PRIMARY element there |
| **Refer a Patient** (header, hero, provider page, final CTA) | Referring providers | LeadingReach referral URL (external, new tab) — always direct, never via a form |
| LeadingReach appointment request | Patients | SECONDARY option on `/contact/` ("Prefer our secure online request? …") |
| Click-to-call | Both | `tel:+19563174044` — sticky on mobile |

ES equivalents: "Solicitar una Cita" → `/es/contacto/`; "Referir a un Paciente" → same LeadingReach URL.

- **LeadingReach — KEEP (provider referral + appointment request pipeline):**
  - "Refer a Patient" → `https://referral.leadingreach.com/wound-care-institute-of-texas`
  - "Request an Appointment" → `https://remote.leadingreach.com/appt-request?os=wound-care-institute-of-texas`
  - (Confirm exact current URLs against the live site before launch.) These are external links,
    open in a new tab. Do NOT replace with a GHL form — this is their HIPAA-grade referral plumbing.
- **GHL CONTACT/PATIENT FORM EMBED** — `[NEEDS INPUT — Juan providing embed]`. For patient-direct
  lead capture (patient/family inquiry → GHL CRM → follow-up). Insertion: Contact page + a patient
  CTA path. GHL embed only.
  ⚠️ **PHI rule (FROZEN):** unless Juan confirms a signed GHL BAA, the GHL form collects
  CONTACT INFO ONLY — name, phone, email, preferred location (McAllen/Mission), preferred
  language, best time to call. NO wound description, diagnosis, insurance ID, or other health
  details. Add helper text: "Please don't include medical details — our team will call you."
  Clinical information flows through LeadingReach only.
- **GHL CHAT WIDGET SCRIPT** — `[NEEDS INPUT — Juan providing embed]`. Before `</body>`, site-wide.
- **GHL EXTERNAL TRACKING SCRIPT** — `[NEEDS INPUT — wire in `<head>` if Juan provides it; otherwise leave the placeholder comment]`.
- **Google Maps embed** — wire for BOTH locations (McAllen + Mission) on the Contact/Locations page.
- **og-image** `brand_assets/og-image.jpg` (1200×630) — `[NEEDS INPUT — create before launch]`.

---

## Business Identity

- Business: **Wound Care Institute of Texas, PLLC (WCIT)**
- Type: community-based **outpatient wound care clinic** — multidisciplinary treatment of
  chronic/non-healing wounds. Serving Hidalgo County and the Rio Grande Valley.
- Two locations (McAllen primary + Mission), shared phone/hours.
- **Founding year: NOT displayed (DECIDED).** NPI enumeration (2020) conflicts with provider
  tenure history, so publish no "established/founded/since [year]" claim anywhere — copy,
  footer, About, or schema (`foundingDate` omitted). Revisit only if the client confirms history.
- **No pricing** anywhere (copy, FAQ, schema). Route to consultation/referral.
- Review/reputation status: `[NEEDS INPUT — no aggregateRating/reviews until confirmed + displayed]`

### Mission (confirmed, use verbatim as the mission line)
"To enhance the lives and health of our patients through improved access to quality, affordable,
and innovative wound care services."

### Positioning / differentiators (the trust story)
- **A genuine certified wound-specialty team** — this is the trust anchor (the WCIT equivalent of
  STVI's "board-certified vascular surgeon"). **Credential-accurate framing (LOCKED):** two
  ABWM-certified wound specialists — Dr. Sobrevilla (CWSP) and Cesar Martinez, RN (CWS) — plus
  Dr. Abanto, FACP, with hyperbaric medicine training, and nurse practitioners with wound/
  critical-care backgrounds. Lead with: "certified wound specialists on our team,"
  "multidisciplinary team." NEVER state or imply that every provider, or both physicians, are
  ABWM-certified.
- **Multidisciplinary, evidence-based, outpatient** — "greater chance of healing, improving
  quality of life." Safe, effective, comfortable outpatient care, cost-effective. (Never "painless.")
- **Strong referral network** — serves 20+ nursing facilities, 8 hospitals, partners with South
  Texas Health System Wound Healing Center. (Reinforces credibility to BOTH audiences.)
- **Two convenient RGV locations.**

### "When to see a wound specialist" (confirmed content — use on home/conditions/FAQ)
A wound needs specialist care if: it hasn't started healing in ~2 weeks or isn't fully healed in
~6 weeks; or the patient has diabetes, poor circulation/vascular disease, or other risk factors.

---

## Providers — 6 (team page + schema). CONFIRMED bios condensed from client.

**FROZEN rule:** condense each into a clean professional bio (narrative paragraph + a credentials/
education list) — do NOT replicate the verbatim year-by-year career timelines from the old site.
Photos: `[NEEDS INPUT — provider headshots]`.

**FROZEN (LOCKED) bio rules:**
- **No tenure dates.** Omit every "with WCIT since [year]" — it conflicts with the unpublished
  founding year. The "since" notes below are internal context only.
- **No founder claims.** Do not say anyone "founded" or "co-founded" WCIT.
- **Schema:** `Physician` ONLY for the two MDs (Sobrevilla, Abanto). The RN and three NPs are
  `Person` with `jobTitle`, `hasCredential`, and `worksFor` → the clinic `@id`. Never mark an
  RN/NP as a Physician.
- Display order: physicians → RN → NPs (as listed).

**1. Dr. José R. Sobrevilla, MD, CWSP** — Physician · Certified Wound Specialist Physician,
   Hospitalist & Family Medicine
   - American Board of Wound Management Diplomate; **Certified Wound Specialist Physician (CWSP)**
   - Family Medicine board certified; USMLE 1, 2CS, 2CK, 3
   - Med school: Universidad de Montemorelos (Nuevo León, Mexico); Residency: McAllen Family
     Medicine Residency Program; Internship: ISSSTE Monterrey
   - Narrative arc: Mexico-trained → McAllen residency → hospitalist/clinic roles → Wound
     Healing Center → wound care at WCIT + earned CWSP. (Internal: with WCIT since 2020 — do not
     publish. Do NOT use "co-founded.")

**2. Dr. Pedro Abanto, MD, FACP** — Physician · Internal Medicine · Wound Care & Hyperbaric Medicine
   - ⚠️ Do NOT title him "Certified Wound Specialist" — his wound credential is the Essentials of
     Wound Care and Hyperbaric Medicine certification, not ABWM. Use exactly that wording.
   - **FACP** (Fellow, American College of Physicians); American Board of Internal Medicine (2009)
   - **Essentials of Wound Care and Hyperbaric Medicine** certification (ties to the HBO service)
   - ACLS, BLS, ECFMG; USMLE 1, 2CS, 2CK, 3
   - Med school: Universidad de Montemorelos; Internal Medicine Residency: Regional Academy Health
     Center — UTHSCSA, Harlingen, TX. (Internal: with WCIT since 2017 — do not publish.)

**3. Cesar Trinidad Martinez Cavada, RN** — Registered Nurse · Wound Care
   - RN License #1090398 (TX BON / NCSBN); **Certified Wound Specialist, American Board of Wound
     Management**; ACLS
   - BSN/MSN: Escuela de Enfermería Dr. José Ángel Cadena y Cadena, Reynosa, Mexico; Médico
     Cirujano Partero: UMAN. Role: nursing-facility wound care, assists debridements,
     assessments, patient/family education. (Internal: since 2018 — do not publish.)

**4. Andrea Garza, FNP-C** — Family Nurse Practitioner · MSN
   - FNP-C; MSN-FNP: Chamberlain College of Nursing (honors); BSN: UT Pan-American (Cum Laude)
   - ICU/critical-care + complex-wound-care RN background (Rio Grande Regional, DHR, Edinburg
     Regional). (Internal: since 2019 — do not publish.)

**5. Patrizia Cantu, MSN, FNP-BC** — Family Nurse Practitioner (Board Certified) · MSN
   - FNP-BC; MSN-FNP: Houston Baptist University; BSN (Bio/Chem minor): UT Pan-American
   - **Dedicated wound-care RN experience** (long-term acute care — diabetic/venous/arterial/
     pressure ulcers; debridement, negative pressure, collagen films), plus CVICU and neuro/trauma.
     (Internal: since 2022 — do not publish.) Strongest direct wound background among the NPs.

**6. Edwardo Bernal, FNP-BC** — Family Nurse Practitioner (Board Certified) · MSN
   - FNP-BC; MSN-FNP: Walden University; BSN: UT Pan-American
   - Clinical leadership background (Clinical Director/Administrator), lifespan care, chronic-
     disease management (diabetes/hypertension — relevant to wound population). (Internal: since
     2020 — do not publish.)

> (Cassandra Piñon, listed on the old site, is NO LONGER with the practice — do not include.)
> The team is these 6, final. The live site's team banner photo shows a 7th person who is no
> longer on the team — do not add them and do not use that photo anywhere on the new site.

---

## Services — 7 pages (write FRESH clinical content; old site copy not required)

**FROZEN:** write accurate, professional, patient-readable descriptions of each from medical
accuracy + the service list (old thin WordPress copy is not needed and not better). 5th-grade
readability where possible; tie each to the conditions it treats and the relevant provider
expertise. No pricing.

1. **Hyperbaric Oxygen Therapy (HBO/HBOT)** — flagship/differentiator. 100% oxygen in a
   pressurized chamber to boost tissue oxygen and accelerate healing of hard-to-heal wounds;
   ~daily sessions. Tie to Dr. Abanto's hyperbaric certification and the clinic's HBO capability.
2. **Negative Pressure Wound Therapy (Wound VAC)** — controlled suction to remove exudate and
   promote granulation/healing.
3. **Debridement of Wounds** — surgical/sharp/bedside removal of necrotic tissue to prepare the
   wound bed for healing.
4. **Total Contact Casting** — offloading for diabetic foot ulcers to redistribute pressure and
   promote healing.
5. **Bio-engineered Skin (skin substitutes)** — advanced cellular/tissue-based products to support
   closure of chronic wounds.
6. **Compression Therapy** — for venous stasis ulcers/edema to improve circulation and healing.
7. **Application of Specialty Dressings/Ointments** — advanced wound dressings and topical therapy
   matched to wound type.

**Conditions treated (content for home / a conditions section / FAQ):** diabetic & neuropathic
foot ulcers, ischemic/arterial ulcers, pressure ulcers (bedsores), venous stasis ulcers,
non-healing surgical wounds, peristomal irritation, radiation wounds, burns, fistulas, and other
resistant/chronic wounds.

---

## Site Architecture — FROZEN structure, verify slugs on disk

Full medical site, two audiences, bilingual. (Fewer "condition pages" than STVI; the depth is in
the 7 service pages + a conditions overview.)

Clean trailing-slash URLs: every page is `folder/index.html` (homepage = root `index.html`).

### Slug table — LOCKED (EN ↔ ES twins; hreflang pairs)
| Page | EN URL | ES URL |
|---|---|---|
| Home | `/` | `/es/` |
| About | `/about/` | `/es/nosotros/` |
| Our Team | `/our-team/` | `/es/nuestro-equipo/` |
| Services overview | `/services/` | `/es/servicios/` |
| Hyperbaric Oxygen Therapy (FLAGSHIP) | `/services/hyperbaric-oxygen-therapy/` | `/es/servicios/terapia-de-oxigeno-hiperbarico/` |
| Negative Pressure Wound Therapy | `/services/negative-pressure-wound-therapy/` | `/es/servicios/terapia-de-presion-negativa/` |
| Debridement of Wounds | `/services/wound-debridement/` | `/es/servicios/desbridamiento-de-heridas/` |
| Total Contact Casting | `/services/total-contact-casting/` | `/es/servicios/yeso-de-contacto-total/` |
| Bio-engineered Skin | `/services/bioengineered-skin-substitutes/` | `/es/servicios/sustitutos-de-piel/` |
| Compression Therapy | `/services/compression-therapy/` | `/es/servicios/terapia-de-compresion/` |
| Specialty Dressings/Ointments | `/services/specialty-wound-dressings/` | `/es/servicios/apositos-especializados/` |
| Conditions We Treat | `/conditions/` | `/es/condiciones/` |
| Locations | `/locations/` | `/es/ubicaciones/` |
| For Referring Providers | `/referring-providers/` | `/es/profesionales-que-refieren/` |
| Patient Resources | `/patient-resources/` | `/es/recursos-para-pacientes/` |
| Contact | `/contact/` | `/es/contacto/` |
| Thank-You (noindex) | `/thank-you/` | `/es/gracias/` |

Disk is the source of truth — Prompt 0 verifies this table against the real tree.

### Page roles
- **Home** — both audiences; dual CTA; "when to see a wound specialist"; conditions teaser;
  services; team trust story; two locations; referral-network credibility.
- **About** — the practice, mission (verbatim), multidisciplinary approach, referral network.
- **Our Team** — 6 providers; credential-accurate certified-wound-specialist story.
- **Services overview + 7 service pages** (list above).
- **Conditions We Treat — ONE overview page (DECIDED).** One strong page with a real section per
  wound type (what it is · why it won't heal · which services treat it, linking to those service
  pages). Each section gets an `id` anchor for deep links from the homepage, service pages and
  FAQ. **Required anchors (LOCKED — the homepage already links every one):**
  `#diabetic-foot-ulcers` · `#arterial-ulcers` · `#pressure-ulcers` · `#venous-stasis-ulcers` ·
  `#non-healing-surgical-wounds` · `#radiation-wounds` · `#burns` ·
  `#peristomal-skin-irritation` · `#fistulas` (nine; "other chronic wounds" links to the page
  itself). NO separate condition pages at launch. Diabetic foot ulcer intent is served
  primarily by Total Contact Casting — do not create a competing DFU page. (Post-launch:
  promote a section to its own page only if GSC shows demand.)
- **Locations** — BOTH McAllen + Mission (addresses, maps, hours, phone). **Required anchors
  (LOCKED):** the McAllen block carries `id="mcallen"` and the Mission block `id="mission"` —
  the homepage location cards deep-link to `/locations/#mcallen` and `/locations/#mission`,
  and the homepage schema's two department `@id`s resolve to those same fragments.
- **For Referring Providers (DECIDED naming):** nav label **"For Providers"** · H1/title **"For
  Referring Providers"** · CTA button **"Refer a Patient"** (→ LeadingReach). ES: nav **"Para
  Profesionales"** · H1 **"Para Médicos y Profesionales que Refieren"** · button **"Referir a un
  Paciente"** (flag for bilingual review). Content: why/how to refer, what WCIT handles (wound
  types, services incl. HBOT), what happens after a referral, referral network (20+ nursing
  facilities, 8 hospitals, South Texas Health System Wound Healing Center partnership), fax +
  phone for referral offices. Clinical/operational tone. Never name this page "Healthcare
  Providers" (collides with Our Team) or "Refer a Patient" (that's the button).
- **Patient Resources / What to Expect** — first visit, pre/post care, insurance (general
  framing only — no carrier list, no coverage promises), forms `[NEEDS INPUT — any patient forms]`.
- **Contact** — GHL patient form (primary) + LeadingReach appt request (secondary) + both
  locations + maps.
- **Thank-You** — noindex trio.
- **Full `/es/` Spanish mirror of all of the above.**

### Navigation (serves BOTH audiences)
Primary nav: Home · Services (dropdown — overview + the 7) · Conditions We Treat · Our Team ·
Locations · Patient Resources · For Providers · Contact. Plus: click-to-call, Español toggle
(→ the page's exact ES twin per the slug table). **Dual CTA:** "Request an Appointment" (→
`/contact/`) + "Refer a Patient" (→ LeadingReach, new tab) — both prominent, visually distinct
(primary vs secondary style), per CTA routing above. On mobile, keep both CTAs + call reachable
without opening the menu.

---

## Content Writing Methodology — FROZEN
Follow `SEO-CONTENT-PROMPT.md` for voice. Professional, clinical, warm, patient-readable. Two
audiences — most pages speak to patients/families; the "For Providers" page speaks to referring
clinicians (more clinical/operational tone there). Structured content (symptom lists, "when to
see a specialist," what-to-expect steps, FAQ) over wall-of-text. Spanish mirror AI-translated,
flagged for bilingual staff review before launch.

---

## Local SEO / Schema — FROZEN (medical, TWO locations)

- **Homepage/Org schema:** `MedicalClinic` (or `MedicalBusiness`) for WCIT, with the wound-care
  medical specialty, telephone, email, hours (Mon–Fri 08:00–17:00), and **two `PostalAddress`
  locations** (McAllen + Mission) — model both locations (e.g. a Department/branch or two
  LocalBusiness location entries referencing the org). areaServed = Hidalgo County / RGV cities.
- **No `priceRange`.** No `aggregateRating` until reviews confirmed + displayed.
- **Service pages:** `MedicalWebPage`/`MedicalProcedure` + `FAQPage` (min 6) + `BreadcrumbList`.
- **Our Team:** `Physician` for the two MDs; `Person` (+ `jobTitle`, `hasCredential`,
  `worksFor`) for the RN and three NPs. Credentials exactly as stated — do not invent.
- **Conditions page:** `MedicalWebPage` + `FAQPage` + `BreadcrumbList`; `about` →
  `MedicalCondition` entries for the wound types.
- **Homepage `hasOfferCatalog` / available services count = 7** (the service pages).
- **No `foundingDate`.**
- **Locations page:** both locations with full NAP + geo + hours.
- Per-page metadata: unique title <60, meta desc <160 (service/condition + McAllen/Mission/RGV +
  CTA), self-canonical, lang + viewport. OG/Twitter. **Reciprocal hreflang en/es/x-default.**
- `sitemap.xml` (all indexable EN + ES; exclude thank-you); `robots.txt` (disallow thank-you +
  es thank-you; point to sitemap). Canonical host `https://www.wound-institute.com`.

---

## Hero & Asset Patterns — FROZEN (same system as STVI)
- Dedicated `hero-background.*` / `cta-background.*` named slots — never a content photo; dark
  overlay + text. placehold.co at exact dims until real assets land.
- Uniform aspect-ratio containers for content photos; provider headshots `aspect-[3/4]`,
  `object-position: center top`.
- Leaner, trust-first photo strategy (medical) — real clinical/provider/facility imagery over
  generic stock; medical illustration/diagrams carry informational load. `[NEEDS INPUT]` all real
  photos (providers, facilities for both locations, clinical).
- Export images as JPG, web-optimized/compressed (lesson from prior builds — avoid heavy PNGs;
  de-border Canva exports).

## Anti-Generic / Anti-AI-Generated Guardrails — FROZEN (highest priority)
Brand tokens only. **No decorative icon-grids, no invented badges/emblems** (only real, supplied
credential marks). **Prose-first** — cards/grids only for genuinely parallel content (the 7
services, provider cards, FAQ, the two locations). Vary section rhythm; no two consecutive
sections share a skeleton. Real medical illustration over glyphs. Layered color-tinted shadows,
animate transform/opacity only, hover+focus-visible+active states, ≥18px body, ≥48px tap targets.
Self-check each page before screenshot: could this be prose? is any icon/badge empty or invented?
do sections look identical?

## Older-user UX — FROZEN
Wound care skews older/chronically-ill patients (and caregivers). ≥18px body, high contrast,
large tap targets, sticky click-to-call, simple obvious nav, prominent phone. Español toggle
prominent (RGV market).

---

## Locked Language / Hard Rules — FROZEN
- No pricing / "starting at" anywhere (copy, FAQ, schema) — route to consultation/referral.
- No invented facts, credentials, founding claims, reviews. Credentials exactly as stated.
- Healing/outcome language stays honest — "greater chance of healing," "promotes healing,"
  "may help" — never guarantee healing or specific outcomes.
- Keep LeadingReach referral links intact; never replace the provider-referral pipeline with a
  form. GHL is additive (patient capture), not a replacement.
- Two audiences kept distinct — don't bury the provider-referral path or the patient path.
- Blue/cyan-on-dark brand; no default Tailwind blue/indigo; no `transition-all`.
- Bilingual: Español toggle on every page → correct ES twin; reciprocal hreflang.

## Git / Deploy Discipline — FROZEN
- Build clean from nexor-template base. Branch, three-command pre-commit check
  (`git status`/`git branch`/`git remote -v` → WCIT repo). Logical commits.
- Clean trailing-slash URLs (folder/index.html + vercel.json trailingSlash/cleanUrls — same as
  STVI). serve.mjs patched for directory-index if needed.
- Canonical host `www.wound-institute.com` set as Vercel Primary at launch. Keep the existing
  domain; point it to Vercel (preserve any live email MX/records on the domain — do NOT touch
  email DNS, only website A/CNAME). Submit sitemap to GSC at launch.

## Local Server / Screenshot Workflow
- **This machine serves WCIT on `PORT=3200`:** `PORT=3200 node serve.mjs` (background; don't
  double-start), then `node screenshot.mjs http://localhost:3200 [label] [width]` →
  `./temporary screenshots/screenshot-N[-label].png`. Never screenshot a `file:///` path.
- **Port 3000 is in use by another project on this machine — never kill it or reuse it.**

---

## Active Blockers & Backfill

**Launch-blocking:** GHL form + chat widget embeds (Juan providing); og-image; confirm exact
LeadingReach URLs; provider headshots; real location/facility photos.
- **www canonical:** the live site currently resolves to non-www (`wound-institute.com`).
  Making `www.wound-institute.com` canonical requires an apex → www **308** at launch.
- **301 redirect map (required):** before launch, pull every live URL from the current
  WordPress sitemap and map each one to its new slug in `vercel.json` (permanent redirects).
  Nothing on the old site may 404.
- **`wordmark-on-dark.png` client approval** — Nexor-made white-text variant of the wordmark.

**Client questions (ask before the copy ships):**
- **(a) Spanish-speaking staff** — confirm which locations/roles offer Spanish-language care
  before any "se habla español" / "Spanish-speaking staff" claim appears anywhere (EN or ES).
  Until confirmed, the site offers a Spanish *website*, not Spanish-speaking *staff*.
- **(b) Clinical review of the one-line descriptions** — the one-sentence service and condition
  descriptions on the homepage (services ledger, HBOT flagship, conditions index), including
  **"HBOT sessions are usually daily,"** need a clinician's sign-off before launch. Flag the
  same review for every service/condition page as it is written.
- **(b, cont.) Clinical review — `/services/hyperbaric-oxygen-therapy/`** (every
  frequency, course-length, and clinical statement on the page; also mirrored in the FAQPage
  schema and the MedicalProcedure `howPerformed`/`preparation` text):
  - "Each session: about 2 hours" (glance, step 4, FAQ) · "Once a day, Monday–Friday" ·
    "Often 20 to 40 sessions, one each weekday" · "usually the next weekday"
  - "two to three times normal pressure" (what-it-is prose, oxygen scale note)
  - "has not improved after about a month / about 4 weeks of standard wound care" (DFU
    threshold — candidate list + wounds index)
  - Indications listed: diabetic foot ulcers · radiation wounds · failing skin grafts/flaps ·
    chronic bone infection (osteomyelitis) · some serious burns · arterial ulcers "in select
    cases, when blood flow has been restored as much as it can be"
  - "We may order a simple test that measures oxygen in the skin near the wound" / "skin
    oxygen test" (transcutaneous oximetry)
  - Closer-look list: lung conditions (collapsed lung, severe COPD) · recent ear/sinus surgery
    or inability to clear ears · certain chemotherapy medicines · fever, bad cold, seizure
    disorder · pregnancy · anxiety in small spaces
  - Side effects: ear pressure most common · temporary vision change during a course, usually
    returns to normal · "serious side effects are rare"
  - "You can drive home" after a session (no sedation) · "Physician-supervised sessions" ·
    chamber rules (cotton gown; no phones, watches, hearing aids, lighters, batteries; no
    lotions/perfume/hair spray) · "Most people do not find HBOT painful"
- **(b, cont.) Clinical review — the six standard service pages** (each statement also
  appears in that page's FAQPage schema and MedicalProcedure `howPerformed`/`preparation`):
  - **`/services/negative-pressure-wound-therapy/`** — dressing changes "usually 2 to 3 times
    a week" · pump worn "all day" and during sleep · can be disconnected briefly for bathing
    if the dressing stays sealed · "some wounds need it for a few weeks, others longer" ·
    indications (deep DFU incl. post-amputation, deep pressure ulcers, dehisced incisions,
    grafts/flaps, select venous ulcers, some deep burns) · closer-look list (dead tissue,
    untreated infection/osteomyelitis, exposed vessel/nerve/organ, malignancy, blood thinners
    or bleeding disorder, poor blood flow) · side effects (film irritation, discomfort at
    changes, uncommon bleeding).
  - **`/services/wound-debridement/`** — "often a few minutes" · numbing "available when
    needed" (gel or local anesthetic) · "often at weekly visits" · four methods (sharp,
    enzymatic, autolytic, mechanical) · "a little bleeding is normal" · dry black eschar on an
    ischemic foot "often left in place until circulation improves" · closer-look list (blood
    thinners/bleeding disorder, poor blood flow, near a large vessel or tendon, significant
    pain, infection first) · "the wound may look bigger after debridement."
  - **`/services/total-contact-casting/`** — cast changes "usually every 1 to 2 weeks" ·
    "often 6 to 12 weeks" · "many ulcers close in 6 to 12 weeks" · "considered the most
    effective way" to offload a plantar DFU · "do not drive" with a right-foot cast; ask about
    a left-foot cast with an automatic · shower with a waterproof cover / shower chair; a wet
    cast is changed · indications (plantar DFU, neuropathic ulcers, post-amputation foot
    wounds, Charcot foot) · closer-look list (poor blood flow, infection/osteomyelitis, very
    deep or heavily draining ulcer, fall risk, large day-to-day swelling, cannot keep dry or
    return) · side effects (rub sores) · blood-sugar statements.
  - **`/services/bioengineered-skin-substitutes/`** — "often once a week, for several
    weeks" · "takes minutes" · "most people feel little during application" · "not improved
    after about 4 weeks of good wound care" / "about a month" (DFU) · product sources (donated
    human tissue incl. amniotic membrane, animal collagen incl. pig/cow, lab-grown cells) ·
    "screened and processed under strict rules" · indications (clean DFU, stalled venous
    ulcers, select pressure ulcers, stalled surgical wounds, some partial-thickness burns) ·
    closer-look list (infection/dead tissue, poor blood flow, malignancy, animal-product
    allergy, tissue-source preferences) · "a sheet sometimes does not take."
  - **`/services/compression-therapy/`** — wrap changes "usually once or twice a week" ·
    worn "day and night until we change it" · stockings "every day," "most people do"
    (lifelong) · ankle–arm pressure comparison (ABI) before any compression, "never skipped" ·
    "weeks to months to close" · indications (venous
    stasis ulcers, chronic leg swelling, leg incisions with swelling, mixed arterial/venous
    "with lighter compression" after ABI) · closer-look list (PAD, uncontrolled heart failure,
    neuropathy, cellulitis, intolerance) · warning signs (numb, pale, or blue toes; worsening
    pain) · walking/elevation advice.
  - **`/services/specialty-wound-dressings/`** — "daily to weekly" change frequency ·
    the dressing-matching table (hydrogel for dry; foam/alginate for heavy drainage;
    silver/iodine/honey for infection risk; enzymatic ointment for dead tissue; collagen for
    deep/stalled; film/hydrocolloid near closure; barrier creams/powders/rings for peristomal
    skin) · nine conditions incl. radiation wounds, peristomal irritation, fistulas (pouching
    systems) · infection signs list · allergy list (adhesives, silver, iodine, latex) · "never
    soak a wound" · "some dressings are waterproof; most are not."
  - **`/services/`** (overview) — the "Often used for" line on each card and the "plan built
    in layers" sequence (debride → offload/compress → dress → advanced therapies).
  - **`/conditions/`** (overview; every statement also appears in the FAQPage schema or the
    MedicalCondition `description`s) — "when to see a specialist" wording: not started
    healing in ~2 weeks / not closed in ~6 / diabetes, poor circulation or vascular disease
    "and a wound of any age"; "a new sore on a numb foot can get worse quickly" ·
    **DFU:** "a leading cause of amputation"; "if it stalls after about a month" → skin
    substitute or HBOT; deep ulcers → wound VAC; Charcot foot grouped here · **arterial:**
    sites (toes, heel, outer ankle), "punched out" with a pale, dry base, night/rest pain
    eased by hanging the leg down, blood-flow test first, "a blocked artery is treated before
    the wound, with a vascular specialist," HBOT "in select cases," compression can "do harm"
    · **venous:** "the most common leg ulcer," valve/pooling mechanism, brown hard skin above
    the ankle, ABI before compression, "compression stockings afterward help keep it from
    coming back" · **pressure:** usual sites (tailbone, hips, heels, ankles), darker-skin
    presentation (purple, warm, firm), "often goes deeper than it looks," pressure relief
    "with families and facility staff," wound VAC for deep ulcers, skin substitute "select
    ulcers" · **surgical:** cause list (infection, fluid under the skin, tension, diabetes,
    poor flow, smoking, medicines), "still open after about 2 weeks," wound VAC "helps many
    open incisions," failing graft / bone infection → HBOT, post-amputation foot wound → TCC
    · **radiation:** onset "months to years later," microvascular scarring, HBOT "one of its
    main uses" · **burns:** ER-first criteria (large or deep; face, hands, feet, genitals),
    "not healing after about 2 to 3 weeks," VAC / skin substitute / HBOT indications ·
    **peristomal:** causes (leak, fit, frequent changes, adhesive allergy, fungal rash),
    "a pouch that lasts less time than it used to" · **fistulas:** causes (abdominal surgery,
    Crohn's, infection, radiation), "some fistulas close once the output is controlled;
    others need surgery," "work with your surgeon" · **operational (client to confirm, not
    clinical):** patients may self-refer; "some insurance plans require a referral"; the
    first-visit description (blood-flow and sensation check); nursing-facility patients
    referred through LeadingReach; the stoma/fistula "before your first visit" list (bring
    pouching supplies, leak notes, surgeon's name, medicines).
  - **`/referring-providers/`** (also in its FAQPage schema) — referral criteria = the
    confirmed 2-week / 6-week / risk-factor rule, reworded for clinicians ("any open wound in
    a patient with diabetes, poor circulation, or vascular disease") · "physician-supervised"
    HBOT sessions · HBOT FAQ indications ("diabetic foot ulcers that have not improved with
    standard care and radiation injury") · "Every plan starts with a physician examination" ·
    "examines and measures the wound and looks for the reason it has not healed" · the
    treatment-plan sequence in step 3 · "Patients go home the same day after every visit."
    Credential statements are the LOCKED framing plus the homepage's Dr. Abanto certification
    sentence — no service-line attributions.
- **(e) Referral workflow facts — `/referring-providers/` `[NEEDS INPUT]`.** The page's
  "How to refer, and what happens next" steps state only what this file confirms (LeadingReach
  or fax → seen at McAllen or Mission, Mon–Fri 8–5, by the multidisciplinary team → outpatient
  treatment). Nothing else is stated until the client answers: time from referral to first
  appointment · who contacts the patient to schedule (our office or the referring office) ·
  required documents (demographics, insurance, wound history, orders, recent labs/imaging) ·
  insurance / prior-authorization handling · referral criteria beyond the 2-week / 6-week /
  risk-factor rule · how the referring office receives consult notes and progress updates
  (LeadingReach, fax, both) · whether fax referrals are acknowledged · whether clinicians
  round at nursing facilities or all care is in-clinic. HTML comments mark where each answer
  goes (steps 1 and 2). Also confirm the page's operational wording: "LeadingReach is our
  preferred channel"; "Facility staff can refer through LeadingReach or by fax"; "Want to
  discuss a patient before you refer? Call…"
- **(d) Provider–service attributions (open)** — the service pages currently use team-level
  framing only. If the client wants named clinicians on specific service pages (e.g. who
  fits wound VACs, who applies casts, who performs sharp debridement), they must confirm each
  assignment; the bios only describe prior roles. Until then, no names beyond the two-ABWM
  sentence and Dr. Abanto on HBOT.
- **(c) Hyperbaric chamber facts** — which location(s) house the chamber(s) (McAllen,
  Mission, or both), how many, and monoplace vs. multiplace. The HBOT page deliberately says
  nothing location-specific and describes the chamber generically until this is answered;
  the Locations page and any "HBOT in McAllen/Mission" copy depend on it. **If the chamber
  is at only one clinic, the HBOT H1 and title must change to that city** (and the ES
  twin, the glance panel, the homepage flagship blurb and the schema `howPerformed` follow).

**Backfillable (build against placeholders):** provider photos, hero/cta backgrounds, service
imagery, og-image, social URLs (footer links + schema `sameAs` stay out until confirmed), any
service-detail the client wants to tweak,
reviews/reputation status.

**Not blockers:**
- **Logo source:** no high-res/vector wordmark exists — `wordmark.png` is the production logo.
  After the homepage gate, propose an SVG redraw for Juan's approval (crisp footer/print use;
  also unlocks the 512px icon).

**Resolved:**
- **Team = the 6 providers above, final.** The live site's team banner shows a 7th person —
  do NOT add them, and do NOT use that banner photo anywhere on the new site (it shows someone
  no longer on the team).

**Bilingual:** all `/es/` copy AI-translated at build; bilingual staff review before launch.

## DECISIONS log
- ✅ Full rebuild (not refresh). ✅ Keep domain `wound-institute.com` → www on Vercel.
- ✅ Bilingual EN/ES. ✅ Keep LeadingReach (provider referrals + appt request) + ADD GHL (patient
  capture + chat). ✅ Two locations, shared hours Mon–Fri 8–5. ✅ 6 providers (Cassandra removed).
- ✅ Brand: blue/cyan/teal-on-dark (distinct from STVI navy/red/gold and Thrive navy/teal-wellness).
- ✅ Conditions: ONE overview page `/conditions/` with anchored sections; no separate condition
  pages at launch; DFU intent served by Total Contact Casting.
- ✅ Provider page: nav "For Providers" / H1 "For Referring Providers" / slug
  `/referring-providers/` / button "Refer a Patient" → LeadingReach.
- ✅ Founding year: not displayed anywhere; no tenure dates in bios; no "co-founded."
- ✅ Credentials: Dr. Abanto not titled "Certified Wound Specialist"; framing = two ABWM-certified
  specialists (Sobrevilla CWSP, Martinez RN CWS) + hyperbaric-trained internist + NPs.
- ✅ Schema: Physician for MDs only; Person for RN/NPs.
- ✅ CTA routing: "Request an Appointment" → /contact/ (GHL primary, LeadingReach appt secondary);
  "Refer a Patient" → LeadingReach direct. GHL form = contact info only unless BAA confirmed.
- ✅ Slug table locked (EN + ES). ✅ "Painless" removed from claims.
- ✅ Color tokens: template token roles kept (button blue = `--color-accent` `#306FAB`, cyan =
  `--color-accent-bright` `#5CC6D2` on dark only); hexes measured from the wordmark.
  `--color-dark` `#0A0E1A` locked as a design decision.
- ✅ Logo: horizontal wordmark only — no circle badge. `wordmark.png` is the production logo;
  never rendered above ~72px tall; no upscaling. SVG redraw proposed after the homepage gate.
- ✅ Team: 6 providers, final. Live team banner photo is not used anywhere.
- ✅ Gate 1 (homepage) approved 2026-10-05. Font pairing Sofia Sans Semi Condensed (display) +
  Atkinson Hyperlegible Next (body); plain-zero rule for phone/fax/hours/addresses via `.num`;
  `site.css` + `site.js` are the shared design system; social links + `sameAs` out until the
  URLs are confirmed; no comparative healing-outcome claims in copy.
