/*
  Footer.jsx
  ──────────────────────────────────────────────────────────────────────────────
  The site footer, shared across all pages.

  Contains:
  - Copyright line
  - Optional social links (LinkedIn, GitHub)
  - A small "back to top" link

  TODO: Add your actual social profile URLs below.
  ──────────────────────────────────────────────────────────────────────────────
*/

import { useTheme } from '../App';
import './Footer.css';

export default function Footer() {
  /* Get the current year dynamically so the copyright never goes stale */
  const year = new Date().getFullYear();

  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner container">

        {/* Left side: copyright */}
        <p className="footer__copy">
          {/* TODO: Replace "Connor Callaghan" with your name if different */}
          &copy; {year} Connor Callaghan
        </p>

        {/* Center / right: social links */}
        <nav className="footer__nav" aria-label="Social links">
          {/*
            TODO: Replace # with your actual LinkedIn URL.
            If you don't want a LinkedIn link, delete this <a> element.
          */}
          <a
            href="#"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in new tab)"
          >
            LinkedIn
          </a>

          {/*
            TODO: Replace # with your actual GitHub URL.
            If you don't want a GitHub link, delete this <a> element.
          */}
          <a
            href="#"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in new tab)"
          >
            GitHub
          </a>
        </nav>

        {/* Dark mode toggle */}
        <button
          className="footer__theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="footer__theme-icon" width="20" height="20">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="footer__theme-icon" width="20" height="20">
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

        {/* Back to top */}
        <a href="#main-content" className="footer__top-link" aria-label="Back to top of page">
          Back to top &uarr;
        </a>

      </div>
    </footer>
  );
}
