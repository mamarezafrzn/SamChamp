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

/**
 * Splits an `ApiError` for display in a form: messages for the given fields go
 * under their inputs, and anything else becomes one form-level message.
 */
export function getFormErrors<Field extends string>(
  error: ApiError | null,
  fields: readonly Field[],
) {
  const fieldErrors: Partial<Record<Field, string>> = {};
  const otherMessages: string[] = [];

  for (const [key, message] of Object.entries(error?.fieldErrors ?? {})) {
    if (fields.includes(key as Field)) fieldErrors[key as Field] = message;
    else otherMessages.push(message);
  }

  let formError = otherMessages.join(" ");
  // Fall back to the general message only when nothing more specific was shown.
  if (error && !formError && Object.keys(fieldErrors).length === 0) {
    formError = error.message;
  }

  return { fieldErrors, formError };
}
