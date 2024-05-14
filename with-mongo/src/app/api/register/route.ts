import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    await connectDB();
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ name, email, password: hashedPassword });
    return NextResponse.json({
      message: "User Registered successfully",
      user: { email, name },
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", status: 500 });
  }
}
