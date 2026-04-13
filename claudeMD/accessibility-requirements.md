# Accessibility Requirements

This document outlines the accessibility standards and implementation requirements for this portfolio project. The baseline is **WCAG 2.1 Level AA** compliance, supplemented with additional practical considerations that improve usability for everyone.

---

## Standards Reference

- **WCAG 2.1 AA** — Web Content Accessibility Guidelines, published by W3C (June 2018)
- **Conformance target:** Level AA (satisfies all Level A and Level AA success criteria)
- **Guiding principles (POUR):** Perceivable, Operable, Understandable, Robust

---

## 1. Visual Accessibility

### 1.1 Color Contrast *(WCAG 1.4.3 — AA)*
- Normal text must have a contrast ratio of at least **4.5:1** against its background
- Large text (18pt / 14pt bold or larger) must meet at least **3:1**
- Use a tool like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify all text/background combinations

### 1.2 Non-Text Contrast *(WCAG 1.4.11 — AA)*
- UI components (buttons, inputs, checkboxes) and meaningful icons must have a **3:1** contrast ratio against adjacent colors
- Focus indicators must also meet this threshold

### 1.3 Color Not Used Alone *(WCAG 1.4.1 — A)*
- Never use color as the only way to convey information (e.g., red = error)
- Always pair color with a label, icon, or pattern

### 1.4 Text Resize *(WCAG 1.4.4 — AA)*
- All text must remain readable and functional when scaled up to **200%** in the browser without loss of content or functionality
- Avoid fixed pixel font sizes — use `rem` or `em` units

### 1.5 Reflow *(WCAG 1.4.10 — AA)*
- Content must not require horizontal scrolling when the viewport is set to **320px wide** (equivalent to 400% zoom on a 1280px screen)
- Use responsive layouts that stack gracefully at narrow widths

### 1.6 Images of Text *(WCAG 1.4.5 — AA)*
- Do not use images to display text (except logos)
- Use real HTML text, which scales and adapts to user preferences

### 1.7 Alternative Text for Images *(WCAG 1.1.1 — A)*
- Every meaningful image must have descriptive `alt` text
- Decorative images must use an empty `alt=""` attribute so screen readers skip them
- Alt text should describe the purpose of the image in context, not just its appearance

### 1.8 Visible Focus Indicators *(WCAG 2.4.7 — AA)*
- All interactive elements must show a clearly visible focus outline when navigated via keyboard
- Never use `outline: none` without providing a custom visible alternative

### 1.9 Avoid Seizure-Triggering Content *(WCAG 2.3.1 — A)*
- Do not include content that flashes more than **3 times per second**
- If animations are used, keep them subtle and non-disruptive

---

## 2. Auditory Accessibility

### 2.1 Captions for Video *(WCAG 1.2.2 — A)*
- All pre-recorded video content with audio must include synchronized **closed captions**
- Captions must accurately reflect all spoken dialogue and important audio cues

### 2.2 Transcripts for Audio *(WCAG 1.2.1 — A)*
- Any standalone audio content (e.g., a podcast clip or audio introduction) must have a **full text transcript** available on the same page or linked nearby

### 2.3 Audio Descriptions *(WCAG 1.2.5 — AA)*
- Videos that convey important visual information (demos, walkthroughs) must provide **audio descriptions** for users who cannot see the video

### 2.4 No Autoplay Audio *(WCAG 1.4.2 — A)*
- Do not auto-play audio on page load
- If audio does play automatically, provide a visible pause/stop control as the first focusable element

---

## 3. Keyboard & Motor Accessibility

### 3.1 Full Keyboard Navigability *(WCAG 2.1.1 — A)*
- Every feature — links, buttons, forms, modals, dropdowns — must be fully operable using only the keyboard
- Test by tabbing through the entire page with no mouse

### 3.2 No Keyboard Traps *(WCAG 2.1.2 — A)*
- Keyboard focus must never get stuck in a component
- Modal dialogs are the exception: focus may be contained within an open modal, but must return to the trigger element when closed

### 3.3 Logical Focus Order *(WCAG 2.4.3 — A)*
- Tab order must follow the visual reading order (top-to-bottom, left-to-right)
- Avoid using `tabindex` values greater than 0, which disrupt natural order

### 3.4 Skip Navigation Link *(WCAG 2.4.1 — A)*
- Include a **"Skip to main content"** link as the first focusable element on every page
- It can be visually hidden and only appear on focus

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

### 3.5 Touch Target Size *(WCAG 2.5.5 — AA)*
- Interactive elements (buttons, links, icons) should have a clickable/tappable area of at least **44×44 CSS pixels**
- This ensures usability for users with motor impairments and on touchscreens

### 3.6 Pointer Cancellation *(WCAG 2.5.2 — A)*
- Actions should activate on pointer **up**, not pointer **down**, so users can cancel accidental clicks by moving the pointer away before releasing

### 3.7 No Timing Constraints *(WCAG 2.2.1 — A)*
- Avoid enforcing strict time limits on tasks
- If a time limit exists (e.g., session expiry), allow the user to turn it off, adjust it, or extend it

### 3.8 Reduce Motion *(WCAG 2.3.3 — AAA — recommended)*
- Respect the `prefers-reduced-motion` media query to disable or minimize animations for users with vestibular disorders

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 4. Cognitive & Readability

### 4.1 Descriptive Page Titles *(WCAG 2.4.2 — A)*
- Every page must have a unique, descriptive `<title>` tag
- Format: `Page Name — Portfolio Name`

### 4.2 Descriptive Link Text *(WCAG 2.4.4 — A)*
- Link text must make sense on its own, without surrounding context
- Avoid: `Click here`, `Read more`, `Learn more`
- Prefer: `View UX case study — Acme App`, `Download resume (PDF)`

### 4.3 Consistent Navigation *(WCAG 3.2.3 — AA)*
- Navigation menus and header/footer must appear in the same location and order across all pages

### 4.4 Consistent Identification *(WCAG 3.2.4 — AA)*
- Components that serve the same function must be labeled and styled consistently throughout the site

### 4.5 Error Identification & Suggestions *(WCAG 3.3.1, 3.3.3 — A / AA)*
- When a form error occurs, clearly identify which field has the error and explain how to fix it
- Errors must be conveyed in text, not color alone

### 4.6 Labels for Inputs *(WCAG 1.3.5, 3.3.2 — AA / A)*
- Every form input must have an associated `<label>` element (not just a placeholder)
- Use `autocomplete` attributes on common fields to support autofill

### 4.7 Language Declaration *(WCAG 3.1.1 — A)*
- Set the `lang` attribute on the `<html>` element so screen readers use the correct language/accent

```html
<html lang="en">
```

### 4.8 On Focus / On Input Behavior *(WCAG 3.2.1, 3.2.2 — A)*
- Focusing or entering a field must not automatically trigger a context change (e.g., navigating away or submitting a form)
- Changes of context should only happen on deliberate user action

---

## 5. Technical / Code Requirements

### 5.1 Semantic HTML
- Use the correct HTML elements for their intended purpose:
  - `<nav>` for navigation
  - `<main>` for primary content (one per page)
  - `<header>` / `<footer>` for page structure
  - `<button>` for actions, `<a>` for navigation
  - `<h1>`–`<h6>` in logical, hierarchical order — never skip levels

### 5.2 Logical Heading Structure *(WCAG 1.3.1 — A)*
- Use one `<h1>` per page (the page title)
- Subsections should use `<h2>`, nested sections `<h3>`, etc.
- Do not use heading tags purely for visual styling

### 5.3 ARIA — Use Only When Necessary *(WCAG 4.1.2 — A)*
- Prefer native HTML elements over ARIA where possible
- When ARIA is needed, ensure `role`, `aria-label`, `aria-labelledby`, and `aria-describedby` are applied correctly
- Do not use redundant ARIA that conflicts with native semantics

### 5.4 Status Messages *(WCAG 4.1.3 — AA)*
- Dynamic status updates (e.g., "Message sent", "3 items in cart") must be programmatically announced to screen readers using `aria-live` regions, without moving keyboard focus

```html
<div aria-live="polite" aria-atomic="true">
  <!-- Status message injected here by JS -->
</div>
```

### 5.5 Accessible Tables *(WCAG 1.3.1 — A)*
- Data tables must include `<th>` elements with `scope` attributes and a `<caption>`
- Never use tables for layout purposes

### 5.6 Accessible Forms *(WCAG 1.3.1, 3.3.2 — A)*
- Group related inputs with `<fieldset>` and `<legend>`
- Associate all inputs with labels using `for`/`id` pairing or `aria-labelledby`

### 5.7 iframes *(WCAG 4.1.2 — A)*
- All `<iframe>` elements must include a descriptive `title` attribute

```html
<iframe src="..." title="Embedded project demo video"></iframe>
```

### 5.8 Valid, Parseable HTML *(WCAG 4.1.1 — A)*
- HTML must be well-formed: no duplicate IDs, properly nested elements, correctly closed tags
- Run markup through the [W3C Validator](https://validator.w3.org/) periodically

---

## 6. Recommended Testing Approach

| Method | Tools |
|---|---|
| Automated scan | [axe DevTools](https://www.deque.com/axe/) browser extension, Lighthouse (Chrome DevTools) |
| Keyboard test | Tab through entire site with no mouse; verify all interactions work |
| Screen reader test | VoiceOver (Mac/iOS), NVDA (Windows, free), or TalkBack (Android) |
| Contrast check | [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) |
| Color blindness simulation | Colorblinding extension or Figma accessibility plugins |
| Zoom test | Zoom browser to 200% and 400%; verify no content breaks or overflows |

> **Note:** Automated tools catch approximately 30–40% of accessibility issues. Manual testing — especially keyboard navigation and screen reader testing — is essential for thorough coverage.

---

## 7. Quick Reference Checklist

Use this during development and before deployment:

- [ ] All images have appropriate `alt` text (or `alt=""` if decorative)
- [ ] All text meets 4.5:1 contrast ratio (3:1 for large text)
- [ ] UI components meet 3:1 non-text contrast
- [ ] Color is never the sole indicator of meaning
- [ ] Every page has a unique, descriptive `<title>`
- [ ] One `<h1>` per page; heading levels are logical and not skipped
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical and follows visual layout
- [ ] No keyboard traps exist
- [ ] "Skip to main content" link is present
- [ ] All form inputs have visible, associated labels
- [ ] Form errors identify the field and suggest a fix
- [ ] Videos have captions; audio has transcripts
- [ ] `lang` attribute is set on `<html>`
- [ ] `aria-live` regions announce dynamic updates
- [ ] `prefers-reduced-motion` is respected in CSS
- [ ] Touch targets are at least 44×44px
- [ ] Site is tested at 200% and 400% zoom without horizontal scroll
- [ ] HTML validates without critical errors
- [ ] Tested with keyboard navigation (no mouse)
- [ ] Tested with at least one screen reader

---

*WCAG 2.1 specification: https://www.w3.org/TR/WCAG21/*
*W3C Web Accessibility Initiative: https://www.w3.org/WAI/*
