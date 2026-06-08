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
   APP COMPONENT
   The root of the component tree. Wraps everything in ThemeProvider (so all
   components can access the theme) and BrowserRouter (so routing works).
   ────────────────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/*
          Skip to main content link — the very first focusable element on the page.
          Visually hidden until focused via keyboard (styled in global.css).
          Accessibility requirement: WCAG 2.4.1
        */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

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
    </ThemeProvider>
  );
}
