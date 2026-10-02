# Vinesh Portfolio — v2 (Vite + React + Tailwind + GSAP + Three.js)

A cinematic, scroll-driven portfolio for Vinesh: Python & Generative AI developer building
RAG systems, backend APIs, and practical AI products.

## Stack

- **Vite + React 19** — fast dev/build, component UI
- **Tailwind CSS v4** — utility styling + responsive grid systems in `src/index.css`
- **GSAP + ScrollTrigger** — scrubs animation timelines to scroll position:
  hero scroll-out, section reveals, pinned horizontal project gallery, scrubbed journey stack
- **Three.js via @react-three/fiber** — GPU particle field (custom GLSL shader)
  + wireframe core that reacts to the mouse and page scroll
- **Lenis** — buttery smooth scrolling, synced with GSAP tickers and anchor navigation

## Experience highlights

- **Preloader (0→100%)** with curtain exit before the hero entrance plays
- **Custom cursor** — dot + trailing ring that expands over links/buttons (fine pointers only)
- **Scroll journey** — sticky, scrubbed card stack with progress fills (`#journey`)
- **Pinned projects rail** — vertical scroll drives a horizontal gallery on desktop,
  native swipe/scroll on mobile
- **Mobile menu** — full-screen overlay with staggered links
- **Responsive grids** — Tailwind grids collapse cleanly from 4/3 columns to 1 column

## Run it

```bash
npm install
npm run dev
```

Then open the printed `http://localhost:5173` URL.

Production build:

```bash
npm run build
npm run preview
```

## Your photo

The hero card loads `public/profile.png` (keep the same filename to swap portraits —
no code changes needed). If the file is missing, the card falls back to a "V" monogram.

## Previous version

The original static site (HTML/CSS/vanilla JS) is preserved in `legacy-static/`.

