/*
  projects.js
  ──────────────────────────────────────────────────────────────────────────────
  THIS IS THE KEY FILE. All project data lives here.

  To add a new project:
    1. Copy one of the objects below.
    2. Give it a unique `id` (increment from the last one).
    3. Fill in your project details, replacing all TODO comments.
    4. Place your project image in /public/images/ and update the `image` field.
    5. Save the file — the Home and Projects pages update automatically.

  To feature a project on the homepage:
    - Set `featured: true` on the project object.
    - NOTE: Only the FIRST 2 featured projects appear on the homepage.
      If you mark more than 2 as featured, the extras still appear on the
      Projects page — they are just ignored on Home.
      See Home.jsx for the slice(0, 2) logic that enforces this cap.

  Fields explained:
    id            {number}       Unique ID — must be unique across all projects.
    title         {string}       Project name shown on cards and detail pages.
    description   {string}       Short 1–2 sentence summary (shown on cards).
    tags          {string[]}     Tech stack badges (e.g. ['React', 'CSS']).
    liveUrl       {string|null}  URL to the live site, or null if not deployed.
    githubUrl     {string|null}  URL to the GitHub repo, or null if private.
    image         {string|null}  Path to image in /public/images/, or null.
    featured      {boolean}      true = candidate for homepage; max 2 shown there.
    fullDescription {string}     Longer write-up shown on the detail page.
    role          {string}       Your role on the project.
    duration      {string}       How long the project took.
    process       {object[]}     Array of { heading, body } sections for detail page.
    screenshots   {string[]}     Additional screenshot paths for the detail page.
  ──────────────────────────────────────────────────────────────────────────────
*/

export const projects = [
  {
    /* ── CARD DATA (used on Home + Projects pages) ──────────────────────────── */

    id: 1,

    // TODO: Replace with your project name
    title: "Portfolio Website",

    // TODO: Replace with a 1–2 sentence description of what the project does
    description: "A personal portfolio site built with React and Vite, featuring a warm parchment design system, dark mode support, and a data-driven project showcase.",

    // TODO: Replace with the actual tech stack used
    tags: ["React", "Vite", "CSS", "React Router"],

    // TODO: Replace with your live site URL, or set to null if not yet deployed
    liveUrl: null,

    // TODO: Replace with your GitHub repo URL, or set to null if the repo is private
    githubUrl: null,

    // TODO: Place your project image in /public/images/ and update this path.
    // Recommended size: 1200×675px (16:9). Set to null to show the placeholder.
    image: null,

    // true = this project is a candidate for the homepage featured section
    // Only the first 2 featured projects will appear on the homepage (see Home.jsx)
    featured: true,

    /* ── DETAIL PAGE DATA (used only on /projects/:id) ─────────────────────── */

    // TODO: Replace with a longer 2–4 sentence write-up of the project
    fullDescription: "A personal portfolio website designed to communicate reliability and creative taste to both freelance clients and potential employers. Built with React and Vite, the site features a warm parchment color palette, smooth dark mode switching, and a data-driven architecture that makes adding new projects a single-file edit.",

    // TODO: Replace with your actual role on this project
    role: "Solo developer & designer",

    // TODO: Replace with the actual time it took
    duration: "2 weeks",

    // Each object here becomes a section on the detail page: heading + paragraph.
    // Add or remove sections as needed. Common sections: The Problem, My Approach,
    // Technical Highlights, Challenges, Outcome, What I Learned.
    process: [
      {
        // TODO: Replace this heading and body with your own content
        heading: "The Goal",
        body: "Design and build a portfolio site that works equally well for freelance clients and full-time employers — professional and polished at first glance, with enough personality to linger.",
      },
      {
        // TODO: Replace this heading and body with your own content
        heading: "Design Approach",
        body: "Chose a warm parchment palette (off-white, near-black, and a signature pastel yellow) to feel editorial and considered without being generic. DM Serif Display for headings contrasts with DM Sans body text to create hierarchy without relying on weight alone.",
      },
      {
        // TODO: Replace this heading and body with your own content
        heading: "Architecture",
        body: "All project data lives in a single projects.js file. Adding a new project means adding one object to an array — the cards, grid, and detail pages update automatically. No CMS needed.",
      },
    ],

    // TODO: Add paths to additional screenshots shown on the detail page.
    // Place images in /public/images/ and list them here.
    screenshots: [],
  },

  {
    /* ── CARD DATA ─────────────────────────────────────────────────────────── */

    id: 2,

    // TODO: Replace with your project name
    title: "Project Two",

    // TODO: Replace with a short description
    description: "A short description of what this project does and who it's for. Keep it to 1–2 sentences.",

    // TODO: Replace with the actual tech stack
    tags: ["React", "Node.js", "CSS"],

    // TODO: Replace with live URL or set to null
    liveUrl: null,

    // TODO: Replace with GitHub URL or set to null
    githubUrl: null,

    // TODO: Add image to /public/images/ and update path, or leave null
    image: null,

    featured: true,  // This will be the second featured project shown on the homepage

    /* ── DETAIL PAGE DATA ──────────────────────────────────────────────────── */

    // TODO: Write a longer description of the project
    fullDescription: "A longer description of Project Two. Explain what it does, who it's for, and what makes it interesting or technically notable. Aim for 2–4 sentences.",

    // TODO: Replace with your actual role
    role: "Solo developer",

    // TODO: Replace with actual duration
    duration: "3 weeks",

    // TODO: Fill in your process sections
    process: [
      {
        heading: "The Problem",
        body: "What were you trying to solve? Why did this project exist? TODO: Replace this with your actual content.",
      },
      {
        heading: "My Approach",
        body: "How did you tackle it? What decisions did you make and why? TODO: Replace this with your actual content.",
      },
      {
        heading: "Outcome",
        body: "What was the result? What did you learn or ship? TODO: Replace this with your actual content.",
      },
    ],

    // TODO: Add screenshot paths, or leave as empty array
    screenshots: [],
  },

  {
    /* ── CARD DATA ─────────────────────────────────────────────────────────── */

    id: 3,

    // TODO: Replace with your project name
    title: "Project Three",

    // TODO: Replace with a short description
    description: "Another project you've built. What does it do? Who is it for?",

    // TODO: Replace with the actual tech stack
    tags: ["JavaScript", "HTML", "CSS"],

    // TODO: Replace with live URL or set to null
    liveUrl: null,

    // TODO: Replace with GitHub URL or set to null
    githubUrl: null,

    // TODO: Add image to /public/images/ and update path, or leave null
    image: null,

    // false = this project does NOT appear on the homepage; it still appears
    // on the full Projects page grid
    featured: false,

    /* ── DETAIL PAGE DATA ──────────────────────────────────────────────────── */

    // TODO: Write a longer description of the project
    fullDescription: "A longer description of Project Three. Explain what it does, who it's for, and what makes it interesting. TODO: Replace this placeholder text.",

    // TODO: Replace with your actual role
    role: "Solo developer",

    // TODO: Replace with actual duration
    duration: "1 week",

    // TODO: Fill in your process sections
    process: [
      {
        heading: "The Problem",
        body: "TODO: Describe the problem this project solved.",
      },
      {
        heading: "My Approach",
        body: "TODO: Describe how you approached the solution.",
      },
      {
        heading: "Outcome",
        body: "TODO: Describe the result and what you learned.",
      },
    ],

    // TODO: Add screenshot paths, or leave as empty array
    screenshots: [],
  },
];
