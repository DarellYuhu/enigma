import { getBoards } from "@/api/tiktokApi";
import { useQuery } from "@tanstack/react-query";

export function useTiktokBoards({
  projectId,
  from,
  to,
  string,
}: {
  projectId: string;
  from?: Date;
  to?: Date;
  string: string;
}) {
  return useQuery({
    queryKey: ["boards", projectId],
    queryFn: () =>
      getBoards({
        project: projectId,
        since: from?.toISOString().split("T")[0],
        until: to?.toISOString().split("T")[0],
        string,
      }),
  });
}
