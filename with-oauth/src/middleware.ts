// Without a defined matcher, this one line applies next-auth

import { NextRequest, NextResponse } from "next/server";

// to the entire project
export { default } from "next-auth/middleware";
// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher

/*export function middleware(req: NextRequest) {
  return NextResponse.redirect(new URL("/", req.url));
}*/
export const config = {
  matcher: ["/extra"],
};
