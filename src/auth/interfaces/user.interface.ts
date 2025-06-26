export interface User {
  id: string;
  email: string;
  email_confirmed_at?: string;
  user_metadata?: {
    firstName?: string;
    lastName?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User | null;
  session: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
  } | null;
}
