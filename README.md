# IMGVERSE - Multi-Source Image Search Platform

![IMGVERSE](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

> Revolutionizing image discovery through multi-source aggregation, beautiful design, and seamless user experience.

## 🌟 **Live Demo**

- **Frontend**: [imgverse.vercel.app](https://imgverse.vercel.app)
- **Backend API**: [imgverse-api.vercel.app](https://imgverse-api.vercel.app)

## 📋 **Table of Contents**

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Environment Setup](#-environment-setup)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ **Features**

### 🎨 **Core Features**
- **Multi-Source Search**: Unified search across Pexels, Unsplash, and Pixabay
- **Pinterest-Style Layout**: Beautiful masonry grid with responsive design
- **Advanced Filtering**: Search by keywords, categories, and sources
- **High-Quality Images**: Access to millions of professional images
- **Download Protection**: Legal download system with watermarking

### 🚀 **User Experience**
- **Lightning Fast**: Optimized performance with lazy loading
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Infinite Scroll**: Seamless browsing experience
- **Image Details**: Photographer credits and licensing information
- **Contact Support**: Built-in contact form with email integration

### 🔧 **Technical Features**
- **Serverless Backend**: Deployed on Vercel with automatic scaling
- **API Rate Limiting**: Smart request management across sources
- **Error Handling**: Graceful error recovery and user feedback
- **CORS Enabled**: Cross-origin resource sharing configured
- **Compression**: Response compression for faster loading

## 🛠 **Tech Stack**

### **Frontend**
- **React 18** - Modern UI framework with hooks
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Masonry CSS** - Pinterest-style grid layout
- **React Icons** - Beautiful icon library

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **Axios** - HTTP client for API requests
- **Nodemailer** - Email service for contact forms
- **CORS** - Cross-origin resource sharing
- **Compression** - Response compression middleware

### **APIs**
- **Pexels API** - High-quality stock photos
- **Unsplash API** - Beautiful free images
- **Pixabay API** - Free stock photos and illustrations

### **Deployment**
- **Vercel** - Frontend and backend deployment
- **Railway** - Alternative backend deployment
- **Render** - Additional deployment option

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+
- npm or yarn
- GitHub account (for deployment)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/imgverse.git
   cd imgverse
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment templates
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env

   # Edit with your API keys
   nano backend/.env
   ```

4. **Start development servers**
   ```bash
   # Backend (Terminal 1)
   cd backend
   npm run dev

   # Frontend (Terminal 2)
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📡 **API Endpoints**

### **Search Images**
```http
POST /api/search
Content-Type: application/json

{
  "query": "nature",
  "page": 1,
  "perPage": 10
}
```

### **Contact Form**
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Support Request",
  "message": "Hello, I need help..."
}
```

### **Download Image**
```http
GET /api/download?url=https://example.com/image.jpg
```

## 🚀 **Deployment**

### **Frontend (Vercel)**

1. **Connect Repository**
   ```bash
   # Push to GitHub first
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects configuration
   - Set `VITE_API_URL` environment variable

### **Backend (Vercel/Railway)**

#### **Option 1: Vercel (Recommended)**
1. Import backend folder as separate project
2. Vercel detects `vercel.json` configuration
3. Set environment variables in dashboard

#### **Option 2: Railway (Easiest)**
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Railway auto-detects Node.js project
4. Set environment variables

## 🔧 **Environment Setup**

### **Required API Keys**

| Service | Website | Cost |
|---------|---------|------|
| **Pexels** | [pexels.com/api](https://pexels.com/api) | Free |
| **Unsplash** | [unsplash.com/developers](https://unsplash.com/developers) | Free |
| **Pixabay** | [pixabay.com/api/docs](https://pixabay.com/api/docs) | Free |

### **Environment Variables**

#### **Backend (.env)**
```bash
# API Keys
PEXELS_API_KEY=your_pexels_api_key
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
PIXABAY_API_KEY=your_pixabay_api_key

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server
PORT=3001
NODE_ENV=production
```

#### **Frontend (.env)**
```bash
VITE_API_URL=https://your-backend-url.com/api
```

## 🧪 **Testing**

### **API Testing**
```bash
# Test search endpoint
curl -X POST http://localhost:3001/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "cats", "page": 1, "perPage": 5}'

# Test contact endpoint
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "email": "test@example.com", "subject": "Test", "message": "Hello"}'
```

### **Build Testing**
```bash
# Test frontend build
cd frontend
npm run build

# Test backend (if needed)
cd ../backend
npm run build
```

## 📁 **Project Structure**

```
imgverse/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API services
│   │   └── ...
│   ├── public/              # Static assets
│   ├── vercel.json          # Vercel config
│   └── package.json
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── services/        # Business logic
│   │   └── index.js         # Server entry point
│   ├── vercel.json          # Vercel config
│   └── package.json
├── README.md               # This file
└── .gitignore             # Git ignore rules
```

## 🤝 **Contributing**

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### **Development Guidelines**
- Follow React best practices
- Use meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 **Credits**

### **API Providers**
- **Pexels** - [pexels.com](https://pexels.com)
- **Unsplash** - [unsplash.com](https://unsplash.com)
- **Pixabay** - [pixabay.com](https://pixabay.com)

### **Open Source Libraries**
- **React** - [reactjs.org](https://reactjs.org)
- **Express.js** - [expressjs.com](https://expressjs.com)
- **Tailwind CSS** - [tailwindcss.com](https://tailwindcss.com)
- **Vite** - [vitejs.dev](https://vitejs.dev)

## 📞 **Support**

- **Issues**: [GitHub Issues](https://github.com/yourusername/imgverse/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/imgverse/discussions)
- **Email**: support@imgverse.com

## 🎯 **Roadmap**

- [ ] Advanced search filters
- [ ] Image upload and sharing
- [ ] User accounts and favorites
- [ ] Mobile app development
- [ ] AI-powered image recognition
- [ ] Multi-language support

---

**Made with ❤️ by [Your Name]**

*Revolutionizing image discovery, one search at a time.*