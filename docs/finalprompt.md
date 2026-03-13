# OnChainers Lab — FRONTEND One-Shot Master Prompt

You are a top-tier product engineer + senior product designer. Build the FRONTEND first for a premium gaming-first site called “OnChainers Lab”.

---

## GOAL (What to build)

- A premium landing page + marketplace dashboard to showcase onchain games/tools built by our team for Solana + Base.
- Visitors can browse projects, filter by name/type/chain/status/dev/tags, and open project detail pages.
- Developers have portfolio pages and a dev directory.
- Submissions are live now (Submit Project + Submit Developer) using localStorage (no backend yet).
- Community presence: Discord + Telegram pages/CTAs.

---

## TECH (exact)

- Next.js App Router + TypeScript
- Tailwind CSS
- Fonts via next/font/google:
  - Display: Space Grotesk
  - UI: Inter
- Optional: framer-motion ONLY for subtle transitions; must respect prefers-reduced-motion.

---

## STYLE (premium dark/glass, gaming premium)

- Dark-first cinematic background with subtle radial glow bands.
- Glass surfaces/cards: blur + thin border + soft shadow.
- Accent color: GOLD/AMBER for premium feel:
  - Use gold only for: primary CTAs, active chips/tabs, featured badge, small highlights.
  - Avoid large gold backgrounds.
- Micro-interactions only (150–250ms). Support prefers-reduced-motion.
- Use an 8pt spacing system. No random spacing.

---

## DESIGN TOKENS (mandatory)

Create: `src/styles/tokens.css` and import it in `src/app/globals.css`.

Use these exact tokens:

```css
:root {
  /* spacing (8pt scale) */
  --s-1: 8px; --s-2: 16px; --s-3: 24px; --s-4: 32px; --s-5: 48px; --s-6: 64px;

  /* radius */
  --r-sm: 12px; --r-md: 16px; --r-lg: 22px;

  /* backgrounds + surfaces */
  --bg-0: #07080b; --bg-1: #0b0d12;
  --surface: rgba(255,255,255,0.06);
  --surface-2: rgba(255,255,255,0.09);
  --border: rgba(255,255,255,0.10);

  /* text */
  --text-1: rgba(255,255,255,0.92);
  --text-2: rgba(255,255,255,0.72);
  --text-3: rgba(255,255,255,0.52);

  /* gold accent */
  --gold: #f5c451;
  --gold-2: #d9a62d;

  /* shadows */
  --shadow-sm: 0 6px 20px rgba(0,0,0,.35);
  --shadow-md: 0 14px 50px rgba(0,0,0,.45);

  /* glow */
  --glow-gold: 0 0 0 1px rgba(245,196,81,.22), 0 12px 40px rgba(245,196,81,.10);
}

.bg-glow {
  background:
    radial-gradient(600px 300px at 20% 0%, rgba(245,196,81,0.12), transparent 60%),
    radial-gradient(700px 320px at 80% 10%, rgba(245,196,81,0.09), transparent 60%),
    linear-gradient(180deg, var(--bg-0), var(--bg-1));
}


Global application rule (do not guess):

* Apply the background globally by setting `body` (or a top-level wrapper) to use `bg-glow` and the base text color.

  * Example: `body` gets `className="min-h-screen bg-glow text-[color:var(--text-1)]"`

---

## INFORMATION ARCHITECTURE (routes)

* `/` (Landing)
* `/marketplace` (Projects dashboard)
* `/projects/[slug]` (Project detail)
* `/developers` (Dev directory)
* `/developers/[slug]` (Dev profile/portfolio)
* `/submit` (Submit Project + Submit Developer; localStorage)
* `/community` (Discord + Telegram hub)
* `/legal/privacy` and `/legal/terms`

---

## NAVIGATION RULE (non-negotiable)

To avoid inconsistent UX, use ONE navigation system per area:

* Use `AppShell` for:

  * `/marketplace`
  * `/developers`
  * `/developers/[slug]`
  * `/projects/[slug]`
  * `/submit`

* Use `SiteHeader + SiteFooter` only for:

  * `/`
  * `/community`
  * `/legal/`

## DATA (frontend now, backend later)

* Use local typed data sources:

  * `src/data/developers.ts` (3 devs)
  * `src/data/projects.ts` (10 projects)
* Filtering/sorting/search are client-side.
* Architecture must be backend-ready later (keep filter logic in `src/lib`).

---

## PROJECT TYPES / CHAINS (fixed for now)

* Types: `game`, `tool`
* Chains: `solana`, `base`

---

## LAYOUT REQUIREMENTS (must follow)

* Container: max width 1200px, centered
* Desktop marketplace: sidebar nav + left filter panel + main content
* Mobile marketplace: top bar + filter drawer
* Cards grid: lg 3 columns, md 2, mobile 1
* Consistent spacing: 8pt scale

---

## URL QUERY PARAMS (required)

Marketplace filters must sync with the URL so links are shareable:

* Read initial filters from query params (e.g., `?type=game&chain=solana`)
* Update query params when filters change (debounced for search)
* “Clear filters” resets query params

Supported keys:

* `q`, `type`, `chain`, `status`, `dev`, `tags`, `sort`, `view`
  (Comma-separated for multi-select: `dev=adnan,dev-two` and `tags=Arcade,Wallet`)

---

## ESSENTIAL UI COMPONENTS (must implement in src/components/ui)

Button, Card, Badge, Input, Select, MultiSelect, Tabs, Drawer, Modal, Toast, Skeleton, EmptyState, AvatarStack

---

## PAGES — EXACT STRUCTURE

### 1) LANDING (/)

* Sticky glass header with nav: Marketplace, Developers, Community, Submit
* Hero:

  * H1: OnChainers Lab
  * Tagline: “Premium onchain games & tools — built for Solana and Base.”
  * CTAs: Explore Marketplace (primary), Join Community (secondary)
  * Side panel “Now Building”: 10 projects shipped, Onchain-first builds, Solana + Base focus
* Featured projects grid (featured=true)
* Browse by Type tiles (Games / Tools) linking to marketplace with query params
* Why Onchain bullets
* Team highlight (3 dev cards)
* FAQ (accordion)
* Footer with Discord + Telegram buttons + legal links

### 2) MARKETPLACE (/marketplace)

* AppShell layout: sidebar nav (desktop) + mobile nav drawer
* Top bar: Search, Sort (Featured/Newest/Trending), Grid/List toggle, Filters button (mobile)
* Filters:

  * type, chain, status, devs (multi), tags (multi)
  * Clear filters button
* Results area:

  * Results count
  * Grid/List render
  * ProjectCard shows: cover, name, one-liner, badges, dev AvatarStack, CTA (View Project), optional Open/Play if liveUrl
* STATES (mandatory):

  * Loading skeletons (simulate 600ms)
  * Empty state (Clear filters + Submit project CTA)
  * Error fallback (retry)

### 3) PROJECT DETAIL (/projects/[slug])

* Hero: cover + title + badges + primary Open/Play CTA + secondary links (website/github/docs/discord/telegram)
* Sections: About, Onchain features, Media gallery, Links, Built by (dev cards), Related projects (same type/tag)
* Not found state -> EmptyState + link back to marketplace

### 4) DEVELOPERS (/developers)

* Search developers + filters (chain focus, skills)
* Grid of DeveloperCard (avatar, name, tagline, chain badges, top skills)
* States: loading/empty/error

### 5) DEVELOPER PROFILE (/developers/[slug])

* Header: avatar large, name, tagline, links row, chain focus badges
* Sections: About, Skills, Featured projects, All projects
* Not found state

### 6) SUBMIT (/submit)

* Tabs: Submit Project / Submit Developer
* Forms with labels + inline validation + toasts
* Save to localStorage key: `onchainers_submissions`

  * store shape: `{ projects: [...], developers: [...] }`
* Show “Pending submissions (local)” list with remove option

### 7) COMMUNITY (/community)

* Hero with 2 CTAs: Join Discord, Join Telegram
* “What we discuss” tags grid
* Community guidelines list/cards

---

## ACCESSIBILITY (mandatory)

* Keyboard navigation end-to-end
* Visible focus states
* Drawer/Modal: aria-modal, role=dialog, focus trap, ESC closes, restore focus
* Inputs have labels + aria-describedby for errors
* No icon-only actions without labels/tooltips

---

## DELIVERABLES (files required)

* DECISIONS.md (assumptions)
* REQUIREMENTS_TRACE.md (requirements -> file paths)
* MANUAL_QA.md (quick test steps)
* Also add docs:

  * layout.md, typography.md, components.md, content.md, routes.md
    (create them in repo root or /docs)

---

## IMPLEMENTATION ORDER (follow exactly)

1. Create folder structure + base layout + fonts + tokens + globals
2. Build UI primitives (Button/Card/Badge/Input/Drawer/Toast/Skeleton/EmptyState)
3. Add data models + local data (3 devs, 10 projects)
4. Implement filter/sort/search helpers in src/lib
5. Build Landing sections
6. Build Marketplace dashboard + filters + states
7. Build Project detail
8. Build Developers directory + profile
9. Build Submit + localStorage persistence
10. Build Community + Legal pages
11. Fill docs + requirement trace + manual QA

---

## QUALITY GATE (do not finish until done)

* Provide a final checklist mapping each requirement to the implementation file path.
* Ensure no duplicated styles and everything uses shared components/tokens.

---

## SOURCE OF TRUTH (must follow)

You MUST treat these docs as the product spec:

* layout.md
* typography.md
* components.md
* content.md
* routes.md

If anything conflicts, resolve in this priority order:

1. routes.md
2. layout.md
3. typography.md
4. components.md
5. content.md

---

## DECISIONS (append-only)

If any requirement is ambiguous, pick a reasonable default and append it here as a bullet:

* [date] Decision: ...
* Rationale: ...
* Impacted files: ...

---

## REQUIREMENTS TRACE (must output before finishing)

Before you say "done", output a table:

| Requirement                                   | Status (✅/🟡/❌) | Implementation (file paths) |
| --------------------------------------------- | --------------- | --------------------------- |
| Landing sections complete                     |                 |                             |
| Marketplace filters/search/sort + URL sync    |                 |                             |
| Project detail page                           |                 |                             |
| Developers directory + profile                |                 |                             |
| Submit page localStorage                      |                 |                             |
| Community page                                |                 |                             |
| Tokens + fonts applied globally               |                 |                             |
| Accessibility (focus, keyboard, drawer/modal) |                 |                             |
| Loading/empty/error states                    |                 |                             |

---

## MANUAL QA (must output before finishing)

Provide a checklist with steps and expected results:

* [ ] Landing loads, CTAs route correctly
* [ ] /marketplace shows 10 projects
* [ ] Search filters by name (debounced)
* [ ] Filters: type/chain/status/dev/tags work together and sync to URL
* [ ] Sort: Featured/Newest/Trending works
* [ ] Grid/List toggle works and syncs to URL
* [ ] Mobile: filter drawer opens, applies, closes, retains state
* [ ] Project detail loads; not-found shows fallback CTA
* [ ] Developers list filters work
* [ ] Developer profile shows featured + all projects
* [ ] Submit forms validate, save to localStorage, persist after refresh
* [ ] Focus rings visible; keyboard navigation works; ESC closes drawer/modal
* [ ] Reduced motion: animations disabled or minimized

---

## EXECUTION MODE

Implement in this strict order and do not skip steps:

1. Base setup (Next + TS + Tailwind + fonts + tokens + globals)
2. UI primitives (Button/Card/Badge/Input/Drawer/Toast/Skeleton/EmptyState)
3. Data models + local seed data (3 devs, 10 projects)
4. Filter/sort/search logic in src/lib
5. Landing page sections
6. Marketplace page
7. Project detail
8. Developers directory + profile
9. Submit page localStorage
10. Community + legal pages
11. Final requirement trace + QA checklist