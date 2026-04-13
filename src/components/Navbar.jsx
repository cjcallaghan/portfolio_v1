/*
  Navbar.jsx
  ──────────────────────────────────────────────────────────────────────────────
  The sticky navigation bar shown at the top of every page.

  Features:
  - Logo / name on the left ("Connor Callaghan")
  - Nav links in the center/right: Home · About · Projects · Contact
  - Dark mode toggle button on the far right (sun/moon icon)
  - Scrolled state: adds a subtle shadow when the user scrolls down
  - Mobile: collapses to a hamburger menu below 768px

  Props: none — reads theme from ThemeContext via useTheme()
  ──────────────────────────────────────────────────────────────────────────────
*/

import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';  /* NavLink automatically adds an "active" class to the current page's link */
import { useTheme } from '../App';            /* Custom hook to read and toggle the theme */
import './Navbar.css';

/* The navigation links array — add or remove items here to change the nav */
const NAV_LINKS = [
  { label: 'Home',     to: '/'        },
  { label: 'About',    to: '/about'   },
  { label: 'Projects', to: '/projects'},
  { label: 'Contact',  to: '/contact' },
];

export default function Navbar() {
  /* Whether the user has scrolled down — used to add a shadow to the navbar */
  const [scrolled, setScrolled] = useState(false);

  /* Whether the mobile menu is open */
  const [menuOpen, setMenuOpen] = useState(false);

  /* Theme state and toggle function from context */
  const { theme, toggleTheme } = useTheme();

  /*
    Listen for scroll events. When the user scrolls past 10px, set scrolled to
    true so the CSS class adds a shadow to the navbar.
  */
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    /* Cleanup: remove the event listener when the component unmounts */
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /*
    Close the mobile menu whenever the user navigates to a new page.
    (NavLink's onClick is an easier way to handle this than listening
    to route changes.)
  */
  function closeMobileMenu() {
    setMenuOpen(false);
  }

  /*
    When mobile menu is open, prevent body scroll.
  */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    /*
      <header> is the correct semantic element for the site header.
      role="banner" is implied by <header> at the top level, but being
      explicit helps some older screen readers.
    */
    <header
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}${menuOpen ? ' navbar--menu-open' : ''}`}
      role="banner"
    >
      <div className="navbar__inner container">

        {/* ── LOGO / SITE NAME ── */}
        <NavLink
          to="/"
          className="navbar__logo"
          aria-label="Connor Callaghan — go to homepage"
          onClick={closeMobileMenu}
        >
          {/* TODO: Replace "Connor Callaghan" with your preferred logo text or swap for an image */}
          Connor Callaghan
        </NavLink>

        {/* ── DESKTOP NAV LINKS ── */}
        <nav className="navbar__nav" aria-label="Main navigation">
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  /*
                    NavLink automatically adds className="active" when the URL
                    matches. We use end on the "/" route so it only matches the
                    exact homepage, not every route.
                  */
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `navbar__link${isActive ? ' navbar__link--active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── RIGHT SIDE: THEME TOGGLE + HAMBURGER ── */}
        <div className="navbar__right">

          {/* Dark mode toggle button */}
          <button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {/*
              === ANIMATION — theme toggle icon
              The icon swaps between sun (light mode) and moon (dark mode).
              The spin animation is defined in Navbar.css.
              To remove the spin: delete the .navbar__theme-toggle:active rule in Navbar.css.
            */}
            {theme === 'light' ? (
              /* Moon icon — shown in light mode (clicking switches to dark) */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="navbar__theme-icon"
                width="20"
                height="20"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              /* Sun icon — shown in dark mode (clicking switches to light) */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="navbar__theme-icon"
                width="20"
                height="20"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>

          {/* Hamburger menu button — only visible on mobile (< 768px) */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {/*
              Three bars = hamburger icon; X = close icon.
              CSS handles the visual transformation.
            */}
            <span className="navbar__hamburger-bar" aria-hidden="true" />
            <span className="navbar__hamburger-bar" aria-hidden="true" />
            <span className="navbar__hamburger-bar" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU OVERLAY ── */}
      {/*
        This dropdown appears on mobile when the hamburger is clicked.
        It's separate from the desktop nav so they can be styled independently.
        id="mobile-menu" matches aria-controls on the hamburger button above.
      */}
      <nav
        id="mobile-menu"
        className={`navbar__mobile-menu${menuOpen ? ' navbar__mobile-menu--open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <ul className="navbar__mobile-links" role="list">
          {NAV_LINKS.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`
                }
                onClick={closeMobileMenu}  /* close menu on navigation */
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
