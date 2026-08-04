# anah lewi — portfolio

Personal portfolio site for Anah Lewi, a creative technologist and software engineer in Brooklyn, NY. Live at [www.anah.site](https://www.anah.site).

## Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [three.js](https://threejs.org/) — WebGL particle animation on the landing page
- [Framer Motion](https://www.framer.com/motion/) — UI transitions
- CSS Modules

## Features

- Landing page name rendered as an animated field of pearl-like three.js particles that drift and repel from the cursor
- Pixel-dissolve transition between the landing page and content
- Hamburger nav opening a bio modal with a typewriter effect

## Getting started

```bash
npm install
npm run dev
```

Runs the Vite dev server at `http://localhost:5173`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Build and publish `dist/` to GitHub Pages via `gh-pages` |

## Deployment

The site deploys to GitHub Pages (custom domain configured via `public/CNAME`). Run `npm run deploy` to publish the current build.
