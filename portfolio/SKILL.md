---
name: nowicki-engineering-design
description: Use this skill to generate well-branded interfaces and assets for Nowicki Engineering (Paweł Nowicki — Senior Full-Stack Engineer), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping modern enterprise SaaS UIs in the Linear/Vercel/Stripe/Notion mold.
user-invocable: true
---

# Nowicki Engineering — Design Skill

Read `README.md` in this skill folder, then explore the other available files.

**Foundation files**
- `README.md` — context, content fundamentals, visual foundations, iconography
- `colors_and_type.css` — all CSS variables: type scale, color ramps, semantic tokens (dark + light), spacing, radii, shadows, motion
- `assets/` — logos, founder portrait, project thumbnails, react logo
- `preview/` — design-system swatch / specimen cards (good visual reference)

**UI Kits** (in `ui_kits/`)
- `portfolio/` — marketing/portfolio site recreation. Mirrors Paweł's real portfolio (React + Bootstrap). Use this when designing personal-site or single-page marketing surfaces.
- `dashboard/` — fictional enterprise SaaS dashboard (sidebar + topbar + overview + Kanban board + settings). Use this when designing internal tools, admin panels, project management apps, or anything in the Linear/Vercel mold.

## When making artifacts (slides, mocks, throwaway prototypes)
Link `colors_and_type.css` from the skill root, copy any assets you need out of `assets/`, and build static HTML. Default to the **dark theme** (`<html data-theme="dark">`) — it's the system's primary mode. Use Inter for everything; JetBrains Mono only for code/IDs/versions.

## When working on production code
Lift the values from `colors_and_type.css` into your project's token file (Tailwind config, CSS variables, or `theme.ts`). The semantic layer (`--fg-primary`, `--bg-surface`, etc.) is what components should reference — never reach past it to the raw `--slate-*` / `--blue-*` ramps.

## Core rules to internalize
- **Brand accent is blue-500 `#3B82F6`** — use sparingly, only for primary actions, links, focus rings, and selected nav.
- **Density over decoration.** Tight padding, 13–14px UI text, 1px hairline borders. No gradients on chrome, no glow effects.
- **Cards = surface + 1px border + subtle shadow.** Never just shadow; always the border too.
- **8px radius default**, 12px for cards, 6px for inputs/small buttons.
- **Tone of copy:** clear, factual, lowercase verbs in UI (`new project`, `view all`). First-person plural in marketing (`we ship…`). No emoji in product UI.
- **Iconography:** 1.5–1.75 stroke-width line icons, 16px in chrome, 20px in feature areas. Lucide is the closest CDN match — flag the substitution if used in production.

## If invoked with no guidance
Ask the user:
1. **What surface?** (Marketing page · Dashboard / app · Slide deck · Component spec · Email)
2. **Light or dark?** (Default: dark)
3. **What's the core flow or message?**
4. **Any specific Tweaks/variations they want explored?**

Then act as an expert designer. Output a single HTML file (or a small folder if multi-page) referencing the skill's tokens and assets. Show the user early; iterate.
