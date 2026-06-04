# STARTRADER Careers

A faithful, production-grade 6-page career website for STARTRADER, built from the
Figma source (`StarCareer_UI-UX`) with React + Tailwind + Framer Motion.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build
```

## Pages (routes)

| Route | Page | Figma frame |
|-------|------|-------------|
| `/`           | Homepage          | `8176:421` |
| `/starscout`  | CareerScout (jobs)| `8181:605` |
| `/about`      | CareerAbout       | `8212:2379` |
| `/starlife`   | CareerLife        | `8192:616` |
| `/starsocial` | CareerSocial      | `8197:996` |
| `/starblog`   | CareerBlog        | `8197:1627` |

## Design system

- **Tokens** live in [tailwind.config.js](tailwind.config.js) — brand blue `#0047bb`,
  navy gradient `#000→#001489`, logo navy `#0d0d4b`, cyan accent `#16e9d7`, ink
  `#1c1f2a`, hairline `#dae3ed`. Font: Plus Jakarta Sans.
- **Shared components**: `Navbar`, `Footer`, `Logo` (composed from the original SVG
  vectors), `Eyebrow`, `Accordion`, `Carousel`, plus section primitives `CtaBand`,
  `CollageHero`, `IconFeatures`.
- **Motion** (`src/lib/motion.ts` + `src/components/motion/`): one easing
  (`cubic-bezier(.22,1,.36,1)`), 200–600ms, scroll reveals, staggered grids,
  hero/collage parallax, sticky-nav shadow shift, route transitions, animated
  accordions/tabs. Fully honours `prefers-reduced-motion`.

## Notes

- All imagery, the logo, and icons were exported from the Figma file
  (`src/assets/`). A few gallery tiles that were unfilled placeholders in Figma
  reuse the project's photo pool under a cohesive navy tint, matching the design's
  dark-gallery treatment.
- Verified against the Figma frames with headless-Chrome screenshots
  (`npm run shot`) at desktop, tablet, and mobile widths.
