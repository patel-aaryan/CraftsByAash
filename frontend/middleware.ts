import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authRoutes, protectedRoutes } from "@/utils/constants";

function checkRoute(
  sessionToken: string | undefined,
  signInCondition: boolean,
  pathname: string,
  routes: string[],
) {
  const isSignedIn = !!sessionToken;
  const isRouteMatched = routes.includes(pathname);

  if (signInCondition) return isSignedIn && isRouteMatched;

  if (!signInCondition) return !isSignedIn && isRouteMatched;

  return false;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionToken = request.cookies.get("next-auth.session-token")?.value;

  if (checkRoute(sessionToken, true, pathname, authRoutes)) {
    const shopUrl = new URL("/shop", request.url);
    return NextResponse.redirect(shopUrl);
  }

  if (checkRoute(sessionToken, false, pathname, protectedRoutes)) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/reset", "/cart", "/checkout", "/settings"],
};
