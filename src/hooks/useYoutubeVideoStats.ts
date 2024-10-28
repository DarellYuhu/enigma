import { getVideoStats } from "@/api/youtubeApi";
import { useQuery } from "@tanstack/react-query";

export function useYoutubeVideoStats({
  params,
  from,
  to,
  selectedVideo,
}: {
  params: { projectId: string };
  from?: Date;
  to?: Date;
  selectedVideo: YoutubeProjectTopVideos["top"]["0"] | null;
}) {
  return useQuery({
    queryKey: [
      "youtube",
      "projects",
      params.projectId,
      "statistics",
      selectedVideo?.id,
    ],
    enabled: !!selectedVideo,
    queryFn: () =>
      getVideoStats({
        projectId: params.projectId,
        since: from,
        until: to,
        details: selectedVideo?.id,
      }),
  });
}
