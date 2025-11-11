# Deployment Guide

## Deployment to Vercel

### 1. Prepare for Deployment

Pastikan semua file sudah commit ke Git:

```bash
git add .
git commit -m "Backend API ready for deployment"
git push origin main
```

### 2. Install Vercel CLI

```bash
npm i -g vercel
```

### 3. Login to Vercel

```bash
vercel login
```

### 4. Deploy

Di folder `backend-undangan`, run:

```bash
vercel
```

Ikuti instruksi:
- Setup and deploy? **Y**
- Which scope? Pilih account Anda
- Link to existing project? **N**
- Project name? `backend-undangan` (atau sesuai keinginan)
- In which directory is your code located? `./`
- Want to override settings? **N**

### 5. Set Environment Variables

Di Vercel dashboard (https://vercel.com):

1. Pilih project `backend-undangan`
2. Go to **Settings** > **Environment Variables**
3. Tambahkan:
   - `MONGODB_URI`: `mongodb+srv://appUser:faraziftan2005@webservice.o6kn9is.mongodb.net/?retryWrites=true&w=majority&appName=Webservice`
   - `MONGODB_DB`: `undangan`
   - `FRONTEND_URL`: URL frontend production (e.g., `https://wisuda-ffb.netlify.app`)
   - `JWT_SECRET`: Generate secure random string

4. Save dan redeploy

### 6. Initialize Database

Setelah deploy berhasil, initialize database:

```bash
curl -X POST https://your-backend.vercel.app/api/init
```

Atau buka di browser:
```
https://your-backend.vercel.app/api/init
```

### 7. Test API

Buka: `https://your-backend.vercel.app`

Anda akan melihat dokumentasi API.

Test endpoint:
```bash
curl https://your-backend.vercel.app/api/wisudawan
```

### 8. Update Frontend

Update file frontend untuk menggunakan backend API:

Di `graduation-invitation` project, buat file `src/config/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://your-backend.vercel.app/api'
  : 'http://localhost:3000/api';

export default API_BASE_URL;
```

## Deployment to Railway

### 1. Create Account

1. Go to https://railway.app
2. Sign up with GitHub

### 2. New Project

1. Click **New Project**
2. Select **Deploy from GitHub repo**
3. Choose `backend-undangan` repository
4. Railway will auto-detect Next.js

### 3. Environment Variables

In Railway dashboard:
1. Go to **Variables**
2. Add:
   - `MONGODB_URI`
   - `MONGODB_DB`
   - `FRONTEND_URL`
   - `JWT_SECRET`

### 4. Deploy

Railway will automatically deploy. Wait for build to complete.

### 5. Get URL

Copy the generated URL (e.g., `https://backend-undangan-production.up.railway.app`)

### 6. Initialize Database

```bash
curl -X POST https://your-backend.railway.app/api/init
```

## MongoDB Atlas Configuration

### 1. Network Access

1. Go to MongoDB Atlas dashboard
2. Network Access > Add IP Address
3. For development: Add your current IP
4. For production: Add `0.0.0.0/0` (Allow access from anywhere)
   - Or add specific IPs from Vercel/Railway

### 2. Database Access

1. Ensure user `appUser` has read/write permissions
2. Database: `undangan`
3. Collections will be auto-created on first use

## Production Checklist

- [ ] Environment variables set correctly
- [ ] MongoDB Atlas network access configured
- [ ] `/api/init` endpoint called to initialize data
- [ ] Test all endpoints
- [ ] Update frontend API URLs
- [ ] Test complete flow from frontend to backend
- [ ] Monitor logs for errors

## Monitoring

### Vercel

Check logs:
```bash
vercel logs
```

Or in dashboard: Project > Deployments > View Function Logs

### Railway

Logs are available in dashboard: Project > Deployments > View Logs

## Troubleshooting

### CORS Errors

Update `FRONTEND_URL` in environment variables to match your frontend domain.

### MongoDB Connection Failed

- Check if IP address is whitelisted in MongoDB Atlas
- Verify connection string is correct
- Check if database name matches

### API Returns 404

- Ensure Next.js App Router is used (files in `app/api/` directory)
- Check file naming: must be `route.ts`
- Verify deployment logs for build errors

### 500 Internal Server Error

Check logs for specific error messages. Common causes:
- Missing environment variables
- MongoDB connection issues
- Invalid data format

## Update Deployment

### Vercel

```bash
git add .
git commit -m "Update message"
git push origin main
```

Vercel will auto-deploy on push.

Or manual:
```bash
vercel --prod
```

### Railway

Push to main branch:
```bash
git push origin main
```

Railway will auto-deploy.

---

**Next Steps:** After backend is deployed, update frontend to use API endpoints instead of localStorage.
