#!/usr/bin/env node

/**
 * IMGVERSE Backend Deployment Helper
 * Run this script to check if your backend is ready for deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 IMGVERSE Backend Deployment Checker\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('✅ .env file found');

  // Check for required environment variables
  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredVars = [
    'PEXELS_API_KEY',
    'UNSPLASH_ACCESS_KEY',
    'PIXABAY_API_KEY',
    'EMAIL_USER',
    'EMAIL_PASS'
  ];

  const missingVars = [];
  requiredVars.forEach(varName => {
    if (!envContent.includes(`${varName}=`) || envContent.includes(`${varName}=your_`)) {
      missingVars.push(varName);
    }
  });

  if (missingVars.length === 0) {
    console.log('✅ All required environment variables are configured');
  } else {
    console.log('⚠️  Missing or placeholder environment variables:');
    missingVars.forEach(varName => {
      console.log(`   - ${varName}`);
    });
  }
} else {
  console.log('❌ .env file not found');
  console.log('   Create one based on .env.example');
}

// Check package.json
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  console.log('✅ package.json found');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  if (packageJson.scripts && packageJson.scripts.start) {
    console.log('✅ Start script configured');
  } else {
    console.log('❌ Start script missing in package.json');
  }
} else {
  console.log('❌ package.json not found');
}

// Check main server file
const serverPath = path.join(__dirname, 'src', 'index.js');
if (fs.existsSync(serverPath)) {
  console.log('✅ Server file (src/index.js) found');
} else {
  console.log('❌ Server file not found');
}

console.log('\n📋 Next Steps:');
console.log('1. Set up your API keys (see README.md)');
console.log('2. Choose a deployment platform:');
console.log('   - Railway (recommended): https://railway.app');
console.log('   - Render: https://render.com');
console.log('   - Vercel: https://vercel.com');
console.log('3. Deploy your backend');
console.log('4. Update frontend VITE_API_URL with your backend URL');

console.log('\n🔗 Quick Railway Deploy:');
console.log('1. Go to railway.app');
console.log('2. Connect your GitHub repo');
console.log('3. Set environment variables in Railway dashboard');
console.log('4. Deploy!');

console.log('\n✨ Your backend will be ready in minutes!');