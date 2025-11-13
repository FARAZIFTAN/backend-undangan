# 🚀 Deployment Guide - Backend to Vercel

## Prerequisites
- Vercel account (https://vercel.com)
- Git repository connected to Vercel
- MongoDB Atlas connection string

## Step 1: Prepare Backend for Deployment

✅ Already configured:
- `vercel.json` - Vercel configuration
- `next.config.js` - CORS settings
- `.env.example` - Environment template

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to backend folder**
   ```bash
   cd C:\FLOBAMORA\backend-undangan
   ```

4. **Deploy**
   ```bash
   vercel
   ```

5. **Follow prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **undangan-backend** (or your choice)
   - Directory? **./** (current directory)
   - Override settings? **N**

6. **Deploy to production**
   ```bash
   vercel --prod
   ```

### Option B: Using Vercel Dashboard

1. **Go to https://vercel.com/new**

2. **Import Git Repository**
   - Click "Import Git Repository"
   - Select your repository
   - Or click "Add GitHub/GitLab/Bitbucket Account"

3. **Configure Project**
   - Framework Preset: **Next.js**
   - Root Directory: **backend-undangan**
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   
   ```
   MONGODB_URI = mongodb+srv://appUser:faraziftan2005@webservice.o6kn9is.mongodb.net/?retryWrites=true&w=majority&appName=Webservice
   
   MONGODB_DB = undangan
   
   FRONTEND_URL = https://buat-undangan.netlify.app
   
   JWT_SECRET = your-super-secret-random-string-here
   ```

   **IMPORTANT:** Generate a secure JWT_SECRET:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

5. **Click "Deploy"**

## Step 3: Get Your Backend URL

After deployment, Vercel will provide a URL like:
```
https://undangan-backend-xxxxx.vercel.app
```

## Step 4: Update Frontend API Config

1. **Open frontend project**
   ```bash
   cd C:\FLOBAMORA\graduation-invitation
   ```

2. **Edit `src/config/api.ts`**
   ```typescript
   const API_BASE_URL = import.meta.env.PROD 
     ? 'https://undangan-backend-xxxxx.vercel.app/api'  // ← Your Vercel URL
     : 'http://localhost:3000/api';
   ```

3. **Commit and push to Netlify**
   ```bash
   git add .
   git commit -m "Update backend API URL"
   git push
   ```

   Netlify will automatically redeploy.

## Step 5: Test Your Deployment

1. **Visit your frontend**
   ```
   https://buat-undangan.netlify.app
   ```

2. **Test login with access code**
   - Use: `EDY2025`, `GVN2025`, etc.

3. **Check API endpoints**
   - https://your-backend.vercel.app/api/wisudawan
   - https://your-backend.vercel.app/api/init

## Troubleshooting

### Error: CORS Issues
- Check `FRONTEND_URL` in Vercel environment variables
- Must be: `https://buat-undangan.netlify.app`

### Error: Database Connection
- Check MongoDB Atlas IP whitelist
- Add `0.0.0.0/0` to allow all IPs (or Vercel IPs)

### Error: 500 Internal Server Error
- Check Vercel logs: `vercel logs`
- Check environment variables are set correctly

## Initialize Database

After deployment, visit:
```
https://your-backend.vercel.app/api/init
```

This will create 10 default wisudawan in database.

## Custom Domain (Optional)

1. Go to Vercel dashboard → Your project → Settings → Domains
2. Add custom domain: `api.yourdomain.com`
3. Update DNS records as instructed
4. Update frontend `api.ts` with new domain

## Monitoring

- **Vercel Dashboard**: Monitor usage, logs, analytics
- **MongoDB Atlas**: Monitor database connections, queries
- **Netlify Analytics**: Monitor frontend traffic

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- MongoDB Docs: https://docs.mongodb.com

---

✅ **Your URLs:**
- Frontend: https://buat-undangan.netlify.app
- Backend: https://[your-project].vercel.app
- Database: MongoDB Atlas (Webservice cluster)

🎉 Happy Deploying!
