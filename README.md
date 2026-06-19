# Walking Around

**Live site: [https://marcelodefreitas.github.io/walking-around/](https://marcelodefreitas.github.io/walking-around/)**

Premium landing page for the Walking Around motorcycle family group.

Built with Vite + React + TypeScript + Tailwind CSS + Framer Motion.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create a GitHub repository named `walking-around`
2. If your repo name differs, update `vite.config.ts`:
   ```ts
   base: isGhPages ? '/your-repo-name/' : '/',
   ```
3. Go to **Settings → Pages → Source: GitHub Actions**
4. Push to `main` — the workflow in `.github/workflows/deploy.yml` deploys automatically

Your site will be live at `https://your-username.github.io/walking-around/`

## Adding gallery photos

1. Place photos in `public/assets/gallery/`
2. Edit `src/data/gallery.ts`:

```ts
export const GALLERY_IMAGES: string[] = [
  'assets/gallery/ride-2024.jpg',
  'assets/gallery/coffee-stop.jpg',
]
```

Photos appear automatically in the Moments section.

## Stack

- [Vite](https://vite.dev/) — build tool
- [React 19](https://react.dev/) — UI
- [TypeScript](https://www.typescriptlang.org/) — types
- [Tailwind CSS v3](https://tailwindcss.com/) — styling
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Lucide React](https://lucide.dev/) — icons
