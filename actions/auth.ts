// src/actions/auth.ts
"use server";

import { signIn as nextAuthSignIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models";

// ─────────────────────────────────────────
// LOGIN
// Named "signIn" to match: import { signIn } from "@/actions/auth"
// ─────────────────────────────────────────
export async function signIn(formData: FormData) {
  const email    = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please provide both email and password." };
  }

  try {
    // NextAuth v5 signIn — redirect:false so we handle navigation ourselves
    await nextAuthSignIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // If signIn didn't throw, credentials were valid.
    // Read the role from the database so the client can redirect correctly.
    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() }).select("role");

    return { success: true, role: user?.role ?? "client" };

  } catch (error) {
    // NextAuth throws AuthError subtypes on failure
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        default:
          return { error: "Authentication failed. Please try again." };
      }
    }
    console.error("[loginUser]", error);
    return { error: "Something went wrong. Please try again." };
  }
}

// ─────────────────────────────────────────
// REGISTER
// ─────────────────────────────────────────
export async function registerUser(formData: FormData) {
  const name     = formData.get("name")     as string;
  const email    = formData.get("email")    as string;
  const phone    = formData.get("phone")    as string;
  const role     = formData.get("role")     as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Name, email and password are required." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  try {
    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return { error: "An account with that email already exists." };
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await User.create({
      name:  name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() ?? "",
      role:  role ?? "client",
      passwordHash,
    });

    return { success: true };

  } catch (error) {
    console.error("[registerUser]", error);
    return { error: "Something went wrong. Please try again." };
  }
}