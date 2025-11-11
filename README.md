# Backend API - Undangan Wisuda

Backend API untuk sistem undangan wisuda menggunakan Next.js dan MongoDB Atlas.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** MongoDB Atlas
- **Deployment:** Vercel / Railway

## 📁 Struktur Project

```
backend-undangan/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts       # POST login
│   │   │   └── session/route.ts     # GET verify session
│   │   ├── wisudawan/
│   │   │   ├── route.ts             # GET all wisudawan
│   │   │   └── [id]/route.ts        # GET wisudawan by ID
│   │   ├── invitations/
│   │   │   ├── route.ts             # GET/POST invitations
│   │   │   ├── [id]/route.ts        # DELETE invitation
│   │   │   └── validate/route.ts    # GET validate link
│   │   ├── quota/route.ts           # GET quota info
│   │   └── init/route.ts            # POST initialize DB
│   ├── layout.tsx
│   └── page.tsx                     # API documentation page
├── lib/
│   ├── mongodb.ts                   # MongoDB connection
│   └── utils.ts                     # Helper functions
├── models/
│   ├── Wisudawan.ts                 # Wisudawan model
│   └── Invitation.ts                # Invitation model
├── types/
│   └── index.ts                     # TypeScript types
├── .env                             # Environment variables
├── .env.example                     # Environment template
├── next.config.js
├── tsconfig.json
└── package.json
```

## 🔧 Setup & Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

File `.env` sudah dibuat dengan konfigurasi:

```env
MONGODB_URI=mongodb+srv://appUser:faraziftan2005@webservice.o6kn9is.mongodb.net/?retryWrites=true&w=majority&appName=Webservice
MONGODB_DB=undangan
FRONTEND_URL=http://localhost:5173
JWT_SECRET=wisuda-ffb-2025-secret-key
```

### 3. Initialize Database

Jalankan endpoint ini sekali untuk mengisi data wisudawan default:

```bash
# Development
npm run dev

# Kemudian buka browser atau gunakan Postman:
POST http://localhost:3000/api/init
```

### 4. Run Development Server

```bash
npm run dev
```

API akan berjalan di: `http://localhost:3000`

## 📚 API Endpoints

### 🔐 Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "accessCode": "AYD2025"
}

Response:
{
  "success": true,
  "data": {
    "session": {
      "wisudawanId": "AYD",
      "nama": "Andika Yoga Dwipangestu",
      "gelar": "S.Tr.Kom.",
      "prodi": "D4 Teknologi Rekayasa Perangkat Lunak",
      "inisial": "AYD",
      "quota": 10
    },
    "token": "eyJ3aXN1ZGF3YW5JZCI6..."
  },
  "message": "Login successful"
}
```

#### Verify Session
```http
GET /api/auth/session
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "wisudawanId": "AYD",
    "nama": "Andika Yoga Dwipangestu",
    ...
  }
}
```

### 👨‍🎓 Wisudawan

#### Get All Wisudawan
```http
GET /api/wisudawan

Response:
{
  "success": true,
  "data": [
    {
      "id": "AYD",
      "nama": "Andika Yoga Dwipangestu",
      "gelar": "S.Tr.Kom.",
      "prodi": "D4 Teknologi Rekayasa Perangkat Lunak",
      "inisial": "AYD",
      "quota": 10
    },
    ...
  ]
}
```

#### Get Wisudawan by ID
```http
GET /api/wisudawan/AYD

Response:
{
  "success": true,
  "data": {
    "id": "AYD",
    "nama": "Andika Yoga Dwipangestu",
    ...
  }
}
```

### 📧 Invitations

#### Get All Invitations
```http
GET /api/invitations?wisudawanId=AYD

Response:
{
  "success": true,
  "data": {
    "invitations": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "wisudawanId": "AYD",
        "wisudawanNama": "Andika Yoga Dwipangestu",
        "tamu": "John Doe",
        "tamuSlug": "John-Doe",
        "link": "http://localhost:5173/i/AYD/John-Doe",
        "createdAt": "2025-11-12T10:00:00.000Z"
      }
    ],
    "quota": {
      "used": 1,
      "total": 10,
      "remaining": 9
    }
  }
}
```

#### Create Invitation
```http
POST /api/invitations
Content-Type: application/json

{
  "wisudawanId": "AYD",
  "tamu": "John Doe"
}

Response:
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "wisudawanId": "AYD",
    "tamu": "John Doe",
    "tamuSlug": "John-Doe",
    "link": "http://localhost:5173/i/AYD/John-Doe",
    "createdAt": "2025-11-12T10:00:00.000Z"
  },
  "message": "Invitation created successfully"
}
```

#### Delete Invitation
```http
DELETE /api/invitations/507f1f77bcf86cd799439011

Response:
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011"
  },
  "message": "Invitation deleted successfully"
}
```

#### Validate Invitation Link
```http
GET /api/invitations/validate?wisudawanId=AYD&tamuSlug=John-Doe

Response:
{
  "success": true,
  "data": {
    "valid": true,
    "wisudawan": {
      "id": "AYD",
      "nama": "Andika Yoga Dwipangestu",
      "gelar": "S.Tr.Kom.",
      ...
    }
  },
  "message": "Invitation is valid"
}
```

### 📊 Quota

#### Get Quota Info
```http
GET /api/quota?wisudawanId=AYD

Response:
{
  "success": true,
  "data": {
    "wisudawanId": "AYD",
    "used": 3,
    "total": 10,
    "remaining": 7
  }
}
```

### ⚙️ Admin

#### Initialize Database
```http
POST /api/init

Response:
{
  "success": true,
  "message": "Database initialized successfully"
}
```

## 🗄️ Database Schema

### Collection: `wisudawan`
```json
{
  "_id": ObjectId,
  "id": "AYD",
  "nama": "Andika Yoga Dwipangestu",
  "gelar": "S.Tr.Kom.",
  "prodi": "D4 Teknologi Rekayasa Perangkat Lunak",
  "inisial": "AYD",
  "accessCode": "AYD2025",
  "quota": 10,
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### Collection: `invitations`
```json
{
  "_id": ObjectId,
  "wisudawanId": "AYD",
  "wisudawanNama": "Andika Yoga Dwipangestu",
  "tamu": "John Doe",
  "tamuSlug": "John-Doe",
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

## 🌐 CORS Configuration

API sudah dikonfigurasi untuk menerima request dari frontend. Update `FRONTEND_URL` di `.env` sesuai URL frontend Anda:

- Development: `http://localhost:5173`
- Production: `https://your-frontend-domain.netlify.app`

## 🚀 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables di Vercel dashboard:
   - `MONGODB_URI`
   - `MONGODB_DB`
   - `FRONTEND_URL`
   - `JWT_SECRET`

4. Setelah deploy, jangan lupa jalankan initialize endpoint:
```bash
POST https://your-backend.vercel.app/api/init
```

## 🔒 Security Notes

- Ubah `JWT_SECRET` di production dengan string yang lebih secure
- Access codes disimpan di database, tidak di-expose di API responses
- Token expire setelah 24 jam
- Input validation ada di setiap endpoint

## 📝 Development Notes

### Default Wisudawan Data

10 wisudawan dengan access codes:
- AYD2025, DSS2025, DHT2025, FIF2025, FTZ2025
- RHS2025, RBH2025, SMK2025, VNA2025, VRD2025

Setiap wisudawan punya quota 10 undangan.

### Link Format

Frontend invitation link format: `/i/:wisudawanId/:tamu-slug`

Contoh: `/i/AYD/John-Doe`

## 🛠️ Troubleshooting

### MongoDB Connection Error

Pastikan IP address Anda sudah ditambahkan di MongoDB Atlas Network Access.

### CORS Error

Update `FRONTEND_URL` di `.env` dengan URL frontend yang benar.

### Cannot find module 'next'

Run `npm install` untuk install dependencies.

## 📞 Support

Untuk issues atau pertanyaan, silakan buka issue di repository ini.

---

**Dibuat untuk Wisuda FFB 2025** 🎓