import { API_ROUTES } from "@/app/constants/apiRoutes";

import { createAppAsyncThunk } from "@/store/createAppAsyncThunk";

import { api } from "@/lib/api";
import { toApiError } from "@/lib/api-error";
import type { UpdateProfileRequest } from "@/types/profile";

interface UpdateProfileArgs {
  profile: UpdateProfileRequest;
  /** Set only when the user picked a different club. */
  clubId?: number;
}

/** Saves the profile (and the chosen club, if any); resolves with the saved profile. */
export const updateUserProfile = createAppAsyncThunk(
  "profile/update",
  async ({ profile, clubId }: UpdateProfileArgs, { rejectWithValue }) => {
    try {
      if (clubId !== undefined) {
        await api.put(API_ROUTES.USER.PROFILE.CLUB, { club_id: clubId });
      }
      await api.post(API_ROUTES.USER.PROFILE.UPDATE_PROFILE, profile);
      return profile;
    } catch (error) {
      return rejectWithValue(toApiError(error));
    }
  },
);
