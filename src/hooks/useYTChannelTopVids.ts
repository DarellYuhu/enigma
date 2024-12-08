import normalizeChannelVids from "@/app/(main-layout)/youtube-projects/[projectId]/utils/normalizeChannelsVids";
import dateFormatter from "@/utils/dateFormatter";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export function useYTChannelTopVids(payload: {
  params: { projectId: string };
  from?: Date;
  to?: Date;
  selectedTopChannel: string | undefined;
  string: string;
}) {
  return useQuery({
    queryKey: [
      "youtube",
      "top-channels",
      payload.params.projectId,
      payload.selectedTopChannel,
      payload.to && dateFormatter("ISO", payload.to),
    ],
    enabled: !!payload.selectedTopChannel,
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/youtube/projects/${payload.params.projectId}/top-channels/${
          payload.selectedTopChannel
        }?since=${format(payload.from!, "yyyy-MM-dd")}&until=${format(
          payload.to!,
          "yyyy-MM-dd"
        )}&string=${payload.string}`
      );

      const data: YoutubeChannelTopVids = await response.json();
      const normalized = normalizeChannelVids(data.tv.view, data.info);
      return { data, normalized };
    },
  });
}
