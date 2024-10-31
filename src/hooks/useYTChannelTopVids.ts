import { getChannelTopVideos } from "@/api/youtubeApi";
import { useQuery } from "@tanstack/react-query";

export function useYTChannelTopVids({
  params,
  from,
  to,
  selectedTopChannel,
  string,
}: {
  params: { projectId: string };
  from?: Date;
  to?: Date;
  selectedTopChannel: string | undefined;
  string: string;
}) {
  return useQuery({
    queryKey: [
      "youtube",
      "projects",
      params.projectId,
      "top-channels",
      selectedTopChannel,
    ],
    enabled: !!selectedTopChannel,
    queryFn: () =>
      getChannelTopVideos({
        projectId: params.projectId,
        since: from,
        until: to,
        details: selectedTopChannel,
        string,
      }),
  });
}
