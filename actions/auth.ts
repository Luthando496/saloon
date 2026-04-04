// src/actions/auth.ts
"use server";

import { signIn as nextAuthSignIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models";

// ─────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────
export async function signIn(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please provide both email and password." };
  }

  try {
    // Step 1: Let NextAuth validate credentials and create session
    const result = await nextAuthSignIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // If NextAuth returned an error
    if (result?.error) {
      return { error: "Invalid email or password." };
    }

    // Step 2: Fetch user role from DB (this is now safe because credentials passed)
    await connectDB();
    const user = await User.findOne({ email }).select("role");

    if (!user) {
      return { error: "User not found." };
    }

    return {
      success: true,
      role: user.role as "admin" | "stylist" | "client",
    };

  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Invalid email or password." };
      }
    }

    console.error("[signIn action]", error);
    return { error: "Something went wrong. Please try again." };
  }
}

// ─────────────────────────────────────────
// REGISTER (Improved a bit for consistency)
// ─────────────────────────────────────────
export async function registerUser(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const phone = (formData.get("phone") as string)?.trim() ?? "";
  const role = (formData.get("role") as string) ?? "client";
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Name, email and password are required." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  try {
    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return { error: "An account with that email already exists." };
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      phone,
      role,
      passwordHash,
    });

    return { success: true };

  } catch (error) {
    console.error("[registerUser]", error);
    return { error: "Something went wrong. Please try again." };
  }
}