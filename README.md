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
- `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`

### Sample Data Seeding

Seed categories and disease topics (malaria, HIV, TB, hypertension, diabetes, sickle cell) with:

```bash
cd backend
npm run seed
```

> The script clears existing categories and topics before inserting fresh data. Make sure `backend/.env` points to the database you intend to modify.

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

## 🚀 Deployment

This application is deployed using:
- **Backend**: [Render](https://render.com) - Express.js API
- **Frontend**: [Vercel](https://vercel.com) - React/Vite application
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database
- **CI/CD**: [GitHub Actions](https://github.com/features/actions) - Automated testing and deployment

### Quick Deployment Links

- **Frontend URL**: [https://health-app-final-project-dyqo.vercel.app/](https://health-app-final-project-dyqo.vercel.app/)
- **Backend API URL**: [https://healthapp-backend-cauz.onrender.com/api](https://healthapp-backend-cauz.onrender.com/api)
- **Health Check**: [https://healthapp-backend-cauz.onrender.com/health](https://healthapp-backend-cauz.onrender.com/health)

### Deployment Documentation

For detailed deployment instructions, see **[DEPLOYMENT.md](./DEPLOYMENT.md)** which includes:

- Step-by-step deployment guide for Render and Vercel
- MongoDB Atlas setup instructions
- Environment variable configuration
- CI/CD pipeline setup
- Monitoring and maintenance procedures
- Troubleshooting guide

### Quick Start Deployment

#### Backend → Render

1. Push repo to GitHub
2. Create a Render Web Service pointing to `backend` directory
3. Build command: `npm install`
4. Start command: `npm run start`
5. Add environment variables:
   - `MONGO_URI` - MongoDB Atlas connection string
   - `PORT` - 10000 (Render default)
   - `JWT_SECRET` - Strong random string
   - `JWT_EXPIRES_IN` - 7d
   - `CLIENT_URL` - Your Vercel frontend URL
   - `NODE_ENV` - production
6. Deploy and note the base URL (e.g., `https://health-api.onrender.com`)

#### Frontend → Vercel

1. Import GitHub repo into Vercel
2. Set root directory to `frontend`
3. Framework preset: Vite (auto-detected)
4. Add environment variable:
   - `VITE_API_URL` - Your Render backend URL + `/api`
5. Deploy; Vercel will auto-build on push

### CI/CD Pipeline

The repository includes GitHub Actions workflows for:

- **Continuous Integration**: Automated testing and linting on pull requests
- **Continuous Deployment**: Automatic deployment to production on main branch

Workflows located in `.github/workflows/`:
- `frontend-ci.yml` - Frontend testing and building
- `backend-ci.yml` - Backend testing
- `frontend-cd.yml` - Frontend deployment to Vercel
- `backend-cd.yml` - Backend deployment to Render

See [DEPLOYMENT.md](./DEPLOYMENT.md) for CI/CD setup instructions.

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

## 📋 Production Optimizations

### Backend Optimizations
- ✅ Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- ✅ Production error handling (no stack traces in production)
- ✅ MongoDB connection pooling (maxPoolSize: 10, minPoolSize: 2)
- ✅ Production logging with morgan
- ✅ Health check endpoint with uptime monitoring
- ✅ Process error handlers (unhandledRejection, uncaughtException)
- ✅ Request size limits (10mb)

### Frontend Optimizations
- ✅ Code splitting with React.lazy()
- ✅ Vendor chunk separation (react, react-dom, react-router-dom)
- ✅ Production build optimizations (terser minification)
- ✅ Console removal in production builds
- ✅ Static asset caching headers
- ✅ Security headers via Vercel configuration

## 🔧 Environment Variables

### Backend Environment Variables

See `backend/env.example` for template. Required variables:

```env
PORT=5000
MONGO_URI=xxxx
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173,https://your-vercel-app.vercel.app
NODE_ENV=production
```

### Frontend Environment Variables

See `frontend/env.example` for template. Required variables:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, set `VITE_API_URL` to your Render backend URL in Vercel.

## 📊 Monitoring

### Health Checks
- **Backend**: `GET /health` - Returns server status, uptime, and environment
- **Frontend**: Built-in Vercel health monitoring

### Logging
- Backend uses `morgan` for HTTP request logging
- Production logs available in Render dashboard
- Frontend errors visible in browser console and Vercel logs

### Error Tracking
Consider adding error tracking services:
- [Sentry](https://sentry.io) - Error tracking and monitoring
- [LogRocket](https://logrocket.com) - Session replay and error tracking

## 📁 Project Files

```
HealthApp/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD workflows
│       ├── frontend-ci.yml
│       ├── backend-ci.yml
│       ├── frontend-cd.yml
│       └── backend-cd.yml
├── backend/                # Express API
│   ├── config/             # DB connection with pooling
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Auth, validation, errors, logging
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── utils/              # Helpers
│   ├── server.js           # Production-optimized server
│   ├── package.json
│   └── env.example
├── frontend/               # React/Vite app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Route pages (lazy loaded)
│   │   ├── hooks/          # React Query hooks
│   │   ├── services/       # API client
│   │   └── context/        # Global state
│   ├── vite.config.ts      # Production build config
│   ├── vercel.json         # Vercel deployment config
│   ├── package.json
│   └── env.example
├── render.yaml             # Render deployment config
├── DEPLOYMENT.md           # Comprehensive deployment guide
└── README.md               # This file
```

## ✅ Submission Checklist

### Application Requirements
- [x] Backend & frontend directories with clear structure
- [x] `.env` examples for both sides
- [x] README and deployment notes
- [x] REST API covering topics, categories, auth, bookmarks
- [x] React Router views, custom hooks, API service, Tailwind styling
- [x] Optional auth + bookmarking workflow

### Deployment Requirements
- [x] Backend deployed to Render
- [x] Frontend deployed to Vercel
- [x] MongoDB Atlas cluster configured
- [x] Environment variables configured for production
- [x] CI/CD pipelines with GitHub Actions
- [x] Health check endpoints implemented
- [x] Production optimizations applied
- [x] Security headers configured
- [x] Comprehensive deployment documentation

### Documentation Requirements
- [x] Deployment URLs in README
- [x] Step-by-step deployment guide (DEPLOYMENT.md)
- [x] Environment variable templates
- [x] CI/CD configuration files
- [x] Monitoring and maintenance procedures
- [x] Troubleshooting guide

