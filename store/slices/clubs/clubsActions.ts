import { API_ROUTES } from "@/app/constants/apiRoutes";

import { createAppAsyncThunk } from "@/store/createAppAsyncThunk";

import { api } from "@/lib/api";
import { toApiError } from "@/lib/api-error";
import { toProxiedLogo } from "@/lib/club-logos";
import type { Club, ClubsResponse, League } from "@/types/club";

/** Finds a club by id across all leagues. */
export const findClub = (leagues: League[], id: number): Club | null =>
  leagues.flatMap((league) => league.clubs).find((club) => club.id === id) ??
  null;

/** Loads all leagues with their clubs, plus the user's saved club. */
export const fetchClubs = createAppAsyncThunk(
  "clubs/fetch",
  async (_: void, { rejectWithValue }) => {
    try {
      const { data } = await api.get<ClubsResponse>(API_ROUTES.CLUBS);
      // Load logos through our caching proxy; the backend serves them slowly.
      const leagues = data.data.map((league) => ({
        ...league,
        clubs: league.clubs.map((club) => ({
          ...club,
          logo: toProxiedLogo(club.logo),
        })),
      }));
      const saved = data.selected_club;
      // Look the saved club up by id, whether the backend sends an object or a bare id.
      const savedId = typeof saved === "number" ? saved : saved?.id;
      return {
        leagues,
        selected: savedId === undefined ? null : findClub(leagues, savedId),
      };
    } catch (error) {
      return rejectWithValue(toApiError(error));
    }
  },
  // Skip if a load is already running (the page and the picker both ask for it).
  { condition: (_, { getState }) => !getState().clubs.loading },
);
