import {
  configureStore,
  type ThunkAction,
  type UnknownAction,
} from "@reduxjs/toolkit";

import authReducer from "./slices/auth/authSlice";
import clubsReducer from "./slices/clubs/clubsSlice";
import profileReducer from "./slices/profile/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clubs: clubsReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>;
