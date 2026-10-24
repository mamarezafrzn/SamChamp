import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

import { toApiError } from "@/lib/api-error";
import type { ApiError, ApiResponse } from "@/types/api";
import type { AuthData } from "@/types/auth";

import { loggedOut, login, loginWithPlatform, register } from "./authActions";

interface AuthState {
  user: ApiResponse<AuthData> | null;
  loading: boolean;
  error: ApiError | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authThunks = [login, register, loginWithPlatform] as const;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loggedOut, () => initialState)
      .addMatcher(isPending(...authThunks), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isFulfilled(...authThunks), (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addMatcher(isRejected(...authThunks), (state, action) => {
        state.loading = false;
        state.error = action.payload ?? toApiError(action.error);
      });
  },
});

export default authSlice.reducer;
