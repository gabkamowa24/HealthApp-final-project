# Deployment Guide

This guide provides step-by-step instructions for deploying the Health Information Access MERN application to production.

## Table of Contents

- [Prerequisites](#prerequisites)
- [MongoDB Atlas Setup](#mongodb-atlas-setup)
- [Backend Deployment (Render)](#backend-deployment-render)
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [CI/CD Pipeline Setup](#cicd-pipeline-setup)
- [Environment Variables](#environment-variables)
- [Monitoring and Maintenance](#monitoring-and-maintenance)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

1. **GitHub Account** - For source code hosting and CI/CD
2. **MongoDB Atlas Account** - For database hosting (free tier available)
3. **Render Account** - For backend hosting (free tier available)
4. **Vercel Account** - For frontend hosting (free tier available)
5. **Node.js 18+** - Installed locally for testing

## MongoDB Atlas Setup

### Step 1: Create a Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new project (e.g., "Health App")
4. Click "Build a Database"
5. Choose the **FREE** (M0) tier
6. Select a cloud provider and region (choose one close to your users)
7. Click "Create Cluster"

### Step 2: Create Database User

1. In the "Database Access" section, click "Add New Database User"
2. Choose "Password" authentication
3. Create a username and strong password (save these!)
4. Set user privileges to "Atlas admin" or "Read and write to any database"
5. Click "Add User"

### Step 3: Configure Network Access

1. Go to "Network Access" section
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add specific IPs or Render/Vercel IP ranges
5. Click "Confirm"

### Step 4: Get Connection String

1. Go to "Database" section
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `healthapp` (or your preferred database name)

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/healthapp?retryWrites=true&w=majority
```

## Backend Deployment (Render)

### Step 1: Prepare Repository

1. Ensure your code is pushed to GitHub
2. Verify `backend/package.json` has a `start` script
3. Check that `backend/env.example` exists with all required variables

### Step 2: Create Render Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub account if not already connected
4. Select your repository
5. Configure the service:
   - **Name**: `health-app-backend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your production branch)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run start`

### Step 3: Configure Environment Variables

In Render dashboard, go to "Environment" tab and add:

```
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/healthapp
JWT_SECRET=<generate-a-strong-random-string>
JWT_EXPIRES_IN=7d
CLIENT_URL=https://your-vercel-app.vercel.app,http://localhost:5173
```

**Important**: 
- Generate a strong `JWT_SECRET` (you can use: `openssl rand -base64 32`)
- Update `CLIENT_URL` after deploying frontend
- Render will provide the PORT automatically (usually 10000)

### Step 4: Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy
3. Wait for deployment to complete (usually 2-5 minutes)
4. Note your service URL (e.g., `https://health-app-backend.onrender.com`)

### Step 5: Test Backend

1. Visit `https://your-backend-url.onrender.com/health`
2. You should see: `{"status":"ok","timestamp":"...","uptime":...,"environment":"production"}`
3. Test API endpoints using Postman or curl

### Step 6: Enable Auto-Deploy

1. In Render dashboard, go to "Settings"
2. Under "Auto-Deploy", ensure "Auto-Deploy" is enabled
3. Select the branch (usually `main`)
4. Render will now auto-deploy on every push

## Frontend Deployment (Vercel)

### Step 1: Prepare Repository

1. Ensure your code is pushed to GitHub
2. Verify `frontend/package.json` has a `build` script
3. Check that `frontend/env.example` exists

### Step 2: Create Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (click "Edit" and set to `frontend`)
   - **Build Command**: `npm run build` (should auto-detect)
   - **Output Directory**: `dist` (should auto-detect)
   - **Install Command**: `npm install` (should auto-detect)

### Step 3: Configure Environment Variables

In Vercel project settings, go to "Environment Variables" and add:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

**Important**: Replace `your-backend-url` with your actual Render backend URL

### Step 4: Deploy

1. Click "Deploy"
2. Vercel will build and deploy automatically
3. Wait for deployment (usually 1-2 minutes)
4. Note your deployment URL (e.g., `https://health-app.vercel.app`)

### Step 5: Update Backend CORS

1. Go back to Render dashboard
2. Update `CLIENT_URL` environment variable to include your Vercel URL:
   ```
   https://your-vercel-app.vercel.app,http://localhost:5173
   ```
3. Render will automatically redeploy

### Step 6: Test Frontend

1. Visit your Vercel deployment URL
2. Test the application functionality
3. Check browser console for any errors
4. Verify API calls are working

## CI/CD Pipeline Setup

### GitHub Actions Workflows

The repository includes four GitHub Actions workflows:

1. **frontend-ci.yml** - Runs on push/PR to test and build frontend
2. **backend-ci.yml** - Runs on push/PR to test backend
3. **frontend-cd.yml** - Deploys frontend to Vercel on main branch
4. **backend-cd.yml** - Deploys backend to Render on main branch

### Setup GitHub Secrets

For automated deployment, add these secrets in GitHub:

1. Go to your repository → Settings → Secrets and variables → Actions
2. Add the following secrets:

#### For Vercel (Frontend CD):
- `VERCEL_TOKEN`: Get from Vercel → Settings → Tokens
- `VERCEL_ORG_ID`: Get from Vercel → Settings → General
- `VERCEL_PROJECT_ID`: Get from your project settings
- `VITE_API_URL`: Your backend API URL (e.g., `https://your-backend.onrender.com/api`)

#### For Render (Backend CD):
- `RENDER_API_KEY`: Get from Render → Account Settings → API Keys
- `RENDER_SERVICE_ID`: Get from your Render service settings

**Note**: For manual deployment (recommended for learning), you can skip the CD workflows and deploy manually through Render/Vercel dashboards.

### Testing CI/CD

1. Make a small change to your code
2. Commit and push to `main` branch
3. Check GitHub Actions tab to see workflows running
4. Verify deployments are triggered automatically

## Environment Variables

### Backend (.env)

Create `backend/.env` from `backend/env.example`:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/healthapp
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173,https://your-vercel-app.vercel.app
NODE_ENV=development
```

### Frontend (.env)

Create `frontend/.env` from `frontend/env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, set `VITE_API_URL` to your Render backend URL in Vercel environment variables.

## Monitoring and Maintenance

### Health Checks

Both services include health check endpoints:

- **Backend**: `GET /health` - Returns server status, uptime, and environment
- **Frontend**: Built-in Vercel health monitoring

### Monitoring Setup

#### Render Monitoring

1. Render provides built-in logs and metrics
2. View logs in Render dashboard → Your service → Logs
3. Set up alerts in Settings → Notifications

#### Vercel Monitoring

1. Vercel provides analytics and logs
2. View in Vercel dashboard → Your project → Analytics
3. Check function logs in Deployments → View Function Logs

#### Error Tracking (Optional)

Consider adding error tracking:

1. **Sentry** (Recommended)
   - Sign up at [sentry.io](https://sentry.io)
   - Install: `npm install @sentry/react @sentry/node`
   - Configure in both frontend and backend
   - Add SENTRY_DSN to environment variables

2. **LogRocket** - For session replay and error tracking

### Database Backups

MongoDB Atlas provides automatic backups:

1. Go to MongoDB Atlas → Clusters
2. Click "Backup" tab
3. Enable "Cloud Backup" (available on M10+ clusters)
4. For free tier, use manual exports:
   ```bash
   mongodump --uri="your-connection-string" --out=./backup
   ```

### Maintenance Plan

1. **Weekly**:
   - Review application logs
   - Check error rates
   - Monitor database usage

2. **Monthly**:
   - Update dependencies (`npm audit`)
   - Review and rotate secrets
   - Check MongoDB Atlas usage limits

3. **Quarterly**:
   - Security audit
   - Performance optimization review
   - Backup verification

## Troubleshooting

### Backend Issues

**Problem**: Backend won't start
- Check Render logs for errors
- Verify all environment variables are set
- Ensure MongoDB connection string is correct
- Check that PORT is set correctly (Render uses 10000)

**Problem**: CORS errors
- Verify CLIENT_URL includes your frontend URL
- Check that URLs don't have trailing slashes
- Ensure credentials are set correctly

**Problem**: Database connection fails
- Verify MongoDB Atlas network access allows Render IPs
- Check connection string format
- Ensure database user has correct permissions

### Frontend Issues

**Problem**: Build fails on Vercel
- Check build logs in Vercel dashboard
- Verify all dependencies are in package.json
- Ensure Node.js version is compatible (18+)
- Check for TypeScript errors

**Problem**: API calls fail
- Verify VITE_API_URL is set correctly
- Check browser console for CORS errors
- Ensure backend is running and accessible
- Verify API endpoints are correct

**Problem**: Environment variables not working
- Vercel requires redeployment after adding env vars
- Ensure variable names start with `VITE_` for Vite
- Check that variables are set for correct environment (Production)

### General Issues

**Problem**: Changes not appearing
- Clear browser cache
- Check that deployment completed successfully
- Verify you're looking at the correct URL
- Check GitHub Actions/Vercel/Render logs

**Problem**: Slow performance
- Check Render service status (free tier can spin down)
- Monitor database query performance
- Review frontend bundle size
- Consider upgrading to paid tiers for better performance

## Rollback Procedures

### Vercel Rollback

1. Go to Vercel dashboard → Your project → Deployments
2. Find the previous working deployment
3. Click "..." → "Promote to Production"

### Render Rollback

1. Go to Render dashboard → Your service → Deployments
2. Find the previous working deployment
3. Click "..." → "Rollback to this deploy"

### Database Rollback

1. Use MongoDB Atlas backups
2. Or restore from manual backup:
   ```bash
   mongorestore --uri="your-connection-string" ./backup
   ```

## Next Steps

After successful deployment:

1. Set up custom domains (optional)
2. Configure SSL certificates (automatic on Vercel/Render)
3. Set up monitoring and alerts
4. Implement error tracking (Sentry)
5. Set up automated backups
6. Document your deployment process
7. Create a runbook for common issues

## Support Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Last Updated**: [Current Date]
**Maintained By**: [Your Name/Team]

