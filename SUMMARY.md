# Backend API - Quick Reference

## 📋 Project Summary

Backend API untuk sistem undangan wisuda dengan fitur:
- ✅ Authentication dengan access code
- ✅ Manajemen wisudawan
- ✅ CRUD undangan dengan quota management
- ✅ Validasi link undangan
- ✅ MongoDB Atlas integration
- ✅ CORS support untuk frontend

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Initialize database (run once)
curl -X POST http://localhost:3000/api/init
```

## 📁 File Structure

```
backend-undangan/
├── app/api/                  # API Routes (Next.js App Router)
│   ├── auth/                 # Login & session
│   ├── wisudawan/            # Wisudawan management
│   ├── invitations/          # Invitation CRUD
│   ├── quota/                # Quota info
│   └── init/                 # Database initialization
├── lib/                      # Utilities
│   ├── mongodb.ts            # MongoDB connection
│   └── utils.ts              # Helper functions
├── models/                   # Data models
│   ├── Wisudawan.ts
│   └── Invitation.ts
└── types/                    # TypeScript types
```

## 🔑 Key Features

### 1. Authentication
- Login dengan access code (10 wisudawan)
- Session management dengan token
- Token expire: 24 jam

### 2. Wisudawan Management
- Get all wisudawan
- Get by ID
- Default: 10 wisudawan dengan quota 10 each

### 3. Invitation Management
- Create invitation dengan quota check
- Get all invitations per wisudawan
- Delete invitation
- Auto-generate slug (name-with-dash)
- Duplicate prevention

### 4. Validation
- Validate invitation link (wisudawan exists = valid)
- Quota enforcement
- Access code validation

## 🗄️ Database

**Database:** undangan
**Collections:**
- `wisudawan` - Graduate data, access codes, quotas
- `invitations` - Created invitations

## 🌐 API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with access code |
| GET | `/api/auth/session` | Verify session token |
| GET | `/api/wisudawan` | Get all wisudawan |
| GET | `/api/wisudawan/:id` | Get wisudawan by ID |
| GET | `/api/invitations?wisudawanId=:id` | Get invitations |
| POST | `/api/invitations` | Create invitation |
| DELETE | `/api/invitations/:id` | Delete invitation |
| GET | `/api/invitations/validate` | Validate link |
| GET | `/api/quota?wisudawanId=:id` | Get quota info |
| POST | `/api/init` | Initialize database |

## 🔐 Default Access Codes

```
AYD2025, DSS2025, DHT2025, FIF2025, FTZ2025
RHS2025, RBH2025, SMK2025, VNA2025, VRD2025
```

## 🛠️ Environment Variables

```env
MONGODB_URI=mongodb+srv://...
MONGODB_DB=undangan
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-secret-key
```

## 📝 Next Steps

1. ✅ Backend API complete
2. ⏳ Install dependencies: `npm install`
3. ⏳ Test locally: `npm run dev`
4. ⏳ Deploy to Vercel
5. ⏳ Update frontend to use API
6. ⏳ Test end-to-end

## 📚 Documentation Files

- `README.md` - Complete documentation
- `TESTING.md` - Testing guide with cURL examples
- `DEPLOYMENT.md` - Deployment to Vercel/Railway
- `API_REFERENCE.md` - Detailed API docs (create if needed)

## 🔗 Integration with Frontend

Frontend needs to:
1. Replace localStorage calls with API calls
2. Add token management
3. Handle loading states
4. Error handling for API failures

Example:
```typescript
// Old: localStorage
const invitations = getInvitations(wisudawanId);

// New: API
const response = await fetch(`${API_URL}/invitations?wisudawanId=${wisudawanId}`);
const { data } = await response.json();
const invitations = data.invitations;
```

## 🎯 Production Checklist

- [ ] Install dependencies
- [ ] Test all endpoints locally
- [ ] Generate secure JWT_SECRET
- [ ] Deploy to Vercel
- [ ] Configure MongoDB Atlas network access
- [ ] Set production environment variables
- [ ] Initialize database on production
- [ ] Update FRONTEND_URL to production domain
- [ ] Test CORS from frontend
- [ ] Monitor logs for errors

---

**Status:** ✅ Backend API Structure Complete
**Next:** Install dependencies and test locally
