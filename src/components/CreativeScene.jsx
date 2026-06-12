/*
  CreativeScene.jsx
  ──────────────────────────────────────────────────────────────────────────────
  The actual Three.js (WebGL) scene behind the site's creative-mode background.

  This module imports `three`, so Vite splits it into its OWN bundle chunk.
  CreativeBackground.jsx only ever imports it lazily (the first time creative mode
  is switched on), which keeps the ~heavy `three` library out of the main bundle —
  visitors who never turn creative mode on never download it.

  What it draws: a slow-drifting cloud of accent-colored points. The clear color
  and point color are read from the live CSS design tokens, so the scene matches
  whatever the rest of the site is using.

  Lifecycle / gating (see CLAUDE.md "Creative mode"):
    - Builds the renderer + scene once on mount and starts a requestAnimationFrame loop.
    - The cleanup function cancels the loop, removes the resize listener, and
      DISPOSES the GPU resources (geometry, material, renderer) so the WebGL
      context is released the moment creative mode turns off and this unmounts.
  ──────────────────────────────────────────────────────────────────────────────
*/

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* Tunables — adjust to taste, or swap the whole scene body for your own geometry. */
const POINT_COUNT = 1200;   /* how many points in the cloud */
const FIELD_RADIUS = 6;     /* radius of the sphere they're scattered through */

export default function CreativeScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* Read a CSS design token as a THREE.Color (so the scene matches the theme). */
    function readColor(token, fallback) {
      const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
      return new THREE.Color(value || fallback);
    }

    /* Renderer — cap pixel ratio at 2 so we don't over-render on hi-DPI screens. */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.z = 8;

    /* Scatter the points uniformly through a sphere. */
    const positions = new Float32Array(POINT_COUNT * 3);
    for (let i = 0; i < POINT_COUNT; i++) {
      const r = FIELD_RADIUS * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      size: 0.05,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    /*
      Apply the current theme's colors to the renderer + points — now, and again
      whenever <html>'s data-theme attribute changes. Watching the attribute (vs.
      reacting to React state) means the retint fires AFTER the new theme tokens
      are live on the DOM, so a dark-mode toggle recolors the running scene
      instantly without rebuilding it.
    */
    function applyThemeColors() {
      renderer.setClearColor(readColor('--color-bg-primary', '#000000'), 1);
      material.color.copy(readColor('--color-accent', '#ffffff'));
    }
    applyThemeColors();

    const themeObserver = new MutationObserver(applyThemeColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    /* Keep the scene full-viewport on window resize. */
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', handleResize);

    /* Render loop — a gentle, continuous drift. */
    let rafId;
    const clock = new THREE.Clock();
    function animate() {
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.05;
      points.rotation.x = Math.sin(t * 0.03) * 0.2;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }
    animate();

    /* Cleanup — stop the loop and release everything so nothing leaks. */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      themeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  /* Decorative only — aria-hidden so assistive tech skips it entirely. */
  return <canvas ref={canvasRef} className="creative-bg__canvas" aria-hidden="true" />;
}
