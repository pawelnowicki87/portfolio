# Portfolio UI kit

Faithful recreation of [`pawelnowicki87/portfolio`](https://github.com/pawelnowicki87/portfolio) translated into design-system primitives.

**Sections:** Navbar (with PL/EN toggle + dark mode switch), Hero, About, Projects carousel, Contact form, Footer.

**Source mapping:**

| Original (`src/components/`) | This kit |
|---|---|
| `Navbar.js` | `Navbar.jsx` |
| `Hero.js` | `Hero.jsx` |
| `About.js` | `About.jsx` |
| `Projects.js` | `Projects.jsx` |
| `Contact.js` | `Contact.jsx` |

**Key faithfulness notes**
- Brand mark is "**P**aweł **N**owicki" with blue-highlighted initials — preserved from `Navbar.js` line 24.
- Dark mode is the default (`useState(true)` in `App.js`).
- Bilingual content from `texts.js` (Polish + English) — EN shown by default here.
- `react-icons/fa` glyphs replaced with Lucide equivalents (see README iconography note). JSX comments preserve the original FA names.
- Project carousel uses real screenshots from `assets/projects/`.

Open `index.html` to see the interactive recreation.
