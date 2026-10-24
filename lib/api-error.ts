import { isAxiosError } from "axios";

import type { ApiError, ApiErrorBody } from "@/types/api";

/** Converts anything thrown by a request into an `ApiError`. */
export function toApiError(error: unknown): ApiError {
  if (isAxiosError<ApiErrorBody>(error)) {
    return {
      message: error.response?.data?.message ?? error.message,
      fieldErrors: error.response?.data?.data ?? {},
    };
  }
  return { message: "Something went wrong", fieldErrors: {} };
}
