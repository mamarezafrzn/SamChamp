import { createSlice } from "@reduxjs/toolkit";

import { toApiError } from "@/lib/api-error";
import type { ApiError } from "@/types/api";
import type { Club, League } from "@/types/club";

import { loggedOut } from "../auth/authActions";
import { updateUserProfile } from "../profile/profileActions";
import { fetchClubs, findClub } from "./clubsActions";

interface ClubsState {
  /** All leagues with their clubs; `null` until loaded. */
  leagues: League[] | null;
  /** The club saved on the user's profile. */
  selected: Club | null;
  loading: boolean;
  error: ApiError | null;
}

const initialState: ClubsState = {
  leagues: null,
  selected: null,
  loading: false,
  error: null,
};

const clubsSlice = createSlice({
  name: "clubs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loggedOut, () => initialState)
      .addCase(fetchClubs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClubs.fulfilled, (state, action) => {
        state.loading = false;
        state.leagues = action.payload.leagues;
        state.selected = action.payload.selected;
      })
      .addCase(fetchClubs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? toApiError(action.error);
      })
      // A profile save that included a club makes it the saved one.
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        const { clubId } = action.meta.arg;
        if (clubId !== undefined && state.leagues) {
          state.selected = findClub(state.leagues, clubId);
        }
      });
  },
});

export default clubsSlice.reducer;
