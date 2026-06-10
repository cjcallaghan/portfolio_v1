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

  /*
    Liquid-glass mode. When true, the navbar morphs from a plain full-width
    bar into a centered, rounded, frosted-glass floating island.

    This is its OWN persisted setting (separate from light/dark theme), so the
    user's choice survives refreshes. It pairs with the site theme: the glass
    surface tints darker automatically in dark mode (see theme.css).
  */
  const [glass, setGlass] = useState(() => {
    return localStorage.getItem('navStyle') === 'glass';
  });

  useEffect(() => {
    localStorage.setItem('navStyle', glass ? 'glass' : 'plain');
  }, [glass]);

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
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}${menuOpen ? ' navbar--menu-open' : ''}${glass ? ' navbar--glass' : ''}`}
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

        {/* ── RIGHT SIDE: MORPH TOGGLE + HAMBURGER ── */}
        <div className="navbar__right">

          {/*
            Liquid-glass morph toggle. Flips the navbar between its plain bar
            and frosted floating-island forms. aria-pressed communicates the
            on/off state to assistive tech; the icon animates between a flat
            line (plain) and a droplet (glass) via CSS.
          */}
          <button
            className="navbar__morph-toggle"
            onClick={() => setGlass(prev => !prev)}
            aria-pressed={glass}
            aria-label={glass ? 'Switch to plain navbar' : 'Switch to liquid glass navbar'}
            title={glass ? 'Plain navbar' : 'Liquid glass navbar'}
          >
            <svg
              className="navbar__morph-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              {/* Droplet outline — the "glass" glyph */}
              <path
                className="navbar__morph-droplet"
                d="M12 3.5c3.2 3.6 5.5 6.6 5.5 9.4a5.5 5.5 0 0 1-11 0c0-2.8 2.3-5.8 5.5-9.4Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              {/* Inner sparkle highlight inside the droplet */}
              <path
                className="navbar__morph-spark"
                d="M10 13.5a2.2 2.2 0 0 0 2 1.8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
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
