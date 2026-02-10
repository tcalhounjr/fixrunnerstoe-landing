# Next.js Project Setup

## Project Structure

```
fixrunnerstoe/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global Tailwind styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section
│   ├── ProductShowcase.tsx # Product showcase section
│   └── Footer.tsx          # Footer section
├── public/                 # Static assets
├── lib/                    # Utility functions
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.js
└── .eslintrc.json
```

## Configuration Files

### package.json
- **Next.js**: Latest version (15.1.3)
- **React**: 19.2.4
- **TypeScript**: 5.8.2
- **Tailwind CSS**: 3.4.17
- **PostCSS**: 8.4.49
- **Autoprefixer**: 10.4.20

### tsconfig.json
- Target: ES2022
- JSX: preserve (for Next.js)
- Path alias: `@/*` → root directory
- Strict type checking enabled

### tailwind.config.ts
- Content paths configured for `pages/`, `components/`, and `app/` directories
- Ready for custom theme extensions

### postcss.config.js
- Tailwind CSS plugin configured
- Autoprefixer for browser compatibility

### .eslintrc.json
- Extends Next.js core web vitals preset

## Getting Started

### 1. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Run Development Server
```bash
npm run dev
# Server runs at http://localhost:3000
```

### 3. Build for Production
```bash
npm run build
npm start
```

## Component Structure

All components use:
- `'use client'` directive for client-side features
- Functional components with TypeScript
- Tailwind CSS for styling
- No external UI libraries (pure CSS)

### Existing Components

1. **Header** - Fixed navigation with scroll detection
2. **Hero** - Full-screen hero section with video background
3. **ProductShowcase** - Product feature display with video
4. **Footer** - Footer with branding and social links

## Styling

- **Global Styles**: `app/globals.css`
- **Utilities**: Tailwind CSS utility classes
- **No Custom CSS**: All styling via Tailwind classes

## Adding New Pages

1. Create a new directory in `app/` (e.g., `app/about/`)
2. Add a `page.tsx` file
3. Next.js automatically creates routes

Example:
```
app/
├── page.tsx         → /
├── about/
│   └── page.tsx     → /about
└── products/
    └── page.tsx     → /products
```

## Adding New Components

Create components in the `components/` directory and import them:

```typescript
import Header from "@/components/Header";

export default function Page() {
  return <Header />;
}
```

## Environment Variables

- Add variables to `.env.local` (local development)
- Public variables should start with `NEXT_PUBLIC_`
- See `.env.example` for template

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Run dev server: `npm run dev`
3. ✅ Create new pages in `app/` directory
4. ✅ Add components to `components/` directory
5. ✅ Customize theme in `tailwind.config.ts`
