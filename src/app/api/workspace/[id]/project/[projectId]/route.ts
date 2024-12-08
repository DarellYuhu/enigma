import prisma from "@/app/api/database";
import { NextRequest } from "next/server";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string; projectId: string } }
) {
  await prisma.project.delete({
    where: { id: params.projectId, workspaceId: params.id },
  });

  return new Response(null, { status: 204 });
}
