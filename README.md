# Stracath — Selenite-inspired browser arcade

A standalone static website designed for GitHub Pages, with a purple arcade aesthetic and local HTML games.

## Features
- Search, categories, favorites, recently played
- In-site fullscreen player for local HTML games
- Settings: compact cards and reduce motion
- Mobile navigation
- External links for commercial games/services that aren't hosted in this project

## Included local HTML games
- Neon Snake
- Neon Pong
- Block Breaker
- Memory Match
- Star Clicker

## Publish on GitHub Pages
1. Extract this ZIP.
2. Upload `index.html`, `style.css`, `script.js`, and the complete `games` folder to your repository root.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**, choose `main` and `/(root)`, then save.
5. Wait for GitHub Pages to provide your site URL.

## Add a local HTML game
1. Put the HTML file inside `games/`.
2. Add a record in the `games` array in `script.js` with a unique `id`, `name`, `cat`, `meta`, `mark`, `icon`, `a`, `b`, and `file:"games/your-file.html"`.
3. Refresh the site.

This project is inspired by common browser-game portal features but uses original Stracath branding. Only host games you created or have permission to distribute. External games and GeForce NOW are opened through their own sites. This does not bypass network or school device restrictions.
