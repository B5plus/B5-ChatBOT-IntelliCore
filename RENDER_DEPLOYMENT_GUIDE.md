# Render Deployment Guide - B5-ChatBOT Backend

## Fill in These Exact Values

### **Language**
```
Node
```
✅ Already selected

---

### **Branch**
```
main
```
✅ Already selected

---

### **Region**
```
Oregon (US West)
```
✅ Already selected (or choose closest to you)

---

### **Root Directory** (IMPORTANT!)
```
bada test/backend
```

**Why?** Your backend code is in this folder, not the repository root.

---

### **Build Command**
```
npm install
```

**What it does:** Installs all dependencies from package.json

---

### **Start Command**
```
npm start
```

**What it does:** Runs `node server.js` (defined in package.json)

---

### **Instance Type**
```
Free
```

**Options:**
- ✅ **Free** - Good for testing/learning (RECOMMENDED)
- Starter - $7/month
- Standard - $12/month

---

## Complete Form Summary

| Field | Value |
|-------|-------|
| **Language** | Node |
| **Branch** | main |
| **Region** | Oregon (US West) |
| **Root Directory** | `bada test/backend` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | Free |

---

## Environment Variables (Optional)

If you want to add environment variables in Render:

1. After creating the service
2. Go to **Environment** tab
3. Add these (optional - already hardcoded in code):

```
PORT=3004
AI_PROVIDER=humble
HUMBLE_API_KEY=0199dcfb-ca11-7062-a684-f6df5274d0eb
HUMBLE_BASE_ID=0199dcfb-ca11-7062-a684-f6df5274d0eb
OPENAI_API_KEY=sk-proj-...
```

**Note:** Not required since values are hardcoded in `server.js`

---

## Step-by-Step Deployment

### Step 1: Connect GitHub
1. Go to https://render.com/
2. Sign up with GitHub
3. Click "New +"
4. Select "Web Service"
5. Connect your repository: `B5-ChatBOT-IntelliCore`

### Step 2: Fill Form
Use the values from the table above

### Step 3: Create Service
1. Click "Create Web Service"
2. Wait for deployment (2-3 minutes)
3. You'll get a URL like: `https://b5chatbot-backend.onrender.com`

### Step 4: Update Frontend
1. Edit: `bada test/frontend/public/landing-script.js`
2. Change line 8:
   ```javascript
   apiBaseUrl: "https://your-render-url.onrender.com"
   ```
3. Push to GitHub
4. Frontend auto-updates

### Step 5: Test
1. Visit your frontend: https://b5chatbot.netlify.app/
2. Type a message
3. Should work! ✅

---

## Important Notes

### Root Directory is CRITICAL
- ❌ DON'T leave blank
- ❌ DON'T use `bada test/backend/` (with trailing slash)
- ✅ DO use `bada test/backend` (no trailing slash)

### Build vs Start Command
- **Build Command:** Runs once before deployment
- **Start Command:** Runs every time service starts

### Free Tier Limitations
- ✅ Free tier is good for chatbots
- ⚠️ Services sleep after 15 min inactivity
- ⚠️ Slow startup when waking up
- ✅ No credit card required

---

## After Deployment

### Get Your Backend URL
1. Go to Render dashboard
2. Select your service
3. Copy the URL from top (e.g., `https://b5chatbot-backend.onrender.com`)

### Update Frontend
```javascript
// In: bada test/frontend/public/landing-script.js
// Line 8:
apiBaseUrl: "https://b5chatbot-backend.onrender.com"
```

### Test Health Endpoint
Visit: `https://your-render-url.onrender.com/api/health`

Should return:
```json
{"status":"ok","message":"Humble AI Chatbot is running"}
```

---

## Troubleshooting

### Service won't start
- Check build logs in Render dashboard
- Verify Root Directory is correct
- Check Start Command is `npm start`

### 404 errors on API
- Wait 2 minutes for full deployment
- Check Root Directory setting
- Verify routes are defined before static files

### CORS errors
- CORS is already configured in backend
- Should work automatically

### Service keeps sleeping
- Free tier sleeps after 15 min inactivity
- Upgrade to Starter ($7/month) to prevent sleep

---

## Comparison: Netlify vs Render

| Feature | Netlify | Render |
|---------|---------|--------|
| **Current** | ✅ Working | New |
| **Free Tier** | Limited | Free |
| **Best For** | Frontend | Backend |
| **Performance** | Good | Better |
| **Recommendation** | Keep for frontend | Use for backend |

---

## Summary

✅ Fill in the form with values above
✅ Click "Create Web Service"
✅ Wait 2-3 minutes for deployment
✅ Get your Render URL
✅ Update frontend with new URL
✅ Test chatbot
✅ Done! 🚀

**Your chatbot will be faster on Render!**

