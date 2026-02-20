# OnChainers Lab — Typography System

This document defines the type scale, font pairing, and usage rules for a premium gaming-first UI with strong readability and modern aesthetics.

---

## 1) Font pairing

### Primary fonts (recommended)

- **Display (headlines):** Space Grotesk
- **UI (body + components):** Inter

Why this works:

- Space Grotesk feels modern and premium without being “finance-corporate”.
- Inter is clean, highly readable, and excellent for UI density.

Implementation (Next.js):

- Use `next/font/google` and define CSS variables:
  - `--font-display`
  - `--font-ui`

---

## 2) Type scale (mobile-first)

Use this scale consistently:

### Headlines

- **H1 (Hero Title):** 32–40px, 700 (display)
- **H2 (Section Title):** 20–24px, 650/700 (display)
- **H3 (Card Title):** 16–18px, 600 (ui or display)

### Body + UI

- **Body (default):** 14–16px, 400–500 (ui)
- **Body strong:** 14–16px, 600 (ui)
- **Label (forms):** 12–13px, 500–600 (ui)
- **Meta (helper text):** 12–13px, 400 (ui)
- **Badge/Chip:** 12px, 600 (ui)
- **Button text:** 14px, 600 (ui)

Line-height guidance:

- Titles: 1.15–1.25
- Body: 1.5–1.65
- Labels: 1.3–1.4

---

## 3) Hierarchy rules (how to apply)

### Page header pattern

- Page Title (H2/H1 depending on page)
- Subtitle (meta)
- Primary CTA (button)

### Card pattern

- Card Title (H3)
- One-liner (body/meta)
- Badges (chip)
- Action CTA (button or link)

### Forms pattern

- Label (12–13px, 600)
- Helper text (12–13px, 400)
- Error text (12–13px, 500, high-contrast)
- Input text (14–16px)

---

## 4) Color usage for text (dark UI)

Prefer “soft whites” instead of pure white:

- **Primary text:** ~92% white opacity
- **Secondary text:** ~72%
- **Tertiary/meta:** ~52%

Gold/amber usage:

- Only for:
  - primary CTA text/background
  - active chips/tabs
  - featured badge highlight
- Never use gold for long paragraphs (fatiguing).

---

## 5) Link styling (premium + clear affordance)

Links must look clickable:

- Default: slightly brighter than body text + underline on hover
- In dense UI (tables/lists): use icon + label or subtle underline

---

## 6) Number + metric styling (marketplace feel)

For stats (e.g., “Trending score”, “10 projects shipped”):

- Use UI font, 600 weight
- Slightly larger than nearby body text
- Keep consistent alignment

---

## 7) Accessibility typography essentials

- Don’t use body text under **14px** for primary reading.
- Ensure contrast is sufficient for:
  - helper text (still readable)
  - disabled states (still legible)
- Respect user settings:
  - `prefers-reduced-motion` (not typography but affects animated text)
- Avoid all-caps for long labels; if used, increase letter-spacing slightly.

---

## 8) “Do / Don’t” examples

### Do

- Keep one dominant headline per screen.
- Use consistent scale across pages.
- Use secondary text for supporting details (not competing with title).

### Don’t

- Mix too many font weights (max 3 weights recommended: 400, 600, 700).
- Use gold for paragraphs.
- Use multiple different heading sizes in the same section.

---

## 9) Recommended Tailwind mapping (optional guideline)

- H1: `text-3xl sm:text-4xl font-bold tracking-tight`
- H2: `text-xl sm:text-2xl font-semibold tracking-tight`
- H3: `text-base sm:text-lg font-semibold`
- Body: `text-sm sm:text-base`
- Meta: `text-xs sm:text-sm text-white/60`
- Label: `text-xs font-semibold text-white/80`

Use `font-display` for H1/H2; use `font-ui` for most UI.

---

## 10) Content tone (microcopy style)

- Short, confident, “builder” tone.
- Use verbs for CTAs:
  - Explore Marketplace
  - View Project
  - Open App
  - Join Community
  - Submit Project
- Keep subtitles to one line where possible.
