import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { connect } from "@/lib/dbConnect";
import NextAuth from "next-auth/next";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await connect();
        const { email, password } = credentials;
        try {
          const user = await User.findOne({
            email,
          });
          if (!user) {
            throw new Error("User with email does not exist");
          }
          if (!user.isVerified) {
            throw new Error("Please verify your account first");
          }
          const isPasswordConnect = await bcrypt.compare(
            password,
            user.password
          );
          if (isPasswordConnect) {
            return user;
          } else {
            throw new Error("Incorrect Password");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      //user here is coming from authorize function in credentials
      if (user) {
        token._id = user?._id?.toString();
        token.isVerified = user?.isVerfied;
        token.isAcceptingMessagges = user?.isAcceptingMessages;
        token.email = user?.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id as string;
        session.user.isVerfied = token.isVerified as boolean;
        session.user.isAcceptingMessages = token.isAcceptingMessages as boolean;
        session.user.username = token.email as string;
      }
      return session;
    },
  },
};
//here we have put all our data in both token and session, by this we wouldnt need to call database again
//and again

const handler = NextAuth(authOptions);
export { handler as get, handler as POST };
