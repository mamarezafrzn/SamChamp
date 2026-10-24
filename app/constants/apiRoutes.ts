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
      UPDATE_PROFILE: "api/update-profile",
    },
    TEAMS: "api/teams/grouped-by-league",
  },
} as const;
