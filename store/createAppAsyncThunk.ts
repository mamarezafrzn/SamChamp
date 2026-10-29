import { createAsyncThunk } from "@reduxjs/toolkit";

import type { ApiError } from "@/types/api";

import type { RootState } from "./index";

/** `createAsyncThunk` typed with our state, and rejected actions carrying an `ApiError`. */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  rejectValue: ApiError;
}>();
