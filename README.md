# nilshub.se

My personal website. It also hosts the laundry booking system for my building.

- **Frontend** – React + TypeScript + Vite, in `src/`
- **Backend** – a small Flask API with a SQLite database, in `backend/`

```
src/
  main.tsx, App.tsx    entry point and routes
  index.css            all styles
  assets/              images imported by the code
  pages/               the site's own pages: / (home), /Cv, not found
  laundry/             the laundry booking system (/Laundry)
    api.ts             client for the backend
    slots.ts           time slots and their colours
    pages/             one file per route
    components/        pieces used by the pages
backend/
  server.py            the API
  tests/               pytest tests
public/                files served as-is (CV.pdf)
```

## Getting started

Install the dependencies once:

```bash
npm install
python3 -m venv backend/.venv
source backend/.venv/bin/activate
pip install -r backend/requirements-dev.txt
```

Then start both servers (with the virtual environment activated):

```bash
npm run dev:full
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5001 (Vite proxies `/api` to it, so the browser only talks to port 5173)

Other scripts:

- `npm run dev` / `npm run dev:frontend` – only the frontend
- `npm run dev:backend` – only the backend
- `npm run build` – type-check and build the frontend into `dist/`
- `npm run lint` – run ESLint on the frontend
- `npm run format` – format the frontend with Prettier (`format:check` only checks)
- `npm run test:backend` – run the backend tests (pytest)
- `npm run lint:backend` – lint and format-check the backend (ruff)

Run `npm run build`, `npm run lint`, `npm run format:check`, `npm run test:backend`
and `npm run lint:backend` before committing.

## Laundry booking rules

- Each day has three time slots: 08:00-12:00, 12:00-16:00 and 16:00-20:00.
- You can book in the current month and the next one, never in the past.
- Each user can hold one upcoming booking at a time; cancel it to book another.
- A slot can only be booked by one user. This is enforced by a unique index in
  the database, so two simultaneous requests can never both succeed.

All rules are enforced by the backend; the frontend only mirrors them.

## Backend configuration

Environment variables, all optional:

| Variable                | Default                                 | Purpose                                      |
| ----------------------- | --------------------------------------- | -------------------------------------------- |
| `SECRET_KEY`            | random, stored in `backend/.secret_key` | Signs the session cookie                     |
| `LAUNDRY_DATABASE`      | `backend/laundry.db`                    | Path to the SQLite database                  |
| `SESSION_COOKIE_SECURE` | off                                     | Set to `1` in production (HTTPS only cookie) |
| `FLASK_DEBUG`           | off                                     | Set to `1` for auto-reload while developing  |

The database is created on first start and is not checked in to git.

In production, serve `dist/` and forward `/api` to the Flask app from the same
domain (run it with a WSGI server, e.g. `gunicorn "server:create_app()"`, not
`python3 server.py`). Only `backend/requirements.txt` is needed there.
