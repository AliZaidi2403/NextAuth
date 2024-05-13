import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    console.log(name, email, password);
    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error Occurred" }, { status: 500 });
  }
}
