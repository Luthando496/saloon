import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const role = req.auth?.user?.role as string | undefined;
  const isLoggedIn = !!req.auth;

  // Not logged in — redirect to login
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Admin-only routes
  if (pathname.startsWith("/dashboard") && role !== "admin") {
    return NextResponse.redirect(new URL("/appointments", req.url));
  }

  // Stylist + admin only
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