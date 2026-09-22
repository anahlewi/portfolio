# anah lewi — portfolio

Personal portfolio site for Anah Lewi, a creative technologist and software engineer in Brooklyn, NY. Live at [www.anah.site](https://www.anah.site).

## Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- CSS Modules

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

## Content TODO

- Swap the placeholder portrait icon in `src/App.jsx` for a real image (`<img src="/portrait.png" className={styles.portraitImg} />`).
- Fill in real employment years for Square and 23andMe in `src/App.jsx` (`HISTORY` array).

## Previous version

The earlier three.js/particle-name version of this site (orbiting planets, pixel-dissolve transitions) is archived at `../portfolio-archive` for reference.
