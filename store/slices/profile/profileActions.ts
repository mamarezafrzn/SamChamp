import { API_ROUTES } from "@/app/constants/apiRoutes";

import { createAppAsyncThunk } from "@/store/createAppAsyncThunk";

import { api } from "@/lib/api";
import { toApiError } from "@/lib/api-error";
import type { UpdateProfileRequest } from "@/types/profile";

/** Saves the profile and, on success, resolves with the values that were saved. */
export const updateUserProfile = createAppAsyncThunk(
  "profile/update",
  async (profile: UpdateProfileRequest, { rejectWithValue }) => {
    try {
      await api.post(API_ROUTES.USER.PROFILE.UPDATE_PROFILE, profile);
      return profile;
    } catch (error) {
      return rejectWithValue(toApiError(error));
    }
  },
);
