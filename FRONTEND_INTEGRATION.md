# Frontend Integration Guide

Panduan untuk mengintegrasikan frontend (graduation-invitation) dengan backend API.

## 🔄 Migration Overview

Migrasi dari localStorage ke Backend API:

| Feature | Before (localStorage) | After (API) |
|---------|---------------------|-------------|
| Authentication | Access code check | POST /api/auth/login |
| Session | localStorage | Token + API validation |
| Get Invitations | getInvitations() | GET /api/invitations |
| Create Invitation | saveInvitation() | POST /api/invitations |
| Delete Invitation | deleteInvitation() | DELETE /api/invitations/:id |
| Quota | localStorage | GET /api/quota |
| Validation | wisudawan check | GET /api/invitations/validate |

## 📝 Step-by-Step Migration

### 1. Create API Configuration

**File:** `src/config/api.ts`

```typescript
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://your-backend.vercel.app/api'  // Update with your backend URL
  : 'http://localhost:3000/api';

export default API_BASE_URL;
```

### 2. Create API Service Layer

**File:** `src/services/api.ts`

```typescript
import API_BASE_URL from '@/config/api';

// Token management
export const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('auth_token');
};

// API helper
const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }

  return data;
};

// Authentication API
export const authAPI = {
  login: async (accessCode: string) => {
    const response = await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ accessCode }),
    });
    
    // Store token
    if (response.success && response.data.token) {
      setToken(response.data.token);
    }
    
    return response.data;
  },

  verifySession: async () => {
    const response = await fetchAPI('/auth/session');
    return response.data;
  },

  logout: () => {
    removeToken();
  },
};

// Wisudawan API
export const wisudawanAPI = {
  getAll: async () => {
    const response = await fetchAPI('/wisudawan');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await fetchAPI(`/wisudawan/${id}`);
    return response.data;
  },
};

// Invitations API
export const invitationsAPI = {
  getAll: async (wisudawanId: string) => {
    const response = await fetchAPI(`/invitations?wisudawanId=${wisudawanId}`);
    return response.data;
  },

  create: async (wisudawanId: string, tamu: string) => {
    const response = await fetchAPI('/invitations', {
      method: 'POST',
      body: JSON.stringify({ wisudawanId, tamu }),
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await fetchAPI(`/invitations/${id}`, {
      method: 'DELETE',
    });
    return response.data;
  },

  validate: async (wisudawanId: string, tamuSlug: string) => {
    const response = await fetchAPI(
      `/invitations/validate?wisudawanId=${wisudawanId}&tamuSlug=${tamuSlug}`
    );
    return response.data;
  },
};

// Quota API
export const quotaAPI = {
  get: async (wisudawanId: string) => {
    const response = await fetchAPI(`/quota?wisudawanId=${wisudawanId}`);
    return response.data;
  },
};
```

### 3. Update Login Component

**File:** `src/components/LoginPage.tsx`

Replace:
```typescript
// OLD
const wisudawan = validateAccessCode(accessCode);
if (wisudawan) {
  onLogin(wisudawan);
}
```

With:
```typescript
// NEW
import { authAPI } from '@/services/api';

try {
  setLoading(true);
  const { session } = await authAPI.login(accessCode);
  onLogin(session);
} catch (error) {
  setError('Kode akses tidak valid');
} finally {
  setLoading(false);
}
```

### 4. Update GeneratorPage Component

**File:** `src/components/GeneratorPage.tsx`

Replace localStorage calls with API calls:

```typescript
import { invitationsAPI, quotaAPI } from '@/services/api';

// On component mount
useEffect(() => {
  loadInvitations();
}, [wisudawan.wisudawanId]);

const loadInvitations = async () => {
  try {
    setLoading(true);
    const data = await invitationsAPI.getAll(wisudawan.wisudawanId);
    setInvitations(data.invitations);
    setQuota(data.quota);
  } catch (error) {
    console.error('Failed to load invitations:', error);
  } finally {
    setLoading(false);
  }
};

// Create invitation
const handleGenerateLink = async () => {
  try {
    setGenerating(true);
    const invitation = await invitationsAPI.create(wisudawan.wisudawanId, tamu);
    
    // Auto-copy link
    await copyToClipboard(invitation.link);
    
    // Reload invitations
    await loadInvitations();
    
    setTamu('');
    showToast('Link berhasil dibuat dan disalin!');
  } catch (error) {
    showToast(error.message);
  } finally {
    setGenerating(false);
  }
};

// Delete invitation
const handleDelete = async (id: string) => {
  if (!confirm('Yakin ingin menghapus undangan ini?')) return;
  
  try {
    await invitationsAPI.delete(id);
    await loadInvitations();
    showToast('Undangan berhasil dihapus');
  } catch (error) {
    showToast('Gagal menghapus undangan');
  }
};
```

### 5. Update InvitePage Component

**File:** `src/components/InvitePage.tsx`

```typescript
import { invitationsAPI } from '@/services/api';

useEffect(() => {
  validateInvitation();
}, [id]);

const validateInvitation = async () => {
  try {
    const tamuSlug = name; // from URL params
    const data = await invitationsAPI.validate(id, tamuSlug);
    
    if (data.valid) {
      setWisudawan(data.wisudawan);
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
  } catch (error) {
    setIsInvalid(true);
  }
};
```

### 6. Update App.tsx

```typescript
import { authAPI } from '@/services/api';

// Session check on mount
useEffect(() => {
  checkSession();
}, []);

const checkSession = async () => {
  const token = getToken();
  if (!token) return;
  
  try {
    const session = await authAPI.verifySession();
    setCurrentPage('generator');
    setLoggedInWisudawan(session);
  } catch (error) {
    // Token expired or invalid
    authAPI.logout();
  }
};

// Logout handler
const handleLogout = () => {
  authAPI.logout();
  setCurrentPage('landing');
  setLoggedInWisudawan(null);
};
```

### 7. Remove Old Storage Files (Optional)

Once migration is complete, you can remove:
- `src/utils/storage.ts` (no longer needed)
- Or keep it for reference/fallback

### 8. Add Loading States

Add loading spinners for API calls:

```typescript
{loading ? (
  <LoadingSpinner />
) : (
  // Your content
)}
```

### 9. Add Error Handling

```typescript
try {
  // API call
} catch (error) {
  if (error.message.includes('Quota limit')) {
    showToast('Kuota undangan sudah habis!');
  } else if (error.message.includes('already exists')) {
    showToast('Undangan untuk tamu ini sudah ada!');
  } else {
    showToast('Terjadi kesalahan. Coba lagi.');
  }
}
```

## 🧪 Testing Migration

### Test Checklist:

- [ ] Login works with valid access code
- [ ] Login fails with invalid access code
- [ ] Session persists on page refresh
- [ ] Logout clears session
- [ ] Can view invitation list
- [ ] Can create new invitation
- [ ] Can delete invitation
- [ ] Quota updates correctly
- [ ] Cannot exceed quota
- [ ] Cannot create duplicate invitation
- [ ] Public invitation page loads correctly
- [ ] Invalid invitation shows error page

## 🐛 Common Issues

### CORS Error
**Problem:** Frontend can't access backend API
**Solution:** Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL

### 401 Unauthorized
**Problem:** Token expired or invalid
**Solution:** Implement auto-logout and redirect to login

### Network Error
**Problem:** Backend not running
**Solution:** Ensure backend is running on correct port

### Quota Not Updating
**Problem:** Quota count incorrect
**Solution:** Reload invitations after create/delete operations

## 🚀 Deployment Notes

1. Deploy backend first to Vercel
2. Get backend URL (e.g., `https://backend-undangan.vercel.app`)
3. Update `src/config/api.ts` with production URL
4. Deploy frontend to Netlify
5. Update backend `FRONTEND_URL` with Netlify URL
6. Test end-to-end

## 📊 Performance Tips

- Add caching for wisudawan data (rarely changes)
- Debounce search/filter operations
- Use optimistic UI updates for better UX
- Add retry logic for failed requests
- Show loading states for all async operations

## 🔐 Security Notes

- Never expose tokens in console logs in production
- Implement token refresh if needed
- Validate all user inputs before sending to API
- Handle sensitive data carefully

---

**Next Steps:**
1. Create `src/config/api.ts`
2. Create `src/services/api.ts`
3. Update components one by one
4. Test thoroughly
5. Deploy

**Estimated Time:** 2-3 hours for complete migration
