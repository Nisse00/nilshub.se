# nilshub.se

My personal website, built with React + TypeScript + Vite.

```
frontend/
  package.json         scripts and dependencies
  index.html           the single HTML page
  public/              files served as-is (CV.pdf)
  src/
    main.tsx, App.tsx  entry point and routes
    index.css          all styles
    assets/            images imported by the code
    pages/             one file per page: / (home), /Cv, not found
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

To publish the site, build it and serve the contents of `frontend/dist/`.
