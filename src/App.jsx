/*
  App.jsx
  ──────────────────────────────────────────────────────────────────────────────
  The root component of the application. It does two things:

  1. THEME MANAGEMENT — Creates and provides a ThemeContext so any component
     can read the current theme ('light' or 'dark') and call toggleTheme() to
     switch between them. The chosen theme is saved to localStorage so it
     persists across page refreshes.

  2. ROUTING — Sets up React Router so the browser URL determines which page
     component renders. Each <Route> maps a URL path to a page component.

  Structure:
    ThemeProvider (context wrapper)
    └── BrowserRouter (enables URL-based routing)
        ├── skip-link (accessibility: lets keyboard users jump to main content)
        ├── Navbar (sticky header, shared across all pages)
        ├── Routes (only one route matches at a time)
        │   ├── /              → Home
        │   ├── /about         → About
        │   ├── /projects      → Projects
        │   ├── /projects/:id  → ProjectDetail (individual project page)
        │   └── /contact       → Contact
        └── Footer (shared across all pages)
  ──────────────────────────────────────────────────────────────────────────────
*/

import { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

/* Shared layout components */
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreativeBackground from './components/CreativeBackground';

/* Page components — each one maps to a URL route */
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';

/* ──────────────────────────────────────────────────────────────────────────────
   THEME CONTEXT
   createContext() creates a "context" — a way to share data (the current theme
   and the toggle function) with any component in the tree without passing props
   manually through every level.
   ────────────────────────────────────────────────────────────────────────────── */
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

/* Custom hook — any component can call useTheme() to get theme + toggleTheme */
export const useTheme = () => useContext(ThemeContext);

/* ──────────────────────────────────────────────────────────────────────────────
   CREATIVE MODE CONTEXT
   "Creative mode" is a SITE-WIDE expressive state, separate from light/dark theme.
   When it's on, components are free to morph into their more playful, decorative
   forms — the navbar, for instance, melts into a frosted liquid-glass island.

   This is the single switch the navbar's creative-mode button flips, and the
   mechanism ANY component can hook into to offer a creative variant of itself:
     • CSS  — style against the html[data-creative="on"] attribute (mirrors how
              dark mode keys off [data-theme="dark"]). Preferred for pure visuals.
     • JS   — call useCreativeMode() to read `creative` / flip it via toggleCreative()
              (e.g. to swap content or update accessibility labels).

   Accessibility: whenever creative mode changes what a control does or how it reads,
   that control's aria-label / aria-pressed / title MUST reflect the creative-mode
   state. The navbar toggle is the reference pattern.
   ────────────────────────────────────────────────────────────────────────────── */
export const CreativeModeContext = createContext({
  creative: false,
  toggleCreative: () => {},
});

/* Custom hook — any component can call useCreativeMode() to read/flip creative mode */
export const useCreativeMode = () => useContext(CreativeModeContext);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

/* ──────────────────────────────────────────────────────────────────────────────
   THEME PROVIDER COMPONENT
   Manages the theme state and syncs it to:
     - The data-theme attribute on <html> (controls which CSS variables are active)
     - localStorage (so the user's preference persists across page loads)
   ────────────────────────────────────────────────────────────────────────────── */
function ThemeProvider({ children }) {
  /*
    Initialize theme from localStorage. If nothing is saved, check the user's
    OS preference via prefers-color-scheme. Fall back to 'light'.
  */
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });

  /*
    Whenever theme changes, update the data-theme attribute on <html>.
    This is what activates the dark mode CSS variables in theme.css.
  */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  /* Flip between 'light' and 'dark' */
  function toggleTheme() {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   CREATIVE MODE PROVIDER
   Manages the creative-mode flag and syncs it to:
     - The data-creative attribute on <html> ("on" / "off"), so any component can
       react in pure CSS via html[data-creative="on"] — no prop drilling needed.
     - localStorage (key: "creativeMode"), so the choice persists across refreshes.
   ────────────────────────────────────────────────────────────────────────────── */
function CreativeModeProvider({ children }) {
  /*
    Initialize from localStorage; creative mode is off by default.

    We also set the data-creative attribute right here in the initializer — i.e.
    during the first render, before the browser paints. A persisted "on" state
    therefore renders directly in its creative form (the navbar paints as the
    glass island immediately) instead of mounting plain and then morphing after
    the effect runs, which would replay the morph animation on every refresh.
    CSS transitions don't fire on an element's first painted style, so there's
    no animation on load — only on a real toggle, which happens after paint.
  */
  const [creative, setCreative] = useState(() => {
    const on = localStorage.getItem('creativeMode') === 'on';
    document.documentElement.setAttribute('data-creative', on ? 'on' : 'off');
    return on;
  });

  /*
    Keep <html>'s data-creative in sync on every subsequent toggle, and persist
    the choice. (The initializer above already set it for the first paint; this
    handles user-driven changes — which animate normally, since they occur after
    the element has painted.)
  */
  useEffect(() => {
    document.documentElement.setAttribute('data-creative', creative ? 'on' : 'off');
    localStorage.setItem('creativeMode', creative ? 'on' : 'off');
  }, [creative]);

  /* Flip creative mode on/off */
  function toggleCreative() {
    setCreative(prev => !prev);
  }

  return (
    <CreativeModeContext.Provider value={{ creative, toggleCreative }}>
      {children}
    </CreativeModeContext.Provider>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   APP COMPONENT
   The root of the component tree. Wraps everything in ThemeProvider and
   CreativeModeProvider (so all components can access the theme + creative mode)
   and BrowserRouter (so routing works).
   ────────────────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <ThemeProvider>
      <CreativeModeProvider>
        <BrowserRouter>
          {/*
            Skip to main content link — the very first focusable element on the page.
            Visually hidden until focused via keyboard (styled in global.css).
            Accessibility requirement: WCAG 2.4.1
          */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          {/*
            Site-wide creative-mode background. Renders nothing unless creative
            mode is on; lazy-loads its Three.js scene on first use. Sits behind
            all content (fixed, z-index -1) and is aria-hidden, so its place in
            the tree is purely for tidiness — it's kept after the skip-link to
            preserve that as the first element.
          */}
          <CreativeBackground />

          <ScrollToTop />

          {/* Sticky navigation bar, shared across all pages */}
          <Navbar />

          {/*
            Routes — React Router renders only the matching route component.
            The path="/projects/:id" uses a URL parameter (:id) that
            ProjectDetail reads to know which project to display.
          */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

          {/* Footer, shared across all pages */}
          <Footer />
        </BrowserRouter>
      </CreativeModeProvider>
    </ThemeProvider>
  );
}
