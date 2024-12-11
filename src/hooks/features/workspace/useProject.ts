import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

type Payload = {
  workspaceId: string;
  projectId: string;
  enabled: boolean;
};
export default function useProject(payload: Payload) {
  return useQuery({
    queryKey: ["workspace", "project", payload.projectId],
    enabled: payload.enabled,
    queryFn: async () => {
      const response = await fetch(
        `/api/workspace/${payload.workspaceId}/project/${payload.projectId}`
      );
      const data: Data = await response.json();
      return data;
    },
  });
}

type Data = Prisma.ProjectGetPayload<{ include: { Link: true } }>;
