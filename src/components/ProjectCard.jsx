/*
  ProjectCard.jsx
  ──────────────────────────────────────────────────────────────────────────────
  A reusable card component for displaying a single project.
  Used on both the Home page (featured projects) and the Projects page (full grid).

  Props:
    project {object} — a project object from /src/data/projects.js
      .id          {number} — unique identifier, used in the URL (/projects/:id)
      .title       {string} — project name
      .description {string} — short 1–2 sentence description
      .tags        {string[]} — array of tech stack labels (e.g. ['React', 'CSS'])
      .liveUrl     {string|null} — live site URL, or null if not deployed
      .githubUrl   {string|null} — GitHub repo URL, or null if private
      .image       {string|null} — path to the project image (in /public/images/)

  Behavior:
    - The entire card is a clickable link that navigates to /projects/:id
    - The Live Site and GitHub buttons inside the card use e.stopPropagation()
      so clicking them opens the external URL WITHOUT triggering card navigation
  ──────────────────────────────────────────────────────────────────────────────
*/

import { Link } from 'react-router-dom';  /* Link renders an <a> tag that works with React Router */
import './ProjectCard.css';

export default function ProjectCard({ project }) {
  /* Destructure the fields we need from the project object */
  const { id, title, description, tags, liveUrl, githubUrl, image } = project;

  /*
    stopPropagation prevents the click event from "bubbling up" to the card's
    Link wrapper, which would navigate to the detail page instead of following
    the external link.
  */
  function handleExternalLinkClick(e) {
    e.stopPropagation();
  }

  return (
    /*
      The outer <article> is the semantic element for a self-contained piece
      of content. The Link inside makes the whole card clickable.

      aria-label gives screen readers a meaningful name for the card link.
    */
    <article className="project-card">
      <Link
        to={`/projects/${id}`}
        className="project-card__link"
        aria-label={`View project: ${title}`}
      >
        {/* ── PROJECT IMAGE ── */}
        <div className="project-card__image-wrapper">
          {image ? (
            <img
              src={image}
              alt={`${title} — project screenshot`}
              className="project-card__image"
              loading="lazy"  /* lazy-load images below the fold for performance */
            />
          ) : (
            /*
              Placeholder shown when no image is provided.
              Uses CSS to render a tasteful patterned background.
            */
            <div className="project-card__image-placeholder" aria-hidden="true">
              <span className="project-card__placeholder-text">
                {/* Show first letter of project title as a monogram */}
                {title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* ── CARD BODY ── */}
        <div className="project-card__body">

          {/* Project title */}
          <h3 className="project-card__title">{title}</h3>

          {/* Short description */}
          <p className="project-card__description">{description}</p>

          {/* Tech stack tags */}
          {tags && tags.length > 0 && (
            <ul className="project-card__tags" role="list" aria-label="Technologies used">
              {tags.map(tag => (
                <li key={tag}>
                  <span className="tag">{tag}</span>
                </li>
              ))}
            </ul>
          )}

          {/* External links — Live Site and/or GitHub */}
          {(liveUrl || githubUrl) && (
            <div className="project-card__links">
              {liveUrl && (
                <a
                  href={liveUrl}
                  className="project-card__ext-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  /*
                    aria-label includes "opens in new tab" so screen reader users
                    know the link behavior before clicking.
                  */
                  aria-label={`${title} live site (opens in new tab)`}
                  onClick={handleExternalLinkClick}  /* prevent card navigation */
                >
                  Live Site &rarr;
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  className="project-card__ext-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} GitHub repository (opens in new tab)`}
                  onClick={handleExternalLinkClick}  /* prevent card navigation */
                >
                  GitHub &rarr;
                </a>
              )}
            </div>
          )}

        </div>
      </Link>
    </article>
  );
}
