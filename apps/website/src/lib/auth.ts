import prisma from "@/app/api/database";
import loginSchema from "@/schemas/auth/loginSchema";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      displayName: string;
      role: Role;
      createdAt: Date;
      updatedAt: Date;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      // @ts-ignore
      async authorize(credentials) {
        const { username, password } = await loginSchema.parseAsync(
          credentials
        );
        const userPayload = await prisma.user.findUnique({
          where: { username },
        });
        if (!userPayload) return null;
        const valid = await bcrypt.compare(password, userPayload.password);
        if (!valid) return null;
        const { password: _, ...user } = userPayload;
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // @ts-ignore
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
