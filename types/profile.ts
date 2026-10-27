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

/** A team the user can pick as their avatar. */
export interface Team {
  id: number;
  title: string;
  flag: string;
}

/** Teams grouped by league name, as returned by the teams endpoint. */
export type TeamsByLeague = Record<string, Team[]>;
