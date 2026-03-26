"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

/**
 * useAuth — thin wrapper around useSession.
 *
 * Usage:
 *   const { user, isLoading, isAdmin, logout } = useAuth();
 *
 * The hook re-exports everything from useSession so you never
 * need to import useSession directly in your components.
 */
export function useAuth() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const isLoading       = status === "loading";
  const isAuthenticated = status === "authenticated";

  const user    = session?.user ?? null;
  const isAdmin   = user?.role === "admin";
  const isStylist = user?.role === "stylist";
  const isClient  = user?.role === "client";

  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return {
    user,
    session,
    status,
    isLoading,
    isAuthenticated,
    isAdmin,
    isStylist,
    isClient,
    logout,
    updateSession: update, // call this after updating profile to refresh session data
  };
}