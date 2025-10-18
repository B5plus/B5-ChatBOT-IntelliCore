# Deployment Guide - B5-ChatBOT-IntelliCore

## Current Deployment Status

### Frontend
- **Hosted on:** Netlify
- **URL:** https://b5chatbot.netlify.app/
- **Repository:** https://github.com/B5plus/B5-ChatBOT-IntelliCore
- **Branch:** main

### Backend
- **Hosted on:** Hostinger (to be configured)
- **URL:** https://your-hostinger-backend-url.com (UPDATE THIS)

---

## How to Update Backend URL

When you deploy your backend to Hostinger, follow these steps:

### Step 1: Get Your Hostinger Backend URL
After deploying backend to Hostinger, you'll have a URL like:
```
https://your-domain.com
or
https://your-domain.hostinger.com
```

### Step 2: Update Frontend API URL
Edit this file: `bada test/frontend/public/landing-script.js`

Find this line (around line 8):
```javascript
apiBaseUrl: "https://your-hostinger-backend-url.com",
```

Replace with your actual Hostinger URL:
```javascript
apiBaseUrl: "https://your-actual-hostinger-domain.com",
```

### Step 3: Push to GitHub
```bash
git add "bada test/frontend/public/landing-script.js"
git commit -m "Update backend URL to Hostinger"
git push origin main
```

### Step 4: Netlify Auto-Deploys
- Netlify will automatically detect the push
- Your site will rebuild and deploy within 1-2 minutes
- Visit https://b5chatbot.netlify.app/ to see the changes

---

## Backend Deployment to Hostinger

### Files to Deploy:
- `bada test/backend/` (entire folder)

### Key Files:
- `server.js` - Main server file
- `package.json` - Dependencies
- `bada test/backend/services/` - AI service logic
- `bada test/backend/routes/` - API routes
- `bada test/backend/clients/` - AI client implementations

### Hardcoded Configuration:
Backend uses hardcoded config in `bada test/backend/server.js`:
```javascript
const HARDCODED_CONFIG = {
  PORT: 3004,
  AI_PROVIDER: "humble",
  HUMBLE_API_KEY: "...",
  HUMBLE_BASE_ID: "...",
  OPENAI_API_KEY: "...",
};
```

No .env file needed!

---

## Quick Reference

### Frontend Changes
```bash
# Edit frontend file
nano "bada test/frontend/public/landing-script.js"

# Push changes
git add "bada test/frontend/public/landing-script.js"
git commit -m "Update frontend"
git push origin main

# Netlify auto-deploys to https://b5chatbot.netlify.app/
```

### Backend Changes
```bash
# Edit backend file
nano "bada test/backend/server.js"

# Push changes
git add "bada test/backend/server.js"
git commit -m "Update backend"
git push origin main

# Deploy to Hostinger manually
```

---

## Environment Variables

### Frontend (Netlify)
- No environment variables needed
- All config is hardcoded in `landing-script.js`

### Backend (Hostinger)
- No .env file needed
- All config is hardcoded in `server.js`

---

## Troubleshooting

### Frontend shows 404
- Check Netlify build logs
- Verify base directory: `bada test/frontend`
- Verify publish directory: `public`

### Frontend can't connect to backend
- Check backend URL in `landing-script.js`
- Verify backend is running on Hostinger
- Check CORS settings in backend

### Backend not responding
- Check Hostinger server logs
- Verify Node.js is running
- Check API keys are correct in `server.js`

---

## Summary

✅ Frontend: Netlify (auto-deploys on git push)
✅ Backend: Hostinger (manual deployment)
✅ No .env files needed
✅ All config hardcoded
✅ Easy to update URLs

Just update the backend URL in `landing-script.js` and push to GitHub!

