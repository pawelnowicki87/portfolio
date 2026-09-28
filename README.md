# Portfolio

My personal website: [pawelnowicki.dev](https://pawelnowicki.dev)

Single-page React app in Polish and English, with a light and dark theme, a Three.js hero section, selected projects and a contact form.

## Tech

- React 18 (Create React App)
- Three.js
- EmailJS for the contact form
- GitHub Actions and GitHub Pages for build and hosting

## Run locally

```bash
npm ci
npm start
```

## Contact form

Messages are sent with EmailJS. The build needs three variables:

- `REACT_APP_EMAILJS_SERVICE_ID`
- `REACT_APP_EMAILJS_TEMPLATE_ID`
- `REACT_APP_EMAILJS_PUBLIC_KEY`

Locally put them in `.env.local`. For the deployed site they are repository variables (Settings > Secrets and variables > Actions > Variables). Without them the form opens the visitor's email app with the message filled in.

## Deploy

Every push to `master` builds the site and publishes it to GitHub Pages (`.github/workflows/deploy.yml`).
