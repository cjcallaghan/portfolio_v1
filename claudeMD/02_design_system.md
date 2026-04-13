# Connor Callaghan — Portfolio
## Prep Document 2 of 2: Visual Design System

---

## 1. Aesthetic Direction

**The concept:** Editorial warmth. Think a well-designed independent studio or creative agency — clean grid, generous whitespace, warm neutrals, a pop of soft yellow as the personality color. Feels handcrafted without being precious. Professional without being corporate.

**The one thing someone should remember:** *The yellow. It appears sparingly but deliberately — and it makes the whole thing feel alive.*

**Color palette: Option A — Warm Parchment + Yellow** (selected, implemented throughout)
- Primary BG: Warm off-white `#FAFAF7`
- Accent: Pastel yellow `#E8D96A`
- Text: Warm near-black `#1C1A14`
- Earth tones: Tan `#C4A882` + Sage `#A8B89A`
- *Feel: like a well-designed notebook. Warm, considered, approachable.*

---

## 2. Color Palette

Implement as CSS custom properties in `/src/styles/global.css`.

### Light Mode (default)

```css
:root {
  /* === BACKGROUND COLORS === */
  --color-bg-primary: #FAFAF7;        /* warm off-white — main page background */
  --color-bg-secondary: #F2F0E8;      /* slightly warmer — card backgrounds, sections */
  --color-bg-tertiary: #E8E5D8;       /* used for subtle dividers, hover states */

  /* === TEXT COLORS === */
  --color-text-primary: #1C1A14;      /* near-black with a warm undertone — headings */
  --color-text-secondary: #5C5849;    /* warm mid-gray — body text, descriptions */
  --color-text-muted: #9B9688;        /* muted — captions, tags, meta info */

  /* === ACCENT COLORS === */
  --color-accent: #E8D96A;            /* pastel yellow — THE signature color */
  --color-accent-hover: #D9C94F;      /* slightly darker yellow for hover states */
  --color-accent-subtle: #F5F0C0;     /* very pale yellow — backgrounds, highlights */

  /* === EARTH TONE ACCENTS (warm undertone palette) === */
  --color-earth-warm: #C4A882;        /* warm tan — secondary accent, borders */
  --color-earth-sage: #A8B89A;        /* muted sage green — tertiary accent */

  /* === BORDER & DIVIDER === */
  --color-border: #DDD9CC;            /* warm light gray — card borders, dividers */
  --color-border-strong: #C4BFB0;     /* slightly stronger — focused elements */

  /* === UTILITY === */
  --color-white: #FFFFFF;
  --color-link: #5C5849;              /* links match body text, underline differentiates */
}
```

### Dark Mode

```css
[data-theme="dark"] {
  /* === BACKGROUND COLORS === */
  --color-bg-primary: #1A1914;        /* very dark warm-tinted black */
  --color-bg-secondary: #242218;      /* slightly lighter — cards, sections */
  --color-bg-tertiary: #2E2C20;       /* hover states, subtle separators */

  /* === TEXT COLORS === */
  --color-text-primary: #F0EDE0;      /* warm off-white — headings */
  --color-text-secondary: #B8B4A4;    /* warm mid-gray — body text */
  --color-text-muted: #7A7668;        /* muted — captions, meta */

  /* === ACCENT COLORS — yellow stays, slightly adjusted for dark background === */
  --color-accent: #D9C94F;            /* same yellow, slightly richer for dark bg */
  --color-accent-hover: #C9B83A;      /* hover */
  --color-accent-subtle: #2A2810;     /* dark yellow tint for backgrounds */

  /* === EARTH TONES — darkened to match warm-parchment feel === */
  --color-earth-warm: #8C7055;        /* darker tan */
  --color-earth-sage: #6E7D68;        /* darker sage */

  /* === BORDER & DIVIDER === */
  --color-border: #3A3828;            /* dark warm border */
  --color-border-strong: #504E3C;     /* stronger border for dark mode */

  /* === UTILITY === */
  --color-white: #FFFFFF;
  --color-link: #B8B4A4;
}
```

### How Yellow Is Used
The yellow accent should be used **sparingly and intentionally**:
- ✅ CTA button backgrounds
- ✅ Active nav link indicator (underline or dot)
- ✅ Hover state on project cards (subtle left border or highlight)
- ✅ Section accent marks (a small decorative element, e.g. a small yellow square before a heading)
- ✅ The dark mode toggle button icon color
- ✅ "Back to Projects" link hover state on the ProjectDetail page
- ❌ Do NOT use yellow for large background fills
- ❌ Do NOT use yellow for body text
- ❌ Do NOT overuse — it should feel like a considered choice each time

---

## 3. Typography

```css
/* Import in index.html or main.jsx */
/* Google Fonts: DM Sans (body) + DM Serif Display (display headings) */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display&display=swap');

:root {
  /* === FONT FAMILIES === */
  --font-body: 'DM Sans', sans-serif;         /* all body text, UI elements, nav */
  --font-display: 'DM Serif Display', serif;  /* hero heading, section headings only */

  /* === FONT SIZES === */
  --text-xs: 0.75rem;     /* 12px — badges, tags */
  --text-sm: 0.875rem;    /* 14px — captions, meta */
  --text-base: 1rem;      /* 16px — body text */
  --text-lg: 1.125rem;    /* 18px — lead paragraphs */
  --text-xl: 1.25rem;     /* 20px — card titles */
  --text-2xl: 1.5rem;     /* 24px — section headings */
  --text-3xl: 2rem;       /* 32px — page headings */
  --text-4xl: 2.75rem;    /* 44px — hero heading */
  --text-5xl: 3.5rem;     /* 56px — hero name (large screens) */

  /* === FONT WEIGHTS === */
  --weight-light: 300;
  --weight-regular: 400;
  --weight-medium: 500;

  /* === LINE HEIGHTS === */
  --leading-tight: 1.2;   /* headings */
  --leading-normal: 1.6;  /* body */
  --leading-loose: 1.8;   /* long-form paragraphs */

  /* === LETTER SPACING === */
  --tracking-tight: -0.02em;   /* large display headings */
  --tracking-wide: 0.08em;     /* small caps labels, tag text */
}
```

**Typography rules:**
- `--font-display` (serif) is used ONLY for: the hero name, H2 section headings, and H3 process section headings on the ProjectDetail page
- `--font-body` (sans-serif) is used for: everything else — nav, body, cards, buttons, metadata
- This contrast between the two fonts creates visual hierarchy without needing many weights

---

## 4. Spacing & Layout

```css
:root {
  /* === SPACING SCALE === */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */

  /* === LAYOUT === */
  --max-width: 1100px;          /* max content width */
  --container-padding: 1.5rem;  /* horizontal padding on mobile */

  /* === BORDER RADIUS === */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 20px;

  /* === SHADOWS (warm-tinted, not pure gray — matches Option A palette undertones) === */
  --shadow-sm: 0 1px 3px rgba(28, 26, 20, 0.08);
  --shadow-md: 0 4px 12px rgba(28, 26, 20, 0.10);
  --shadow-lg: 0 8px 24px rgba(28, 26, 20, 0.12);
}
```

---

## 5. Component Specs

### Navbar
- Background: `--color-bg-primary` (`#FAFAF7` warm off-white) with a subtle bottom border `--color-border`
- On scroll: add a very slight `--shadow-sm` to reinforce stickiness
- Height: ~64px
- Active link: small yellow dot or underline using `--color-accent` (`#E8D96A`)
- Dark mode toggle: sun/moon icon, color `--color-accent`
- Mobile breakpoint: below 768px → hamburger menu

### Project Card
```
┌─────────────────────────────────┐
│  [Project Image or Placeholder] │  ← aspect ratio 16:9, border-radius top
├─────────────────────────────────┤
│  Project Title                  │  ← --font-display, --text-xl
│  Short description text here    │  ← --font-body, --text-base, --color-text-secondary
│                                 │
│  [React] [CSS] [Vite]           │  ← small tag badges, --color-bg-tertiary
│                                 │
│  [Live Site ↗]  [GitHub ↗]     │  ← small text links; these navigate to external URLs
└─────────────────────────────────┘
```
- The **entire card** is a clickable link (`<Link to={`/projects/${id}`}>`) that navigates to the ProjectDetail page
- The Live Site and GitHub buttons inside the card must use `e.stopPropagation()` to prevent triggering the card's navigation when clicked
- Card background: `--color-bg-secondary` (`#F2F0E8`)
- Border: `0.5px solid var(--color-border)` (`#DDD9CC`)
- Border radius: `--radius-lg`
- `cursor: pointer` — must be set explicitly since the whole card is a navigation element
- Hover effect: `transform: translateY(-4px)` + `--shadow-md` — **this is an animation, comment it clearly**
- Left border accent on hover: `3px solid var(--color-accent)` (`#E8D96A`) — also comment clearly

### Project Detail Page
- Max content width: `--max-width` (`1100px`), centered
- Back link (top): `← Back to Projects` — `--font-body`, `--text-sm`, `--color-text-muted`; hover color `--color-accent`
- Hero title: `--font-display`, `--text-4xl` or `--text-5xl`
- One-line description: `--font-body`, `--text-lg`, `--color-text-secondary`
- CTA buttons (Live Site / GitHub): same primary/secondary button styles used site-wide
- Metadata row (Role · Duration · Tags): `--font-body`, `--text-sm`, `--color-text-muted` labels; values in `--color-text-secondary`; displayed as a simple flex row with `--space-8` gap
- Full description: `--font-body`, `--text-lg`, `--leading-loose`, `--color-text-secondary`
- Process section headings: `--font-display`, `--text-2xl`, `--color-text-primary`
- Process body paragraphs: `--font-body`, `--text-base`, `--leading-loose`, `--color-text-secondary`
- **Mobile behavior:** All sections stack to full width. Metadata row wraps naturally. Screenshots remain single-column.

### Screenshots (on ProjectDetail page)
- Displayed in a single column at full content width
- Aspect ratio: `16:9` enforced via `aspect-ratio: 16/9` and `object-fit: cover`
- Border: `0.5px solid var(--color-border)` — matches card border style
- Shadow: `--shadow-md`
- Border radius: `--radius-md`
- Spacing between screenshots: `--space-8` (`2rem`)
- No lightbox — keep it simple
- On mobile: remain full-width single column (no change needed)
- Alt text: use the project title + screenshot index as a fallback (e.g. `"My Project — screenshot 1"`)

### Buttons
Two button styles:

**Primary (yellow fill):**
- Background: `--color-accent` (`#E8D96A`)
- Text: `--color-text-primary` (`#1C1A14`, dark on yellow)
- Border: none
- Hover: `--color-accent-hover` (`#D9C94F`), slight `translateY(-2px)`

**Secondary (outlined):**
- Background: transparent
- Border: `1.5px solid var(--color-border-strong)` (`#C4BFB0`)
- Text: `--color-text-primary`
- Hover: background becomes `--color-bg-tertiary` (`#E8E5D8`)

### Tech Tags (on project cards, about page, and ProjectDetail metadata)
- Background: `--color-bg-tertiary` (`#E8E5D8`)
- Text: `--color-text-muted` (`#9B9688`)
- Font size: `--text-xs`
- Letter spacing: `--tracking-wide`
- Border radius: `--radius-sm`
- Padding: `--space-1` `--space-2`

---

## 6. Animations

All animations should be **commented clearly** so Connor can disable them with minimal effort.

```css
/* =====================================================
   ANIMATIONS & TRANSITIONS
   To disable all motion: delete or comment out this
   entire section. Nothing will break — it'll just
   render without transitions.
   ===================================================== */

:root {
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
}

/* Page fade-in on route change */
/* Navbar link hover underline slide */
/* Project card lift on hover (translateY + shadow) */
/* Project card left yellow border on hover */
/* Button press scale on active */
/* Dark mode toggle icon spin */
/* Hero text fade-up on mount (CSS animation, not library) */
/* ProjectDetail page fade-in on mount */
/* "Back to Projects" link color transition on hover */
```

Implement all of these as **CSS transitions only** (no external animation libraries), using the variables above. Each animation block should have its own comment header.

---

## 7. Prompt Instructions for Opus

When feeding these documents to Claude Opus, prepend your prompt with:

> "I want you to build a complete React + Vite portfolio website for me. I have two prep documents with full specs. Please read both carefully before writing any code. Build the full project file by file, starting with the global styles and working through each component and page. Leave detailed comments throughout the code explaining what everything does. Follow all design specs exactly. Use the Option A — Warm Parchment + Yellow color palette, which is already fully specified in Document 2."

Then paste both documents in full.
