import React from "react";
import Dock from "./components/Dock";
import MainContent from "./components/MainContent";
import { auth } from "@/lib/auth";
import prisma from "@/app/api/database";

const WorkspaceDetailPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const managers = await prisma.workspace_User.findMany({
    where: { workspaceId: params.id },
  });

  const isManager = managers.some(
    (item) => item.userId.toString() === session?.user.id
  );

  return (
    <>
      <MainContent />
      {isManager && <Dock />}
    </>
  );
};

export const dynamic = "force-dynamic";

export default WorkspaceDetailPage;
