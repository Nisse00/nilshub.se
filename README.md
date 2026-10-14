# nilshub.se

My personal website, built with React + TypeScript + Vite.

```
frontend/
  package.json         scripts and dependencies
  index.html           the single HTML page
  public/              files served as-is: CV.pdf, favicon, link-preview image
  src/
    main.tsx, App.tsx  entry point and routes
    index.css          all styles (colours are variables at the top)
    data/              the content: profile and links, projects, CV
    assets/            images imported by the code
    components/        Layout (header and footer shared by all pages)
    pages/             one file per page: / (home), /cv, not found
.github/workflows/     CI: lint, format check and build on every push
```

The config files in `frontend/` (`vite.config.ts`, `tsconfig*.json`,
`eslint.config.js`, `.prettierrc.json`) have to stay next to `package.json`:
the tools look for them there.

## Getting started

All commands are run from the `frontend/` folder:

```bash
cd frontend
npm install
npm run dev
```

The site is then at http://localhost:5173.

Other scripts:

- `npm run build` – type-check and build the site into `frontend/dist/`
- `npm run preview` – serve the built site locally
- `npm run lint` – run ESLint
- `npm run format` – format the code with Prettier (`format:check` only checks)

To change what the site says, edit the files in `src/data/`. When the CV changes,
update both `src/data/cv.ts` and `public/CV.pdf`.

To publish the site, build it and serve the contents of `frontend/dist/`.
