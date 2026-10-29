/** A football club the user can pick as their avatar. */
export interface Club {
  id: number;
  name: string;
  /** Logo URL. In the app it points at our caching proxy (see lib/club-logos.ts). */
  logo: string;
}

/** A league and its clubs. */
export interface League {
  id: number;
  name: string;
  clubs: Club[];
}

/** Body of `GET /api/samchamp/clubs`. */
export interface ClubsResponse {
  data: League[];
  /**
   * The user's saved club; `null` until one is saved. Only `null` has been seen so
   * far, so both a club object and a bare club id are handled (see clubsActions).
   */
  selected_club: Club | number | null;
}
