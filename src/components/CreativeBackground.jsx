/*
  CreativeBackground.jsx
  ──────────────────────────────────────────────────────────────────────────────
  The site-wide animated background — the page-level RESPONSE to creative mode
  (see App.jsx / CLAUDE.md "Creative mode"). Mounted once near the app root.

  This wrapper is intentionally tiny and stays in the MAIN bundle. The heavy
  Three.js scene lives in CreativeScene.jsx and is lazy-loaded only the first
  time creative mode is switched on, so `three` never weighs down the initial load.

  Three states:
    1. creative OFF                  → render nothing (no canvas, no WebGL, no cost).
    2. creative ON + reduced-motion  → static CSS gradient fallback, no animation,
       no WebGL (respects prefers-reduced-motion, WCAG 2.3.3).
    3. creative ON + motion OK       → lazy-load + render the animated 3D scene.

  The container is aria-hidden throughout: it's purely decorative, so screen
  readers skip it and real page content stays the accessible source of truth.
  ──────────────────────────────────────────────────────────────────────────────
*/

import { Suspense, lazy, useEffect, useState } from 'react';
import { useCreativeMode } from '../App';
import './CreativeBackground.css';

/* Heavy Three.js scene — split into its own chunk, fetched on first use. */
const CreativeScene = lazy(() => import('./CreativeScene'));

export default function CreativeBackground() {
  const { creative } = useCreativeMode();

  /* Track the user's reduced-motion preference, and keep it live if they change it. */
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /* Creative mode off → nothing to render. */
  if (!creative) return null;

  /* Reduced motion → the CSS gradient on .creative-bg is the whole effect (no WebGL). */
  if (reducedMotion) {
    return <div className="creative-bg creative-bg--static" aria-hidden="true" />;
  }

  /*
    Motion OK → animated scene. While the lazy chunk loads, the container's own
    CSS gradient is already showing, so a null Suspense fallback is seamless.
  */
  return (
    <div className="creative-bg" aria-hidden="true">
      <Suspense fallback={null}>
        <CreativeScene />
      </Suspense>
    </div>
  );
}
