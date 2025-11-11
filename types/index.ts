// Wisudawan Interface
export interface Wisudawan {
  _id?: string;
  id: string;
  nama: string;
  gelar: string;
  prodi: string;
  inisial: string;
  accessCode: string;
  quota: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Invitation Interface
export interface Invitation {
  _id?: string;
  wisudawanId: string;
  wisudawanNama: string;
  tamu: string;
  tamuSlug: string; // name with dashes for URL
  createdAt: Date;
  updatedAt?: Date;
}

// Auth Session Interface
export interface AuthSession {
  wisudawanId: string;
  nama: string;
  gelar: string;
  prodi: string;
  inisial: string;
  quota: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginRequest {
  accessCode: string;
}

export interface LoginResponse {
  session: AuthSession;
  token: string;
}

export interface CreateInvitationRequest {
  wisudawanId: string;
  tamu: string;
}

export interface InvitationWithLink extends Invitation {
  link: string;
}

export interface QuotaInfo {
  wisudawanId: string;
  used: number;
  total: number;
  remaining: number;
}
