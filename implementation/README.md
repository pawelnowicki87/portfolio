# Paweł Nowicki — Portfolio (production-ready React)

A drop-in replacement of your `src/` folder. Built on top of **Create React App** with the visual language of the Voka Design System (Golos Text + teal/ink palette) pushed into a cinematic dark direction.

## What's inside

```
implementation/
├── public/
│   ├── cv_en.pdf
│   ├── cv_pl.pdf
│   ├── favicon.png
│   ├── index.html
│   └── fonts/
│       └── GolosText-VariableFont_wght.ttf
├── src/
│   ├── App.js               ← root, theme + language + scroll state
│   ├── App.css              ← all design tokens + section styles
│   ├── index.css            ← reset
│   ├── index.js             ← React 18 bootstrap
│   ├── texts.js             ← PL/EN copy (extended from your original)
│   ├── hooks.js             ← useInView, useTypewriter, useScrollActive
│   ├── components/
│   │   ├── Nav.js
│   │   ├── Hero.js
│   │   ├── HeroScene.js     ← Three.js wireframe sphere + particles
│   │   ├── About.js
│   │   ├── Skills.js
│   │   ├── Projects.js
│   │   ├── Testimonials.js
│   │   ├── Contact.js       ← EmailJS wired
│   │   ├── Footer.js
│   │   ├── Icon.js          ← inline SVG icon set
│   │   └── CountUp.js
│   └── image/               ← all project screenshots
└── package.json             ← updated dependencies
```

## Installation

```bash
# 1) Copy this folder over your existing portfolio
cp -r implementation/* /path/to/portfolio/

# 2) Install new dependency
cd /path/to/portfolio
npm install three@0.160.0

# 3) (Optional) prune things you no longer need
npm uninstall bootstrap react-bootstrap react-icons react-toastify

# 4) Run
npm start
```

> **Note** — this build no longer uses `bootstrap`, `react-bootstrap`, `react-icons` or `react-toastify`. Everything is hand-rolled CSS + inline SVG, so the JS bundle is much lighter. If you keep them in `package.json` it'll still work — they're just unused.

## EmailJS

The Contact form keeps your existing EmailJS integration. Set these env vars in `.env` (same names as before):

```
REACT_APP_EMAILJS_SERVICE_ID=...
REACT_APP_EMAILJS_TEMPLATE_ID=...
REACT_APP_EMAILJS_PUBLIC_KEY=...
```

You'll need `@emailjs/browser` installed — it's already in your `package.json`.

## What's new vs. the original

- **Hero** — 3D wireframe sphere (Three.js) with orbiting particles, typewriter role, animated count-up stats
- **About** — asymmetric portrait + status badge + 3-step animated career timeline
- **Skills** (new section) — 12 stack tiles with magnetic hover glow and animated proficiency bars
- **Projects** — bento grid (1 feature → 2 half → 3 compact) replacing the Bootstrap Carousel
- **Testimonials** (new section) — 3 glass quote cards
- **Contact** — glow-on-focus inputs, animated send button, kept your EmailJS wiring
- **Nav** — sticky frosted bar with scroll-spy active state, GitHub + LinkedIn icons, language + theme toggles
- **Dark / Light** — kept your toggle, restyled (defaults to **dark**, matches the design)
- **PL / EN** — kept your toggle, every new section is fully translated

## Deploy

`npm run build` then publish `build/` — same as your current `gh-pages` flow. Your `homepage` in `package.json` (`pawelnowicki87.github.io/portfolio`) still works.

## Browser support

Chrome / Edge / Safari / Firefox latest. The 3D scene uses standard WebGL — degrades gracefully if disabled (the page just shows the gradient background).
