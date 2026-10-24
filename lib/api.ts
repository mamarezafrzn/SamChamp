import axios from "axios";

import { APP_ROUTES } from "@/app/constants/appRoutes";

import { getAuthToken, removeAuthToken } from "./auth-token";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/** Shared HTTP client for all backend requests. */
export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Read the token on every request so a login takes effect without a reload.
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// A 401 on a request that carried a token means the session is no longer valid.
// Without this, the middleware would keep sending the user to pages that can't load.
// (A 401 without a token, e.g. wrong login details, is left to the caller.)
api.interceptors.response.use(undefined, (error) => {
  if (
    axios.isAxiosError(error) &&
    error.response?.status === 401 &&
    error.config?.headers?.Authorization
  ) {
    removeAuthToken();
    // A full page load also resets the Redux state.
    window.location.assign(APP_ROUTES.AUTH.LOGIN);
  }
  return Promise.reject(error);
});
