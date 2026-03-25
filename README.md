# PropWise CRM Dashboard

Frontend implementation of the PropWise CRM dashboard using Next.js App Router, TypeScript, Tailwind CSS v4, Jotai, Recharts, and Sonner.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

Other useful commands:

```bash
npm run lint
npm run build
npm run start
```

Notes:

- No environment variables are required.
- Data is provided through a local mock API layer in `src/lib/mock-api.ts`.
- The main dashboard route is `/dashboard`.

## Tech Stack

| Technology | Version |
| --- | --- |
| Next.js | 16.2.1 |
| React | 19.2.4 |
| React DOM | 19.2.4 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| Jotai | 2.18.1 |
| Recharts | 3.8.0 |
| Sonner | 2.0.7 |
| next-themes | 0.4.6 |

## Project Structure

```text
.
├── public/
│   ├── Avatar.png
│   ├── Ellipse.png
│   └── bg-ellipse.png
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   └── sidebar.tsx
│   │   └── ui/
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox-circle.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── progress.tsx
│   │       ├── separator.tsx
│   │       ├── skeleton.tsx
│   │       ├── sonner.tsx
│   │       └── tabs.tsx
│   ├── hooks/
│   │   └── use-dashboard.ts
│   ├── icons/
│   │   ├── calendar.tsx
│   │   ├── contacts.tsx
│   │   ├── dashboard.tsx
│   │   ├── deals.tsx
│   │   ├── inbox.tsx
│   │   ├── leads.tsx
│   │   ├── marketing.tsx
│   │   ├── properties.tsx
│   │   ├── reports.tsx
│   │   ├── settings.tsx
│   │   ├── tasks.tsx
│   │   ├── team.tsx
│   │   ├── icon.types.ts
│   │   └── index.ts
│   ├── lib/
│   │   ├── mock-api.ts
│   │   ├── mock-data.ts
│   │   └── utils.ts
│   ├── store/
│   │   ├── dashboard.ts
│   │   └── index.ts
│   └── types/
│       └── dashboard.ts
├── DECISIONS.md
└── package.json
```

## Implementation Notes

- Styling is driven from semantic tokens and custom breakpoints defined in [src/app/globals.css](./src/app/globals.css).
- Shared UI primitives live under [src/components/ui](./src/components/ui).
- Dashboard state is managed with Jotai atoms in [src/store/dashboard.ts](./src/store/dashboard.ts).
- Toast behavior is handled through the custom Sonner wrapper in [src/components/ui/sonner.tsx](./src/components/ui/sonner.tsx).
- Routing and initial dashboard loading are handled in [src/app/dashboard/page.tsx](./src/app/dashboard/page.tsx).

## Documents

- [DECISIONS.md](./DECISIONS.md): implementation assumptions and technical decisions
