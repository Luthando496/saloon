// src/lib/auth.config.ts
// ⚠️  This file must NEVER import Mongoose, bcrypt, or any Node.js module.
//     It is imported by middleware.ts which runs on the Edge runtime.

import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
    error:  "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    // Runs on the Edge — JWT only, no DB calls
    authorized({ auth }) {
      return !!auth?.user;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id;
        token.role = (user as { role: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id   = token.id   as string;
        session.user.role = token.role as "admin" | "stylist" | "client";
      }
      return session;
    },
  },
  providers: [], // Empty — providers need Node.js and are added in lib/auth.ts
};