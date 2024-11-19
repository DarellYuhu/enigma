import { useQuery } from "@tanstack/react-query";

export function useYoutubeTopVideos(payload: {
  params: { projectId: string };
  from?: Date;
  to?: Date;
  string: string;
}) {
  return useQuery({
    queryKey: ["youtube", "projects", payload.params.projectId, "top-videos"],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/youtube/projects/${
          payload.params.projectId
        }/top-videos?since=${payload.from?.toISOString()}&until=${payload.to?.toISOString()}&string=${
          payload.string
        }`
      );

      const data: YoutubeProjectTopVideos = await response.json();
      return data;
    },
  });
}
