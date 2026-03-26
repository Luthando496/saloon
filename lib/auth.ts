// src/lib/auth.ts
// Node.js runtime only — never imported by middleware.ts

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models";
import { authConfig } from "@/lib/auth.config";

type Role = "admin" | "stylist" | "client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        await connectDB();

        const user = await User.findOne({
          email: (credentials.email as string).toLowerCase(),
        }).select("+passwordHash");

        if (!user) throw new Error("No account found with that email address.");

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!passwordMatch) throw new Error("Incorrect password.");

        return {
          id:    user._id.toString(),
          name:  user.name,
          email: user.email,
          role:  user.role as Role,
          image: user.avatarUrl || null,
        };
      },
    }),
  ],
});