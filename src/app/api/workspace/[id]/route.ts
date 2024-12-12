import { NextRequest } from "next/server";
import prisma from "../../database";
import { UpdateWorkspace } from "@/schemas/workspace";

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { users, ...payload }: Partial<UpdateWorkspace> = await req.json();
  const data = await prisma.$transaction(async (db) => {
    const workspace = await db.workspace.update({
      where: { id: params.id },
      data: { ...payload },
    });
    if (users) {
      await db.workspace_User.deleteMany({
        where: { userId: { notIn: users.map((user) => parseInt(user.id)) } },
      });

      await db.workspace_User.createMany({
        data: users.map((user) => ({
          userId: parseInt(user.id),
          workspaceId: params.id,
        })),
        skipDuplicates: true,
      });
    }
    return workspace;
  });

  return Response.json(data);
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
