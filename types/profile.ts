/** A gaming platform and the user's ID on it. */
export interface Platform {
  game_machine: string;
  game_id: string;
}

/** A free-form profile value the backend stores by `key`. */
export interface ExtraField {
  /** `null` when sending a new value. */
  id: number | null;
  key: string;
  type: string;
  value: string;
}

/** Body sent to `POST /api/profile`. `bio` and `avatar` are optional and not sent yet. */
export interface UpdateProfileRequest {
  name: string;
  phone: string;
  extraFields: ExtraField[];
}
