# Troubleshooting Guide - B5-ChatBOT

## Issue: "Error: Failed to fetch"

### Root Cause
The backend wasn't listening on the correct port. Render assigns a dynamic PORT via environment variable, but the backend was hardcoded to port 3004.

### Solution Applied ✅
Updated `bada test/backend/server.js` to use:
```javascript
const PORT = process.env.PORT || HARDCODED_CONFIG.PORT;
```

This tells the backend to:
1. Use PORT from environment (Render sets this)
2. Fallback to 3004 for local development

---

## What to Do Now

### Step 1: Wait for Render to Rebuild
- Render auto-detected the change
- Rebuilding now (2-3 minutes)
- Check: https://dashboard.render.com/

### Step 2: Test Backend Health
After rebuild completes, visit:
```
https://b5-chatbot-intellicore.onrender.com/api/health
```

Should return:
```json
{"status":"ok","message":"Humble AI Chatbot is running"}
```

### Step 3: Test Frontend
Visit: https://b5chatbot.netlify.app/

Send a message - should work now! ✅

---

## How to Check Render Logs

1. Go to: https://dashboard.render.com/
2. Select your service: `b5-chatbot-intellicore`
3. Click **Logs** tab
4. Look for:
   - ✅ "Humble AI Chatbot server running on port..."
   - ✅ "Using humble provider"
   - ❌ Any error messages

---

## Common Issues & Solutions

### Issue 1: Still Getting 404
**Cause:** Render still rebuilding
**Solution:** 
- Wait 2-3 minutes
- Refresh browser
- Check Render logs

### Issue 2: Slow Response (30-60 seconds)
**Cause:** Render free tier sleeps after 15 min inactivity
**Solution:**
- This is normal
- First request wakes up service
- Subsequent requests are fast
- Upgrade to Starter ($7/month) to prevent sleep

### Issue 3: CORS Error
**Cause:** CORS not configured
**Solution:**
- CORS is already configured
- Check browser console for actual error
- Verify backend URL in frontend code

### Issue 4: Backend returns 500 error
**Cause:** API key issue or service error
**Solution:**
- Check Render logs for error details
- Verify API keys are correct
- Check if Humble AI service is up

---

## Deployment Timeline

### What Just Happened
1. ✅ Fixed PORT configuration
2. ✅ Pushed to GitHub
3. ✅ Render detected change
4. ⏳ Render rebuilding (2-3 minutes)
5. ⏳ Backend will be live soon

### Expected Timeline
- **Now:** Code pushed
- **1-2 min:** Render rebuilding
- **2-3 min:** Backend live
- **3-5 min:** Frontend working

---

## Quick Checklist

- [ ] Wait 3 minutes for Render rebuild
- [ ] Visit backend health endpoint
- [ ] Check Render logs for errors
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Visit frontend and test
- [ ] Send a message
- [ ] Check browser console for errors

---

## If Still Not Working

### Check These in Order

1. **Backend Health**
   ```
   https://b5-chatbot-intellicore.onrender.com/api/health
   ```
   Should return JSON, not 404

2. **Render Logs**
   - Go to https://dashboard.render.com/
   - Select service
   - Check Logs tab
   - Look for errors

3. **Browser Console**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for error messages
   - Check Network tab for failed requests

4. **Frontend URL**
   - Open DevTools (F12)
   - Console: type `apiBaseUrl`
   - Should show: `https://b5-chatbot-intellicore.onrender.com`

5. **GitHub Commits**
   - Check latest commit deployed
   - Should be: "Fix: Use dynamic PORT from environment"

---

## What Changed

### Before (Broken)
```javascript
const PORT = HARDCODED_CONFIG.PORT; // Always 3004
```

### After (Fixed)
```javascript
const PORT = process.env.PORT || HARDCODED_CONFIG.PORT; // Dynamic or 3004
```

### Why This Matters
- Render assigns a random PORT (e.g., 10000, 20000)
- Backend was ignoring it and trying to use 3004
- Now backend uses Render's PORT
- Backend is now accessible

---

## Next Steps

1. **Wait 3 minutes** for Render rebuild
2. **Test backend:** https://b5-chatbot-intellicore.onrender.com/api/health
3. **Test frontend:** https://b5chatbot.netlify.app/
4. **Send message** and verify it works
5. **Check console** for any errors

---

## Support

### If Backend Still Not Working
1. Check Render logs: https://dashboard.render.com/
2. Look for error messages
3. Verify Root Directory is `bada test/backend`
4. Verify Start Command is `npm start`

### If Frontend Still Not Working
1. Check browser console (F12)
2. Verify backend URL in code
3. Clear browser cache
4. Hard refresh (Ctrl+Shift+R)

### If You Need Help
- Check DEPLOYMENT_COMPLETE.md
- Check RENDER_DEPLOYMENT_GUIDE.md
- Check GitHub commits for recent changes

---

## Summary

✅ **Problem:** Backend not listening on correct port
✅ **Solution:** Use dynamic PORT from environment
✅ **Status:** Fix pushed, Render rebuilding
⏳ **Next:** Wait 3 minutes and test

**Your chatbot should work soon!** 🚀

