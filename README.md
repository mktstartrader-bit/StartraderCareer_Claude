# STARTRADER Careers

A 6-page career website for STARTRADER, built from the Figma source
(`StarCareer_UI-UX`) as plain HTML, CSS and JavaScript. No framework, no build
step, no dependencies — open the folder in any static server and it runs.

## Run

Any static server works (VS Code Live Server, `npx serve`, etc.). Built in:

```bash
npm run dev        # http://localhost:5173
```

Open `http://localhost:5173/` — not `file://`, since paths are root-absolute.

## Structure

```
index.html            Home
about.html            About Us
starscout.html        Jobs
starlife.html         Culture
starsocial.html       CSR
starblog.html         Article index + Starcast player
starblog/<slug>.html  12 article pages, one file each
css/styles.css        The whole design system
js/main.js            All behaviour
img/                  Images and icons
starlife/             Gallery clips
banner-video.mp4      Homepage banner
```

Header and footer are repeated in each page — there is no templating layer.
Edit one, then mirror the change across the others.

## Design system

Tokens are CSS custom properties at the top of [css/styles.css](css/styles.css):
brand blue `#0047bb`, navy gradient `#000 → #001489`, logo navy `#0d0d4b`, cyan
accent `#16e9d7`, ink `#1c1f2a`, hairline `#dae3ed`. Font: Plus Jakarta Sans,
with Montserrat for numerals and small caps.

Shared pieces: `.shell` (page gutters), `.btn`, `.eyebrow`, `.frame` (the common
image treatment), `.accordion`, `.glass-card`, `.cta-panel`, `.marquee`.

## Motion

One easing (`cubic-bezier(.22, 1, .36, 1)`), 200–600ms. Driven by data
attributes that [js/main.js](js/main.js) picks up:

| Attribute / class | Effect |
|---|---|
| `data-reveal` | Fade + slide up on scroll. `data-reveal-delay`, `data-reveal-y` tune it. |
| `data-stagger="0.09"` | Reveals direct children in sequence. |
| `.mask-line` | Inner content slides up out of an overflow clip. |
| `.mask-wipe` | A brand panel covers the frame, then wipes away. |
| `.sweep` | Hairline divider whose blue→cyan fill sweeps in. |
| `data-parallax="26"` | First child drifts ±26px as the wrapper crosses the viewport. |
| `data-counter="30"` | Counts up when scrolled into view. |

Elements only start hidden once JS is confirmed running (an inline
`document.documentElement.className += " js"` in each `<head>`), so the page
stays readable if the script fails. `prefers-reduced-motion` is honoured
throughout.

## Interactive components

Accordions, the click-to-play banner video, autoplay-on-screen gallery clips
with a sound toggle, StarScout search/filters/expandable rows, StarBlog category
tabs with pagination, the Starcast audio player, and the article
table-of-contents scroll spy. All live in `js/main.js` behind feature guards, so
the single file is safe to load on every page.

## Notes

- Imagery, the logo and icons were exported from the Figma file into `img/`.
  The raw Figma exports stay in `Assets/` (gitignored).
- `npm run shot` captures headless-Chrome screenshots for visual checks.
- Deploys to Vercel as a static site — [vercel.json](vercel.json) only sets
  `cleanUrls`, so `/about.html` also serves at `/about`.
