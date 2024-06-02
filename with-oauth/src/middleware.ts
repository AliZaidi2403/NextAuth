// Without a defined matcher, this one line applies next-auth

// to the entire project
//export { default } from "next-auth/middleware";
// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher

/*export function middleware(req: NextRequest) {
  return NextResponse.redirect(new URL("/", req.url));
}*/
import { withAuth } from "next-auth/middleware";
import type { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
//with auth will augment your request that we get in the middleware function and put the user token in the
//request object
export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    //console.log(request.nextauth.token)
    if (
      request.nextUrl.pathname.startsWith("/extra") &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
    if (
      request.nextUrl.pathname.startsWith("/client") &&
      request.nextauth.token?.role !== "admin" &&
      request.nextauth.token?.role !== "manager"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    //this middleware function is only be executed if authorize returns true
  }
);
export const config = {
  matcher: ["/extra", "/client"],
};
