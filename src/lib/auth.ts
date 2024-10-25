import prisma from "@/app/api/database";
import loginSchema from "@/schemas/auth/loginSchema";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";

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
        const user = await prisma.user.findUnique({
          where: { username },
        });
        if (!user) return null;
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;
        else {
          const { password, ...rest } = user;
          return rest;
        }
      },
    }),
  ],
});
