# OnChainers Lab — Layout System

This document defines the layout rules and reusable page structures for a premium, gaming-first web app (Landing + Marketplace + Profiles). It is designed to be consistent, responsive, and implementation-friendly.

---

## 1) Layout principles (non-negotiable)

- **Mobile-first**: design starts at 360–430px width, then scales up.
- **One primary CTA per screen**: reduce decision fatigue.
- **8pt spacing system** everywhere: no arbitrary spacing.
- **Clear hierarchy**: users should understand “where am I / what can I do / what’s next” in 3 seconds.
- **Predictable grid**: alignment and rhythm must be consistent across pages.
- **States are part of layout**: loading / empty / error must occupy the same regions as content.

---

## 2) Grid + container rules

### Container widths

- **Max content width (desktop)**: `1200px`
- **Wide sections (hero only)**: full width, but inner content still constrained to 1200px
- **Content padding (x-axis)**:
  - Mobile: `16–20px`
  - Tablet: `24px`
  - Desktop: `32px`

### Column grids (guidance)

- Mobile: 1 column layout (stacked)
- Tablet: 2 columns where beneficial
- Desktop: 12-column grid conceptually, but implement using Tailwind + CSS grid

### Gutters

- Standard gutter between columns: `24px` (desktop), `16px` (mobile)

---

## 3) Spacing scale (8pt)

Use these values only:

- `8, 16, 24, 32, 48, 64`

Recommended mapping:

- Inside small components (chip, button): `8–12` (rounded to 8 or 16)
- Inside cards: `16–24`
- Between related elements: `16–24`
- Between sections: `48–64`

---

## 4) Responsive breakpoints (implementation-friendly)

Suggested breakpoints (Tailwind defaults are fine):

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

Behavior rules:

- **Marketplace filters**:
  - Desktop (lg+): persistent left panel
  - Mobile/tablet: filter drawer (sheet)
- **Tables**:
  - Avoid tables on mobile; use stacked “rows-as-cards” or a detail view

---

## 5) Page anatomy templates (reusable)

### A) Marketing page template (Landing / Community)

**Structure**

1. Sticky header (glass)
2. Hero section (glow band + CTA)
3. Section blocks (cards/grids)
4. Footer

**Recommended hero layout**

- Left: Title, tagline, 2 CTAs
- Right: “Now Building” glass panel OR featured cards preview

**Section pattern**

- Section header (title + short subtitle)
- Content (grid/cards)
- Optional: “View all” link

---

### B) Marketplace template (Dashboard shell)

**App Shell layout**

- Desktop:
  - Left sidebar nav (thin)
  - Left filter panel (medium width)
  - Main content (grid/list)
- Mobile:
  - Top bar (search + filter button)
  - Filters in drawer

**Regions**

1. App top bar:
   - Search
   - Sort dropdown
   - Grid/List toggle
   - (Mobile) filter button
2. Filters region:
   - Type (Game/Tool)
   - Chain (Solana/Base)
   - Status
   - Dev multiselect
   - Tags multiselect
   - Clear filters
3. Content region:
   - Results count
   - Cards grid / list
   - Pagination (optional later)

---

### C) Detail page template (Project / Developer)

**Project detail**

- Header: Cover + title + badges + primary link CTA
- “Onchain features” list
- Media gallery
- Links section
- Built-by devs (cards)
- Related projects

**Developer detail**

- Header: avatar + name + tagline + links
- Skills + chain focus badges
- Featured projects
- All projects

---

## 6) Card + surface system (premium glass)

### Surface types

- **Base page background**: deep charcoal + subtle radial glows
- **Surface 1 (glass)**: primary card surfaces
- **Surface 2**: elevated panels (hero side cards, drawers)

### Card rules

- Use consistent radius (md or lg)
- Border: subtle 1px line (white @ ~10% opacity)
- Shadow: soft, layered (no harsh drop shadows)
- Hover: translateY(-2px) + slight border brighten (subtle)

### Featured emphasis

- Featured cards may get a faint gold glow:
  - **only** on small highlights (badge border, CTA, active states)

---

## 7) Navigation layouts

### Header (marketing)

- Left: Brand
- Middle: links (Marketplace, Developers, Community, Submit)
- Right: Primary CTA (Explore Marketplace), secondary (Join Community)

### Dashboard navigation

- Sidebar (desktop):
  - Marketplace
  - Developers
  - Submit
  - Community
- Mobile: hamburger opens drawer

---

## 8) Layout for states (must implement)

For every data region (marketplace list, dev list, related projects):

- **Loading**: skeletons occupying same layout slots as cards
- **Empty**: message + “Clear filters” + CTA (Submit / Marketplace)
- **Error**: short message + retry button

---

## 9) Accessibility layout rules

- Focus rings must be visible on all interactive elements.
- Drawer/modal must trap focus and restore focus on close.
- Tap targets should be comfortably large on mobile (buttons, chips, icons).
- Don’t rely on color alone to indicate active state (use border, icon, label).

---

## 10) Implementation notes (Tailwind patterns)

Recommended primitives:

- Container: `max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8`
- Grids:
  - Cards: `grid gap-4 sm:gap-6 lg:grid-cols-3 md:grid-cols-2`
- Sticky header: `sticky top-0 backdrop-blur border-b`

Keep layout logic centralized:

- `AppShell` for dashboard layout
- `Section` component for consistent marketing sections
