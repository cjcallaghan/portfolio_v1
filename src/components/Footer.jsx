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

import './Footer.css';

export default function Footer() {
  /* Get the current year dynamically so the copyright never goes stale */
  const year = new Date().getFullYear();

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

        {/* Back to top */}
        <a href="#main-content" className="footer__top-link" aria-label="Back to top of page">
          Back to top &uarr;
        </a>

      </div>
    </footer>
  );
}
