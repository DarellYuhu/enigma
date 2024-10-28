import { getTagRelationGraphs } from "@/api/tiktokApi";
import { useQuery } from "@tanstack/react-query";

export function useTiktokHashtagNet({
  params,
  graphDate,
  graphQuery,
}: {
  params: { projectId: string };
  graphDate: { from?: Date; to?: Date };
  graphQuery: string;
}) {
  return useQuery({
    queryKey: ["trends", "graphs", "hashtagsNet", params.projectId],
    queryFn: () =>
      getTagRelationGraphs({
        project: params.projectId,
        since: graphDate.from?.toISOString().split("T")[0],
        until: graphDate.to?.toISOString().split("T")[0],
        string: graphQuery,
      }),
  });
}
