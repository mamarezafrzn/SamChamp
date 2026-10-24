import axios from "axios";

import { getAuthToken } from "./auth-token";

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
