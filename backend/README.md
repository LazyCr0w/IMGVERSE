# IMGVERSE Backend - API Deployment Guide

## 🚀 Backend API Deployment Options

Your backend is ready for deployment! Here are the best options:

### 1. **Railway** (Recommended - Easiest) ⭐

#### Quick Deploy:
1. Go to [railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click "Deploy from GitHub"
4. Select your repository
5. Railway auto-detects Node.js and deploys!

#### Environment Variables (in Railway Dashboard):
```
PEXELS_API_KEY=your_pexels_key
UNSPLASH_ACCESS_KEY=your_unsplash_key
PIXABAY_API_KEY=your_pixabay_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 2. **Render** (Free Tier Available)

#### Deploy Steps:
1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Configure:
   - **Runtime**: Node.js
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

#### Environment Variables:
Set the same variables as above in Render's Environment section.

### 3. **Vercel** (Serverless Functions)

#### Deploy Steps:
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your repo
4. Vercel detects the `vercel.json` config automatically

#### Environment Variables:
Set in Vercel dashboard under Project Settings → Environment Variables.

## 🔧 API Endpoints

Your backend provides these endpoints:

### Search Images
```
POST /api/search
Content-Type: application/json

{
  "query": "nature",
  "page": 1,
  "perPage": 10
}
```

### Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Support Request",
  "message": "Hello, I need help..."
}
```

### Download Image
```
GET /api/download?url=https://example.com/image.jpg
```

## 🌐 Environment Variables Required

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `PEXELS_API_KEY` | Pexels API key | [pexels.com/api](https://pexels.com/api) |
| `UNSPLASH_ACCESS_KEY` | Unsplash API key | [unsplash.com/developers](https://unsplash.com/developers) |
| `PIXABAY_API_KEY` | Pixabay API key | [pixabay.com/api/docs](https://pixabay.com/api/docs) |
| `EMAIL_USER` | Gmail address | Your Gmail |
| `EMAIL_PASS` | App password | Gmail Settings → Security → App Passwords |

## 📋 API Keys Setup

### Pexels API:
1. Go to [pexels.com/api](https://pexels.com/api)
2. Sign up/Login
3. Get your API key from dashboard

### Unsplash API:
1. Go to [unsplash.com/developers](https://unsplash.com/developers)
2. Create an app
3. Get Access Key

### Pixabay API:
1. Go to [pixabay.com/api/docs](https://pixabay.com/api/docs)
2. Register for free API key

### Gmail Setup:
1. Enable 2FA on Gmail
2. Go to Google Account Settings
3. Security → App Passwords
4. Generate password for "Mail"

## 🧪 Testing Your API

Once deployed, test your API:

```bash
# Test search endpoint
curl -X POST https://your-api-url.com/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "cats", "page": 1, "perPage": 5}'

# Test contact endpoint
curl -X POST https://your-api-url.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "email": "test@example.com", "subject": "Test", "message": "Hello"}'
```

## 🔗 Frontend Integration

Update your frontend's `.env` file:

```bash
# For production
VITE_API_URL=https://your-deployed-api-url.com/api

# Example:
VITE_API_URL=https://imgverse-api.up.railway.app/api
```

## 📊 Free Tiers Comparison

| Platform | Free Tier | Build Time | Cold Starts | Best For |
|----------|-----------|------------|-------------|----------|
| **Railway** | 512MB RAM, $5/month | Fast | None | **Beginners** |
| **Render** | 750hrs/month | Medium | Some | APIs |
| **Vercel** | 100GB bandwidth | Fast | Some | Full-stack |

## 🚀 Recommended: Railway (Easiest)

Railway is the easiest option because:
- ✅ Auto-detects Node.js projects
- ✅ Zero configuration needed
- ✅ PostgreSQL database included
- ✅ Great free tier
- ✅ Fast deployments

Just connect your GitHub repo and it works!