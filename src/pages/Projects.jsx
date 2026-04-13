/*
  Projects.jsx
  ──────────────────────────────────────────────────────────────────────────────
  The full projects grid page. Shows ALL projects from projects.js — no cap.

  Grid: 3 columns desktop → 2 tablet → 1 mobile
  ──────────────────────────────────────────────────────────────────────────────
*/

import { useEffect } from 'react';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

export default function Projects() {
  /* Update the browser tab title when this page mounts */
  useEffect(() => {
    document.title = 'Projects — Connor Callaghan';
  }, []);

  return (
    <main id="main-content" className="projects-page page-enter">

      {/* ════════════════════════════════════════════════════════════════════
          PAGE HERO
          ════════════════════════════════════════════════════════════════════ */}
      <section className="projects-page__hero" aria-labelledby="projects-heading">
        <div className="container projects-page__hero-inner">

          {/* Decorative yellow accent mark */}
          <span className="projects-page__eyebrow" aria-hidden="true" />

          <h1 id="projects-heading" className="projects-page__heading">
            Projects
          </h1>

          <p className="projects-page__subtext">
            {/*
              TODO: Replace this with a short line about your work.
              Or delete this paragraph if you prefer just the heading.
            */}
            A collection of things I&rsquo;ve designed and built.
          </p>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FULL PROJECTS GRID
          Shows all projects — no featured cap here.
          ════════════════════════════════════════════════════════════════════ */}
      <section className="projects-page__grid-section" aria-label="All projects">
        <div className="container">

          {projects.length > 0 ? (
            /*
              3-column grid on desktop, 2 on tablet, 1 on mobile.
              The responsive columns are controlled by CSS.
            */
            <ul className="projects-page__grid" role="list">
              {projects.map(project => (
                <li key={project.id}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          ) : (
            /* Empty state — shown if no projects exist yet */
            <div className="projects-page__empty">
              <p>Projects coming soon — check back later.</p>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}
