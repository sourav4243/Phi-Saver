import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Set the paths that don't require authentication
const publicPaths = ["/", "/sign-in*", "/sign-up*", "/contact"];

const isPublic = (path: string) => {
  return publicPaths.some((publicPath) => {
    const pattern = new RegExp(`^${publicPath.replace("*", ".*")}$`);
    return pattern.test(path);
  });
};

export default clerkMiddleware((auth, request) => {
  const path = request.nextUrl.pathname;

  // If the path is public, allow access
  if (isPublic(path)) {
    return NextResponse.next();
  }

  // If user is signed in and trying to access the landing page,
  // redirect them to the dashboard
  if (auth.userId && path === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // For everything else, continue
  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!static|.*\\..*|_next|favicon.ico).*)",
    "/",
  ],
};