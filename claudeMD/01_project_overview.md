# Connor Callaghan — Portfolio
## Prep Document 1 of 2: Project Overview & Content Strategy

---

## 1. Project Summary

A personal portfolio website for **Connor Callaghan**, a Web / Frontend / Full-Stack developer and UI-UX designer. The site serves two audiences:

- **Freelance clients** — needs to communicate reliability, professionalism, and creative taste. They should feel confident hiring Connor to build a polished site for them.
- **W2 employers** — needs to read as technically capable, self-directed, and design-aware without being gimmicky.

The tone goal: **quietly confident**. Clean and professional at first glance, with enough personality and design taste that it lingers. Not flashy, not generic.

---

## 2. Tech Stack

| Decision | Choice | Notes |
|---|---|---|
| Framework | **React + Vite** | Connor is already familiar with this setup |
| Styling | **Regular CSS** (no Tailwind, no CSS modules) | Plain `.css` files per component |
| Routing | **React Router v6** | For multi-page navigation (Home, About, Projects, Contact, ProjectDetail) |
| Hosting | **Vercel** | Deploy directly from GitHub repo |
| Dark Mode | **Both light + dark with a toggle** | Implement via CSS custom properties on `:root` + a `data-theme` attribute on `<html>` |
| Color Palette | **Option A — Warm Parchment + Yellow** | `#FAFAF7` background, `#E8D96A` accent, `#1C1A14` text — see design system doc |

### Recommended Project Structure

```
/src
  /components
    Navbar.jsx          ← sticky nav, shared across all pages
    Navbar.css
    ProjectCard.jsx     ← reusable card component; clicking the card navigates to /projects/:id
    ProjectCard.css
    Footer.jsx
    Footer.css
  /pages
    Home.jsx            ← hero + featured projects + contact CTA
    Home.css
    About.jsx
    About.css
    Projects.jsx        ← full project grid
    Projects.css
    ProjectDetail.jsx   ← individual project detail page (/projects/:id)
    ProjectDetail.css
    Contact.jsx         ← simple email contact page
    Contact.css
  /data
    projects.js         ← *** THIS IS THE KEY FILE — all project data lives here
                            Adding a new project = add one object to this array
  /styles
    global.css          ← CSS custom properties (colors, fonts, spacing) — Option A palette
    theme.css           ← light/dark mode variable definitions
  App.jsx
  main.jsx
```

### How to Add a New Project (instruct Opus to build it this way)

All project data should live in `/src/data/projects.js` as an array of objects. The `ProjectCard` component reads from this array and renders cards on both the Home and Projects pages. Clicking a card navigates to `/projects/:id`, where `ProjectDetail.jsx` reads the same array to render the full detail page.

```js
// To add a new project, copy one of these objects and fill in your details.
// The ProjectCard component will automatically render it on the Home and Projects pages.
// The ProjectDetail page will automatically render the full write-up at /projects/:id.
export const projects = [
  {
    // --- CARD DATA (used on Home + Projects pages) ---
    id: 1,
    title: "Project Title",                                   // TODO: Replace with your project name
    description: "A short 1-2 sentence description.",        // TODO: Replace with your description
    tags: ["React", "CSS", "Vite"],                          // Tech used — renders as small badges
    liveUrl: "https://your-live-site.com",                   // TODO: Replace or set to null if none
    githubUrl: "https://github.com/your-repo",               // TODO: Replace or set to null if none
    image: "/images/project-1.png",                          // TODO: Place image in /public/images/
    featured: true,  // true = show on homepage preview; NOTE: only the first 2 featured projects
                     // appear on the homepage. Mark more as featured and they'll be ignored on
                     // Home but still show on the Projects page.

    // --- DETAIL PAGE DATA (used only on /projects/:id) ---
    fullDescription: "A longer 2-4 sentence write-up of the project. What does it do, who is it for, and what makes it interesting?",
    // TODO: Replace with your full description

    role: "Solo developer & designer",   // TODO: Replace with your actual role
    duration: "3 weeks",                 // TODO: Replace with actual timeline

    process: [
      // Each object here renders as a section on the detail page: a heading + a body paragraph.
      // Add as many sections as you need. Common ones: The Problem, My Approach, Challenges, Outcome.
      {
        heading: "The Problem",
        body: "What were you trying to solve? Why did this project exist?",  // TODO: Fill in
      },
      {
        heading: "My Approach",
        body: "How did you tackle it? What decisions did you make and why?", // TODO: Fill in
      },
      {
        heading: "Outcome",
        body: "What was the result? What did you learn?",                    // TODO: Fill in
      },
    ],

    screenshots: [
      // Paths to additional screenshots shown on the detail page.
      // Place images in /public/images/ and list them here in display order.
      "/images/project-1-screen1.png",  // TODO: Replace with your screenshot paths
      "/images/project-1-screen2.png",  // TODO: Add or remove as needed
    ],
  },
];
```

---

## 3. Site Structure & Pages

### Navbar (sticky, shared)
- Logo / name: **Connor Callaghan** (left side)
- Nav links: Home · About · Projects · Contact
- Dark mode toggle (right side) — a simple sun/moon icon button, colored `--color-accent` (pastel yellow)
- Sticky on scroll; subtle `--shadow-sm` appears on scroll to reinforce stickiness
- Mobile: collapses to a hamburger menu below 768px

---

### Page 1: Home

**Section 1 — Hero**
- Large heading: Connor's name + tagline
- Placeholder tagline: *"Building clean websites and thoughtful digital experiences."*
- Subtext (1–2 lines): Something like *"Frontend developer and designer based in [location]. Available for freelance work and full-time roles."* — `{/* TODO: Replace [location] with your city */}`
- Two CTA buttons: **View My Work** (→ Projects page) and **Get In Touch** (→ Contact page)
- Primary button uses `--color-accent` (yellow fill); secondary button uses outlined style

**Section 2 — Featured Projects**
- Show the first 2 project cards where `featured: true` (slice the array to max 2)
- Cards are fully clickable and navigate to `/projects/:id`
- Below the cards: a **"See All Projects →"** button linking to the Projects page
- If no projects exist yet, display tasteful placeholder cards with dummy content

**Section 3 — Contact CTA**
- Simple, warm section at the bottom of the homepage
- Heading: something like *"Let's work together"*
- Short line: *"Have a project in mind or an open role? I'd love to hear from you."*
- Button or styled email link: `hello@connorcallaghan.com` — `{/* TODO: Replace with your actual email */}`

---

### Page 2: About
- Short personal bio paragraph — `{/* TODO: Replace with your actual bio */}`
- Skills section: list of technologies/tools as styled tags or a simple grid
  - HTML/CSS, JavaScript, React, Next.js (learning), Vite, Figma, Git/GitHub
- Optional: a simple timeline or "currently learning" callout section

---

### Page 3: Projects
- Full grid of all project cards from `projects.js`
- Cards are fully clickable and navigate to `/projects/:id`
- Cards show: project image (or placeholder), title, description, tech tags, live/GitHub links
- Grid: 3 columns desktop → 2 tablet → 1 mobile

---

### Page 4: ProjectDetail (`/projects/:id`)

This page is rendered by `ProjectDetail.jsx` and reads data from `projects.js` using the `id` param from the URL. React Router's `useParams()` hook retrieves the id; find the matching project with `projects.find(p => p.id === Number(id))`.

**Section 1 — Hero**
- Project title (display font, large)
- One-line description (`description` field)
- Live Site and GitHub buttons (if URLs exist) — same button styles as elsewhere
- A **"← Back to Projects"** link (top-left, above the title)

**Section 2 — Overview**
- Full description (`fullDescription` field) as a lead paragraph
- Metadata row: Role · Duration · Tech stack tags — displayed inline as a simple labeled grid

**Section 3 — Process**
- Rendered from the `process` array
- Each object becomes a section: heading (display font, H3) + body paragraph
- Sections are separated with generous vertical spacing

**Section 4 — Screenshots**
- Rendered from the `screenshots` array
- Displayed in a single column, full content width
- Each image: `16:9` aspect ratio, `--shadow-md`, `--radius-md`, `--space-8` gap between images
- Images are full-width on mobile (no lightbox required — keep it simple)

**Not found state:** If no project matches the id, render a simple message: *"Project not found."* with a link back to the Projects page.

**Mobile behavior:** All sections stack to full width. The metadata row wraps naturally. Screenshots remain single-column (already the default).

---

### Page 5: Contact
- No form — keep it simple
- Heading: *"Get In Touch"*
- Short copy: *"I'm currently available for freelance projects and open to full-time opportunities. The best way to reach me is by email."*
- Large styled email link: `hello@connorcallaghan.com` — `{/* TODO: Replace with your actual email */}`
- `{/* TODO: Add your LinkedIn URL here if desired — placeholder anchor is ready below */}`

---

## 4. Code Standards (instruct Opus to follow these)

- **Comment everything** — every component, every CSS section, every variable, every function should have a comment explaining what it is and what it does. Write comments as if the reader is learning React for the first time.
- **Animations should be isolated** — all transitions and animations should be in clearly labeled CSS sections with a comment like `/* === ANIMATIONS — remove or edit these if you want less motion === */` so Connor can easily find and disable them.
- **No magic numbers** — all spacing, colors, font sizes should use CSS custom properties defined in `global.css` (Option A palette), not hardcoded pixel values scattered through component files.
- **Placeholder comments** — anywhere Connor needs to fill in personal info (name, bio, email, location), leave a comment like `{/* TODO: Replace with your actual email */}`.
- **New project fields** — the `fullDescription`, `role`, `duration`, `process`, and `screenshots` fields in `projects.js` are all placeholders Connor must fill in. Each should have a `// TODO:` comment calling this out explicitly.
- **Featured project cap** — on the Home page, slice the featured projects array to a maximum of 2: `projects.filter(p => p.featured).slice(0, 2)`. Add a comment explaining that only 2 will show on the homepage even if more are marked featured.
- **Cursor on cards** — `ProjectCard` is a navigation element. Set `cursor: pointer` explicitly in `ProjectCard.css` so the clickable affordance is clear to users.
