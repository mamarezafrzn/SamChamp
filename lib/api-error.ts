import { isAxiosError } from "axios";

import type { ApiError, ApiErrorBody } from "@/types/api";

/** Converts anything thrown by a request into an `ApiError`. */
export function toApiError(error: unknown): ApiError {
  if (isAxiosError<ApiErrorBody>(error)) {
    const body = error.response?.data;
    // The backend sends a list per field; show the first, like client-side validation does.
    const fieldErrors = Object.fromEntries(
      Object.entries(body?.errors ?? {}).map(([field, messages]) => [
        field,
        messages[0],
      ]),
    );
    return { message: body?.message ?? error.message, fieldErrors };
  }
  // Not a request failure, so it's a bug in our code: keep it visible to developers.
  console.error(error);
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
