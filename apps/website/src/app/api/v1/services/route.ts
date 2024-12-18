import { Type } from "@prisma/client";
import prisma from "../../database";
import { auth } from "@/lib/auth";

export const PUT = auth(async function PUT(req) {
  if (req.auth?.user.role !== "ADMIN")
    return Response.json({ message: "Unauthorized" }, { status: 403 });
  const payload: Payload = await req.json();
  const services = await Promise.all(
    payload.map((item) => {
      return prisma.apiUrl.upsert({
        create: item,
        update: item,
        where: {
          id: item.id,
        },
      });
    })
  );

  return Response.json(services);
});

export const GET = auth(async function GET(req) {
  if (req.auth?.user.role !== "ADMIN")
    return Response.json({ message: "Unauthorized" }, { status: 403 });
  const services = await prisma.apiUrl.findMany();
  return Response.json(services);
});

type Payload = {
  id: "youtube" | "tiktok" | "twitter";
  url: string;
  type: Type;
}[];
