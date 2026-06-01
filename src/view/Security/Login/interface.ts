export interface ILoginForm {
  email: string;
  password: string;
}

export interface ISignInUserMetadata {
  email_verified?: boolean;
  [key: string]: unknown;
}

export interface ISignInAppMetadata {
  provider?: string;
  providers?: string[];
  [key: string]: unknown;
}

export interface ISignInIdentityData {
  email?: string;
  email_verified?: boolean;
  phone_verified?: boolean;
  sub?: string;
  [key: string]: unknown;
}

export interface ISignInIdentity {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: ISignInIdentityData;
  provider: string;
  last_sign_in_at?: string;
  created_at?: string;
  updated_at?: string;
  email?: string;
}

export interface ISignInUser {
  id: string;
  aud: string;
  role?: string;
  email?: string;
  email_confirmed_at?: string;
  invited_at?: string;
  phone?: string;
  confirmed_at?: string;
  last_sign_in_at?: string;
  app_metadata: ISignInAppMetadata;
  user_metadata: ISignInUserMetadata;
  identities: ISignInIdentity[];
  created_at?: string;
  updated_at?: string;
  is_anonymous: boolean;
}

export interface ISignInWeakPassword {
  message: string;
  reasons: string[];
}

/** Supabase session object (access_token, user, etc.). */
export interface ISignInResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at?: number;
  refresh_token: string;
  user: ISignInUser;
  weak_password?: ISignInWeakPassword | null;
}
