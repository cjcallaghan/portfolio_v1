/*
  Home.jsx
  ──────────────────────────────────────────────────────────────────────────────
  The homepage. Three sections:
    1. Hero — name, tagline, two CTA buttons
    2. Featured Projects — the first 2 projects where featured === true
    3. Contact CTA — a warm closing prompt with an email link

  Data source: /src/data/projects.js
  ──────────────────────────────────────────────────────────────────────────────
*/

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import './Home.css';

export default function Home() {
  const { theme } = useTheme();

  /* Update the browser tab title when this page mounts */
  useEffect(() => {
    document.title = 'Connor Callaghan — Frontend Developer & Designer';
  }, []);

  /*
    Filter projects to only those marked featured: true, then cap at 2.
    Even if more than 2 are marked featured, only the first 2 appear here.
    All featured projects still show on the /projects page (no cap there).
  */
  const featuredProjects = projects.filter(p => p.featured).slice(0, 2);

  return (
    /*
      id="main-content" is the target for the skip-link in App.jsx.
      The page-enter class applies the CSS fade-in animation (defined in global.css).
    */
    <main id="main-content" className="home page-enter">

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 1: HERO
          Large heading, tagline, subtext, and two CTA buttons.
          ════════════════════════════════════════════════════════════════════ */}
      <section className="home__hero" aria-labelledby="hero-heading">
        <div className="container home__hero-inner">

          {/* Decorative accent mark above the heading */}
          <span className="home__hero-eyebrow" aria-hidden="true" />

          {/*
            The hero heading uses the display font (serif) for visual impact.
            TODO: Replace "Connor Callaghan" with your actual name.
          */}
          <h1 id="hero-heading" className="home__hero-name">
            Connor Callaghan
          </h1>

          {/*
            Tagline — one short line that captures what you do.
            TODO: Replace this tagline with your own if you'd like something different.
          */}
          <p className="home__hero-tagline">
            Building clean websites and thoughtful digital experiences.
          </p>

          {/*
            Subtext — a little more context about you and your availability.
            TODO: Replace [location] with your city (e.g., "Chicago").
            TODO: Update the availability line if needed.
          */}
          <p className="home__hero-subtext">
            Frontend developer and designer based in{' '}
            <span className="home__hero-location">
              {/* TODO: Replace this with your city */}
              [your city]
            </span>
            . Available for freelance work and full-time roles.
          </p>

          {/* CTA buttons */}
          <div className="home__hero-actions">
            {/* Primary: navigates to the Projects page */}
            <Link to="/projects" className="btn btn-primary" style={theme === 'dark' ? { color: '#000000' } : undefined}>
              View My Work
            </Link>
            {/* Secondary: navigates to the Contact page */}
            <Link to="/contact" className="btn btn-secondary">
              Get In Touch
            </Link>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 2: FEATURED PROJECTS
          Shows up to 2 projects where featured === true.
          ════════════════════════════════════════════════════════════════════ */}
      <section className="home__featured" aria-labelledby="featured-heading">
        <div className="container">

          <h2 id="featured-heading" className="home__section-heading">
            Featured Work
          </h2>

          {featuredProjects.length > 0 ? (
            /*
              Project cards grid. Each card is a full ProjectCard component
              that handles its own layout, image, tags, and links.
            */
            <div className="home__projects-grid">
              {featuredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            /*
              Empty state — shown when no projects are marked featured yet.
              This prevents a broken-looking page during initial setup.
            */
            <div className="home__empty-state">
              <p>Projects coming soon.</p>
            </div>
          )}

          {/* Link to the full projects page */}
          <div className="home__see-all">
            <Link to="/projects" className="home__see-all-link">
              See All Projects &rarr;
            </Link>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 3: CONTACT CTA
          A warm closing prompt at the bottom of the homepage.
          ════════════════════════════════════════════════════════════════════ */}
      <section className="home__contact-cta" aria-labelledby="cta-heading">
        <div className="container home__contact-cta-inner">

          <h2 id="cta-heading" className="home__contact-heading">
            Let&rsquo;s work together
          </h2>

          <p className="home__contact-subtext">
            Have a project in mind or an open role? I&rsquo;d love to hear from you.
          </p>

          {/*
            Email link — styled as a large clickable address.
            TODO: Replace hello@connorcallaghan.com with your actual email address.
          */}
          <a
            href="mailto:hello@connorcallaghan.com"
            className="home__contact-email"
            aria-label="Send an email to hello@connorcallaghan.com"
          >
            {/* TODO: Replace with your actual email */}
            hello@connorcallaghan.com
          </a>

        </div>
      </section>

    </main>
  );
}
