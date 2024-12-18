import * as bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import prisma from "../../database";

export async function POST(request: Request) {
  const payload: Prisma.UserCreateInput = await request.json();
  const password = await bcrypt.hash(payload.password, 10);
  const user = await prisma.user.create({
    data: { ...payload, password },
    omit: {
      password: true,
    },
  });
  return Response.json(user);
}

export async function GET() {
  const users = await prisma.user.findMany({
    omit: {
      password: true,
    },
  });
  return Response.json(users);
}
