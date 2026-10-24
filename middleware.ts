import { NextResponse, type NextRequest } from "next/server";

import { APP_ROUTES } from "@/app/constants/appRoutes";

import { AUTH_TOKEN_COOKIE } from "@/lib/auth-token";

/**
 * Routes users by session before a page renders:
 * `/` goes to the profile or login, `/profile` requires a session,
 * and `/auth` pages are only for logged-out users.
 */
export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has(AUTH_TOKEN_COOKIE);
  const { pathname } = request.nextUrl;
  const redirectTo = (path: string) =>
    NextResponse.redirect(new URL(path, request.url));

  // TODO: once `/` is the landing page, only redirect logged-in users here.
  if (pathname === "/") {
    return redirectTo(
      isLoggedIn ? APP_ROUTES.PROFILE.EDIT_ACCOUNT : APP_ROUTES.AUTH.LOGIN,
    );
  }
  if (!isLoggedIn && pathname.startsWith("/profile")) {
    return redirectTo(APP_ROUTES.AUTH.LOGIN);
  }
  if (isLoggedIn && pathname.startsWith("/auth")) {
    return redirectTo(APP_ROUTES.PROFILE.EDIT_ACCOUNT);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile/:path*", "/auth/:path*"],
};
