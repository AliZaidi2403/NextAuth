import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
export const Options: NextAuthOptions = {
  providers: [
    GithubProvider({
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
        const user = { id: "42", name: "Amaan", password: "Amaan24" };
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
};
const handler = NextAuth(Options);

export { handler as GET, handler as POST };
