import { clerkMiddleware, type ClerkMiddlewareAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicPaths = ["/"];

const isPublic = (path: string) => {
  return publicPaths.find((x) => path.startsWith(x)) !== undefined;
};

export default clerkMiddleware((auth: ClerkMiddlewareAuth, req) => {
  if (isPublic(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (auth.sessionId && req.nextUrl.pathname === "/") {
    const dashboard = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboard);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};