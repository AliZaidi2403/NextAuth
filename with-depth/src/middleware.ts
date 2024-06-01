import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl;
  if (token && url.pathname.startsWith("/sign-in")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}

export const config = {
  matcher: ["/sign-in", "/dashboard/:path*"],
};
