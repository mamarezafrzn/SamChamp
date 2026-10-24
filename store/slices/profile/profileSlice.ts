import { createSlice } from "@reduxjs/toolkit";

import { toApiError } from "@/lib/api-error";
import type { ApiError } from "@/types/api";
import type { UpdateProfileRequest } from "@/types/profile";

import { loggedOut } from "../auth/authActions";
import { updateUserProfile } from "./profileActions";

interface ProfileState {
  /** Last successfully saved profile; `null` until the first save. */
  data: UpdateProfileRequest | null;
  loading: boolean;
  error: ApiError | null;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loggedOut, () => initialState)
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? toApiError(action.error);
      });
  },
});

export default profileSlice.reducer;
