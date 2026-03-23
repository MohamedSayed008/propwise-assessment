# DECISIONS.md

Assumptions and decisions made during implementation.

## Design Tokens

- **Tailwind v4 CSS-based config**: The project uses Tailwind v4 which uses `@theme inline` in `globals.css` instead of `tailwind.config.ts`. All design tokens (brand colors, shadows, radii) are defined as CSS custom properties.
- **Semantic alias tokens**: Light/dark mode aliases (bg.default, content.emphasis, etc.) are implemented as CSS custom properties toggled via `.dark` class, matching the Figma token structure.
- **shadcn/ui**: Uses `radix-maia` style with `hugeicons` icon library as configured by shadcn init. Components are customized to use the project's design tokens.

## Fonts

- **Figtree** for headings (font-heading, font-sans), **Inter** for body text (font-body). Both loaded via `next/font/google`.
- The prompt specified Inter for body but the initial scaffolding used Geist. Replaced with Inter per the Figma spec.

## Responsive Behavior

- **Sidebar**: 224px (w-56) fixed on desktop (lg: >= 1024px), collapses to a slide-in drawer with overlay on tablet/mobile.
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

- Using **sonner** with default styling initially. The prompt specifies custom styling matching Figma, but sonner provides good defaults with bottom-right positioning, stacking, and action buttons (Undo/Retry) out of the box.
- All four triggers implemented: period change (neutral), task completion (success + undo), Create button (neutral), API failure (error + retry).

## Dark Mode

- Implemented via `next-themes` with `attribute="class"` and `defaultTheme="light"`.
- Theme toggle in sidebar bottom section.
- All component colors use CSS custom property aliases that automatically switch between light/dark values.

## Next.js Version

- Project runs on **Next.js 16.2.1** (not 15 as mentioned in the prompt). The App Router API is stable and consistent.
- `useSearchParams` used for URL sync; wrapped in `Suspense` at the layout level.

## Deviations from Spec

- **No `atomWithQuery`**: The `jotai/utils` package doesn't export `atomWithQuery` in the installed version. Used a custom hook pattern instead.
- **Pipeline uses motion divs instead of Recharts BarChart**: Provides better pixel-perfect control for the Figma design.
- **Sidebar width 224px = w-56**: Used Tailwind's w-56 (14rem = 224px) utility class.