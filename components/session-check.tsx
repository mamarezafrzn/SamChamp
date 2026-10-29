"use client";

import { useEffect } from "react";

import { API_ROUTES } from "@/app/constants/apiRoutes";

import { api } from "@/lib/api";

/**
 * Confirms with the backend that the saved token is still valid. The middleware
 * only knows a token exists; if this request gets a 401, the API client clears
 * the token and sends the user to login. Renders nothing.
 */
export default function SessionCheck() {
  useEffect(() => {
    api.get(API_ROUTES.USER.PROFILE.GET_PROFILE).catch(() => {
      // A 401 is handled in lib/api.ts. Other failures (e.g. offline) aren't
      // proof the session is invalid, so the user stays logged in.
    });
  }, []);

  return null;
}
