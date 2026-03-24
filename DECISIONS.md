# DECISIONS.md

Assumptions and decisions made during implementation.

## Intentional Compatibility Upgrade

This project deliberately targets **Next.js 16 / React 19 / Tailwind CSS 4 / Recharts 3**. These are not accidental version bumps; each was chosen because the APIs used in this project remain stable across the upgrade boundary:

- **App Router behavior unchanged for this scope.** The project uses `layout.tsx`, `page.tsx`, `useSearchParams`, `Suspense`, and `next/font/google` — all of which are stable App Router primitives with no breaking changes between Next 15 and 16 for this usage.
- **Jotai usage remains equivalent.** The atom/derived-atom/`useAtomValue` patterns used here are the same across Jotai 2.x. No `atomWithQuery` or experimental APIs are involved.
- **Recharts output remains equivalent.** `AreaChart`, `BarChart`, `ResponsiveContainer`, and sparkline patterns are unchanged in Recharts 3. The component props and composition model are the same.
- **Tailwind utility workflow and token discipline remain equivalent.** Tailwind v4 replaces `tailwind.config.ts` with `@theme inline` blocks in CSS. The utility-class workflow, arbitrary-value syntax, and responsive-prefix conventions are identical. The project benefits from v4's native CSS custom property integration, which aligns naturally with the semantic token architecture.

No behavioral drift exists for the feature surface this project covers.

## Design Token System

All visual styling flows through a three-layer token architecture defined in `globals.css`:

### Base color scales

Figma-derived scales registered as Tailwind theme colors under `@theme inline`: `brand-50` through `brand-900`, plus custom `gray`, `stone`, `red`, `orange`, `green`, and `purple` scales. These are raw palette values — components should not reference them directly except when building semantic aliases.

### Semantic aliases

Light/dark mode tokens toggle via `:root` and `.dark` class:

| Layer      | Pattern     | Examples                                                                                                                 |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| Background | `bg.*`      | `bg-default`, `bg-subtle`, `bg-muted`, `bg-emphasis`, `bg-inverted`, `bg-info`, `bg-success`, `bg-attention`, `bg-error` |
| Content    | `content.*` | `content-emphasis`, `content-default`, `content-subtle`, `content-muted`, `content-inverted`                             |
| Border     | `border.*`  | `border-emphasis`, `border-default`, `border-subtle`, `border-muted`                                                     |

These are bridged into Tailwind via `--color-surface-*`, `--color-content-*`, and `--color-edge-*` theme tokens, enabling utility classes like `bg-surface-subtle`, `text-content-emphasis`, `border-edge-muted`.

Additional semantic token groups: `status-*`, `toast-*`, `activity-*`, `dropdown-*`, `sidebar-*`, `chart-*`.

### Custom breakpoints

Figma-derived breakpoints registered in `@theme inline` instead of Tailwind defaults:

| Token        | Value  | Usage                             |
| ------------ | ------ | --------------------------------- |
| `mobile`     | 380px  | Small phone lower bound           |
| `tablet-s`   | 744px  | Small tablet                      |
| `tablet-m`   | 834px  | iPad portrait                     |
| `desktop-s`  | 1280px | Compact desktop / sidebar visible |
| `desktop-m`  | 1440px | Standard desktop                  |
| `desktop-l`  | 1680px | Large desktop                     |
| `desktop-xl` | 2000px | Ultra-wide                        |

### Custom font sizes

Non-standard type steps from the Figma spec, registered as theme tokens:

- `text-3xs` (8px/10px) — smallest labels
- `text-2xs` (10px/12px) — secondary metadata
- `text-menu` (12.5px/16px) — sidebar menu items
- `text-search` (13px/16px) — search input
- `text-heading-lg` (28px/28px) — page headings

### Rule: no hardcoded hex in components

All component files reference semantic tokens or Tailwind theme tokens exclusively. Raw hex values live only in `globals.css` where they define the scales and aliases.

## RTL-Safe Layout Strategy

Layout uses CSS logical properties wherever directionality matters:

- `ps-*` / `pe-*` (padding-inline-start / padding-inline-end) instead of `pl-*` / `pr-*`
- `inset-x-*` and `justify-between` for horizontal distribution (already direction-agnostic)
- `flex` and `gap` for spacing (inherently logical)
- `start` / `end` alignment where applicable

Tailwind v4 maps logical-property utilities natively. This means setting `dir="rtl"` on the root element would flip the layout correctly without per-component overrides. The sidebar, mobile header bar, and content grid all use this approach.

## Fonts

- **Figtree** for headings (`font-heading`, `font-sans`), **Inter** for body text (`font-body`). Both loaded via `next/font/google`.
- The initial scaffolding used Geist; replaced with Inter per the Figma spec.

## Responsive Behavior

- **Sidebar**: 224px (`w-56`) fixed on desktop (`desktop-s:` >= 1280px), collapses to a slide-in drawer with overlay on tablet/mobile.
- **KPI cards**: 4-col on xl, 2-col on sm, 1-col on mobile.
- **Main content**: 3/5 + 2/5 grid split on lg+, single column on mobile.
- Mobile hamburger button positioned at top-left.

## State Management

- **Jotai** for all shared state. Individual atoms for period, loading, data, and error. Derived atoms for each dashboard section to minimize re-renders.
- **URL sync**: Period is synced to `?period=` query parameter using `useSearchParams` + `router.replace`.
- No `atomWithQuery` used — simpler async pattern with manual loading/error state in the custom hook.

## Charts

- **Recharts** used for all charts: AreaChart (revenue), custom pipeline bars (framer-motion animated divs with proportional widths), and sparkline mini AreaCharts in KPI cards.
- Pipeline bars use `framer-motion` for width animation rather than Recharts BarChart, as the Figma design shows a simple horizontal bar with labels that doesn't map cleanly to Recharts' BarChart API. The bars are proportional to the max stage value.

## Toast System

- Using **sonner** with custom styling matching the Figma spec: dark background for neutral toasts, colored variants for success/error. Bottom-right positioning, stacking, and action buttons (Undo/Retry).
- All four triggers implemented: period change (neutral), task completion (success + undo), Create button (neutral), API failure (error + retry).

## Dark Mode

- Implemented via `next-themes` with `attribute="class"` and `defaultTheme="light"`.
- Theme toggle in sidebar bottom section.
- All component colors use CSS custom property aliases that automatically switch between light/dark values.

## shadcn/ui

- Uses `radix-maia` style with `hugeicons` icon library as configured by shadcn init.
- Components are customized to use the project's semantic design tokens, not shadcn defaults.

## Deviations from Spec

- **No `atomWithQuery`**: The `jotai/utils` package doesn't export `atomWithQuery` in the installed version. Used a custom hook pattern instead.
- **Pipeline uses motion divs instead of Recharts BarChart**: Provides better pixel-perfect control for the Figma design.
- **Sidebar width 224px = w-56**: Used Tailwind's `w-56` (14rem = 224px) utility class.
