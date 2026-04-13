/*
  Contact.jsx
  ──────────────────────────────────────────────────────────────────────────────
  The Contact page. No form — just a heading, short copy, a large email link,
  and an optional LinkedIn link.

  Simple is better here: a mailto link is frictionless for both parties.
  ──────────────────────────────────────────────────────────────────────────────
*/

import { useEffect } from 'react';
import './Contact.css';

export default function Contact() {
  /* Update the browser tab title when this page mounts */
  useEffect(() => {
    document.title = 'Contact — Connor Callaghan';
  }, []);

  return (
    <main id="main-content" className="contact page-enter">

      {/* ════════════════════════════════════════════════════════════════════
          PAGE CONTENT
          All contact content lives in a single centered section.
          ════════════════════════════════════════════════════════════════════ */}
      <section className="contact__section" aria-labelledby="contact-heading">
        <div className="container contact__inner">

          {/* Decorative yellow accent mark */}
          <span className="contact__eyebrow" aria-hidden="true" />

          <h1 id="contact-heading" className="contact__heading">
            Get In Touch
          </h1>

          {/*
            Short copy explaining how to reach you.
            TODO: Edit this text to match your current availability.
          */}
          <p className="contact__body">
            I&rsquo;m currently available for freelance projects and open to full-time
            opportunities. The best way to reach me is by email.
          </p>

          {/*
            Large styled email link.
            TODO: Replace hello@connorcallaghan.com with your actual email address.
          */}
          <a
            href="mailto:hello@connorcallaghan.com"
            className="contact__email"
            aria-label="Send email to hello@connorcallaghan.com"
          >
            {/* TODO: Replace with your actual email */}
            hello@connorcallaghan.com
          </a>

          {/*
            Optional secondary links (LinkedIn, etc.).
            TODO: Replace # with your actual LinkedIn URL.
            Delete the entire .contact__links block if you don't want social links here.
          */}
          <div className="contact__links">
            <a
              href="#"
              className="contact__social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in new tab)"
            >
              {/* TODO: Add your LinkedIn URL above */}
              LinkedIn &rarr;
            </a>

            {/*
              TODO: Add your GitHub URL below if you want it on the contact page.
              Or delete this anchor entirely.
            */}
            <a
              href="#"
              className="contact__social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in new tab)"
            >
              {/* TODO: Add your GitHub URL above */}
              GitHub &rarr;
            </a>
          </div>

        </div>
      </section>

    </main>
  );
}
