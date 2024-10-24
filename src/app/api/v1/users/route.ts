import { User } from "@prisma/client";
import prisma from "../../database";

export async function POST(request: Request) {
  const payload = await request.json();
  const user = await prisma.user.create({
    data: payload,
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
