/** Backend endpoints, relative to `NEXT_PUBLIC_API_URL`. */
export const API_ROUTES = {
  AUTH: {
    LOGIN: "api/login",
    REGISTER: "api/register",
    GOOGLE: "api/login/google",
    FACEBOOK: "api/login/facebook",
    APPLE: "api/login/apple",
  },
  USER: {
    PROFILE: {
      GET_PROFILE: "api/profile",
      UPDATE_PROFILE: "api/profile",
      /** PUT `{ club_id }` */
      CLUB: "api/samchamp/profile/club",
      /** PUT `{ hide_balance }`; for the balance eye icon on Home. */
      HIDE_BALANCE: "api/samchamp/profile/hide-balance",
    },
  },
  CLUBS: "api/samchamp/clubs",
} as const;
