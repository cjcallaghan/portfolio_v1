# Portfolio v1

Personal portfolio site built with React 19 + Vite. Features a warm parchment design system, dark mode, and a data-driven project showcase.

## Tech Stack

- **React 19** + **Vite 8**
- **React Router v7** — client-side routing
- **Plain CSS** — custom properties design system, no Tailwind or CSS Modules

## Features

- Dark / light mode with `localStorage` persistence
- Data-driven projects — add a project by editing one file
- WCAG 2.1 AA accessible (skip links, focus-visible, ARIA labels)
- Responsive layout with touch-friendly targets

## Getting Started

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173` with hot module replacement.

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
  styles/
    global.css       # All CSS custom properties (design system)
    theme.css        # Dark mode overrides ([data-theme="dark"])
  App.jsx            # ThemeContext, ThemeProvider, Router, Routes
  main.jsx           # Entry point
  components/        # Navbar, Footer, ProjectCard
  pages/             # Home, About, Projects, ProjectDetail, Contact
  data/
    projects.js      # Single source of truth for all project data
public/
  images/            # Project screenshots
```

## Adding a Project

All project data lives in `src/data/projects.js`. To add a new project:

1. Copy an existing object in the `projects` array.
2. Assign a unique `id` (increment from the last one).
3. Fill in `title`, `description`, `tags`, `liveUrl`, `githubUrl`, and `fullDescription`.
4. Place any images in `public/images/` and update the `image` field.
5. Set `featured: true` to include it as a homepage candidate (only the first two featured projects appear on the homepage).

The Home and Projects pages update automatically — no other files need to change.
