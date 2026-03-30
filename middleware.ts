// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const role      = req.auth?.user?.role as string | undefined;
  const isLoggedIn = !!req.auth;

  // 1. Logged-in users don't need auth pages — send them home
  if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(
      new URL(role === "admin" ? "/dashboard" : "/appointments", req.url)
    );
  }

  // 2. Unauthenticated users on protected routes → login
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
  // ⚠️  /login and /register intentionally excluded from matcher.
  // Including them caused an infinite loop:
  //   /login → isLoggedIn=false → redirect /login → /login → ∞
  matcher: [
    "/dashboard/:path*",
    "/appointments/:path*",
    "/availability/:path*",
    "/services/:path*",
    "/clients/:path*",
    "/profile/:path*",
  ],
};