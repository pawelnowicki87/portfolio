# Portfolio

My personal website: [pawelnowicki.dev](https://pawelnowicki.dev).

A React portfolio in Polish and English, with an interactive Three.js hero, project previews, light and dark themes, and reduced-motion support.

## Development

```sh
npm ci
npm start
```

Copy `.env.example` to `.env.local` and configure EmailJS. Local environment files are ignored by Git.

## Contact form

The form sends messages through EmailJS. It requires three public browser identifiers:

- `REACT_APP_EMAILJS_SERVICE_ID`
- `REACT_APP_EMAILJS_TEMPLATE_ID`
- `REACT_APP_EMAILJS_PUBLIC_KEY`

Set them in `.env.local` for local development and in GitHub repository variables for deployment. The build checks that all three values are present.

The email template receives `user_name`, `user_email`, `subject`, `message`, and `reply_to`. Configure the recipient in EmailJS and use `{{reply_to}}` for replies. Browser configuration must not contain SMTP passwords or private keys.

The form confirms success only after EmailJS accepts the request. Errors preserve the message draft and provide a direct email link. If Gmail returns `Invalid grant`, reconnect the account in EmailJS under Email Services.

## Checks and deployment

```sh
npm test -- --watchAll=false --runInBand
npm run build
```

Tests mock EmailJS without sending messages. GitHub Actions tests, builds, and deploys pushes to `master` to GitHub Pages.

## Source

- `src/portfolioCopy.js`: Polish and English interface text.
- `src/texts.js`: project descriptions.
- `src/components/`: page sections and shared interface components.
- `src/lib/createSculpture.js`: interactive Three.js scene.
- `public/art/`: graphics and project previews.
- `public/media/`: project videos.
- `public/CV_Pawel_Nowicki.pdf`: downloadable CV.
