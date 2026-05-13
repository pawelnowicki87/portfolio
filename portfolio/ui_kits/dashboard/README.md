# Dashboard UI kit

The "enterprise SaaS" target — what Paweł's actual product work looks like. Includes a left sidebar, top bar with command search, a project-overview grid with stat cards, a Kanban-style project board, and a settings page.

**Inspirations (declared):** Linear (sidebar density), Vercel (dark chrome), Stripe (stat cards), Notion (empty states).

Open `index.html` for the interactive recreation. Switch screens via the top-bar nav.

**Components:**
- `Sidebar.jsx` — workspace switcher, nav, footer user pill
- `TopBar.jsx` — breadcrumb, command search, notifications, theme toggle, avatar
- `Overview.jsx` — stat cards, recent activity, deployment list
- `Board.jsx` — Kanban columns with draggable-looking task cards
- `Settings.jsx` — section nav + form fields

This is a **fictional** product surface designed to demonstrate the system at app scale.
