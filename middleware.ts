// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const role = req.auth?.user?.role as string | undefined;
  const isLoggedIn = !!req.auth;
  console.log("Logged in User", req.auth?.user);
  // 1. Redirect authenticated users away from auth pages
  if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
    const redirectTo = role === "admin" ? "/dashboard" : "/appointments";
    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  // 2. Protect all other routes (require login)
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3. Role-based restrictions
  if (pathname.startsWith("/dashboard") && role !== "admin") {
    return NextResponse.redirect(new URL("/appointments", req.url));
  }

  if (pathname.startsWith("/availability") && role === "client") {
    return NextResponse.redirect(new URL("/appointments", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/appointments/:path*",
    "/availability/:path*",
    "/services/:path*",
    "/clients/:path*",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};