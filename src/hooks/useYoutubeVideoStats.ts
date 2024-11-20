import { useQuery } from "@tanstack/react-query";

export function useYoutubeVideoStats(payload: {
  params: { projectId: string };
  from?: Date;
  to?: Date;
  selectedVideo: YoutubeProjectTopVideos["top"]["0"] | null;
}) {
  return useQuery({
    queryKey: [
      "youtube",
      "projects",
      payload.params.projectId,
      "statistics",
      payload.selectedVideo?.id,
    ],
    enabled: !!payload.selectedVideo,
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/youtube/projects/${payload.params.projectId}/statistics/${
          payload.selectedVideo?.id
        }?since=${payload.from?.toISOString()}&until=${payload.to?.toISOString()}`
      );

      const data: YoutubeVideoStats = await response.json();

      const normalized: NormalizedYTStats = {
        comment: [],
        like: [],
        view: [],
      };
      data.datetime.forEach((item, index) => {
        normalized.view.push({
          date: item,
          del: data.view.del[index],
          val: data.view.val[index],
        });
        normalized.like.push({
          date: item,
          del: data.like.del[index],
          val: data.like.val[index],
        });
        normalized.comment.push({
          date: item,
          del: data.comment.del[index],
          val: data.comment.val[index],
        });
      });
      return normalized;
    },
  });
}
