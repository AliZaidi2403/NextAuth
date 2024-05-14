import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import NextAuth from "next-auth/next";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "crediantials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectDB();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            return null;
          }
          return user;
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
