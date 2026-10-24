/** Body sent to the login endpoint. */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** Body sent to the register endpoint. */
export interface RegisterCredentials extends LoginCredentials {
  password_confirmation: string;
}

/** `data` payload returned by a successful login or register. */
export interface AuthData {
  token?: {
    access_token: string;
  };
}
