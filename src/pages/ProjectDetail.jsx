/*
  ProjectDetail.jsx
  ──────────────────────────────────────────────────────────────────────────────
  The individual project detail page, rendered at /projects/:id.

  How it works:
    1. useParams() reads the :id from the URL (e.g., /projects/2 → id = "2")
    2. We find the matching project in projects.js using projects.find()
    3. If no project matches, render a "not found" message
    4. Otherwise, render the full detail view:
       - Back link
       - Hero (title, description, CTA buttons)
       - Overview (full description + metadata row)
       - Process sections (from the process array)
       - Screenshots (from the screenshots array)
  ──────────────────────────────────────────────────────────────────────────────
*/

import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import './ProjectDetail.css';

export default function ProjectDetail() {
  /*
    useParams() returns an object with the URL parameters.
    For the route /projects/:id, params.id will be the string from the URL.
    We convert it to a Number so it matches the numeric id fields in projects.js.
  */
  const { id } = useParams();
  const project = projects.find(p => p.id === Number(id));

  /*
    Update the browser tab title whenever the project changes.
    If the project isn't found, set a generic title.
  */
  useEffect(() => {
    if (project) {
      document.title = `${project.title} — Connor Callaghan`;
    } else {
      document.title = 'Project Not Found — Connor Callaghan';
    }
  }, [project]);

  /* ── NOT FOUND STATE ── */
  if (!project) {
    return (
      <main id="main-content" className="project-detail page-enter">
        <div className="container project-detail__not-found">
          <h1 className="project-detail__not-found-heading">Project not found.</h1>
          <p className="project-detail__not-found-text">
            The project you&rsquo;re looking for doesn&rsquo;t exist or may have been removed.
          </p>
          <Link to="/projects" className="btn btn-primary">
            &larr; Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  /* Destructure fields for cleaner JSX below */
  const {
    title,
    description,
    tags,
    liveUrl,
    githubUrl,
    fullDescription,
    role,
    duration,
    process,
    screenshots,
  } = project;

  return (
    <main id="main-content" className="project-detail page-enter">

      {/* ════════════════════════════════════════════════════════════════════
          BACK LINK
          Above the hero so it's the first element after the skip link.
          ════════════════════════════════════════════════════════════════════ */}
      <div className="project-detail__back-wrapper">
        <div className="container">
          <Link to="/projects" className="project-detail__back-link">
            {/* === ANIMATION — color shifts to yellow on hover (see CSS) === */}
            &larr; Back to Projects
          </Link>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          HERO
          Project title, short description, and external link buttons.
          ════════════════════════════════════════════════════════════════════ */}
      <section className="project-detail__hero" aria-labelledby="detail-heading">
        <div className="container project-detail__hero-inner">

          <h1 id="detail-heading" className="project-detail__title">
            {title}
          </h1>

          <p className="project-detail__tagline">
            {description}
          </p>

          {/* External link buttons — only shown if URLs exist */}
          {(liveUrl || githubUrl) && (
            <div className="project-detail__hero-links">
              {liveUrl && (
                <a
                  href={liveUrl}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} live site (opens in new tab)`}
                >
                  Live Site &rarr;
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} GitHub repository (opens in new tab)`}
                >
                  GitHub &rarr;
                </a>
              )}
            </div>
          )}

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          OVERVIEW
          Full description paragraph + metadata row (role, duration, tech).
          ════════════════════════════════════════════════════════════════════ */}
      <section className="project-detail__overview" aria-labelledby="overview-heading">
        <div className="container project-detail__overview-inner">

          {/* Full description as a lead paragraph */}
          <p className="project-detail__full-description">
            {fullDescription}
          </p>

          {/*
            Metadata row: Role · Duration · Tech stack
            Displayed as a flex row of labeled fields.
          */}
          <dl className="project-detail__meta">

            {role && (
              <div className="project-detail__meta-item">
                {/*
                  <dl>/<dt>/<dd> is the correct semantic markup for a list of
                  key/value pairs (accessibility best practice).
                */}
                <dt className="project-detail__meta-label">Role</dt>
                <dd className="project-detail__meta-value">{role}</dd>
              </div>
            )}

            {duration && (
              <div className="project-detail__meta-item">
                <dt className="project-detail__meta-label">Duration</dt>
                <dd className="project-detail__meta-value">{duration}</dd>
              </div>
            )}

            {tags && tags.length > 0 && (
              <div className="project-detail__meta-item project-detail__meta-item--tags">
                <dt className="project-detail__meta-label">Tech</dt>
                <dd className="project-detail__meta-value">
                  <ul className="project-detail__tag-list" role="list" aria-label="Technologies used">
                    {tags.map(tag => (
                      <li key={tag}>
                        <span className="tag">{tag}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}

          </dl>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PROCESS SECTIONS
          Rendered from the process array in projects.js.
          Each object: { heading, body } → becomes an H3 + paragraph.
          ════════════════════════════════════════════════════════════════════ */}
      {process && process.length > 0 && (
        <section className="project-detail__process" aria-labelledby="process-heading">
          <div className="container">

            {/* Visually hidden heading for screen readers to label this section */}
            <h2 id="process-heading" className="sr-only">Process</h2>

            <div className="project-detail__process-sections">
              {process.map((section, index) => (
                <div key={index} className="project-detail__process-section">

                  {/* Section heading (serif display font) */}
                  <h3 className="project-detail__process-heading">
                    {section.heading}
                  </h3>

                  {/* Section body paragraph */}
                  <p className="project-detail__process-body">
                    {section.body}
                  </p>

                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          SCREENSHOTS
          Rendered from the screenshots array in projects.js.
          Full content width, 16:9 aspect ratio, single column.
          ════════════════════════════════════════════════════════════════════ */}
      {screenshots && screenshots.length > 0 && (
        <section className="project-detail__screenshots" aria-label="Project screenshots">
          <div className="container">

            <h2 className="project-detail__screenshots-heading">Screenshots</h2>

            <div className="project-detail__screenshots-list">
              {screenshots.map((src, index) => (
                <figure key={index} className="project-detail__screenshot-figure">
                  <img
                    src={src}
                    /*
                      Alt text: project title + screenshot number.
                      Gives screen reader users meaningful context.
                    */
                    alt={`${title} — screenshot ${index + 1}`}
                    className="project-detail__screenshot-img"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ── BOTTOM BACK LINK ── */}
      <div className="project-detail__bottom-back">
        <div className="container">
          <Link to="/projects" className="project-detail__back-link">
            &larr; Back to Projects
          </Link>
        </div>
      </div>

    </main>
  );
}
