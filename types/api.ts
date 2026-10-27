/**
 * `{ data }` envelope assumed for the teams endpoint, which doesn't exist yet.
 * Not every endpoint uses it: login returns `{ user, token }` directly.
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/** Body of a failed request; `errors` maps field names to validation messages. */
export interface ApiErrorBody {
  message?: string;
  errors?: Record<string, string[]>;
}

/** Normalized, serializable error that is safe to keep in Redux state. */
export interface ApiError {
  message: string;
  fieldErrors: Record<string, string>;
}
