import { NextResponse, type NextRequest } from "next/server";

import { APP_ROUTES } from "@/app/constants/appRoutes";

import { AUTH_TOKEN_COOKIE } from "@/lib/auth-token";

/** Pages that need a session. */
const PROTECTED_PREFIXES = ["/home", "/profile"];

/**
 * Routes users by session before a page renders:
 * `/` goes to home or login, protected pages require a session,
 * and `/auth` pages are only for logged-out users.
 */
export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has(AUTH_TOKEN_COOKIE);
  const { pathname } = request.nextUrl;
  const redirectTo = (path: string) =>
    NextResponse.redirect(new URL(path, request.url));

  // TODO: once `/` is the landing page, only redirect logged-in users here.
  if (pathname === "/") {
    return redirectTo(isLoggedIn ? APP_ROUTES.HOME : APP_ROUTES.AUTH.LOGIN);
  }
  if (
    !isLoggedIn &&
    PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  ) {
    return redirectTo(APP_ROUTES.AUTH.LOGIN);
  }
  if (isLoggedIn && pathname.startsWith("/auth")) {
    return redirectTo(APP_ROUTES.HOME);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home/:path*", "/profile/:path*", "/auth/:path*"],
};
