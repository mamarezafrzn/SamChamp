import { createAction } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

import { API_ROUTES } from "@/app/constants/apiRoutes";
import { APP_ROUTES } from "@/app/constants/appRoutes";

import type { AppThunk } from "@/store";
import { createAppAsyncThunk } from "@/store/createAppAsyncThunk";

import { api } from "@/lib/api";
import { toApiError } from "@/lib/api-error";
import { removeAuthToken, setAuthToken } from "@/lib/auth-token";
import type { ApiResponse } from "@/types/api";
import type {
  AuthData,
  LoginCredentials,
  RegisterCredentials,
} from "@/types/auth";

type AuthResponse = ApiResponse<AuthData>;

type PlatformAuthRoute =
  | typeof API_ROUTES.AUTH.GOOGLE
  | typeof API_ROUTES.AUTH.FACEBOOK
  | typeof API_ROUTES.AUTH.APPLE;

/** Waits for an auth request, saves the returned token and returns the response body. */
async function authenticate(request: Promise<AxiosResponse<AuthResponse>>) {
  const { data } = await request;
  const token = data.data.token?.access_token;
  if (token) setAuthToken(token);
  return data;
}

export const login = createAppAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      return await authenticate(
        api.post<AuthResponse>(API_ROUTES.AUTH.LOGIN, credentials),
      );
    } catch (error) {
      return rejectWithValue(toApiError(error));
    }
  },
);

export const register = createAppAsyncThunk(
  "auth/register",
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      return await authenticate(
        api.post<AuthResponse>(API_ROUTES.AUTH.REGISTER, credentials),
      );
    } catch (error) {
      return rejectWithValue(toApiError(error));
    }
  },
);

/** Logs in through a social platform (Google, Facebook or Apple). */
export const loginWithPlatform = createAppAsyncThunk(
  "auth/loginWithPlatform",
  async (route: PlatformAuthRoute, { rejectWithValue }) => {
    try {
      return await authenticate(api.get<AuthResponse>(route));
    } catch (error) {
      return rejectWithValue(toApiError(error));
    }
  },
);

/** Dispatched after the session is cleared; every slice resets on it. */
export const loggedOut = createAction("auth/loggedOut");

/** Ends the session and leaves the app for the logged-out entry page. */
export const logout = (): AppThunk => (dispatch) => {
  removeAuthToken();
  dispatch(loggedOut());
  // TODO: go to the landing page once it exists.
  window.location.assign(APP_ROUTES.AUTH.LOGIN);
};
