import { getProjectConfig } from "@/api/youtubeApi";
import { useQuery } from "@tanstack/react-query";

export function useYTProjectConfig({ item }: { item: YoutubeProject }) {
  return useQuery({
    enabled: !!item.projectID,
    queryKey: ["youtube", "projects", item.projectID],
    queryFn: () => getProjectConfig(item.projectID),
  });
}
