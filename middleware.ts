// middleware.ts  (project root)
// Runs on the Edge — must only import from auth.config, never from lib/auth.ts

import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const role      = req.auth?.user?.role as string | undefined;
  const isLoggedIn = !!req.auth;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

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
  ],
};