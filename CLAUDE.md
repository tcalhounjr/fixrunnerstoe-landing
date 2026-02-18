# CLAUDE.md

This file provides guidance for AI assistants working on this codebase.

## Project Overview

**fixrunnerstoe-landing** is a Next.js marketing landing page for "Elite Shield" — a runner's toe protective product that prevents subungual hematoma. The site is a single-page design with four sections: header, hero, product education, and footer.

- **Stack:** Next.js 15 (App Router), React 19, TypeScript 5.8, Tailwind CSS 3
- **Dev port:** 5173 (non-standard; configured via `-p 5173` in scripts)
- **No testing infrastructure** is currently configured.

---

## Commands

```bash
npm run dev       # Start development server at http://localhost:5173
npm run build     # Production build
npm start         # Run production server at http://localhost:5173
npm run lint      # Run ESLint
```

---

## Repository Structure

```
fixrunnerstoe-landing/
├── app/
│   ├── layout.tsx        # Root layout; sets page metadata
│   ├── page.tsx          # Home page; composes all four components
│   └── globals.css       # Tailwind imports + global CSS reset
├── components/
│   ├── Header.tsx        # Fixed nav with scroll-triggered background
│   ├── Hero.tsx          # Full-screen video background hero section
│   ├── Education.tsx     # Product showcase with YouTube embed and image
│   └── Footer.tsx        # Footer with background image and social links
├── public/               # Static assets (images, video — ~53MB)
│   ├── rock-climber.mp4          # Hero background video
│   ├── tennis-player.png         # Footer background image
│   └── subungual-hematoma-elite-shield.jpg  # Product image
├── next.config.ts        # Next.js config (currently empty/default)
├── tailwind.config.ts    # Tailwind content paths (no theme extensions)
├── tsconfig.json         # TypeScript config
├── postcss.config.mjs    # PostCSS config for Tailwind
└── .env.example          # Environment variable template
```

---

## Component Architecture

The page renders components in this order (defined in `app/page.tsx`):

```
Home
├── Header     — fixed, z-50, scroll-aware background transition
├── main
│   ├── Hero        — full-screen (h-screen) with autoplay video
│   └── Education   — 5-column grid (3 video + 2 product info)
└── Footer     — 60vh background image section + copyright bar
```

All four components use the `'use client'` directive. `Header` uses `useState`/`useEffect` for scroll detection; the others are effectively static renders.

---

## Styling Conventions

- **Tailwind CSS only** — no CSS modules, no inline styles, no separate component stylesheets.
- **Brand colors:**
  - Red: `red-600` / `red-700` for CTAs and accents
  - Black: `black` / `black/90` for backgrounds and text
  - White: `white` for text on dark backgrounds
- **Typography:** `font-black`, `uppercase`, `tracking-tight` / `tracking-widest` are the dominant type treatments.
- **Responsive breakpoints:** `md:` (768px) and `lg:` (1024px) are used. Mobile-first.
- **Hover animations:** `transition-all duration-300`, `transform hover:scale-105`, `hover:-translate-y-1`, and sliding `bg-red-600` overlays via `scale-x-0 group-hover:scale-x-100 origin-left`.
- **No custom theme extensions** — `tailwind.config.ts` has an empty `theme.extend`.

---

## Key Patterns

### Client Components
All components are marked `'use client'`. When adding new components, use `'use client'` unless the component has no interactivity and no browser-only APIs.

### Image Handling
The codebase intentionally bypasses Next.js `<Image>` optimization in some places using raw `<img>` tags with an ESLint suppression comment:
```tsx
{/* eslint-disable-next-line @next/next/no-img-element */}
<img src="/filename.jpg" alt="..." className="..." />
```
This is an accepted pattern here. Do not replace these with `<Image>` without a reason.

### Apostrophes and Quotes in JSX
Use HTML entities for literal punctuation inside JSX text content to satisfy the `react/no-unescaped-entities` rule:
- `'` → `&apos;`
- `"` → `&quot;`

### Video Element
The hero video uses all four performance attributes:
```tsx
<video autoPlay loop muted playsInline className="h-full w-full object-cover">
  <source src="/rock-climber.mp4" type="video/mp4" />
</video>
```

### Scroll Detection (Header)
```tsx
const [isScrolled, setIsScrolled] = useState(false);
useEffect(() => {
  const handleScroll = () => setIsScrolled(window.scrollY > 50);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```
Threshold is 50px. The class applied is `bg-black/90 backdrop-blur-md py-4 shadow-lg`.

### Dynamic Copyright Year
```tsx
&copy; {new Date().getFullYear()} Elite Performance Protective Technologies.
```

---

## TypeScript

- Strict mode is enabled (`tsconfig.json`).
- No `any` types in the current codebase.
- The `@/` path alias resolves to the project root (configured via `paths` in `tsconfig.json`).
- Component props use inline type annotations rather than separate `interface` declarations (consistent with the small component footprint).

---

## Environment Variables

A `.env.example` is provided as a template. Currently no environment variables are required to run the project. Any public runtime variables must be prefixed `NEXT_PUBLIC_` to be accessible in the browser.

---

## What Does Not Exist (Yet)

- **Tests:** No test runner, no test files. If adding tests, Vitest + React Testing Library is a reasonable choice for this stack.
- **CI/CD:** No GitHub Actions or other pipeline configuration.
- **API routes:** No `app/api/` directory; this is a pure frontend site.
- **State management:** No Redux, Zustand, or similar. Only local `useState`.
- **Multiple pages:** All content is on a single route (`/`).
- **E-commerce integration:** Buttons say "Shop Now" but no cart or payment logic exists.
