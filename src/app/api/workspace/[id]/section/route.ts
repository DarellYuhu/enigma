import prisma from "@/app/api/database";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const workspaceId: string | null = params.id;
  const { name }: { name: string } = await req.json();

  const section = await prisma.section.create({
    data: { name, workspaceId },
  });

  return Response.json(section, { status: 201 });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const seciton = await prisma.section.findMany({
    where: { workspaceId: params.id },
  });

  return Response.json(seciton);
}
