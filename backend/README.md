# Health Information Access API

Express and MongoDB backend for the Health Information Access MERN application. The API exposes endpoints for managing health topics, categories, user accounts, and bookmarks.

## Requirements

- Node.js 18+
- MongoDB Atlas or local MongoDB instance

## Environment Variables

1. Copy `env.example` to `.env`.
2. Update values with your credentials.

```bash
cd backend
cp env.example .env
```

## Run Locally

```bash
npm install
npm run dev
```

The server runs on `http://localhost:5000` by default and exposes a health check at `/health`.

## Folder Guide

- `config/` – Database connection helpers.
- `controllers/` – Route logic for topics, categories, auth, and bookmarks.
- `middleware/` – Error handling, authentication, validation, logging.
- `models/` – Mongoose schemas (User, Topic, Category, Bookmark).
- `routes/` – Express routers that define the REST API.
- `utils/` – Async wrapper and JWT helpers.
- `server.js` – App entry point that wires everything together.

## Testing the API

- Start the server: `npm run dev`.
- Use Postman or curl against:
  - `GET /api/topics` – list or search topics with `?q=`, `?category=`, `?tag=`.
  - `POST /api/topics` – create a topic (auth required).
  - `GET /api/categories` – list categories.
  - `POST /api/auth/register` – create a user.
  - `POST /api/auth/login` – obtain JWT for protected routes.

## Deployment (Render)

1. Push backend to GitHub.
2. Create a new Render Web Service.
3. Set build command to `npm install`.
4. Set start command to `npm run start`.
5. Add environment variables (`MONGO_URI`, `JWT_SECRET`, etc.).
6. Enable auto-deploy on main branch.

## Logging Middleware

`middleware/requestLogger.js` captures HTTP method, URL, response status, and timing for each request, helping with observability both locally and in production.

