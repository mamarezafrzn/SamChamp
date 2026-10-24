import Cookies from "js-cookie";

export const AUTH_TOKEN_COOKIE = "authToken";

export const getAuthToken = () => Cookies.get(AUTH_TOKEN_COOKIE);

// No `expires`: the token's lifetime isn't known, so it stays a session cookie.
export const setAuthToken = (token: string) => {
  Cookies.set(AUTH_TOKEN_COOKIE, token, {
    // Secure cookies can't be set over plain http, which local development uses.
    secure: window.location.protocol === "https:",
    // Lax rather than Strict, so the cookie still arrives on a redirect back from another site.
    sameSite: "lax",
  });
};

export const removeAuthToken = () => {
  Cookies.remove(AUTH_TOKEN_COOKIE);
};
