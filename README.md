# Imperial Heritage – Wedding Invitation (React + Vite)
npm install && npm run dev
All content lives in `src/data.js`. Styles in `src/styles.css`.

## Deploy to GitHub Pages

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys the site when changes are pushed to `main`, or when started manually from the Actions tab. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

The Vite base path is derived from the GitHub repository name during Actions builds, so the site and public assets work at the repository's GitHub Pages URL. Local development and builds use the root path.
