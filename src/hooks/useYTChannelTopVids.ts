import { useQuery } from "@tanstack/react-query";

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
      "projects",
      payload.params.projectId,
      "top-channels",
      payload.selectedTopChannel,
    ],
    enabled: !!payload.selectedTopChannel,
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/youtube/projects/${payload.params.projectId}/top-channels/${
          payload.selectedTopChannel
        }?since=${payload.from?.toISOString()}&until=${payload.to?.toISOString()}&string=${
          payload.string
        }`
      );

      const data: YoutubeChannelTopVids = await response.json();
      return data;
    },
  });
}
