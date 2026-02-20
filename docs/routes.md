# OnChainers Lab — Routes & Component Tree

This document defines the exact route map and the component structure for each page. It’s written so you (or Cursor) can implement consistently without revisiting old chats.

---

## 0) Global app architecture

### Route groups

- **Marketing:** `src/app/(marketing)/...`  
  Landing, Community, Legal
- **App:** `src/app/(app)/...`  
  Marketplace dashboard shell

### Global wrappers

- `src/app/layout.tsx`
  - loads fonts (Space Grotesk + Inter)
  - imports `globals.css` (which imports `tokens.css`)
  - wraps pages with `<html className="bg-glow">` or applies background container

### Shared layout components

- `src/components/layout/site-header.tsx`  
  Used on marketing pages (Landing, Community, Legal)
- `src/components/layout/site-footer.tsx`  
  Used on marketing pages (Landing, Community, Legal)
- `src/components/layout/app-shell.tsx`  
  Used on marketplace and internal app pages (if expanded later)
- `src/components/layout/filter-panel.tsx`  
  Desktop filters
- `src/components/layout/filter-drawer.tsx`  
  Mobile filters (Drawer)

---

## 1) Route map (final)

### Marketing

- `/` Landing
- `/community`
- `/submit`
- `/developers`
- `/developers/[slug]`
- `/projects/[slug]`
- `/legal/privacy`
- `/legal/terms`

### App (dashboard)

- `/marketplace`

> Note: `/developers`, `/projects/[slug]`, `/submit` are “app-like” pages but can remain outside route groups if preferred. For consistent UX, keep them visually aligned with the dashboard styling.

---

## 2) UI primitives (must exist)

Located in `src/components/ui/`:

- `button.tsx`
- `card.tsx`
- `badge.tsx`
- `input.tsx`
- `select.tsx`
- `multiselect.tsx`
- `tabs.tsx`
- `drawer.tsx`
- `modal.tsx`
- `toast.tsx`
- `skeleton.tsx`
- `empty-state.tsx`
- `avatar-stack.tsx`

---

## 3) Data + helpers (frontend-first)

### Data

- `src/data/developers.ts` (3 devs)
- `src/data/projects.ts` (10 projects)

### Helpers

- `src/lib/filters.ts`
  - `applyProjectFilters(projects, filters)`
  - `applyDeveloperFilters(devs, filters)`
  - `sortProjects(projects, sortKey)`
  - `deriveFacetCounts(...)` (optional)
- `src/lib/storage.ts`
  - `getSubmissions()`
  - `saveSubmission(item)`
  - `removeSubmission(id)`
- `src/lib/constants.ts`
  - chains: Solana/Base
  - types: Game/Tool
  - status options
  - tag list (optional seed)

---

## 4) Route-by-route component tree

## 4.1 `/` Landing (marketing)

**File:** `src/app/(marketing)/page.tsx`

**Wrapper**

- `<SiteHeader />`
- `<main>`
- `<SiteFooter />`

**Main sections (in order)**

1. `sections/hero.tsx`
   - H1 title + tagline
   - Primary CTA → `/marketplace`
   - Secondary CTA → `/community`
   - Side panel “Now Building” stats

2. `sections/featured-projects.tsx`
   - Pull `projects.filter(p => p.featured)`
   - Render with `<ProjectCard />` in grid

3. `sections/categories.tsx`
   - Two tiles (Game/Tool)
   - CTAs link to `/marketplace?type=game` and `/marketplace?type=tool`

4. `sections/why-onchain.tsx`
   - Bullet list (from content.md)

5. `sections/team-highlight.tsx`
   - 3 `<DeveloperCard />` linking to `/developers/[slug]`

6. `sections/faq.tsx`
   - Accordion style (can be simple collapsible cards)

**Components used**

- UI: Button, Card, Badge
- Composite: ProjectCard, DeveloperCard (in `components/...`)

**States**

- No heavy loading (local data). Still include graceful fallback for empty featured list:
  - `<EmptyState title="No featured projects yet" ... />`

---

## 4.2 `/marketplace` Marketplace dashboard (core app)

**File:** `src/app/(app)/marketplace/page.tsx`

**Wrapper**

- `<AppShell>` (sidebar nav)
  - `<MarketplaceTopBar />` (search, sort, view toggle, filter button mobile)
  - Layout: left filters + main results

**Key components**

- `layout/app-shell.tsx`
  - Desktop sidebar nav: Marketplace, Developers, Submit, Community
  - Mobile: drawer nav
- `layout/filter-panel.tsx` (desktop)
- `layout/filter-drawer.tsx` (mobile)

**Top bar content**

- `<Input>` with search icon (placeholder: “Search projects…”)
- `<Select>` sort (Featured/Newest/Trending)
- `<Tabs>` view toggle (Grid/List)
- (Mobile) `<Button>` “Filters” opens FilterDrawer

**Main content**

- `<ResultsHeader />`
  - results count + short filter summary (optional)
- `<ProjectGrid />` OR `<ProjectList />`
  - uses `<ProjectCard />` for grid
  - list uses compact rows + badges + CTA

**Filtering logic**

- Local state: `filters = { q, type, chain, status, devSlugs[], tags[] }`
- Use `applyProjectFilters()` then `sortProjects()`

**States (mandatory)**

- Loading: show skeleton grid for 600ms simulated delay (dev only)
- Empty: `<EmptyState title="No matches found" ... />` with Clear filters button
- Error: defensive catch boundary component if data parsing fails

---

## 4.3 `/projects/[slug]` Project detail

**File:** `src/app/projects/[slug]/page.tsx`

**Wrapper**

- Use the same visual system as marketplace (dark/glass)
- Header can be either:
  - `<SiteHeader />` (marketing header)
  - OR `<AppShell />` (recommended for consistency)
    Choose one and keep consistent across project/dev pages.

**Top section**

- `<ProjectHero />`
  - Cover (gradient/image)
  - Title + one-liner
  - Badges: type, chain(s), status
  - Primary CTA: Open/Play (if liveUrl)
  - Secondary: Website/GitHub/Docs (icon buttons)

**Body sections**

1. About (description)
2. Onchain features (bullets)
3. Media gallery
4. Links (full list)
5. Built by (dev cards)
6. Related projects (same type or shared tags)

**Components used**

- UI: Card, Badge, Button
- Composite:
  - `ProjectHero`
  - `MediaGallery`
  - `DeveloperMiniCard`
  - `RelatedProjects`

**States**

- If slug not found:
  - Render `<EmptyState title="Project not found" ... />` with CTA to Marketplace

---

## 4.4 `/developers` Developer directory

**File:** `src/app/developers/page.tsx`

**Wrapper**

- Recommended: `<AppShell>` for consistent nav
- Top bar: search + filters

**Top controls**

- Search input (placeholder: “Search developers…”)
- Filters:
  - chain focus (Solana/Base)
  - skills multiselect (from dev skills)
- Optional sort: Featured first (based on `featuredProjectSlugs` length)

**Main content**

- Grid of `<DeveloperCard />`
  - shows avatar, name, tagline, chain badges, top 3 skills

**States**

- Loading skeleton (optional)
- Empty state with clear filters

---

## 4.5 `/developers/[slug]` Developer profile

**File:** `src/app/developers/[slug]/page.tsx`

**Top section**

- `<DeveloperHeader />`
  - avatar large
  - name + tagline
  - links row (github, twitter, website, discord, telegram)
  - chain focus badges

**Body sections**

1. About
2. Skills (chips)
3. Featured projects (small grid)
4. All projects (grid/list)
   - derived from projects where devSlug matches

**States**

- Not found state -> `<EmptyState title="Developer not found" ... />`

---

## 4.6 `/submit` Submissions (frontend-only now)

**File:** `src/app/submit/page.tsx`

**Wrapper**

- `<AppShell>` recommended (or header/footer)

**Top**

- Title + subtitle
- `<Tabs>`: Submit Project / Submit Developer

**Forms**

- `<SubmitProjectForm />`
- `<SubmitDeveloperForm />`

**Local persistence**

- Save to localStorage key: `onchainers_submissions`
- Store shape:
  - `{ projects: PendingProjectSubmission[], developers: PendingDevSubmission[] }`

**Pending list**

- `<PendingSubmissionsList />`
  - shows locally saved submissions
  - remove button for each item

**States**

- Field-level validation errors (inline)
- Toast success/error

---

## 4.7 `/community` Community hub

**File:** `src/app/(marketing)/community/page.tsx`

**Wrapper**

- `<SiteHeader />` + `<SiteFooter />`

**Content blocks**

- Hero: Join Discord / Join Telegram CTAs
- “What we discuss” tags grid
- Guidelines cards
- Optional: “Featured threads” static cards (placeholder)

---

## 4.8 `/legal/privacy` and `/legal/terms`

**Files**

- `src/app/(marketing)/legal/privacy/page.tsx`
- `src/app/(marketing)/legal/terms/page.tsx`

**Wrapper**

- `<SiteHeader />` + `<SiteFooter />`

**Content**

- Simple, readable legal templates (basic)
- Emphasize no wallet collection by default (unless project-specific)

---

## 5) Component placement (where each lives)

### Sections (landing/community)

- `src/components/sections/hero.tsx`
- `src/components/sections/featured-projects.tsx`
- `src/components/sections/categories.tsx`
- `src/components/sections/why-onchain.tsx`
- `src/components/sections/team-highlight.tsx`
- `src/components/sections/faq.tsx`

### Marketplace composites

- `src/components/marketplace/marketplace-topbar.tsx`
- `src/components/marketplace/results-header.tsx`
- `src/components/marketplace/project-grid.tsx`
- `src/components/marketplace/project-list.tsx`
- `src/components/marketplace/project-card.tsx`

### Developer composites

- `src/components/developers/developer-card.tsx`
- `src/components/developers/developer-header.tsx`

### Detail page composites

- `src/components/projects/project-hero.tsx`
- `src/components/projects/media-gallery.tsx`
- `src/components/projects/related-projects.tsx`

### Submit composites

- `src/components/submit/submit-project-form.tsx`
- `src/components/submit/submit-developer-form.tsx`
- `src/components/submit/pending-submissions-list.tsx`

---

## 6) URL query conventions (marketplace deep links)

Marketplace should support query params:

- `?q=...`
- `?type=game|tool`
- `?chain=solana|base`
- `?status=live|beta|coming_soon`
- `?dev=adnan,dev-two`
- `?tags=Arcade,Wallet`

Rules:

- Landing “Browse Games/Tools” links should prefill `type`.
- “Clear filters” resets query params.

---

## 7) Definition of Done (route completion)

A route is “done” only if:

- Layout matches the layout.md rules
- Typography follows typography.md
- Uses only shared components (no random styling)
- Has loading/empty/error states where applicable
- Keyboard navigation + focus states verified
- Links between routes are correct and consistent
