import getTrends from "@/api/tiktokApi";
import { useQuery } from "@tanstack/react-query";

export function useTiktokTrends({
  params,
  query,
  statisticDate,
}: {
  params: { projectId: string };
  query: string;
  statisticDate: { from?: Date; to?: Date };
}) {
  return useQuery({
    queryKey: ["trends", "statistics", params.projectId],
    queryFn: () =>
      getTrends({
        project: params.projectId,
        since: statisticDate?.from?.toISOString().split("T")[0],
        until: statisticDate?.to?.toISOString().split("T")[0],
        string: query,
      }),
  });
}
