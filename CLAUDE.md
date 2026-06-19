# Walking Around — Agent Instructions

Premium single-page landing page for a Portuguese motorcycle family group. Static, no backend, deployed on GitHub Pages.

**Live:** https://marcelodefreitas.github.io/walking-around/
**Repo:** https://github.com/MarcelodeFreitas/walking-around

## Stack

- **Vite 6 + React 19 + TypeScript (strict)**
- **Tailwind CSS v3** — NOT v4. Custom tokens in `tailwind.config.js`
- **Framer Motion** — animations and scroll reveals
- **Lucide React** — icons (SVG only, no emoji)
- **GitHub Pages** — static deploy via GitHub Actions (`.github/workflows/deploy.yml`)

## Running the project

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build
npm run preview   # preview production build locally
```

## Architecture

### Language system

- Default: Portuguese (Portugal). Detects browser language via `navigator.language`.
- If browser starts with `en`, shows English. Otherwise Portuguese.
- Manual toggle stored in `localStorage` key `wa-lang`.
- Simple dictionary in `src/data/translations.ts` — no i18n framework.
- `Lang = 'pt' | 'en'` type. All components receive `lang: Lang` prop.
- `LanguageToggle` component exists but is **not rendered** — import is removed from `App.tsx`. To re-enable: import it and add `<LanguageToggle lang={lang} onToggle={handleLangToggle} />` back.

### CTA / application flow

The CTA button ("Entrar na Família") currently opens `ClosedGroupNotice` — a modal saying the group is not accepting new members.

The full application modal (`ApplyModal`) is **stored but dormant**. To reactivate:
1. In `src/App.tsx`, change `onApply={() => setClosedOpen(true)}` on `<Hero>` to `onApply={() => setApplyOpen(true)}`
2. Add the admin WhatsApp number to `src/utils/whatsapp.ts`: `const ADMIN_PHONE = '351XXXXXXXXX'`

### WhatsApp flow (when active)

`src/utils/whatsapp.ts` → `buildWhatsAppUrl(data, lang)` generates:
`https://wa.me/{ADMIN_PHONE}?text=encodeURIComponent(message)`

Message is fully bilingual (PT/EN). Opens with `window.open(url, '_blank', 'noopener,noreferrer')`.

### Component structure

```
src/
  App.tsx                        — root: lang state, modal state, section assembly
  components/
    Hero.tsx                     — video background, logo, tagline, CTA
    AboutSection.tsx             — group description
    HowItWorksSection.tsx        — 4-step cards + private group notice
    RulesSection.tsx             — 6 rules with gold check icons
    GallerySection.tsx           — horizontal scroll photo strip or empty state
    ApplyModal.tsx               — full application form (dormant)
    ClosedGroupNotice.tsx        — "not accepting members" popup (active CTA target)
    LanguageToggle.tsx           — PT/EN pill toggle (inactive, kept for reactivation)
    Footer.tsx                   — tagline + copyright
  data/
    translations.ts              — full PT/EN dictionary (Translations interface)
    gallery.ts                   — GALLERY_IMAGES string array
  utils/
    language.ts                  — detectLanguage(), persistLanguage()
    whatsapp.ts                  — buildWhatsAppUrl()
  styles/
    index.css                    — Tailwind directives, global component classes
```

### Adding gallery photos

1. Place files in `public/assets/gallery/`
2. Add paths to `src/data/gallery.ts`:

```ts
export const GALLERY_IMAGES: string[] = [
  'assets/gallery/my-photo.jpeg',
]
```

### Hero video background

Video file: `public/assets/hero-bg.mp4`
- Plays automatically: `autoPlay muted loop playsInline`
- Hidden for `prefers-reduced-motion` users (dark bg shows instead)
- Replace file to update the background. Keep under 30 MB for web performance.
- Video codec: H.264, 720P or 1080P, 30fps, no audio track

## Design system

### Tokens (`tailwind.config.js`)

```
gold:    DEFAULT #C9A020 / light #E8C547 / dark #9B7A18
surface: DEFAULT #141414 / 2: #1E1E1E / 3: #252525
ink:     DEFAULT #F5F5F5 / muted #9CA3AF / subtle #6B7280
bg:      #0A0A0A (body background)
```

Fonts: **Bebas Neue** (`font-display`) · **Inter** (`font-body`) — loaded from Google Fonts.

### Global component classes (`src/styles/index.css`)

- `.btn-gold` — gold pill CTA button with CSS shine hover effect
- `.card-premium` — dark surface card with gold hover border
- `.gold-divider` — horizontal gradient line accent
- `.carbon-bg` — subtle checkerboard texture background
- `.section-container` — `max-w-5xl mx-auto px-6`
- `.section-title` — Bebas Neue display heading

### Asset paths

All assets use `${import.meta.env.BASE_URL}assets/...` prefix for GitHub Pages compatibility.

## Deploy

Repo name **must** match the Vite base path. Currently: `/walking-around/`.

- `vite.config.ts` reads `GITHUB_PAGES=true` env var (set in deploy workflow) to apply the base path
- Push to `main` → `.github/workflows/deploy.yml` auto-builds and deploys
- GitHub Pages source must be set to **GitHub Actions** (already configured)

## Coding standards

- **TypeScript strict** — no `any`, no type assertions
- **No comments** unless the WHY is non-obvious
- **No prop-drilling** — `lang` is the only prop passed down; all translations accessed via `t[lang]`
- **No new dependencies** without clear reason
- **Tailwind CSS v3 only** — no CSS-in-JS, no inline styles except for one-off gradient values
- **No backend, no tracking, no accounts, no social links**
- **No event calendars, no ride schedules** — site is intentionally low-maintenance

## What NOT to do

- Do not add a backend, database, or server-side logic
- Do not add analytics or tracking pixels
- Do not expose WhatsApp group invite links publicly
- Do not add Tailwind v4 (project uses v3)
- Do not add Redux, Zustand, or external state libraries
- Do not add React Router (single-page, no routing needed)
- Do not add biker gang aesthetics (skulls, flames, aggressive styling)
