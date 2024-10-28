import prisma from "@/app/api/database";
import loginSchema from "@/schemas/auth/loginSchema";
import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as bcrypt from "bcryptjs";
import { User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: Omit<User, "password">;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, request) {
        const { username, password } = await loginSchema.parseAsync(
          credentials
        );
        const userPayload = await prisma.user.findUnique({
          where: { username },
        });
        if (!userPayload) return null;
        const valid = await bcrypt.compare(password, userPayload.password);
        if (!valid) return null;
        const { password: huhi, ...user } = userPayload;
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
});
