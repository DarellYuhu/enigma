import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

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
        }/top-videos?since=${format(
          payload.from!,
          "yyyy-MM-dd"
        )}&until=${format(payload.to!, "yyyy-MM-dd")}&string=${payload.string}`
      );

      const data: YoutubeProjectTopVideos = await response.json();
      return data;
    },
  });
}
