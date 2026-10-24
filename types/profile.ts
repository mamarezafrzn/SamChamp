/** A gaming platform and the user's ID on it. */
export interface Platform {
  game_machine: string;
  game_id: string;
}

/** Body sent to the update-profile endpoint. */
export interface UpdateProfileRequest {
  firstname: string;
  lastname: string;
  birthday: string;
  team: number;
  platforms: Platform[];
}

/** A team the user can pick as their avatar. */
export interface Team {
  id: number;
  title: string;
  flag: string;
}

/** Teams grouped by league name, as returned by the teams endpoint. */
export type TeamsByLeague = Record<string, Team[]>;
