import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

// Set the paths that don't require authentication
const publicPaths = ["/", "/sign-in*", "/sign-up*", "/contact"];

const isPublic = (path: string) => {
  return publicPaths.some((publicPath) => {
    const pattern = new RegExp(`^${publicPath.replace("*", ".*")}$`);
    return pattern.test(path);
  });
};

// Create a matcher for protected routes
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/stats(.*)', '/settings(.*)']);

export default clerkMiddleware(async (auth, request) => {
  const path = request.nextUrl.pathname;
  const { userId, redirectToSignIn } = await auth();

  // If the path is public, allow access
  if (isPublic(path)) {
    // If user is signed in and trying to access the landing page,
    // redirect them to the dashboard
    if (userId && path === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Check if the route is protected and user is not authenticated
  if (!userId && isProtectedRoute(request)) {
    return redirectToSignIn();
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