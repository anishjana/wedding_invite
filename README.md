# Imperial Heritage – Wedding Invitation (React + Vite)
npm install && npm run dev
All content lives in `src/data.js`. Styles in `src/styles.css`.

## Deploy to GitHub Pages

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys the site when changes are pushed to `main`, or when started manually from the Actions tab. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

The Vite base path is derived from the GitHub repository name during Actions builds, so the site and public assets work at the repository's GitHub Pages URL. Local development and builds use the root path.

## Deploy to Vercel

The `vercel.json` configuration builds the Vite app with `npm run build`, serves the `dist` directory, and routes app paths to the SPA entry point.

1. Import this GitHub repository in the [Vercel dashboard](https://vercel.com/new).
2. In the project settings, set **Git → Production Branch** to `main`.
3. Deploy the project. Vercel will create preview deployments for other branches and deploy to production when changes are pushed to `main`.

The existing GitHub Pages workflow remains enabled and will continue deploying independently. Disable that workflow or GitHub Pages in repository settings if Vercel should be the only deployment target.
