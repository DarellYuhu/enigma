import { Link, Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function useWorkspace(workspaceId: string) {
  return useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => {
      const response = await fetch(`/api/workspace/${workspaceId}`);
      const data: Workspace = await response.json();
      const normalized: Normalized = data.Project.reduce<Normalized>(
        (prev, curr) => {
          const sectionId = curr.sectionId as number;
          if (!prev[sectionId]) {
            prev[sectionId] = {
              id: sectionId,
              name: curr.Section.name,
              createdAt: new Date(),
              updatedAt: new Date(),
              workspaceId: workspaceId,
              projects: [],
            };
          }
          prev[sectionId].projects.push({
            ...curr,
          });
          return prev;
        },
        {}
      );
      return { data, normalized };
    },
  });
}

type Normalized = Record<
  number,
  {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    workspaceId: string;
    projects: {
      id: string;
      title: string;
      imageUrl: string;
      description: string | null;
      createdAt: Date;
      updatedAt: Date;
      workspaceId: string;
      sectionId: number;
      gradientBgColor: string | null;
      textColor: string | null;
      Section: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        workspaceId: string;
      };
      Link: Link[];
    }[];
  }
>;

type Workspace = Prisma.WorkspaceGetPayload<{
  include: {
    Workspace_User: true;
    Project: {
      include: { Section: true; Link: true };
    };
  };
}>;
