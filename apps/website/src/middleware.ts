import { MiddlewareConfig } from "next/server";
import { auth } from "./lib/auth";

export default auth((req) => {
  const url = req.nextUrl;
  const pathname = req.nextUrl.pathname;
  const hasError = pathname === "/sign-in" && url.searchParams.has("error");
  if (!req.auth && !hasError && pathname !== "/sign-in") {
    const newUrl = new URL(
      `/sign-in?callbackUrl=${encodeURIComponent(pathname)}`,
      req.nextUrl.origin
    );
    return Response.redirect(newUrl);
  }
  if (
    (pathname === "/accounts" || pathname === "/services") &&
    req.auth?.user.role !== "ADMIN"
  ) {
    const newUrl = new URL("/forbidden", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|login-bg.jpg|logo.jpg|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
