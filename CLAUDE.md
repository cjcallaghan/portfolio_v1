# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start development server (Vite HMR)
npm run build      # Production build → dist/
npm run preview    # Preview the production build locally
npm run lint       # ESLint (flat config, eslint.config.js)
```

No test framework is configured.

## Architecture

**Stack:** React 19 + Vite 8, plain CSS (no Tailwind, no CSS Modules), React Router v7.

### File layout

```
src/
  styles/
    global.css     ← All CSS custom properties (the entire design system)
    theme.css      ← Dark mode overrides via [data-theme="dark"]
  App.jsx          ← ThemeContext + ThemeProvider + BrowserRouter + Routes
  main.jsx         ← Mounts App; imports global.css + theme.css
  components/      ← Navbar, Footer, ProjectCard (+ paired .css files)
  pages/           ← Home, About, Projects, ProjectDetail, Contact (+ paired .css)
  data/
    projects.js    ← Single source of truth for all project data
public/images/     ← Project screenshots (referenced by projects.js)
```

### How the design system works

`global.css` defines every CSS custom property used site-wide (`--color-*`, `--font-*`, `--text-*`, `--space-*`, `--shadow-*`, `--radius-*`, `--transition-*`). Component CSS files reference only these variables — no hardcoded values. Dark mode overrides live in `theme.css` and activate when `App.jsx` sets `data-theme="dark"` on `<html>`.

### Theme (dark mode)

`ThemeContext` and `useTheme()` are exported from `App.jsx`. Theme state is initialized from `localStorage`, falling back to `prefers-color-scheme`, then `'light'`. `useEffect` syncs it to `document.documentElement.setAttribute('data-theme', theme)` and `localStorage`.

### Creative mode

"Creative mode" is a **site-wide expressive state, separate from light/dark theme**. It's the single switch behind the navbar's creative-mode toggle button, and the shared mechanism for letting any component offer a more playful / decorative variant of itself. **When the user asks to "put X in creative mode", "make X creative", or wants something to change "when creative mode is on", they mean: give that component a distinct creative-mode form that activates off this same global switch — not a new per-component toggle.**

- State lives in `CreativeModeContext` / `useCreativeMode()` (exported from `App.jsx`), mirroring `ThemeContext`. Initialized from `localStorage` (`creativeMode` = `'on'` / `'off'`), defaulting **off**.
- `CreativeModeProvider` syncs it to `document.documentElement` as `data-creative="on" | "off"` — the global hook everything keys off (exactly like `data-theme` drives dark mode).
- **To make a component respond to creative mode:**
  - *Visual-only:* style against the attribute selector `[data-creative="on"] .your-class { … }`. The navbar is the reference example — its liquid-glass floating island is its creative-mode form (see `Navbar.css`).
  - *Behavior / content:* call `useCreativeMode()` for the `creative` boolean and `toggleCreative()`.
- **Accessibility (required):** whenever creative mode changes what a control does or how it reads, that control's `aria-label` / `aria-pressed` / `title` MUST state the creative-mode status. The navbar toggle is the canonical pattern (`aria-pressed={creative}`, label flips between "Turn on/off creative mode").
- Only the navbar button **toggles** creative mode; every other component **responds** to it. Don't add separate per-component creative switches.

### Routing

Five routes in `App.jsx`: `/`, `/about`, `/projects`, `/projects/:id`, `/contact`. `ProjectDetail` reads the `:id` param with `useParams()` and finds the matching object via `projects.find(p => p.id === Number(id))`.

### Adding a project

Edit `src/data/projects.js` only — add one object to the `projects` array with a unique `id`. Set `featured: true` to make it a homepage candidate (only the first two featured projects render on Home via `.filter().slice(0, 2)`). Place images in `public/images/` and reference them as `/images/filename.jpg`.

### CSS conventions

- Animation blocks are always wrapped in clearly labeled `/* === ANIMATION ... === */` comment blocks.
- All `@keyframes` live in `global.css`.
- Responsive breakpoints are at the bottom of each component's `.css` file.
- Minimum touch targets: `min-height: 44px` on all interactive elements.
- Focus styles: `focus-visible` outlines using `var(--color-accent)`.

### Accessibility

WCAG 2.1 AA. Every page sets `document.title` in a `useEffect`. The first DOM element is a `.skip-link` pointing to `#main-content`. External links use `target="_blank" rel="noopener noreferrer"` with `aria-label` noting "opens in new tab". `e.stopPropagation()` is used on nested external links inside the full-card `<Link>` in `ProjectCard`.
