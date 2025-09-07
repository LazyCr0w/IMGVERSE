# IMGVERSE Frontend - Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- Vercel account
- Backend API deployed and accessible

### Step 1: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository
4. Vercel will automatically detect the configuration

### Step 2: Configure Environment Variables
In your Vercel dashboard, go to Project Settings > Environment Variables and add:

```
VITE_API_URL=https://your-backend-api-url.com/api
```

Replace `your-backend-api-url.com` with your actual backend URL.

### Step 3: Deploy
- Vercel will automatically build and deploy your application
- Your site will be live at `your-project.vercel.app`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API services
│   └── ...
├── public/            # Static assets
├── dist/             # Build output (generated)
├── vercel.json       # Vercel configuration
├── .env.example      # Environment variables template
└── package.json      # Dependencies and scripts
```

## 🔧 Configuration Files

### vercel.json
- Configures build settings for Vercel
- Sets up routing for SPA
- Specifies build commands

### .env.example
- Template for required environment variables
- Shows format for API URL configuration

## 🌐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `https://api.example.com/api` |

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Build Output

The build process generates:
- `dist/index.html` - Main HTML file
- `dist/assets/` - JavaScript, CSS, and static assets
- Optimized and minified for production

## 🔗 API Integration

The frontend communicates with the backend through:
- RESTful API calls via `src/services/apiService.js`
- Environment-based configuration
- Automatic fallback to localhost for development

## 🎯 Deployment Checklist

- [ ] Backend API is deployed and accessible
- [ ] `VITE_API_URL` environment variable is set in Vercel
- [ ] Build completes successfully
- [ ] All assets are properly loaded
- [ ] API calls work in production

## 🐛 Troubleshooting

### Build Fails
- Check that all dependencies are installed
- Verify environment variables are set correctly
- Ensure backend API is accessible

### API Calls Fail
- Verify `VITE_API_URL` is set correctly
- Check CORS configuration on backend
- Ensure backend is deployed and running

### Assets Not Loading
- Check that all files are committed to Git
- Verify asset paths in components
- Ensure build process completes successfully