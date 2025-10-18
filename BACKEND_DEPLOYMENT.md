# Backend Deployment Guide - Netlify Configuration

## Option 1: Deploy Backend to Netlify (Recommended for Quick Setup)

### Configuration for Netlify Backend Deployment

**Project Name:** `B5-ChatBOT-Backend` (or any name you prefer)

**Build Settings:**

| Setting | Value |
|---------|-------|
| **Branch to deploy** | `main` |
| **Base directory** | `bada test/backend` |
| **Build command** | `npm install` |
| **Publish directory** | `.` (root) |
| **Functions directory** | `netlify/functions` |

**Environment Variables:**
```
PORT = 3004
AI_PROVIDER = humble
HUMBLE_API_KEY = 0199dcfb-ca11-7062-a684-f6df5274d0eb
HUMBLE_BASE_ID = 0199dcfb-ca11-7062-a684-f6df5274d0eb
OPENAI_API_KEY = sk-proj-JBwcAD65E3zL7Yd8Ky9Lm0Np1Qr2St3Uv4Wx5Yz6Aa7Bb8Cc9Dd0Ee1Ff2Gg3Hh4Ii5Jj6Kk7Ll8Mm9Nn0Oo7Pp8Qq9Rr0Ss1Tt2Uu3Vv4Ww5Xx6Yy7Zz4NV2kf7PNoA
```

---

## Option 2: Deploy Backend to Hostinger (Your Current Plan)

### Steps:

1. **Upload to Hostinger**
   - Use FTP or File Manager
   - Upload `bada test/backend/` folder
   - Upload `package.json` and `package-lock.json`

2. **Install Dependencies**
   - SSH into Hostinger
   - Run: `npm install`

3. **Start Server**
   - Run: `npm start`
   - Or use Hostinger's Node.js manager

4. **Get Your Backend URL**
   - Example: `https://your-domain.com`
   - Or: `https://your-domain.hostinger.com`

5. **Update Frontend URL**
   - Edit: `bada test/frontend/public/landing-script.js`
   - Change line 8:
   ```javascript
   apiBaseUrl: "https://your-hostinger-backend-url.com",
   ```
   - Push to GitHub
   - Netlify auto-deploys

---

## Option 3: Deploy Backend to Vercel

### Configuration for Vercel:

1. **Connect GitHub Repository**
   - Go to vercel.com
   - Click "New Project"
   - Select your GitHub repo

2. **Configure Project**
   - Framework: `Other`
   - Root Directory: `bada test/backend`
   - Build Command: `npm install`
   - Output Directory: `.`

3. **Add Environment Variables**
   - PORT: `3004`
   - AI_PROVIDER: `humble`
   - HUMBLE_API_KEY: `0199dcfb-ca11-7062-a684-f6df5274d0eb`
   - HUMBLE_BASE_ID: `0199dcfb-ca11-7062-a684-f6df5274d0eb`
   - OPENAI_API_KEY: `sk-proj-...`

4. **Deploy**
   - Click "Deploy"
   - Get your Vercel URL: `https://your-project.vercel.app`

5. **Update Frontend**
   - Edit: `bada test/frontend/public/landing-script.js`
   - Change line 8:
   ```javascript
   apiBaseUrl: "https://your-project.vercel.app",
   ```
   - Push to GitHub
   - Netlify auto-deploys

---

## Recommended Setup

### Best Option: Hostinger Backend + Netlify Frontend

**Why?**
- ✅ You already have Hostinger
- ✅ Full control over backend
- ✅ No additional costs
- ✅ Easy to manage

**Steps:**
1. Deploy backend to Hostinger
2. Get your Hostinger backend URL
3. Update `landing-script.js` with backend URL
4. Push to GitHub
5. Netlify auto-deploys frontend

---

## After Deployment

### Test Your Setup

1. Visit frontend: `https://b5chatbot.netlify.app/`
2. Type a message in the chatbot
3. Should connect to your backend and get a response

### If Not Working

**Check:**
- Backend URL is correct in `landing-script.js`
- Backend is running on Hostinger
- CORS is enabled in backend (it is by default)
- API keys are correct

---

## Quick Reference

### Frontend (Netlify)
- URL: `https://b5chatbot.netlify.app/`
- Auto-deploys on git push
- No configuration needed

### Backend (Choose One)
- **Hostinger**: Manual deployment, full control
- **Netlify**: Auto-deploys, limited resources
- **Vercel**: Auto-deploys, free tier available

---

## Summary

✅ Frontend: Netlify (Live at https://b5chatbot.netlify.app/)
✅ Backend: Choose Hostinger, Netlify, or Vercel
✅ No .env files needed
✅ All config hardcoded
✅ Easy to update URLs

**Next Step:** Deploy backend to your chosen platform and update the frontend URL!

