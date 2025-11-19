# Health Information Access (MERN)

A full-stack MERN application that helps users browse, search, and save evidence-based health topics. The backend is Express + MongoDB (deployable on Render) and the frontend is a Vite + React app (deployable on Vercel).

## How MERN Fits Together

```
┌────────────┐     HTTP/JSON      ┌────────────┐     Mongoose     ┌────────────┐
│  React UI  │  ───────────────▶  │ Express API│  ─────────────▶  │ MongoDB    │
│ (Vercel)   │  ◀───────────────  │ (Render)   │  ◀─────────────  │ Atlas      │
└────────────┘   client fetch     └────────────┘   controllers     └────────────┘
        ▲                              │
        │  Auth token (JWT)            │ logging, validation, auth
        └──────────────────────────────┘
```

- **React** renders interactive UI, manages routing/state, and calls the API with Axios/React Query.
- **Express** exposes REST endpoints, applies validation/middleware, and hosts business logic.
- **Node.js** executes the Express server and enables JavaScript on the backend.
- **MongoDB** stores flexible JSON-like documents for topics, categories, users, and bookmarks.

### Real-Life Analogy (Retail Store)

- **React (Showroom)** – displays curated products (health topics) and lets customers browse/search.
- **Express (Store Manager)** – receives requests from the showroom, enforces rules, and coordinates tasks.
- **Node.js (Staff)** – powers the manager’s ability to work behind the scenes.
- **MongoDB (Stockroom)** – holds all inventory with flexible shelving, easy to expand or reorganize.

### When MERN Might Not Be Ideal

- Heavy analytics or reporting that needs complex SQL joins.
- Real-time, multi-region apps requiring WebSockets and edge data.
- Legacy ecosystems standardized on other languages or relational databases.

## Project Structure

```
HealthApp/
├── backend/          # Express API
│   ├── config/       # DB connection
│   ├── controllers/  # Topics, auth, categories, bookmarks
│   ├── middleware/   # Auth, validation, errors, logging
│   ├── models/       # Topic, Category, User, Bookmark
│   ├── routes/       # REST endpoints
│   ├── utils/        # Async + JWT helpers
│   └── server.js
├── frontend/         # React client (Vite + TS + Tailwind)
│   ├── src/components
│   ├── src/pages
│   ├── src/hooks
│   ├── src/services
│   └── src/context
└── README.md         # (this file)
```

## Backend Setup (Render-ready)

```bash
cd backend
npm install
cp env.example .env
npm run dev
```

`env.example` includes:

- `MONGO_URI` – Atlas or local connection string
- `PORT` – default 5000
- `JWT_SECRET` and `JWT_EXPIRES_IN`
- `CLIENT_URL` – comma-separated origins for CORS

### Key API Routes

| Method | Route              | Description                         | Auth |
|--------|-------------------|-------------------------------------|------|
| GET    | `/api/topics`     | List/search topics (`q`, `category`, `tag`) | No |
| GET    | `/api/topics/:id` | Fetch a single topic                | No   |
| POST   | `/api/topics`     | Create topic                        | Yes  |
| PUT    | `/api/topics/:id` | Update topic                        | Yes  |
| DELETE | `/api/topics/:id` | Remove topic                        | Yes  |
| GET    | `/api/categories` | List categories                     | No   |
| POST   | `/api/categories` | Create category                     | Yes  |
| POST   | `/api/auth/register` | Register new user                | No   |
| POST   | `/api/auth/login` | Obtain JWT                          | No   |
| GET    | `/api/bookmarks`  | List current user bookmarks         | Yes  |
| POST   | `/api/bookmarks`  | Save a topic                        | Yes  |
| DELETE | `/api/bookmarks/:topicId` | Remove bookmark            | Yes  |

Validation is handled with `express-validator`; errors funnel through centralized middleware. A `requestLogger` middleware provides simple observability.

## Frontend Setup (Vercel-ready)

```bash
cd frontend
npm install
cp env.example .env          # optional for local dev
npm run dev                  # http://localhost:5173
```

- Configure `VITE_API_URL` to point to the Render backend in production.
- When absent, Vite proxies `/api` to `http://localhost:5000` for local dev.
- UI built with Tailwind, React Router, React Query, and Axios.
- Includes an auth panel for login/registration and bookmark syncing.

### Frontend Features

- Global search and category chips for filtering.
- Topic cards with summaries, tags, read time, and “read more”.
- Detail page with rich content + sources.
- Optional bookmarking (JWT protected) and simple auth form.
- Bookmark page with optimistic refresh via React Query.

## Deployment Guide

### Backend → Render

1. Push repo to GitHub.
2. Create a Render Web Service pointing to `backend`.
3. Build command: `npm install`. Start command: `npm run start`.
4. Add env vars: `MONGO_URI`, `PORT`, `JWT_SECRET`, `CLIENT_URL` (include Vercel origin).
5. Deploy; note the base URL (e.g., `https://health-api.onrender.com`).

### Frontend → Vercel

1. Import GitHub repo into Vercel, set root to `frontend`.
2. Framework preset: Vite.
3. Add `VITE_API_URL=https://health-api.onrender.com/api`.
4. Deploy; Vercel will auto-build on push.

## Data Flow Diagram (Detailed)

```
[React Components] --Axios--> [/api/* routes]
          ^                          |
          |     JSON responses       v
   [React Query cache] <--- [Express Controllers] --- Mongoose ---> [MongoDB]
                                          |
                              [Middleware: auth, validation, error]
```

## Real-World Use Cases

- Public health agencies exposing trusted information.
- Internal knowledge bases for hospitals or wellness programs.
- Patient education portals embedded into telehealth solutions.

## When Not to Use MERN

- Strict ACID transactions & relational constraints → Consider PostgreSQL + Prisma.
- CPU-heavy workloads needing multithreading → Consider Go, Rust, or .NET.
- Static marketing sites → Consider static site generators or headless CMS.

## Next Steps & Extensions

- Add pagination for topics.
- Support rich content authoring (Markdown/MDX).
- Push notifications for newly published topics.
- Integrate analytics (PostHog, Segment) to track engagement.

## Submission Checklist

- [x] Backend & frontend directories with clear structure.
- [x] `.env` examples for both sides.
- [x] README and deployment notes.
- [x] REST API covering topics, categories, auth, bookmarks.
- [x] React Router views, custom hooks, API service, Tailwind styling.
- [x] Optional auth + bookmarking workflow.

