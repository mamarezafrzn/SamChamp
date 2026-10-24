/** Envelope the backend wraps every response body in. */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/** Body of a failed request; `data` maps field names to validation messages. */
export interface ApiErrorBody {
  message?: string;
  data?: Record<string, string>;
}

/** Normalized, serializable error that is safe to keep in Redux state. */
export interface ApiError {
  message: string;
  fieldErrors: Record<string, string>;
}
