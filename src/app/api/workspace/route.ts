import WorkspaceSchema from "@/schemas/workspace";
import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "../database";

export async function POST(req: NextRequest) {
  const { name, users, description }: z.infer<typeof WorkspaceSchema.create> =
    await req.json();
  const workspace = await prisma.workspace.create({
    data: {
      name,
      description,
      Workspace_User: {
        createMany: {
          data: users.map((user) => ({ userId: parseInt(user.id) })),
          skipDuplicates: true,
        },
      },
    },
    include: {
      Workspace_User: true,
    },
  });
  return Response.json(workspace, { status: 201 });
}

export async function GET(_req: NextRequest) {
  const workspaces = await prisma.workspace.findMany({
    include: {
      Workspace_User: {
        include: {
          User: {
            omit: {
              password: true,
              role: true,
            },
          },
        },
      },
    },
  });

  const normalize = workspaces.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    users: item.Workspace_User.map((item) => ({
      id: item.userId,
      displayName: item.User.displayName,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    })),
  }));

  return Response.json(normalize);
}
