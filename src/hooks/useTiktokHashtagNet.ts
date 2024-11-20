import normalizeTagRelation from "@/utils/normalizeTagRelation";
import { useQuery } from "@tanstack/react-query";

export function useTiktokHashtagNet(payload: {
  params: { projectId: string };
  graphDate: { from?: Date; to?: Date };
  graphQuery: string;
}) {
  return useQuery({
    queryKey: [
      "trends",
      "graphs",
      "hashtagsNet",
      payload.params.projectId,
      payload.graphDate.from,
      payload.graphDate.to,
    ],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/tiktok/${payload.params.projectId}/tag-relation?since=${
          payload.graphDate.from?.toISOString().split("T")[0]
        }&until=${payload.graphDate.to?.toISOString().split("T")[0]}&string=${
          payload.graphQuery
        }`
      );

      const data: TagRelationNetwork = await response.json();
      return { data, normalized: normalizeTagRelation(data) };
    },
  });
}
