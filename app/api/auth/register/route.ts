import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { name, email, phone, role, password } = await request.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    // Check for existing account
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { message: "An account with that email already exists." },
        { status: 409 }
      );
    }

    // Hash password — saltRounds: 12 is a good balance of security vs speed
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name:  name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || "",
      role:  role || "client",
      passwordHash,
    });

    // Never return the hash in the response
    return NextResponse.json(
      {
        message: "Account created successfully.",
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/auth/register]", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}