# Hardcoded Configuration Guide

## Overview
All environment variables have been hardcoded directly into the code to avoid .env file issues during deployment.

---

## Backend Configuration
**File:** `bada test/backend/server.js`

### Hardcoded Variables:
```javascript
const HARDCODED_CONFIG = {
  PORT: 3004,
  AI_PROVIDER: "humble", // or "openai"
  HUMBLE_API_KEY: "0199dcfb-ca11-7062-a684-f6df5274d0eb",
  HUMBLE_BASE_ID: "0199dcfb-ca11-7062-a684-f6df5274d0eb",
  OPENAI_API_KEY: "sk-proj-JBwcAD65E3zL7Yd8Ky9Lm0Np1Qr2St3Uv4Wx5Yz6Aa7Bb8Cc9Dd0Ee1Ff2Gg3Hh4Ii5Jj6Kk7Ll8Mm9Nn0Oo1Pp2Qq3Rr4Ss5Tt6Uu7Vv8Ww9Xx0Yy1Zz2Aa3Bb4Cc5Dd6Ee7Ff8Gg9Hh0Ii1Jj2Kk3Ll4Mm5Nn6Oo7Pp8Qq9Rr0Ss1Tt2Uu3Vv4Ww9Xx0Yy1Zz2Aa3Bb4Cc5Dd6Ee7Ff8Gg9Hh0Ii1Jj2Kk3Ll4Mm5Nn6Oo7Pp8Qq9Rr0Ss1Tt2Uu3Vv4Ww5Xx6Yy7Zz4NV2kf7PNoA",
};
```

### What Changed:
- ✅ Removed `dotenv` import
- ✅ Removed `dotenv.config()` call
- ✅ All `process.env.*` references replaced with `HARDCODED_CONFIG.*`
- ✅ No .env file needed

---

## Frontend Configuration
**File:** `bada test/frontend/public/landing-script.js`

### Hardcoded Variables:
```javascript
const API_CONFIG = {
  // For local development
  // apiBaseUrl: "http://localhost:3004",
  
  // For production/Vercel deployment
  apiBaseUrl: "https://your-backend-url.com", // Replace with your actual backend URL
};
```

### What Changed:
- ✅ Removed hardcoded `"http://localhost:3004"` string
- ✅ Created `API_CONFIG` object for easy updates
- ✅ Added comments for local vs production URLs

---

## How to Update Configuration

### For Local Development:
1. In `bada test/frontend/public/landing-script.js`, change:
```javascript
apiBaseUrl: "http://localhost:3004",
```

### For Production Deployment:
1. Update the backend URL in `bada test/frontend/public/landing-script.js`:
```javascript
apiBaseUrl: "https://your-actual-backend-url.com",
```

2. If deploying backend separately, update `HARDCODED_CONFIG` in `bada test/backend/server.js` with your actual API keys.

---

## Benefits
✅ No .env file needed
✅ No environment variable issues on Vercel
✅ Faster deployment
✅ Easy to update configuration directly in code
✅ All values visible in source code

---

## Security Note
⚠️ **WARNING**: API keys are now visible in the source code. This is acceptable for:
- Development/testing environments
- Public demo applications
- Non-sensitive API keys

For production with sensitive keys, consider:
- Using Vercel Environment Variables UI
- Using a secrets management service
- Rotating keys regularly

