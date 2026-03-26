
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Service } from "@/models";

// GET /api/services  — fetch all active services
export async function GET() {
  try {
    await connectDB();

    const services = await Service.find({ isActive: true }).sort({ category: 1, name: 1 });

    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error("[GET /api/services]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

// POST /api/services  — create a new service (admin only)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, description, price, durationMinutes, category } = body;

    if (!name || !price || !durationMinutes || !category) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const service = await Service.create({ name, description, price, durationMinutes, category });

    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/services]", error);
    return NextResponse.json(
      { success: false, message: "Failed to create service" },
      { status: 500 }
    );
  }
}