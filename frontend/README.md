# Health Information Access – Frontend

React + Vite client for the Health Information Access MERN application.

## Scripts

```bash
cd frontend
npm install
npm run dev   # start Vite dev server
npm run build # production build
```

## Environment Variables

Create `.env` from `.env.example` and customize:

```
VITE_API_URL=https://your-render-service.onrender.com/api
```

When developing locally you can omit `VITE_API_URL` to use the Vite proxy defined in `vite.config.ts`.

## Directory Guide

- `src/components/` – Layout, reusable cards, auth panel, status UI.
- `src/pages/` – Route-level pages (home, topic detail, bookmarks).
- `src/hooks/` – React Query hooks for topics, categories, bookmarks.
- `src/services/` – Axios instance and API helpers.
- `src/context/` – Global state for auth token and filters.
- `src/types/` – Shared TypeScript types.
- `src/index.css` – Tailwind entry file.

## Wireframe

```
--------------------------------------------------------
 Header: logo | nav | global search
--------------------------------------------------------
 Hero copy + category chips
--------------------------------------------------------
 | Topic cards grid            | Auth / bookmark panel |
 | - title                     | - login/register      |
 | - summary                   | - sign-out button     |
 | - tags + read time          |                        |
--------------------------------------------------------
 Footer (optional)
```

## Deployment (Vercel)

1. Push `frontend` folder to GitHub.
2. Import project in Vercel, selecting the `frontend` directory as root.
3. Set framework to Vite.
4. Add `VITE_API_URL` environment variable pointing to the Render backend.
5. Deploy. Continuous deployments trigger on every push to the selected branch.

