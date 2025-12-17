# 🔧 Troubleshooting Guide - Vercel Deployment

## Backend Issues

### ❌ Error: "Internal Server Error 500"

**Possible Causes:**
1. MongoDB connection failed
2. Missing environment variables
3. Code errors

**Solutions:**
1. **Check Vercel Logs:**
   - Go to Vercel Dashboard
   - Select backend project
   - Click "Deployments" > Latest deployment
   - View "Build Logs" and "Function Logs"

2. **Verify Environment Variables:**
   - Settings > Environment Variables
   - Ensure `MONGO_URI`, `NODE_ENV`, `JWT_SECRET` are set
   - Redeploy after adding variables

3. **Test MongoDB Connection:**
   ```javascript
   // Test connection locally
   const mongoose = require('mongoose');
   mongoose.connect('your_mongo_uri')
     .then(() => console.log('Connected!'))
     .catch(err => console.error('Error:', err));
   ```

4. **Check MongoDB Atlas:**
   - IP Whitelist includes 0.0.0.0/0
   - Database user has correct permissions
   - Connection string format is correct

---

### ❌ Error: "Module not found"

**Solution:**
1. Check `package.json` includes all dependencies
2. Delete `node_modules` and `package-lock.json`
3. Run `npm install` locally
4. Commit and push
5. Redeploy on Vercel

---

### ❌ Error: "Function Execution Timeout"

**Cause:** Serverless function exceeded timeout limit

**Solutions:**
1. **Free tier**: 10 second limit
2. Optimize database queries:
   ```javascript
   // Add indexes
   DishSchema.index({ category: 1 });
   DishSchema.index({ name: 1 });
   
   // Use lean() for read-only queries
   const dishes = await Dish.find().lean();
   ```
3. Use connection pooling
4. Consider upgrading to Pro plan (60s timeout)

---

### ❌ Backend returns empty data

**Solutions:**
1. Check if data is in MongoDB:
   - Login to MongoDB Atlas
   - Browse Collections
   - Verify documents exist

2. Run import script:
   ```bash
   cd backend
   node importData.js
   ```

3. Check API endpoint:
   ```bash
   curl https://your-backend.vercel.app/api/dishes
   ```

---

## Frontend Issues

### ❌ CORS Error in Browser Console

**Error Message:**
```
Access to XMLHttpRequest at 'https://backend.vercel.app/api/dishes' 
from origin 'https://frontend.vercel.app' has been blocked by CORS policy
```

**Solution:**
1. Add `FRONTEND_URL` to backend environment variables:
   ```
   FRONTEND_URL = https://your-frontend.vercel.app
   ```

2. Update backend `server.js`:
   ```javascript
   const corsOptions = {
     origin: process.env.FRONTEND_URL || 'http://localhost:3000',
     credentials: true
   };
   app.use(cors(corsOptions));
   ```

3. Redeploy backend

4. Clear browser cache: Ctrl + Shift + Delete

---

### ❌ Frontend shows "Failed to fetch" or API errors

**Solutions:**
1. **Check `REACT_APP_API_URL`:**
   - Go to Frontend project > Settings > Environment Variables
   - Should be: `https://your-backend.vercel.app/api`
   - Must include `/api` at the end

2. **Test backend directly:**
   ```bash
   curl https://your-backend.vercel.app/api/dishes
   ```
   Should return JSON data

3. **Check browser Network tab:**
   - Open DevTools (F12) > Network
   - Reload page
   - Check API requests status codes

---

### ❌ Environment variables not working

**Cause:** Vercel requires `REACT_APP_` prefix for React apps

**Solution:**
1. All React env vars must start with `REACT_APP_`
2. Example: `REACT_APP_API_URL` not `API_URL`
3. Redeploy after adding variables
4. Clear browser cache

---

### ❌ Build Failed - "npm ERR!"

**Solutions:**
1. Check `package.json` for syntax errors
2. Ensure all dependencies are listed
3. Try building locally:
   ```bash
   cd frontend
   npm install
   npm run build
   ```
4. Check Node version compatibility
5. Clear Vercel cache: Settings > General > Clear Cache

---

### ❌ 404 on refresh (React Router)

**Solution:**
Already handled in `frontend/vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

If still failing:
1. Verify `vercel.json` exists in `frontend/` folder
2. Redeploy
3. Check Routes are using `<BrowserRouter>` not `<HashRouter>`

---

## MongoDB Atlas Issues

### ❌ Connection timeout

**Solutions:**
1. **IP Whitelist:**
   - MongoDB Atlas > Network Access
   - Add IP: `0.0.0.0/0` (allow from anywhere)

2. **Check connection string:**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/heneidimsum?retryWrites=true&w=majority
   ```
   - Replace `username` and `password`
   - Replace `cluster.mongodb.net` with your cluster URL
   - Database name: `heneidimsum`

3. **Test connection:**
   ```bash
   mongo "mongodb+srv://username:password@cluster.mongodb.net/heneidimsum"
   ```

---

### ❌ Authentication failed

**Solutions:**
1. Database user password might be wrong
2. Create new database user:
   - Database Access > Add New Database User
   - Built-in Role: "Read and write to any database"
3. Update `MONGO_URI` with new credentials

---

## Vercel Platform Issues

### ❌ "Automatic deployments are failing"

**Solutions:**
1. Check GitHub repository permissions
2. Reconnect GitHub: Settings > Git > Reconnect
3. Manually trigger deploy: Deployments > Redeploy

---

### ❌ Multiple projects, wrong one deploys

**Solution:**
1. Each project (frontend/backend) should be separate Vercel project
2. Backend: Root Directory = `backend`
3. Frontend: Root Directory = `frontend`
4. Check Settings > General > Root Directory

---

### ❌ Slow cold starts

**Cause:** Serverless functions "sleep" when not used

**Solutions:**
1. First request after idle: 1-3 seconds (cold start)
2. Subsequent requests: Fast
3. Keep-alive: Use UptimeRobot or similar to ping every 5 min
4. Upgrade to Pro for better performance

---

## General Debugging Steps

### 1. Check Vercel Logs
```
Project > Deployments > Latest > View Function Logs
```

### 2. Test Endpoints Individually
```bash
# Backend
curl https://backend.vercel.app/
curl https://backend.vercel.app/api/dishes

# Frontend
curl https://frontend.vercel.app/
```

### 3. Verify Environment Variables
- Backend project: MONGO_URI, NODE_ENV, JWT_SECRET, FRONTEND_URL
- Frontend project: REACT_APP_API_URL

### 4. Check MongoDB Atlas
- Cluster is running
- IP whitelist is open
- Database user exists
- Collections have data

### 5. Browser DevTools
- Console: Check for JavaScript errors
- Network: Check API request/response
- Application: Check localStorage/sessionStorage

---

## Common Status Codes

| Code | Meaning | Likely Cause |
|------|---------|--------------|
| 200 | OK | Success |
| 404 | Not Found | Wrong URL or route not defined |
| 500 | Server Error | Backend code error or MongoDB issue |
| 502 | Bad Gateway | Vercel can't reach your function |
| 504 | Timeout | Function took too long (>10s) |

---

## Getting Help

### Vercel Support
- Dashboard > Help
- https://vercel.com/support
- https://github.com/vercel/vercel/discussions

### MongoDB Support
- https://www.mongodb.com/community/forums
- https://cloud.mongodb.com/support

### Community
- Stack Overflow: Tag with `vercel`, `mongodb`, `react`
- GitHub Issues in your repository

---

## Quick Fixes Checklist

- [ ] All environment variables are set correctly
- [ ] MONGO_URI connection string is valid
- [ ] IP whitelist in MongoDB includes 0.0.0.0/0
- [ ] Root Directory is set correctly (frontend or backend)
- [ ] REACT_APP_API_URL points to correct backend
- [ ] Backend has FRONTEND_URL set for CORS
- [ ] Data is imported to MongoDB
- [ ] Both projects deployed successfully
- [ ] No errors in Vercel logs
- [ ] No errors in browser console
- [ ] API endpoints return data when tested directly

---

**Still having issues?** 
Create an issue in your GitHub repository with:
1. Error message
2. Screenshots of Vercel logs
3. Browser console errors
4. Steps to reproduce
