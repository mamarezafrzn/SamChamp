import { createAsyncThunk } from "@reduxjs/toolkit";

import type { ApiError } from "@/types/api";

/** `createAsyncThunk` whose rejected actions carry an `ApiError` payload. */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  rejectValue: ApiError;
}>();
