import { NextRequest } from "next/server";
import prisma from "../../database";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const workspaces = await prisma.workspace.findUnique({
    where: { id: params.id },
    include: {
      Project: {
        include: {
          Section: true,
          Link: true,
        },
      },
    },
  });
  return Response.json(workspaces);
}
