# Nowicki Engineering Design System

A production-ready design system for **Paweł Nowicki's** full-stack engineering work — scalable enterprise web applications, SaaS dashboards, and data-driven product UIs.

> _"Modern, fast, fully responsive web applications — balancing functionality with design."_ — translated from Paweł's portfolio bio.

---

## Who this is for

**Paweł Nowicki** is a Senior Full-Stack Engineer (Wrocław, Poland) building modern SaaS platforms with **React + Redux Toolkit, NestJS, TypeScript, PostgreSQL/MSSQL, Redis, RabbitMQ, and AWS**. He prefers **Tailwind + Shadcn UI** for the frontend and an **accessibility-first, dark-mode-first** aesthetic in the vein of **Linear, Vercel, Stripe, and Notion**.

This system is built for the surfaces he ships most:
- **Project management** dashboards
- **Event management** consoles
- **E‑commerce** back-offices
- **Analytics** dashboards
- **Education** platforms
- The **personal portfolio** that markets all of the above

---

## Source material

| Source | Path | Notes |
|---|---|---|
| **GitHub – pawelnowicki87/portfolio** | `https://github.com/pawelnowicki87/portfolio` (default branch: `master`) | CRA + react-bootstrap personal portfolio. Provides: the founder portrait, project thumbnails, the original brand-blue accent (`#0d6efd` → evolved to `#3B82F6`), Inter typeface choice, and the dark/light toggle pattern. |
| Brand brief | The user's product brief in this conversation | Defines the SaaS target aesthetic (Linear / Vercel / Stripe / Notion) and the application domains. |

Nothing in `assets/` is generated — every image was imported from the source repo.

---

## File index (root manifest)

```
README.md                ← you are here
SKILL.md                 ← Agent Skill entrypoint
colors_and_type.css      ← all design tokens (CSS vars, dark + light themes)

assets/                  ← brand imagery, logos, project screenshots
  founder-portrait.png   ← Paweł's headshot (hero)
  about-portrait.jpg     ← portrait used in /about
  portfolio-favicon.png  ← original favicon
  react-logo.svg         ← React mark from the CRA scaffold
  projects/              ← real product screenshots from the portfolio
    hematobieg.png
    phone-catalog.png
    welcome-to-the-met.png
    todo-app.png
    list-of-posts.jpg
    game-2048.png

preview/                 ← Design-System-tab cards (one HTML per concept)
ui_kits/                 ← Pixel-faithful product UIs (clickable)
  portfolio/             ← Marketing portfolio (recreation of pawelnowicki87/portfolio)
  dashboard/             ← Generic SaaS dashboard kit (project mgmt + analytics)
```

---

## Content fundamentals

**Voice:** professional, founder-first, no jargon, no fake-corporate filler. Every sentence in Paweł's bio is **first-person** ("I'm a fullstack developer…", "I approach every project…") — never plural "we" or marketing-agency "us". Application UI copy is **task-led and direct**: imperative verbs ("Create project", "Invite member"), terse labels, no exclamation marks.

**Tone:** confident, technical, friendly. Borrowing the SaaS reference set:
- **Linear** for terseness and information density.
- **Notion** for warmth in empty states ("Looks like you don't have any projects yet — let's fix that.").
- **Stripe** for product-marketing precision (numbers up front, claim then proof).
- **Vercel** for dark-mode-native chrome.

**Casing:**
- **Sentence case** everywhere — buttons, titles, menu items, table headers. No Title Case Marketing.
- Product / proper-noun names are capitalised normally ("Hematobieg", "Phone Catalog").
- Code identifiers stay in their native casing (`useEffect`, `OAuth 2.0`, `NestJS`).

**Pronouns:**
- Marketing copy → **I / my** (it's a single founder).
- Product UI → **you / your** ("Invite teammates to your workspace").
- Empty / error states → **conversational second person**, never blame the user ("We couldn't load this — try again.").

**Numbers:** prefer digits over words ("3 projects" not "three projects"). Currencies and metrics get short prefixes (`$2.4k`, `12.4M req/mo`). No ™ / ® clutter.

**Emoji:** **avoid in product UI.** Iconography fills that role. The portfolio source file does use 🔗 and 💻 inside CTA buttons — keep this only for the marketing/portfolio surface, never carry it into dashboard chrome.

**Examples (lifted/adapted from `texts.js`):**
- Hero, EN: `"Hi, I'm Paweł Nowicki — Fullstack Developer."`
- About, EN: `"I'm a fullstack developer passionate about building modern, fast, and fully responsive web applications."`
- Project tagline (Phone Catalog): `"An online store for phones and mobile accessories."`
- Dashboard empty state: `"No active projects. Create one to get started."`
- Toast on success: `"Message sent."` (NOT "Wiadomość została wysłana!" — keep it concise in EN.)

**Bilingual note:** The source codebase ships **PL + EN** in parallel via a `texts.js` dictionary, defaulting to Polish. Treat **English as the primary export language** for this design system; PL stays as a localisation reference.

---

## Visual foundations

The system is **dark-first**: the canvas is `#0E1117` (slate-900), foreground is near-white `#ECEEF2`, accents are the brand blue `#3B82F6`. The light theme is a faithful inversion, not a separate brand — toggle via `[data-theme="light"]` on the root.

### Color
- **Brand accent**: `#3B82F6` (blue-500). Use **sparingly** — for primary actions, focus rings, links, brand marks, and one statistic per dashboard tile. Never as a background fill across whole panels.
- **Neutrals** are a single cool-slate ramp (`slate-0` → `slate-950`) — no warm grays. This is what gives the system its Vercel-like flatness.
- **Semantic** colors (green/amber/red) are reserved for status — toasts, badges, validation. Avoid as decoration.
- **No gradients** in chrome. The one allowed gradient is the hero blue-glow (`radial-gradient(circle at 30% 20%, rgba(59,130,246,0.18), transparent 60%)`) on marketing pages only.

### Type
- **Inter** at weights 400/500/600/700/800 with the `cv11 ss01 ss03` OpenType features enabled for the cleaner alt-`a` and single-storey `g`.
- **JetBrains Mono** for code, IDs, and tabular numerics.
- Display sizes are **tightly tracked** (`-0.04em` at 80px). Body text stays at `0` tracking.
- Default body is **14px** in product UI, **15–16px** in marketing.

### Spacing
4-px base. Stick to `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96`. Don't invent `10px` or `18px` — the cadence is what makes the system feel ordered.

### Backgrounds & textures
**Minimal.** No hand-drawn illustrations, no repeating patterns, no photographic full-bleed in chrome. Marketing pages may use:
- a single subtle radial blue-glow behind the hero,
- a 1-pixel hairline grid (`background-image: linear-gradient(...)` at 4% opacity) — optional, opt-in.

Product imagery (project screenshots, founder portrait) is preserved in its native color. No B&W treatment, no duotones, no grain.

### Animation
**Restrained.** Every interactive transition runs `var(--dur-fast)` (140ms) on `var(--ease-out)`. The exceptions:
- Page route changes: `var(--dur-normal)` (200ms) with a 4-px fade-and-rise.
- Toast/popover enter: `var(--ease-spring)` so it has a hint of personality.
- **No bounces, no parallax, no scroll-jacked storytelling.** Marketing scroll animations are limited to **fade-in-on-enter** for sections.

### Hover / press
- **Buttons (primary)**: hover → `--action-primary-bg-hover` (1 shade darker), press → `--action-primary-bg-press`. No scale, no shadow change.
- **Cards**: hover → border lifts from `--border-default` to `--border-strong`; shadow lifts from `sm → md`. No translateY.
- **Ghost / icon buttons**: background fades in at 5% white (dark) / 4% black (light).
- **Disabled**: 50% opacity + `cursor: not-allowed`. Never gray-out by changing color — only opacity.

### Borders
- Hairlines everywhere; **1px is the only stroke width**. 2-px is reserved for focused inputs and the active sidebar item indicator.
- Border color tokens: `--border-subtle` (dividers), `--border-default` (cards/inputs), `--border-strong` (hovered, table heads).

### Shadows / elevation
Five-step ladder per theme. Dark shadows are deep + opaque; light shadows are soft slate. **No colored shadows.** Use elevation to express the popover ladder:
- `xs` — buttons resting
- `sm` — cards
- `md` — hovered cards, dropdowns
- `lg` — modals, command palettes
- `xl` — image dialogs, fullscreen overlays

### Radii
The full ladder, but in practice you'll use only three:
- `--radius-sm` (6px) — inputs, small buttons, badges.
- `--radius-md` (8px) — buttons, table cells.
- `--radius-lg` (12px) — cards, modals, popovers.

Avoid `--radius-full` except on avatars, tag chips, and toggles.

### Cards
Default card = `background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: var(--space-6); shadow: var(--shadow-sm);`. **No colored left-borders** (the user explicitly listed this as a tropes-to-avoid). No "glassmorphism" / blur unless behind a modal overlay.

### Transparency & blur
- Only the modal scrim uses blur: `backdrop-filter: blur(8px)` + `background: var(--bg-overlay)`.
- Popovers / dropdowns are **fully opaque** — they need to be readable over busy content.

### Layout rules
- **Fixed elements**: top nav (`--topbar-h: 56px`), left sidebar (`--sidebar-w: 240px`). Both can be collapsed on mobile.
- Content max-width: `--container-2xl: 1440px` for marketing, fluid in app shells.
- Sections stack with **`gap: var(--space-7)`** (32px) inside, **`gap: var(--space-10)`** (64px) between.
- **Use CSS Grid for app shells, Flexbox + `gap` for rows.** No floats, no margin-collapse hacks.

### Imagery vibe
Cool, modern, untreated. The project screenshots in `assets/projects/` ship as-is — they're the actual product, not stylised. Founder portrait is centered on a brand-blue radial glow on marketing only.

---

## Iconography

The portfolio source uses **`react-icons`** (Font Awesome family) for `FaGithub`, `FaLinkedin`, `FaDownload`, `FaPhone`, `FaEnvelope`. For the design system, we're **upgrading** to a more modern set that matches the Linear/Vercel/Stripe aesthetic:

- **Primary library: [Lucide Icons](https://lucide.dev/)** — 1.5px stroke, 24×24 grid, MIT-licensed, used by Shadcn UI. Loaded from CDN (`https://unpkg.com/lucide@latest`) inside UI-kit demos — no SVGs are hand-drawn in this project.
- **Flag substitution:** Where the portfolio code references `react-icons` Font Awesome glyphs, the UI kit uses Lucide equivalents (`Github`, `Linkedin`, `Download`, `Phone`, `Mail`). This was a deliberate trade — Lucide reads as enterprise/SaaS while FA reads as "personal site". The portfolio UI kit preserves the **react-icons names in JSX comments** so the substitution is auditable.

**Usage rules:**
- Stroke 1.5px, square corners, 24×24 default. Buttons → 16×16. Empty-state hero → 48×48.
- **Icons inherit `currentColor`.** Never hard-code a hex.
- **No emoji** in product UI. The portfolio's `🔗 Demo` / `💻 GitHub` buttons are the only sanctioned exceptions and live only on the marketing surface.
- **No unicode characters** as icons (`›`, `✓`, `×`). Use the real Lucide glyph (`ChevronRight`, `Check`, `X`).
- **No raster icons** — everything is SVG.

**Available assets:**
- `assets/react-logo.svg` — the React/CRA atom mark from the portfolio scaffold (used in tech-stack badges).
- `assets/portfolio-favicon.png` — original site favicon (kept as a historical reference; the design system itself does not ship a logo yet — see Caveats).

---

## Index of preview cards (Design System tab)

Cards live in `preview/` and are registered with the asset manifest so they appear in the Design System view, grouped by section.

| Group | Cards |
|---|---|
| **Type** | `type-display.html`, `type-headings.html`, `type-body.html`, `type-mono.html`, `type-features.html` |
| **Colors** | `color-brand.html`, `color-neutrals-dark.html`, `color-neutrals-light.html`, `color-semantic.html`, `color-data-viz.html` |
| **Spacing** | `spacing-scale.html`, `radii.html`, `shadows-dark.html`, `shadows-light.html`, `motion.html` |
| **Components** | `buttons.html`, `inputs.html`, `badges.html`, `avatars.html`, `cards.html`, `tabs.html`, `menus.html`, `tables.html`, `toasts.html` |
| **Brand** | `brand-mark.html`, `brand-portraits.html`, `brand-projects.html`, `iconography.html` |

---

## UI kits

| Kit | Entry | What it demonstrates |
|---|---|---|
| `ui_kits/portfolio/` | `index.html` | Faithful recreation of `pawelnowicki87/portfolio` — Hero, Navbar (lang toggle + dark switch), About, Projects carousel, Contact form. Translates the react-bootstrap original into design-system primitives. |
| `ui_kits/dashboard/` | `index.html` | The "enterprise SaaS" target — left sidebar, top bar with search, project list + Kanban-lite, an analytics card row, a settings panel. Click-through to demonstrate primary flows. |

---

## Caveats

- **No real wordmark / logo.** The portfolio source uses styled text (`Paweł Nowicki` with blue-highlighted initials) as its mark — there's no SVG/PNG logo. The design system renders a logotype primitive in `preview/brand-mark.html` using that same pattern; **please confirm or send a real logo** if one exists.
- **Lucide substitution** for react-icons Font Awesome — see Iconography above. Trivially revertable if you want to keep FA.
- **Fonts are loaded from Google Fonts** (Inter + JetBrains Mono). If you'd like self-hosted `.woff2` files committed under `fonts/`, say the word and I'll add them.
- **Bilingual content** ships in English first; Polish strings from `texts.js` are referenced but not duplicated into every component.
- **No real product data.** The dashboard UI kit uses fictional projects in addition to the real portfolio ones — confirm before using as a portfolio piece.
