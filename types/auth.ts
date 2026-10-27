/** Body sent to the login endpoint. */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** Body sent to the register endpoint. */
export interface RegisterCredentials extends LoginCredentials {
  password_confirmation: string;
}

/** The logged-in user, as returned by the login endpoint. */
export interface User {
  id: number;
  name: string;
  email: string;
  profile: {
    avatar: string | null;
    bio: string;
    meta: unknown;
    extra_fields: unknown[];
  };
  created_at: string;
  updated_at: string;
}

/** Body of a successful login. */
export interface AuthResponse {
  user: User;
  token: string;
}
