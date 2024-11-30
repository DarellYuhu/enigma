import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export function useYoutubeTopChannels(payload: {
  params: { projectId: string };
  from?: Date;
  to?: Date;
  string: string;
}) {
  return useQuery({
    queryKey: ["youtube", "projects", payload.params.projectId, "top-channels"],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/youtube/projects/${
          payload.params.projectId
        }/top-channels?since=${format(
          payload.from!,
          "yyyy-MM-dd"
        )}&until=${format(payload.to!, "yyyy-MM-dd")}&string=${payload.string}`
      );
      const data: YoutubeTopChannels = await response.json();
      return data;
    },
  });
}
