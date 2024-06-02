import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { GithubProfile } from "next-auth/providers/github";

/* the OAuth flow generally has 6 parts:

1)The application requests authorization to access service resources from the user
2)If the user authorized the request, the application receives an authorization grant
3)The application requests an access token from the authorization server (API) by presenting
 authentication of its own identity, and the authorization grant
4)If the application identity is authenticated and the authorization grant is valid,
 the authorization server (API) issues an access token to the application. Authorization is complete.
5)The application requests the resource from the resource server (API) and presents the access 
token for authentication
6)If the access token is valid, the resource server (API) serves the resource to the application
*/
export const Options: NextAuthOptions = {
  providers: [
    GithubProvider({
      profile(profile: GithubProfile) {
        console.log(profile);
        //this profile will be coming from github
        //now this profile may or may not contain role property on them
        return {
          ...profile,
          role: profile.role || "user",
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username : ",
          type: "text",
          placeholder: "Your username",
        },
        password: {
          label: "Password : ",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials) {
        //this is where we retrieve the data from database to verify the credentials
        const user = {
          id: "42",
          name: "Amaan",
          password: "Amaan24",
          role: "admin",
        };
        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    //if we want to use in client components
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
};
const handler = NextAuth(Options);

export { handler as GET, handler as POST };
