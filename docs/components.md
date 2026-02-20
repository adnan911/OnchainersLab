# OnChainers Lab — Component System (UI + Patterns)

This document defines the reusable components, variants, states, and usage rules for a premium dark/glass + gold accent UI.

**Goal:** ship consistent, premium UI fast — without one-off styling.

---

## 0) Global rules (non-negotiable)

- **Use tokens + 8pt spacing scale** (no random spacing).
- **One-off styles are not allowed** unless justified in `DECISIONS.md`.
- **All components must support:**
  - hover + active
  - disabled
  - focus-visible ring
  - loading (when relevant)
- **Motion:** 150–250ms transitions; respect `prefers-reduced-motion`.
- **Gold/amber is reserved** for primary CTA + active states + featured highlights only.

---

## 1) Base primitives

### 1.1 Button

**Purpose:** primary actions and navigation triggers.

**Variants**

- `primary` (gold): key CTA only
- `secondary` (glass): secondary actions
- `ghost`: low-emphasis actions (toolbar)
- `destructive`: dangerous actions (rare; not gold)

**Sizes**

- `sm`, `md`, `lg` (mobile-friendly hit targets)

**States**

- default, hover, active
- focus-visible (ring)
- disabled (reduced contrast)
- loading (spinner + aria-busy, keep width stable)

**Rules**

- Only one `primary` per page region.
- Button text must be verbs: “Explore”, “View”, “Open”, “Submit”.

---

### 1.2 Card

**Purpose:** glass container for project/dev tiles, panels, sections.

**Variants**

- `glass` (default)
- `elevated` (stronger blur + shadow)
- `featured` (subtle gold glow border/shadow)

**States**

- hover lift: translateY(-2px), border slightly brightens
- focus-within: subtle highlight

**Rules**

- Cards must have consistent padding (16–24) and radius (md or lg).
- Do not apply gold backgrounds; only subtle glow or border accent.

---

### 1.3 Badge / Chip

**Purpose:** show metadata (chain/type/status/tags) + filter chips.

**Variants**

- `chain`: Solana / Base
- `type`: Game / Tool
- `status`: Live / Beta / Coming soon
- `tag`: generic
- `featured` (gold outline)

**Rules**

- Chips used for filters must be keyboard navigable and indicate selected state beyond color (border/icon).

---

### 1.4 Input

**Purpose:** search and forms.

**Features**

- label + helper + error slot
- optional leading icon (search)
- clear button (search only)

**States**

- default, focus, disabled
- error (red border + message)
- success (optional, subtle)

**Rules**

- Always provide labels (visually shown; avoid placeholder-only).

---

### 1.5 Select

**Purpose:** single selection (sort/status/type).

**Rules**

- Use `Select` for < 8 options.
- Must support keyboard: open, arrows, enter, escape.

---

### 1.6 MultiSelect

**Purpose:** filters for tags/devs.

**Behavior**

- selected items appear as chips in the input
- supports search within options
- “Clear all” inside panel

**Rules**

- On mobile, MultiSelect should open a full-width drawer panel for usability.

---

### 1.7 Tabs

**Purpose:** switch between views (Submit Project / Submit Developer, Grid/List).

**Rules**

- Active state uses gold border + label weight, not filled gold background.
- Must be keyboard navigable (arrow keys).

---

### 1.8 Drawer (Sheet)

**Purpose:** mobile navigation + filter panel.

**Rules**

- Focus trap inside drawer
- overlay click closes
- ESC closes
- restore focus to trigger button on close
- aria: role=dialog, aria-modal=true

---

### 1.9 Modal

**Purpose:** confirmations, small instructions.

**Rules**

- Use modals only for short tasks/confirmations.
- Same focus trap + ESC behaviors as Drawer.

---

### 1.10 Toast

**Purpose:** short feedback (Saved, Submitted).

**Variants**

- success, error, info

**Rules**

- Avoid long text.
- Must be screen-reader friendly (aria-live).

---

### 1.11 Skeleton

**Purpose:** loading state for cards and lists.

**Rules**

- Skeleton must match final layout shape to reduce layout shift.
- Show at least 500–800ms simulated delay in dev to verify.

---

### 1.12 EmptyState

**Purpose:** no results / no data.

**Slots**

- title
- description
- primary action (e.g., Clear filters)
- optional secondary action (Submit project)

---

### 1.13 AvatarStack

**Purpose:** show devs on project cards.

**Rules**

- max 3 avatars + “+N” overflow
- must have tooltips or accessible labels

---

## 2) Composite components (marketplace patterns)

### 2.1 ProjectCard

**Displays**

- cover (gradient/image)
- name + one-liner
- badges: chain/type/status
- dev avatar stack
- CTA: View Project
- optional secondary: Open (if liveUrl)

**Interactions**

- whole card clickable to detail (preferred)
- CTA visible for clarity

**States**

- hover, focus
- featured styling if featured=true

---

### 2.2 ProjectGrid / ProjectList

**Grid**

- desktop: 3 columns (lg)
- tablet: 2 columns
- mobile: 1 column

**List**

- one row per project, more metadata visible
- actions on right

---

### 2.3 FilterPanel (desktop)

**Groups**

- Search
- Type
- Chain
- Status
- Devs (MultiSelect)
- Tags (MultiSelect)
- Clear filters button

**Rules**

- Clear group headings
- Keep panel scrollable if tall

---

### 2.4 FilterDrawer (mobile)

**Rules**

- Same content as FilterPanel
- “Apply” button at bottom (sticky)
- “Clear” secondary action

---

### 2.5 SortControl

Options:

- Featured
- Newest
- Trending

---

### 2.6 ViewToggle

- Grid / List
- Use icon + label (not icon-only)

---

### 2.7 ResultsHeader

Shows:

- results count
- current filter summary (optional)
- sort + view toggle

---

## 3) Developer components

### 3.1 DeveloperCard

Shows:

- avatar
- name + tagline
- chain focus badges
- top skills (max 3)
- link to profile

---

### 3.2 DeveloperHeader (profile)

Shows:

- large avatar
- name + tagline
- links row (github, twitter, website)
- chain focus

---

### 3.3 ProjectRail (on profile)

Two sections:

- Featured projects (small grid)
- All projects (grid/list)

---

## 4) Form components (Submit page)

### 4.1 SubmitProjectForm

Fields (minimum):

- name (required)
- oneLiner (required, max 80)
- description (required, max 600)
- type (game/tool)
- chains (solana/base, multi)
- status
- tags (multi)
- devs (select existing + “Other” free text)
- links (liveUrl, website, github, docs, discord, telegram)
- media URLs (coverUrl + screenshots[] as URLs)

Behavior:

- slug auto-generated from name (editable)
- validation inline
- on success: toast + reset form + persist to localStorage

---

### 4.2 SubmitDeveloperForm

Fields:

- name (required)
- tagline (required)
- bio (required)
- roles (multi)
- chain focus (multi)
- skills (multi)
- links (github, twitter, website, discord, telegram)

Behavior:

- slug auto-generated (editable)

---

### 4.3 PendingSubmissionsList

Shows locally stored submissions from `onchainers_submissions`:

- pending projects list
- pending devs list
- ability to remove an item locally

---

## 5) Accessibility requirements per component

- Buttons/Chips/Tabs: visible focus ring (`:focus-visible`)
- Drawer/Modal: focus trap + aria-modal + ESC close
- Form inputs: label + error message linked via aria-describedby
- Icons: decorative icons are aria-hidden; actionable icons must have labels

---

## 6) Testing checklist (frontend)

- Keyboard-only navigation works on all pages.
- Filters fully operable on mobile via drawer.
- Empty state appears and “Clear filters” resets.
- Submit forms validate and persist to localStorage.
- Project/Dev links route correctly.
