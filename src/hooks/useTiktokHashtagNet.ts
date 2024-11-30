import adjustDateByFactor from "@/utils/adjustDateByFactor";
import normalizeTagRelation from "@/utils/normalizeTagRelation";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

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
        `/api/v1/tiktok/${payload.params.projectId}/tag-relation?since=${format(
          new Date(adjustDateByFactor(-3, payload.graphDate.to!)),
          "yyyy-MM-dd"
        )}&until=${format(
          new Date(adjustDateByFactor(1, payload.graphDate.to!)),
          "yyyy-MM-dd"
        )}&string=${payload.graphQuery}`
      );

      const data: TagRelationNetwork = await response.json();
      return { data, normalized: normalizeTagRelation(data) };
    },
  });
}
