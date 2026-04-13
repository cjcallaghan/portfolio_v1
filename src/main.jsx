/*
  main.jsx
  ──────────────────────────────────────────────────────────────────────────────
  The entry point of the React application. This file:
    1. Imports global styles so they apply to every page.
    2. Finds the #root div in index.html and mounts the React app into it.
    3. Wraps the app in React's StrictMode, which helps catch bugs during
       development by running certain checks twice (no effect in production).
  ──────────────────────────────────────────────────────────────────────────────
*/

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/* Global CSS variables, reset styles, and utility classes */
import './styles/global.css';

/* Dark mode variable overrides (applied when data-theme="dark" is on <html>) */
import './styles/theme.css';

/* The root App component that contains routing and the ThemeContext provider */
import App from './App.jsx';

/* Mount the React app into the <div id="root"> in index.html */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
