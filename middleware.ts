import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const role = req.auth?.user?.role as string | undefined;
  const isLoggedIn = !!req.auth;

  const isAuthPage = pathname === "/login" || pathname === "/register";

  // If already logged in, keep them out of auth pages
  if (isLoggedIn && isAuthPage) {
    const target = role === "admin" ? "/dashboard" : "/appointments";
    return NextResponse.redirect(new URL(target, req.url));
  }

  // Role guards
  if (pathname.startsWith("/dashboard") && role !== "admin") {
    return NextResponse.redirect(new URL("/appointments", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/login",
    "/register",
    "/appointments",
    "/appointments/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/availability/:path*",
    "/services/:path*",
    "/clients/:path*",
    "/profile/:path*",
    "/staff/:path*",
  ],
};