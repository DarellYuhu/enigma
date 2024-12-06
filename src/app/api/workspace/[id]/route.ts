import { NextRequest } from "next/server";
import prisma from "../../database";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const workspaces = await prisma.workspace.findUnique({
    where: { id: params.id },
    include: {
      Workspace_User: true,
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

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.workspace.delete({
    where: { id: params.id },
  });

  return new Response(null, { status: 204 });
}
