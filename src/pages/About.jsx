/*
  About.jsx
  ──────────────────────────────────────────────────────────────────────────────
  The About page. Sections:
    1. Page hero — heading + short bio paragraph
    2. Skills — a grid of tech tags organized by category
    3. Currently learning — an optional callout for things in progress
  ──────────────────────────────────────────────────────────────────────────────
*/

import { useEffect } from 'react';
import './About.css';

/*
  Skills data — organized by category so they render as labeled groups.
  TODO: Edit these lists to match your actual skillset.
  Add, remove, or rename categories and items as needed.
*/
const SKILLS = [
  {
    category: "Languages & Markup",
    items: ["HTML", "CSS", "JavaScript"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Vite", "React Router"],
  },
  {
    category: "Design & Tooling",
    items: ["Figma", "Git", "GitHub", "VS Code"],
  },
  {
    category: "Exploring",
    items: ["Next.js", "TypeScript"],
  },
];

export default function About() {
  /* Update the browser tab title when this page mounts */
  useEffect(() => {
    document.title = 'About — Connor Callaghan';
  }, []);

  return (
    <main id="main-content" className="about page-enter">

      {/* ════════════════════════════════════════════════════════════════════
          PAGE HERO
          ════════════════════════════════════════════════════════════════════ */}
      <section className="about__hero" aria-labelledby="about-heading">
        <div className="container about__hero-inner">

          {/* Decorative yellow accent mark */}
          <span className="about__eyebrow" aria-hidden="true" />

          <h1 id="about-heading" className="about__heading">
            About Me
          </h1>

          {/*
            Bio paragraph.
            TODO: Replace this placeholder text with your actual bio.
            Write 2–4 sentences that describe your background, what you enjoy
            building, and what makes you interesting as a developer/designer.
          */}
          <p className="about__bio">
            {/* TODO: Replace with your actual bio */}
            I&rsquo;m a frontend developer and UI/UX designer who enjoys building things that are both
            functional and visually considered. I care about the details — clear typography, thoughtful
            spacing, and interactions that feel right. My work lives at the intersection of design and
            code, and I&rsquo;m happiest when those two things are working well together.
          </p>

          {/*
            Second bio paragraph — optional.
            TODO: Add more personal detail here, or delete this paragraph if one is enough.
          */}
          <p className="about__bio">
            {/* TODO: Replace or delete this second paragraph */}
            Currently based in{' '}
            <span className="about__location">
              {/* TODO: Replace with your city */}
              [your city]
            </span>
            . Open to freelance projects and full-time roles.
          </p>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SKILLS SECTION
          ════════════════════════════════════════════════════════════════════ */}
      <section className="about__skills" aria-labelledby="skills-heading">
        <div className="container">

          <h2 id="skills-heading" className="about__section-heading">
            Skills &amp; Tools
          </h2>

          {/*
            Render each category as a labeled group of tags.
            Each skill renders using the global .tag class defined in global.css.
          */}
          <div className="about__skills-grid">
            {SKILLS.map(group => (
              <div key={group.category} className="about__skill-group">

                {/* Category label */}
                <h3 className="about__skill-category">{group.category}</h3>

                {/* Tag list */}
                <ul className="about__skill-tags" role="list" aria-label={group.category}>
                  {group.items.map(skill => (
                    <li key={skill}>
                      <span className="tag">{skill}</span>
                    </li>
                  ))}
                </ul>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CURRENTLY LEARNING CALLOUT (optional)
          Delete this section if you don't want it.
          ════════════════════════════════════════════════════════════════════ */}
      <section className="about__learning" aria-labelledby="learning-heading">
        <div className="container">

          <div className="about__learning-card">
            {/* Small yellow accent dot */}
            <span className="about__learning-dot" aria-hidden="true" />

            <div className="about__learning-content">
              <h2 id="learning-heading" className="about__learning-heading">
                Currently learning
              </h2>

              {/*
                TODO: Update this text with what you're actually learning right now.
                Keep it honest and specific — it shows you're actively growing.
              */}
              <p className="about__learning-text">
                {/* TODO: Replace with your current learning focus */}
                Deepening my understanding of Next.js and exploring TypeScript for
                larger React codebases.
              </p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
