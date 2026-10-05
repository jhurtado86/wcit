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
| Socials | Facebook, YouTube, Instagram (all active — pull real URLs from current site/profiles) |

---

## Brand color system — derived from the WCIT logo

Palette derived from the logo (blue/cyan gradient "W" wave on a dark badge). The brand's
signature is a **blue–cyan–teal gradient on dark/black** — a clean, modern medical-tech feel.
⚠️ This must read DISTINCT from the sibling medical builds: STVI (navy/red/gold) and Thrive
(navy/teal, wellness). WCIT leans into the **darker, gradient, medical-tech badge aesthetic**.
Define via CSS custom properties + Tailwind theme.extend; never hardcode per page.

| Token | Hex (DERIVE/refine from logo) | Role |
|---|---|---|
| `--color-primary` | `~#4A90C2` (logo wave blue) | Primary brand — buttons, links, key accents |
| `--color-accent` | `~#5BC8D4` (bright cyan/teal — circle outline) | Accent — highlights, eyebrows, icon accents |
| `--color-primary-deep` | `~#3A6B8F` (deep gradient blue) | Hover, secondary, dividers |
| `--color-dark` (canonical) | `~#0A0E1A` (near-black badge bg) | THE dark-section background token (signature) |
| `--color-ink` | `~#2D3E50` (slate-gray from wordmark) | Headings/body |
| `--color-bg` | `#FFFFFF` | Content backgrounds |
| `--color-muted` | `~#5B6B7A` | Secondary text |
| `--color-silver` | `~#CBD6DF` | Borders, chrome |

**FROZEN rules:**
- Blue–cyan gradient is the brand signature — use the gradient intentionally (the "W" wave,
  section accents), not as flat fills everywhere.
- Dark/near-black sections are a signature (from the badge) — use them for depth and contrast.
- `[DERIVE]` exact hexes from `brand_assets/` logo files and refine; values above are approximate.
- No default Tailwind blue/indigo — drive everything from these tokens.

---

## Logo — two versions in hand

- **Circle badge** (dark bg, cyan outline, blue "W" wave, "WOUND CARE INSTITUTE OF TEXAS"
  around the ring) — favicon, mobile mark, dark-section use.
- **Horizontal wordmark** ("WO₂UND CARE / INSTITUTE OF TEXAS" — note the clever O₂ oxygen
  reference tying to hyperbaric O₂ therapy) — nav/header logo on light backgrounds.
- Both decent quality. For the DARK nav/footer, ensure a version that reads on dark (the badge
  works; the wordmark may need a light/white-text variant) — `[DERIVE/create inverted if needed]`.

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
  pages). Each section gets an `id` anchor (e.g. `#diabetic-foot-ulcers`) for deep links from
  service pages and FAQ. NO separate condition pages at launch. Diabetic foot ulcer intent is
  served primarily by Total Contact Casting — do not create a competing DFU page. (Post-launch:
  promote a section to its own page only if GSC shows demand.)
- **Locations** — BOTH McAllen + Mission (addresses, maps, hours, phone).
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

---

## Active Blockers & Backfill

**Launch-blocking:** GHL form + chat widget embeds (Juan providing); og-image; confirm exact
LeadingReach URLs; provider headshots; real location/facility photos.

**Backfillable (build against placeholders):** provider photos, hero/cta backgrounds, service
imagery, og-image, exact brand hexes (derive from logo), social URLs, any service-detail the
client wants to tweak, reviews/reputation status.

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
