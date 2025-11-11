# API Testing Guide

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

Server akan berjalan di: http://localhost:3000

## Testing dengan cURL

### 1. Initialize Database (Run once)

```bash
curl -X POST http://localhost:3000/api/init
```

### 2. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"accessCode\": \"AYD2025\"}"
```

Save token dari response untuk request selanjutnya.

### 3. Get All Wisudawan

```bash
curl http://localhost:3000/api/wisudawan
```

### 4. Get Wisudawan by ID

```bash
curl http://localhost:3000/api/wisudawan/AYD
```

### 5. Create Invitation

```bash
curl -X POST http://localhost:3000/api/invitations \
  -H "Content-Type: application/json" \
  -d "{\"wisudawanId\": \"AYD\", \"tamu\": \"John Doe\"}"
```

### 6. Get All Invitations

```bash
curl "http://localhost:3000/api/invitations?wisudawanId=AYD"
```

### 7. Get Quota Info

```bash
curl "http://localhost:3000/api/quota?wisudawanId=AYD"
```

### 8. Validate Invitation

```bash
curl "http://localhost:3000/api/invitations/validate?wisudawanId=AYD&tamuSlug=John-Doe"
```

### 9. Delete Invitation

```bash
curl -X DELETE http://localhost:3000/api/invitations/507f1f77bcf86cd799439011
```

Replace `507f1f77bcf86cd799439011` dengan ID invitation yang valid.

## Testing dengan Postman

1. Import collection dari file `postman-collection.json` (jika ada)
2. Atau buat requests manual dengan endpoints di atas
3. Untuk endpoints yang memerlukan auth, tambahkan header:
   ```
   Authorization: Bearer <your-token>
   ```

## Common Test Scenarios

### Scenario 1: Complete Flow

1. Initialize database
2. Login dengan access code
3. Create 3 invitations
4. Get all invitations
5. Delete 1 invitation
6. Check quota

### Scenario 2: Quota Limit

1. Create 10 invitations (quota limit)
2. Try to create 11th invitation (should fail)
3. Delete 1 invitation
4. Create new invitation (should succeed)

### Scenario 3: Validation

1. Create invitation
2. Validate with correct wisudawanId and tamuSlug (should pass)
3. Validate with invalid wisudawanId (should fail)

## Environment Variables for Testing

Development:
```env
MONGODB_URI=mongodb+srv://appUser:faraziftan2005@webservice.o6kn9is.mongodb.net/?retryWrites=true&w=majority&appName=Webservice
MONGODB_DB=undangan
FRONTEND_URL=http://localhost:5173
JWT_SECRET=wisuda-ffb-2025-secret-key
```

Production:
```env
MONGODB_URI=<your-production-uri>
MONGODB_DB=undangan
FRONTEND_URL=https://your-frontend.netlify.app
JWT_SECRET=<your-secure-secret>
```
