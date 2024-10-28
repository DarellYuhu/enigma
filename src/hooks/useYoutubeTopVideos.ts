import { getTopVideos } from "@/api/youtubeApi";
import { useQuery } from "@tanstack/react-query";

export function useYoutubeTopVideos({
  params,
  from,
  to,
}: {
  params: { projectId: string };
  from?: Date;
  to?: Date;
}) {
  return useQuery({
    queryKey: ["youtube", "projects", params.projectId, "top-videos"],
    queryFn: () =>
      getTopVideos({
        projectId: params.projectId,
        since: from,
        until: to,
        string: "",
      }),
  });
}
